// Se crea este archivo que contendra los modulos de la aplicacion
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
const db = drizzle(sql, {schema});

const main = async () => {
  try {
    console.log("Sembrando la base de datos");
    await db.delete(schema.usuarios);

    await db.insert(schema.usuarios).values([
      {
        usuario_id: "USU0001",
        email: "correo@gmail.com",
        nombre: "Humberto",
        password_hash: "12345",
        fecha_creacion: new Date("2023-10-01T00:00:00Z"),
      },
    ]);

    console.log("Terminado");
  } catch (error) {
    console.error(error);
    throw new Error("Error al generar la base de datos");
  }
}

main()