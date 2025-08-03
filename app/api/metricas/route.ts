import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { calculateNivel, resultadosQueries } from "@/db/queries/resultados";
import { formatearTiempo } from "@/utils/formatoTiempo";
import { withCors } from "@/utils/withCors";
import { Progress } from "@radix-ui/react-progress";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const usuario_id = searchParams.get("usuario_id");
    const nombre_modulo = searchParams.get("juego");

    try {
        if (!usuario_id || !nombre_modulo) {
            return withCors({ error: "Faltan parámetros necesarios." }, 400);
        }

        if (nombre_modulo === "dashboard") {
            const modulos = await resultadosQueries.obtenerModulos();
            const resultadosPorModulo = [];

            for (const modulo_id of modulos) {
                const actividades = await resultadosQueries.obtenerActividades(modulo_id);
                const actividadesTotales = actividades.length;

                if (!actividadesTotales) {
                    resultadosPorModulo.push({
                        modulo_id,
                        promedio_estrellas: 0,
                        completado: false,
                        actividades_total: 0,
                        actividades_completadas: 0,
                        progress: 0
                    });
                    continue;
                }

                const estrellas = await resultadosQueries.obtenerEstrellas(usuario_id, actividades);
                const actividadesCompletadas = estrellas.length;
                const totalEstrellas = estrellas.reduce((acc, val) => acc + val.estrellas, 0);
                const promedio = totalEstrellas / actividadesTotales;
                const promedioRedondeado = Math.round(promedio);
                const progress = Math.round((promedioRedondeado / actividadesTotales) * 100);

                resultadosPorModulo.push({
                    modulo_id,
                    promedio_estrellas: promedioRedondeado,
                    actividades_total: actividadesTotales,
                    actividades_completadas: actividadesCompletadas,
                    progress: progress,
                    actividad_id: modulo_id,
                    porcentaje_completado: Progress
                });
            }            
            return withCors({
                stars: resultadosPorModulo || 0,
                total_modulos: modulos.length,
            }, 200);
        } else {
            const modulo_id = await resultadosQueries.obtenerModuloId(nombre_modulo);
            const actividades = await resultadosQueries.obtenerActividades(modulo_id as string);

            if (!actividades.length) {
                return withCors({ stars: 0 }, 200);
            }

            const estrellasPorActividad = await resultadosQueries.obtenerEstrellas(usuario_id, actividades)

            const actividadesCompletadas = estrellasPorActividad.length;
            const progress = Math.round((actividadesCompletadas / actividades.length) * 100);

            const resultado = estrellasPorActividad.map(actividad => ({
                ...actividad,
                progress: actividad.estrellas > 0 ? 100 : 0,
                porcentaje_completado: actividad.estrellas > 0 ? 100 : 0,
                actividades_total: 1,
                actividades_completadas: actividad.estrellas > 0 ? 1 : 0
            }));
            return withCors({
                stars: resultado,
                progress: progress,
                actividades_total: actividades.length,
                actividades_completadas: actividadesCompletadas
            }, 200);
        }

    } catch (error) {
        console.error("Error en el endpoint métricas:", error);
        return withCors({
            stars: [],
            error: error instanceof Error ? error.message : String(error)
        }, 500);
    }
}

export async function POST(request: Request) {
    try {
        const fecha_actual = new Date();
        const data = await request.json();

        const nivel = await calculateNivel(data.usuario_id);

        if (!data.usuario_id) {
            return withCors({ error: "usuario_id es requerido" }, 400);
        }

        const fecha_racha = await usuarioQueries.obtenerFechaRacha(data.usuario_id);
        const hoy = fecha_actual.toISOString().slice(0, 10);
        const racha_fecha = fecha_racha.toISOString()?.slice(0, 10) || hoy;

        const fecha_ayer = new Date(fecha_actual);
        fecha_ayer.setDate(fecha_actual.getDate() - 1);
        const ayer = fecha_ayer.toISOString().slice(0, 10);

        if (racha_fecha === hoy) {
        } else if (racha_fecha === ayer) {
            await usuarioQueries.actualizarRacha(data.usuario_id, hoy)
        } else {
            await usuarioQueries.actualizarRacha(data.usuario_id, hoy, 0)
        }
        const racha = await usuarioQueries.obtenerRacha(data.usuario_id);
        const tiempoJuego = await resultadosQueries.obtenerTiempo(data.usuario_id)
        const tiempoFormateado = formatearTiempo(tiempoJuego as number);        
        return withCors({
            racha: racha || 0,
            tiempo_total: tiempoFormateado || "0h 0m 0s",
            nivel: nivel
        }, 200)
    } catch (error) {
        console.error("Error en endpoint POST /api/metricas:", error);
        return withCors({
            error: error instanceof Error ? error.message : "Error desconocido",
            racha: 0,
            tiempo_total: "0h 0m 0s",
        }, 500);
    }
}

