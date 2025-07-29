import { resultadosQueries } from "@/db/queries/resultados";
import { withCors } from "@/utils/withCors";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const usuario_id = searchParams.get("usuario_id");
    const nombre_modulo = searchParams.get("juego");

    try {
        if (!usuario_id || !nombre_modulo) {
            return withCors({ error: "Faltan parámetros necesarios." }, 400);
        }
        const modulo_id = await resultadosQueries.obtenerModuloId(nombre_modulo);
        const actividades = await resultadosQueries.obtenerActividades(modulo_id as string);
        console.log("Actividades del modulo", actividades)

        if(!actividades.length){
            return withCors({ stars: 0 }, 200);
        }

        const estrellasPorActividad = await resultadosQueries.obtenerEstrellas(usuario_id, actividades)

        console.log("Las actividades y estrellas del modulo", actividades, estrellasPorActividad)

        return withCors({ stars: estrellasPorActividad || 0 }, 200)
    } catch (error) {
        console.error("Error en el endpoint métricas:", error);
        return withCors({ 
            stars: [],
            error: error instanceof Error ? error.message : String(error)
         }, 500);
    }
}