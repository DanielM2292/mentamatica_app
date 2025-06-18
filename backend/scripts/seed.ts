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
    await db.delete(schema.modulos);
    await db.delete(schema.actividades);
    await db.delete(schema.avatar_categoria);

    await db.insert(schema.modulos).values([
      {
        modulo_id: "MOD0001",
        nombre_modulo: "Conjuntos",
      },
      {
        modulo_id: "MOD0002",
        nombre_modulo: "Numeración",
      },
      {
        modulo_id: "MOD0003",
        nombre_modulo: "Suma",
      },
      {
        modulo_id: "MOD0004",
        nombre_modulo: "Resta",
      },
      {
        modulo_id: "MOD0005",
        nombre_modulo: "Multiplicación",
      },
      {
        modulo_id: "MOD0006",
        nombre_modulo: "División",
      },
      {
        modulo_id: "MOD0007",
        nombre_modulo: "Geometría",
      },
    ]);

    await db.insert(schema.actividades).values([
      {
        actividad_id: "ACT0001",
        modulo_id: "MOD0001",
        nombre_actividad: "Clasifica y agrupa",
        descripcion: "Arrastra objetos al conjunto correcto.",
      },
      {
        actividad_id: "ACT0002",
        modulo_id: "MOD0001",
        nombre_actividad: "La union y la intersección",
        descripcion: "Selecciona qué elementos pertenecen a la unión o intersección de dos conjuntos.",
      },
      {
        actividad_id: "ACT0003",
        modulo_id: "MOD0001",
        nombre_actividad: "Detective del conjunto perdido",
        descripcion: "Encuentra qué conjunto falta para completar una operación.",
      },
      {
        actividad_id: "ACT0004",
        modulo_id: "MOD0002",
        nombre_actividad: " El Número Correcto",
        descripcion: "Explota globos en orden ascendente.",
      },
      {
        actividad_id: "ACT0005",
        modulo_id: "MOD0002",
        nombre_actividad: "Forma el Número Gigante",
        descripcion: "Construye números de 4-5 cifras usando valor posicional.",
      },
      {
        actividad_id: "ACT0006",
        modulo_id: "MOD0002",
        nombre_actividad: "Contador Espacial",
        descripcion: "Avanza en un mapa sumando/restando decenas.",
      },
      {
        actividad_id: "ACT0007",
        modulo_id: "MOD0003",
        nombre_actividad: "Sumando Estrellas",
        descripcion: "Elige la estrella con el resultado correcto.",
      },
      {
        actividad_id: "ACT0008",
        modulo_id: "MOD0003",
        nombre_actividad: "Carrera de Números",
        descripcion: "Resuelve sumas para avanzar en una carrera.",
      },
      {
        actividad_id: "ACT0009",
        modulo_id: "MOD0003",
        nombre_actividad: "Drag & Drop Numérico",
        descripcion: "Completa sumas arrastrando los números correctos.",
      },
      {
        actividad_id: "ACT0010",
        modulo_id: "MOD0004",
        nombre_actividad: "Resta y Rescata",
        descripcion: "Cruza un puente resolviendo restas.",
      },
      {
        actividad_id: "ACT0011",
        modulo_id: "MOD0004",
        nombre_actividad: "Memoria Inversa",
        descripcion: "Elige la suma que comprueba una resta.",
      },
      {
        actividad_id: "ACT0012",
        modulo_id: "MOD0004",
        nombre_actividad: "Resta en la Cueva",
        descripcion: "Escapa resolviendo restas, si fallas retrocedes.",
      },
      {
        actividad_id: "ACT0013",
        modulo_id: "MOD0005",
        nombre_actividad: "Rompe la Piñata",
        descripcion: "Golpea la piñata con el resultado correcto.",
      },
      {
        actividad_id: "ACT0014",
        modulo_id: "MOD0005",
        nombre_actividad: "Repeticiones Rápidas",
        descripcion: "Agrupa elementos para representar multiplicaciones.",
      },
      {
        actividad_id: "ACT0015",
        modulo_id: "MOD0005",
        nombre_actividad: "Desafío de Tablas",
        descripcion: "Completa tablas de multiplicar a contrarreloj.",
      },
      {
        actividad_id: "ACT0016",
        modulo_id: "MOD0006",
        nombre_actividad: "Reparte los Dulces",
        descripcion: "Divide objetos entre personajes en partes iguales.",
      },
      {
        actividad_id: "ACT0017",
        modulo_id: "MOD0006",
        nombre_actividad: "División del Tesoro",
        descripcion: "Divide monedas según pistas del mapa.",
      },
      {
        actividad_id: "ACT0018",
        modulo_id: "MOD0006",
        nombre_actividad: "Pulsa la Cifra Correcta",
        descripcion: "Elige entre opciones la división correcta.",
      },
      {
        actividad_id: "ACT0019",
        modulo_id: "MOD0007",
        nombre_actividad: "Detective de Figuras",
        descripcion: "Encuentra figuras geométricas ocultas.",
      },
      {
        actividad_id: "ACT0020",
        modulo_id: "MOD0007",
        nombre_actividad: "Construye tu Figura",
        descripcion: "Usa puntos y líneas para formar figuras.",
      },
      {
        actividad_id: "ACT0021",
        modulo_id: "MOD0007",
        nombre_actividad: "Perímetro Mágico",
        descripcion: "Calcula perímetros para desbloquear cofres.",
      },
    ]);

    await db.insert(schema.avatar_categoria).values([
      {
        categoria_id: "AVC0001",
        nombre_categoria: "Color de piel",
      },
      {
        categoria_id: "AVC0002",
        nombre_categoria: "Forma y color de ojos",
      },
      {
        categoria_id: "AVC0003",
        nombre_categoria: "Peinado",
      },
      {
        categoria_id: "AVC0004",
        nombre_categoria: "Color de cabello",
      },
      {
        categoria_id: "AVC0005",
        nombre_categoria: "Accesorios",
      },
      {
        categoria_id: "AVC0006",
        nombre_categoria: "Ropa",
      },
      {
        categoria_id: "AVC0007",
        nombre_categoria: "Fondos o temas",
      }
    ]);

    console.log("Terminado");
  } catch (error) {
    console.error(error);
    throw new Error("Error al generar la base de datos");
  }
}

main()