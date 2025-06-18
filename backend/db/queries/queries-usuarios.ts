import { db } from "@/db/drizzle";
import { usuarios } from "@/db/schema";
import { eq } from "drizzle-orm";

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
};