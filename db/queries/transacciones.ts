import { db } from "../drizzle";
import { transacciones_puntos } from "../schema";
import { generarIdConPrefijo } from "../utils/queries";



export const transaccionesQueries = {
  
  async registarTransaccion(data: {
    usuario_id: string;
    monedas: number;
    tipo: string;
}) {
    const id_transaccion = await generarIdConPrefijo("transacciones_puntos", "TRP")
    await db.insert(transacciones_puntos).values({transaccion_id: id_transaccion, ...data})
    return { success: true, message: "Se registraron correctamente los datos de la actividad" }
  }
}