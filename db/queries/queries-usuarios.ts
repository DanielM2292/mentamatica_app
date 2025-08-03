import { db } from "@/db/drizzle";
import { avatar_personalizado, usuarios } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export const usuarioQueries = {

  async existeUsuario(usuario_id: string) {
    const [user] = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id))
      .limit(1);
    return user;
  },

  async crearUsuario(data: {
    usuario_id: string;
    email: string;
    nombre: string;
    monedas: number;
  }) {
    await db.insert(usuarios).values(data);
    return { success: true, message: "Usuario registrado correctamente" };
  },

  async eliminarUsuario(usuario_id: string) {
    await db
      .delete(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id));
    console.log("usuario eliminado:", usuario_id);
    return { success: true, message: "Usuario eliminado correctamente" };
  },

  async actualizarUsuario(usuario_id: string, data: Partial<typeof usuarios.$inferInsert>) {
    await db
      .update(usuarios)
      .set(data)
      .where(eq(usuarios.usuario_id, usuario_id));
    return { success: true, message: "Usuario actualizado correctamente" };
  },

  async obtenerMonedas(usuario_id: string) {
    const resultado = await db
      .select({ monedas: usuarios.monedas })
      .from(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id));
    const monedas = resultado?.[0]?.monedas ?? 0;
    return monedas;
  },

  async obtenerOpcionesDesbloqueadas(usuario_id: string) {
    const resultado = await db
      .select()
      .from(avatar_personalizado)
      .where(eq(avatar_personalizado.usuario_id, usuario_id));
    return resultado;
  },

  async validarOpcion(usuario_id: string, opcion_id: string): Promise<boolean> {
    const resultado = await db
      .select()
      .from(avatar_personalizado)
      .where(
        and(
          eq(avatar_personalizado.usuario_id, usuario_id),
          eq(avatar_personalizado.opcion_id, opcion_id)
        )
      );
    const desbloqueada = resultado.length > 0;
    return desbloqueada;
  },


  async agregarMonedas(usuario_id: string, monedas: number) {
    await db
      .update(usuarios)
      .set({
        monedas: sql`${usuarios.monedas} + ${monedas}`
      })
      .where(eq(usuarios.usuario_id, usuario_id));

    return { success: true, message: "Monedas sumadas correctamente" };
  },

  async restarMonedas(usuario_id: string, monedas: number) {
    await db
      .update(usuarios)
      .set({
        monedas: sql`${usuarios.monedas} - ${monedas}`
      })
      .where(eq(usuarios.usuario_id, usuario_id));
    return { success: true, message: "Monedas restadas correctamente" };
  },

  async obtenerFechaRacha(usuario_id: string) {
    const resultado = await db
      .select({ fecha_racha: usuarios.fecha_actual })
      .from(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id));
    const fecha_racha = resultado?.[0].fecha_racha;
    return fecha_racha;
  },

  async actualizarRacha(usuario_id: string, fecha_actual?: string, racha?: number) {
    console.log("Data que ingresa para la base de datos", usuario_id, fecha_actual, racha)
    try {
      if(racha !== undefined) {
        await db
        .update(usuarios)
        .set({
          fecha_actual: sql`${fecha_actual}`,
          racha: sql`${racha}`
        })
        .where(eq(usuarios.usuario_id, usuario_id));
        console.log("Actualiza racha a 0 cuando la fecha es diferente otro dia")
      } else {
        await db
        .update(usuarios)
        .set({
          fecha_actual: sql`${fecha_actual}`,
          racha: sql`${usuarios.racha} + 1`
        })
        .where(eq(usuarios.usuario_id, usuario_id));
        console.log("Actualiza la racha se agrega un dia")
      }
      return { success: true, message: "Racha actualizada correctamente", };
    } catch (error) {
      console.error("Error al actualizar racha:", error);
      return {
        success: false,
        message: "Error al actualizar la racha",
        racha_actualizada: null
      };
    }
  }, 

  async obtenerRacha(usuario_id: string) {
      const resultado = await db
        .select({ racha: usuarios.racha })
        .from(usuarios)
        .where(eq(usuarios.usuario_id, usuario_id))
    const racha = resultado?.[0].racha;
    return racha;
  },

};