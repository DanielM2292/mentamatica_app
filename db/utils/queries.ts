import { db } from "@/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { actividades } from "../schema";

export async function generarIdConPrefijo(nombreTabla: string, prefijo: string): Promise<string> {
  // Buscar el último registro ordenado de forma descendente
  const resultado = await db.execute(sql`
    SELECT * 
    FROM ${sql.raw(nombreTabla)} 
    ORDER BY 1 DESC 
    LIMIT 1
  `);
  
  let nuevoNumero = 1; // Valor por defecto si no existe ningún registro con ese prefijo
  
  // Si encontramos un registro anterior
  if (resultado.rows && resultado.rows.length > 0) {
    const primeraColumna = Object.values(resultado.rows[0])[0]; // Obtiene el valor de la primera columna
    
    if (primeraColumna && typeof primeraColumna === 'string') {
      const ultimoId = primeraColumna;
      
      // Extraer la parte numérica del último ID
      const parteNumerica = ultimoId.replace(prefijo, ''); // Quita el prefijo
      const ultimoNumero = parseInt(parteNumerica, 10); // Convierte a número
      
      // Verificar que la extracción fue exitosa
      if (!isNaN(ultimoNumero)) {
        nuevoNumero = ultimoNumero + 1;
      }
    }
  }
  
  // Formatear el nuevo número con ceros a la izquierda (4 dígitos)
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