import { db } from "../drizzle";
import { modulos, actividades, resultado_actividad } from "../schema";
import { generarIdConPrefijo } from "../utils/queries";
import { eq, and, inArray, desc, sql } from "drizzle-orm";


export const resultadosQueries = {

  async registarActividad(data: {
    usuario_id: string,
    actividad_id: string,
    estrellas: any,
    intentos: any,
    errores: any,
    tiempo_total: any
  }) {
    const id_resultado = await generarIdConPrefijo("resultado_actividad", "REA")
    await db.insert(resultado_actividad).values({ resultado_id: id_resultado, ...data })
    return { success: true, message: "Se registraron correctamente los datos de la actividad" }
  },

  async obtenerModuloId(nombre_juego: string) {
    try {
      const result = await db
        .select({ modulo_id: modulos.modulo_id })
        .from(modulos)
        .where(eq(modulos.nombre_modulo, nombre_juego));
      if (result.length === 0) {
        throw new Error("Módulo no encontrado");
      }
      console.log("Los datos devueltos de la base de datos", result)
      return result[0]?.modulo_id;
    } catch (error) {
      console.log("Error al obtener el modulo_id:", error);
      return [];
    }
  },

  async obtenerActividades(modulo_id: string) {
    try {
      const resultado = await db
        .select({ actividad_id: actividades.actividad_id })
        .from(actividades)
        .where(eq(actividades.modulo_id, modulo_id));

      return resultado.map(item => item.actividad_id);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      return [];
    }
  },

  async obtenerModulos() {
    try {
      const resultado = await db
        .select({ modulo_id: modulos.modulo_id })
        .from(modulos)
      return resultado.map(item => item.modulo_id);
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
      return [];
    }
  },

  async obtenerEstrellas(usuario_id: string, actividades: string[]) {
    try {
      if (!actividades.length) return [];
      const resultado = await db
        .select({
          actividad_id: resultado_actividad.actividad_id,
          estrellas: resultado_actividad.estrellas,
        })
        .from(resultado_actividad)
        .where(
          and(
            eq(resultado_actividad.usuario_id, usuario_id),
            inArray(resultado_actividad.actividad_id, actividades),
          )
        )
        .orderBy(desc(resultado_actividad.estrellas));
      const resultadosAgrupados = resultado.reduce((acc, curr) => {
        if (
          curr.actividad_id !== null &&
          curr.actividad_id !== undefined &&
          curr.estrellas !== null &&
          curr.estrellas !== undefined
        ) {
          const actividadId = curr.actividad_id as string;
          const estrellas = curr.estrellas as number;
          if (!acc[actividadId] || estrellas > acc[actividadId].estrellas) {
            acc[actividadId] = { actividad_id: actividadId, estrellas };
          }
        }
        return acc;
      }, {} as Record<string, { actividad_id: string, estrellas: number }>);

      return actividades.map(actividadId => {
        return {
          actividad_id: actividadId,
          estrellas: resultadosAgrupados[actividadId]?.estrellas ?? 0
        };
      });
    } catch (error) {
      console.error("Error al obtener las estrellas:", error);
      return actividades.map(actividadId => ({
        actividad_id: actividadId,
        estrellas: 0
      }));
    }
  },

  async obtenerTiempo(usuario_id: string) {
    try {
      const resultado = await db
        .select({
          tiempo_total: sql`SUM(${resultado_actividad.tiempo_total})`.as("tiempo_total")
        })
        .from(resultado_actividad)
        .where(eq(resultado_actividad.usuario_id, usuario_id));
      return resultado[0]?.tiempo_total || 0;
    } catch (error) {
      console.error("Error al obtener tiempo total:", error);
      return 0;
    }
  }
}

export async function calculateNivel(usuario_id: string): Promise<number> {
    try {
        const modulos = await resultadosQueries.obtenerModulos();
        let nivel = 0;

        for (const modulo_id of modulos) {
            const actividades = await resultadosQueries.obtenerActividades(modulo_id);
            
            if (!actividades.length) continue;

            const estrellas = await resultadosQueries.obtenerEstrellas(usuario_id, actividades);
            const totalEstrellas = estrellas.reduce((acc, val) => acc + val.estrellas, 0);
            const promedio = totalEstrellas / actividades.length;
            const promedioRedondeado = Math.round(promedio);
            
            if (promedioRedondeado >= 3) {
                nivel += 1;
            }
        }

        return nivel;
    } catch (error) {
        console.error("Error calculando nivel:", error);
        return 0;
    }
}