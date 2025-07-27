import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { resultadosQueries } from "@/db/queries/resultados";
import { transaccionesQueries } from "@/db/queries/transacciones";
import { convertirEstrellas, obtenerActividad } from "@/db/utils/queries";
import { withCors } from "@/utils/withCors";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const actividad_id = await obtenerActividad(data.actividad)

        const resultado = {
            usuario_id: data.usuario_id,
            actividad_id: actividad_id,
            estrellas: data.estrellas,
            intentos: data.intentos,
            errores: data.errores,
            tiempo_total: data.tiempo
        }

        await resultadosQueries.registarActividad(resultado)

        const monedas = await convertirEstrellas(data.estrellas)
        await usuarioQueries.agregarMonedas(resultado.usuario_id, monedas)

        const transacciones = {
            usuario_id: data.usuario_id,
            monedas: monedas,
            tipo: "Ganadas"
        }

        await transaccionesQueries.registarTransaccion(transacciones);

        return withCors({ success: true }, 200);
    } catch (error) {
        console.log("Error guardando datos:", error);
        return withCors({ error: "Error interno del servidor" }, 500);
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