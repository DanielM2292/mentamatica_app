import { NextRequest } from "next/server";
import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { z } from "zod";

// Esquema de validación simplificado
const userSchema = z.object({
  usuario_id: z.string(),
  email: z.string().email(),
  nombre: z.string().min(1),
});

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || '*';
  try {
    const body = await req.json();
    const { usuario_id, email, nombre } = userSchema.parse(body);

    const existeUsuario = await usuarioQueries.existeUsuario(usuario_id);

    if (existeUsuario) {
      return new Response(
        JSON.stringify({ success: true, message: "Usuario ya registrado" }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": origin,
            "Content-Type": "application/json",
          }
        }
      );
    }

    const result = await usuarioQueries.crearUsuario({ usuario_id, email, nombre });

    return new Response(
      JSON.stringify(result),
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error instanceof z.ZodError ? "Datos inválidos" : "Error al registrar usuario",        
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Content-Type": "application/json",
        }
      }      
    );
  }
}