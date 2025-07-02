import { cache } from "react";
import { db } from "../drizzle";
import { resultado_actividad } from "../schema";
import { eq } from "drizzle-orm";
import { generarIdConPrefijo } from "../utils/queries";



export const primerModuloQueries = {
  async registarActividad(data: {
    usuario_id: string, 
    actividad_id: string, 
    estrellas: any,
    intentos: any, 
    errores: any, 
    tiempo_total: any
  }) {
    const id_resultado = await generarIdConPrefijo("resultado_actividad", "REA")
    await db.insert(resultado_actividad).values({resultado_id: id_resultado, ...data})
    return { success: true, message: "Se registraron correctamente los datos de la actividad" }
  }
}