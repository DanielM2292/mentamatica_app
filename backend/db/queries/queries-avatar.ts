import { db } from "@/db/drizzle";
import { avatar_categoria, avatar_opcion, usuarios, avatar_personalizado } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export const avatarQueries = {

  async obtenerCategorias() {
    const categorias = await db
      .select()
      .from(avatar_categoria)
    return categorias;
  },

  async obtenerOpciones(categoria_id: string) {
    try {
      const categoria = await db
        .select()
        .from(avatar_opcion)
        .where(eq(avatar_opcion.categoria_id, categoria_id));
      return categoria;
    } catch (error) {
      console.error("Error al obtener categoria_id:", error);
      return [];
    }
  },

  async obtenerIdCategoria(id_api: string) {
    try {
      const opciones = await db
        .select()
        .from(avatar_categoria)
        .where(eq(avatar_categoria.id_api, id_api));
      return opciones;
    } catch (error) {
      console.error("Error al obtener opciones:", error);
      return [];
    }
  },

  async eliminarUsuario(usuario_id: string) {
    console.log("Envia id del usuario a eliminar:", usuario_id);
    await db
      .delete(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id));
    console.log("usuario eliminado:", usuario_id);
    return { success: true, message: "Usuario eliminado correctamente" };
  },

  async actualizarUsuario(usuario_id: string, data: Partial<typeof usuarios.$inferInsert>) {
    console.log("Datos antes de actualizar:", data);
    await db
      .update(usuarios)
      .set(data)
      .where(eq(usuarios.usuario_id, usuario_id));
    return { success: true, message: "Usuario actualizado correctamente" };
  },

  async obtenerMonedas(usuario_id: string) {
    console.log("Usuario id para obtener monedas", usuario_id);
    const resultado = await db
      .select({ monedas: usuarios.monedas })
      .from(usuarios)
      .where(eq(usuarios.usuario_id, usuario_id));
    const monedas = resultado?.[0]?.monedas ?? 0;
    return monedas;
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

  async validarOpcion(usuario_id: string, opcion: string) {
    const resultado = await db
      .select()
      .from(avatar_personalizado)
      .where(
        and(
          eq(avatar_personalizado.usuario_id, usuario_id),
          eq(avatar_personalizado.opcion_id, opcion)
        )
      )
      .limit(1);

    const yaDesbloqueada = resultado.length > 0;

    return {
      success: yaDesbloqueada,
      message: yaDesbloqueada
        ? 'El usuario ya tiene desbloqueada la opción'
        : 'La opción no está desbloqueada aún',
    };
  },

  async registrarAvatar(usuario_id: string, categoria_id: string, opcion_id: string) {
    await db.insert(avatar_personalizado).values({
      usuario_id: usuario_id,
      categoria_id: categoria_id,
      opcion_id: opcion_id,
    });
  }
};