import { relations } from "drizzle-orm";
import { primaryKey, integer, pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
    usuario_id: varchar("usuario_id", {length:10}).primaryKey(),
    email: varchar("email", {length: 255}).notNull().unique(),
    nombre: varchar("nombre", {length: 100}).notNull(),
    password_hash: varchar("password_hash", {length: 64}).notNull(),
    monedas: integer("monedas").default(0),
    fecha_creacion: timestamp("fecha_creacion")
})

export const usuariosTransaccionesRelations = relations(usuarios, ({ many }) => ({transacciones_puntos: many(transacciones_puntos)}))

export const usuariosResultadoRelations = relations(usuarios, ({ many }) => ({resultado_actividad: many(resultado_actividad)}))

export const transacciones_puntos = pgTable("transacciones_puntos", {
    transaccion_id: varchar("transaccion_id", {length:10}).primaryKey(),
    usuario_id: varchar("usuario_id", {length:10}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    monedas: integer("monedas"),
    fecha: timestamp("fecha"),
    tipo: varchar("tipo", {length: 20}),
})

export const transaccionesUsuariosRelations = relations(transacciones_puntos, ({ one }) => ({
    activeUsuario: one(usuarios, {
        fields: [transacciones_puntos.usuario_id],
        references: [usuarios.usuario_id]
    })
}))

export const respuestas = pgTable("respuestas", {
    respuesta_id: varchar("respuesta_id", {length:10}).primaryKey(),
    resultado_id: varchar("resultado_id", {length:10}).references(() => resultado_actividad.resultado_id, {onDelete: "cascade"}),
    pregunta_texto: text("pregunta_texto"),
    tiempo_respuesta: integer("tiempo_respuesta"),
    completada: boolean("completada"),
})

export const respuestasResultadoRelations = relations(respuestas, ({ many }) => ({resultado_actividad: many(resultado_actividad)}))

export const resultado_actividad = pgTable("resultado_actividad", {
    resultado_id: varchar("resultado_id", {length:10}).primaryKey(),
    usuario_id: varchar("usuario_id", {length:10}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    actividad_id: varchar("actividad_id", {length:10}).references(() => actividades.actividad_id, {onDelete: "cascade"}),
    fecha: timestamp("fecha"),
    estrellas: integer("estrellas"),
    intentos: integer("intentos"),
    errores: integer("errores"),
    tiempo_total: integer("tiempo_total"),
})

export const resultadoRespuestasRelations = relations(resultado_actividad, ({ one }) => ({
    activeUsuario: one(respuestas, {
        fields: [resultado_actividad.resultado_id],
        references: [respuestas.resultado_id]
    })
}))

export const resultadoUsuariosRelations = relations(resultado_actividad, ({ one }) => ({
    activeUsuario: one(usuarios, {
        fields: [resultado_actividad.usuario_id],
        references: [usuarios.usuario_id]
    })
}))

export const actividades = pgTable("actividades", {
    actividad_id: varchar("actividad_id", {length:10}).primaryKey(),
    modulo_id: varchar("modulo_id", {length:10}).references(() => modulos.modulo_id, {onDelete: "cascade"}),
    nombre_actividad: varchar("nombre_actividad", {length: 100}),
    descripcion: text("descripcion"),
})

export const modulos = pgTable("modulos", {
    modulo_id: varchar("modulo_id", {length:10}).primaryKey(),
    nombre_modulo: varchar("nombre_modulo", {length: 30}),
})

export const avatar_personalizado = pgTable("avatar_personalizado", {
    usuario_id: varchar("usuario_id", {length:10}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    categoria_id: varchar("categoria_id", {length:10}).references(() => avatar_categoria.categoria_id, {onDelete: "cascade"}),
    opcion_id: varchar("opcion_id", {length: 10}).references(() => avatar_opcion.opcion_id, {onDelete: "cascade"}),
    fecha_desbloqueo: timestamp("fecha_desbloqueo"),
}, (table) => ({
    pk: primaryKey({ columns: [table.usuario_id, table.categoria_id] })
}))

export const avatar_categoria = pgTable("avatar_categoria", {
    categoria_id: varchar("categoria_id", {length:10}).primaryKey(),
    nombre_categoria: varchar("nombre_categoria", {length: 50}),
})

export const avatar_opcion = pgTable("avatar_opcion", {
    opcion_id: varchar("opcion_id", {length:10}).primaryKey(),
    categoria_id: varchar("categoria_id", {length:10}).references(() => avatar_categoria.categoria_id, {onDelete: "cascade"}),
    nombre_opcion: varchar("nombre_opcion", {length: 50}),
    costo: integer("costo").notNull(),
})

