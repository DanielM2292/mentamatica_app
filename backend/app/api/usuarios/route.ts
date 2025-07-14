import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { withCors } from "@/utils/withCors";

// Configuración importante
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: Request) {
  try {
    // 1. Leer el cuerpo como ArrayBuffer y convertir a string
    const payload = await request.text();
    const headers = request.headers;

    // 2. Obtener headers de Svix
    const svixHeaders = {
      "svix-id": headers.get("svix-id") || "",
      "svix-timestamp": headers.get("svix-timestamp") || "",
      "svix-signature": headers.get("svix-signature") || "",
    };

    console.log("Headers recibidos:", svixHeaders);
    console.log("Payload length:", payload.length);

    if (!CLERK_WEBHOOK_SECRET) {
      console.error("CLERK_WEBHOOK_SECRET not configured");
      return withCors({ error: "CLERK_WEBHOOK_SECRET not configured" }, 500 );
    }

    // 3. Verificar usando la biblioteca Svix
    const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
    let event;

    try {
      event = webhook.verify(payload, svixHeaders) as any;
      console.log("Webhook verificado exitosamente");
    } catch (err) {
      console.error("Error verificando webhook:", err);
      return withCors({ error: "Invalid signature" }, 403 );
    }

    // 4. Procesar el evento según su tipo
    console.log("Evento recibido:", event.type);
    const userData = event.data as any;

    switch (event.type) {
      case "user.created":
        try {
          const usuario = {
            clerk_id: userData.id,
            email: userData.email_addresses?.[0]?.email_address || "Sin email",
            nombre: userData.username || "Sin nombre",
          };

          const usuarioExistente = await usuarioQueries.existeUsuario(usuario.clerk_id)

          if (usuarioExistente) {
            console.log("El usuario ya existe", usuario.clerk_id);
          } else {
            await usuarioQueries.crearUsuario({ usuario_id: usuario.clerk_id, email: usuario.email, nombre: usuario.nombre });
            console.log("Usuario creado:", userData.id);
          }
        } catch (error) {
          console.error("Error creando usuario:", error);
          throw error;
        }
        break;
      case "user.deleted":
        try {
          if (!userData) {
            console.log("Error: datos del evento no definidos")
          }

          const usuarioId = userData.id;
          const usuarioExistente = await usuarioQueries.eliminarUsuario(usuarioId);
          if (usuarioExistente) {
            console.log("Usuario eliminado desde route: ", usuarioId, userData.username)
          }

        } catch (error) {
          console.log("Error borrando usuario:", error)
          throw error;
        }
        break;
      case "user.updated":
        console.log("datos del usuario", userData)
        try {
          if (!userData) {
            console.log("Error: datos del evento no definidos")
          }

          const usuarioId = userData.id;
          const nameUser = userData.username || "Sin nombre";
          const usuarioExistente = await usuarioQueries.actualizarUsuario(usuarioId, { nombre: nameUser });

          if (usuarioExistente) {
            console.log("Usuario existente actualizado desde route:", usuarioId, nameUser);
          }

        } catch (error) {
          console.log("Error actualizando datos del usuario usuario:", error)
          throw error;
        }
        break;
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return withCors({ success: true }, 200 );

  } catch (error) {
    console.error("Error procesando webhook:", error);
    return withCors({ error: "Internal server error" }, 500 );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const usuarioId = searchParams.get("usuario_id");

  if (!usuarioId) {
    return withCors({ error: "Se requiere usuario" }, 400 )
  }

  try {
    const monedas = await usuarioQueries.obtenerMonedas(usuarioId);

    return withCors({ success: true, monedas });
  } catch (error) {
    console.log("Error al obtener monedas del usuario:", error);
    return withCors({ error: "Error interno al obtener monedas" }, 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, svix-signature, svix-id, svix-timestamp",
    },
  });
}