import { db } from "@/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { actividades } from "../schema";

export async function generarIdConPrefijo(nombreTabla: string, prefijo: string): Promise<string> {
  const resultado = await db.execute(sql`SELECT COUNT(*) as total FROM ${sql.raw(nombreTabla)}`);
  const total = Number((resultado.rows?.[0]?.total) || 0);
  const nuevoNumero = total + 1;
  const numeroFormateado = nuevoNumero.toString().padStart(4, '0');
  return `${prefijo}${numeroFormateado}`;
}

export async function convertirEstrellas(estrellas: number) {
  const tabla = new Map([
    [3, 50],
    [2, 20],
    [1, 10],
  ]);

  return tabla.get(estrellas) ?? 0;
}

export async function obtenerActividad(actividad: string) {
  const resultado = await db
    .select({ actividad_id: actividades.actividad_id })
    .from(actividades)
    .where(eq(actividades.nombre_actividad, actividad))
    .limit(1);

  return resultado[0]?.actividad_id ?? null;
}