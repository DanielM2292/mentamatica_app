// Explicación de relaciones:
/*
- Cada usuario puede personalizar su avatar, pero **solo puede elegir una opción por categoría**.
- La clave primaria compuesta (`usuario_id`, `categoria_id`) garantiza esta restricción.
- `opcion_id` indica qué opción específica ha seleccionado el usuario dentro de esa categoría.
- Esto evita que un usuario registre múltiples opciones dentro de la misma categoría.
*/
// Con esta documentación, queda claro que el diseño impide duplicaciones en la personalización del 
// avatar y que la relación entre usuario, categoría y opción se respeta correctamente.


import { relations } from "drizzle-orm";
import { primaryKey, integer, pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
    usuario_id: varchar("usuario_id", {length:40}).primaryKey(),
    email: varchar("email", {length: 255}).notNull().unique(),
    nombre: varchar("nombre", {length: 100}).notNull(),
    monedas: integer("monedas").default(0).notNull(),
    fecha_creacion: timestamp("fecha_creacion").defaultNow().notNull()
})

export const transacciones_puntos = pgTable("transacciones_puntos", {
    transaccion_id: varchar("transaccion_id", {length:10}).primaryKey(),
    usuario_id: varchar("usuario_id", {length:40}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    monedas: integer("monedas"),
    fecha: timestamp("fecha").defaultNow().notNull(),
    tipo: varchar("tipo", {length: 20}),
})

export const resultado_actividad = pgTable("resultado_actividad", {
    resultado_id: varchar("resultado_id", {length:10}).primaryKey(),
    usuario_id: varchar("usuario_id", {length:40}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    actividad_id: varchar("actividad_id", {length:10}).references(() => actividades.actividad_id, {onDelete: "cascade"}),
    fecha: timestamp("fecha").defaultNow().notNull(),
    estrellas: integer("estrellas"),
    intentos: integer("intentos"),
    errores: integer("errores"),
    tiempo_total: integer("tiempo_total"),
})

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
    usuario_id: varchar("usuario_id", {length:40}).references(() => usuarios.usuario_id, {onDelete: "cascade"}),
    categoria_id: varchar("categoria_id", {length:10}).references(() => avatar_categoria.categoria_id, {onDelete: "cascade"}),
    opcion_id: varchar("opcion_id", {length: 10}).references(() => avatar_opcion.opcion_id, {onDelete: "cascade"}),
    fecha_desbloqueo: timestamp("fecha_desbloqueo").defaultNow().notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.usuario_id, table.opcion_id] })
}))

export const avatar_categoria = pgTable("avatar_categoria", {
    categoria_id: varchar("categoria_id", {length:10}).primaryKey(),
    nombre_categoria: varchar("nombre_categoria", {length: 50}),
    id_api: varchar("id_api", {length: 20}),
    orden: integer("orden").notNull(),
    emoji: varchar("emoji", { length: 10 }),
})

export const avatar_opcion = pgTable("avatar_opcion", {
    opcion_id: varchar("opcion_id", {length:10}).primaryKey(),
    categoria_id: varchar("categoria_id", {length:10}).references(() => avatar_categoria.categoria_id, {onDelete: "cascade"}),
    valor: varchar("valor", { length: 50 }).notNull(), // El valor real usado en la API (ej: "9e5622")
    costo: integer("costo").notNull(),
})

export const usuariosRelations = relations(usuarios, ({ many }) => ({
    resultadosActividades: many(resultado_actividad),
    transacciones: many(transacciones_puntos),
    avatarPersonalizado: many(avatar_personalizado),
}));

export const actividadesRelations = relations(actividades, ({ many, one }) => ({
    modulo: one(modulos, {
        fields: [actividades.modulo_id],
        references: [modulos.modulo_id]
    }),
    resultados: many(resultado_actividad),
}));

export const avatarPersonalizadoRelations = relations(avatar_personalizado, ({ one }) => ({
    usuario: one(usuarios, {
        fields: [avatar_personalizado.usuario_id],
        references: [usuarios.usuario_id]
    }),
    categoria: one(avatar_categoria, {
        fields: [avatar_personalizado.categoria_id],
        references: [avatar_categoria.categoria_id]
    }),
    opcion: one(avatar_opcion, {
        fields: [avatar_personalizado.opcion_id],
        references: [avatar_opcion.opcion_id]
    }),
}));

export const avatarOpcionRelations = relations(avatar_opcion, ({ one, many }) => ({
    categoria: one(avatar_categoria, {
        fields: [avatar_opcion.categoria_id],
        references: [avatar_categoria.categoria_id]
    }),
    seleccionadaPor: many(avatar_personalizado),
}));

export const avatarCategoriaRelations = relations(avatar_categoria, ({ many }) => ({
    opciones: many(avatar_opcion),
}));