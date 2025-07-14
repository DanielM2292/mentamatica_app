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
  }

};