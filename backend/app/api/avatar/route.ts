import { avatarQueries } from "@/db/queries/queries-avatar";
import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { transaccionesQueries } from "@/db/queries/transacciones";
import { withCors } from "@/utils/withCors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const usuarioId = searchParams.get("usuario_id");
  const getCategorias = searchParams.get("get") === "categorias";
  const getOpciones = searchParams.get("categoria_id");

  try {
    if (usuarioId) {
      const opciones_desbloqueadas = await usuarioQueries.obtenerOpcionesDesbloqueadas(usuarioId);
      const monedas = await usuarioQueries.obtenerMonedas(usuarioId);

      if (!opciones_desbloqueadas || !monedas) {
        return withCors({ error: "Usuario no encontrado o sin datos" }, 404);
      }

      return withCors({ success: true, monedas, opciones_desbloqueadas }, 200);
    }

    if (getCategorias) {
      const categorias = await avatarQueries.obtenerCategorias();
      return withCors({ success: true, categorias }, 200);
    }

    if (getOpciones) {
      const id_categoria_resultado = await avatarQueries.obtenerIdCategoria(getOpciones);
      const id_categoria = id_categoria_resultado[0].categoria_id;      
      const opciones = await avatarQueries.obtenerOpciones(id_categoria);
      console.log("Categorias obtenidas:", opciones);
      return withCors({ success: true, opciones }, 200);
    }

    return withCors({ error: 'Faltan parámetros necesarios.' }, 400);
  } catch (error) {
    console.error("Error en GET:", error);
    return withCors({ error: "Error interno del servidor" }, 500);
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, categoriaId, optionId, costo } = body;

    if (!userId || !optionId || costo == null || !categoriaId) {
      return withCors({ error: 'Faltan datos obligatorios' }, 400);
    }

    const yaDesbloqueada = await avatarQueries.validarOpcion(userId, optionId);
    if (yaDesbloqueada.success === true) {
      console.log(`La opción ${optionId} ya estaba desbloqueada para el usuario ${userId}`);
      return withCors({
        error: 'La opción ya está desbloqueada',
        yaDesbloqueada: true
      }, 409);
    }

    const monedasUsuario = await usuarioQueries.obtenerMonedas(userId);

    if (monedasUsuario == null) {
      return withCors({ error: 'Usuario no encontrado' }, 404);
    }

    if (monedasUsuario < costo) {
      return withCors({ error: 'Fondos insuficientes' }, 403);
    }

    await usuarioQueries.restarMonedas(userId, costo);
    await avatarQueries.registrarAvatar(userId, categoriaId, optionId);

    const transacciones = {
      usuario_id: userId,
      monedas: costo,
      tipo: "Gastadas"
    }

    await transaccionesQueries.registarTransaccion(transacciones)

    return withCors({ success: true });
  } catch (error) {
    console.error('Error en el endpoint POST /api/avatar:', error);
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