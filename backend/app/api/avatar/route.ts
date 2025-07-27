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
      const opciones_guardadas = await avatarQueries.obtenerOpcionesActivas(usuarioId);

      const opciones_enviar: Record<string, any> = {};

      for (const opcion of opciones_guardadas) {
        const categoria = await avatarQueries.obtenerId_api(opcion.categoria_id as string);
        const opc = await avatarQueries.obtenerOpcionEspecial(opcion.categoria_id as string, opcion.opcion_id as string);

        if (categoria) {
          opciones_enviar[categoria as string] = opc;
        }
      }

      const opciones_desbloqueadas = await usuarioQueries.obtenerOpcionesDesbloqueadas(usuarioId);
      const monedas = await usuarioQueries.obtenerMonedas(usuarioId);

      if (!opciones_desbloqueadas || !monedas || !opciones_enviar) {
        return withCors({ error: "Usuario no encontrado o sin datos" }, 404);
      }

      return withCors({ success: true, monedas, opciones_desbloqueadas, opciones_enviar }, 200);
    }

    if (getCategorias) {
      const categorias = await avatarQueries.obtenerCategorias();
      return withCors({ success: true, categorias }, 200);
    }

    if (getOpciones) {
      const id_categoria_resultado = await avatarQueries.obtenerIdCategoria(getOpciones);
      const id_categoria = id_categoria_resultado[0].categoria_id;
      const opciones = await avatarQueries.obtenerOpciones(id_categoria);
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
    const { userId, categoriaId, optionId, costo, opciones_guardar } = body;

    // Si estás guardando personalización completa
    if (opciones_guardar && typeof opciones_guardar === 'object') {
      if (!userId) {
        return withCors({ error: 'Falta userId para guardar opciones' }, 400);
      }
      // Obtiene las opciones de cada categoría que se van a guardar en la base de datos
      // con el for va a recorrer todas las categorias que el usuario quiere guardar
      const entradas = Object.entries(opciones_guardar);

      for (const [clave, valor] of entradas) {
        // Primero con el nombre de la categoria(clave) saca el id y con ese id junto con el valor de la opcion
        // obtiene el id_opcion que son datos clave para acutalizar los estados en el avatar_personalizado
        const id_categoria = await avatarQueries.obtenerIdCategoria(clave);
        const data = await avatarQueries.obtenerOpcionCategoria(id_categoria[0].categoria_id, valor as string);

        if (!data || data.length === 0) {
          return withCors({ error: 'Opción no encontrada' }, 404);
        }
        // Actualiza el estado a inactivo de todas las opciones de la categoria que el usuario quiere guardar
        // y por ultimo se va a la opcion especifica que el usuario quiere guardar y la actualiza a activo
        await avatarQueries.actualizarOpcion(userId, id_categoria[0].categoria_id as string);
        await avatarQueries.guardarOpciones(userId, id_categoria[0].categoria_id as string, data[0].opcion_id);
      }

      return withCors({ success: true, message: "Avatar actualizado correctamente" });
    }

    if (!userId || !optionId || costo == null || !categoriaId) {
      return withCors({ error: 'Faltan datos obligatorios' }, 400);
    }

    const yaDesbloqueada = await avatarQueries.validarOpcion(userId, optionId);
    if (yaDesbloqueada.success === true) {
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
