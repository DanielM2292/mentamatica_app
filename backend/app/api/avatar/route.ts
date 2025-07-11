import { avatarQueries } from "@/db/queries/queries-avatar";
import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { withCors } from "@/utils/withCors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const usuarioId = searchParams.get("usuario_id");
  const getCategorias = searchParams.get("get") === "categorias";
  const getOpciones = searchParams.get("categoria_id");

  try {
    console.log("Entra al endpoint", usuarioId, getCategorias)
    if (usuarioId) {
      // Obtener monedas
      const monedas = await usuarioQueries.obtenerMonedas(usuarioId);

      if (!monedas) {
        return withCors({ error: "No se encontraron monedas para el usuario" }, 404 );
      }

      return withCors({ success: true, monedas }, 200 );
    }

    if (getCategorias) {
      // Obtener categorías
      const categorias = await avatarQueries.obtenerCategorias();

      if (!categorias || categorias.length === 0) {
        return withCors({ error: "No se encontraron categorias" }, 404 );
      }

      return withCors({ success: true, categorias }, 200 );
    }

    if (getOpciones) {
      // Obtener categorías
      console.log("Entra a validar las opciones", getOpciones)
      const opciones = await avatarQueries.obtenerOpciones(getOpciones);
      console.log("Las opciones desde la base de datos", opciones)
      if (!opciones || opciones.length === 0) {
        return withCors({ error: "No se encontraron categorias" }, 404 );
      }

      return withCors({ success: true, opciones }, 200 );
    }

    return withCors({ error: "Parámetros insuficientes" }, 400 );

  } catch (error) {
    console.error("Error en GET:", error);
    return withCors({ error: "Error interno del servidor" }, 500 );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, categoriaId, optionId, costo } = body;

    if (!userId || !optionId || costo == null || !categoriaId) {
      return withCors({ error: 'Faltan datos obligatorios' }, 400);
    }

    // Verificar monedas
    const monedasUsuario = await usuarioQueries.obtenerMonedas(userId)

    if (monedasUsuario == null) return withCors({ error: 'Usuario no encontrado' }, 404);
    if (monedasUsuario < costo) return withCors({ error: 'Fondos insuficientes' }, 403);

    // Verificar si ya tiene la opción desbloqueada
    const yaDesbloqueada = await avatarQueries.validarOpcion(userId, optionId)

    if (yaDesbloqueada) return withCors({ error: 'La opción ya está desbloqueada' }, 409);

    // Restar monedas
    await usuarioQueries.restarMonedas(userId, monedasUsuario)
    // Insertar el desbloqueo
    await avatarQueries.registrarAvatar(userId, categoriaId, optionId)

    return withCors({ success: true });
  } catch (error) {
    console.error('Error en el endpoint:', error);
    return withCors({ error: 'Error en el servidor' }, 500);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}