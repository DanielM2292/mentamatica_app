// seed.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Sembrando la base de datos");

    // Eliminar datos existentes (en orden correcto por dependencias)
    await db.delete(schema.avatar_personalizado);
    await db.delete(schema.avatar_opcion);
    await db.delete(schema.avatar_categoria);
    await db.delete(schema.transacciones_puntos);
    await db.delete(schema.resultado_actividad);
    await db.delete(schema.actividades);
    await db.delete(schema.modulos);
    await db.delete(schema.usuarios);

    // Insertar módulos
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

    // Insertar actividades
    await db.insert(schema.actividades).values([
      {
        actividad_id: "ACT0001",
        modulo_id: "MOD0001",
        nombre_actividad: "clasificaAgrupa",
        descripcion: "Arrastra objetos al conjunto correcto.",
      },
      {
        actividad_id: "ACT0002",
        modulo_id: "MOD0001",
        nombre_actividad: "unionInterseccion",
        descripcion: "Selecciona qué elementos pertenecen a la unión o intersección de dos conjuntos.",
      },
      {
        actividad_id: "ACT0003",
        modulo_id: "MOD0001",
        nombre_actividad: "detectiveConjunto",
        descripcion: "Encuentra qué conjunto falta para completar una operación.",
      },
      {
        actividad_id: "ACT0004",
        modulo_id: "MOD0002",
        nombre_actividad: "numeroCorrecto",
        descripcion: "Explota globos en orden ascendente.",
      },
      {
        actividad_id: "ACT0005",
        modulo_id: "MOD0002",
        nombre_actividad: "formaNumeroGigante",
        descripcion: "Construye números de 4-5 cifras usando valor posicional.",
      },
      {
        actividad_id: "ACT0006",
        modulo_id: "MOD0002",
        nombre_actividad: "contadorEspacial",
        descripcion: "Avanza en un mapa sumando/restando decenas.",
      },
      {
        actividad_id: "ACT0007",
        modulo_id: "MOD0003",
        nombre_actividad: "sumandoEstrellas",
        descripcion: "Elige la estrella con el resultado correcto.",
      },
      {
        actividad_id: "ACT0008",
        modulo_id: "MOD0003",
        nombre_actividad: "carreraNumeros",
        descripcion: "Resuelve sumas para avanzar en una carrera.",
      },
      {
        actividad_id: "ACT0009",
        modulo_id: "MOD0003",
        nombre_actividad: "dragDropNumerico",
        descripcion: "Completa sumas arrastrando los números correctos.",
      },
      {
        actividad_id: "ACT0010",
        modulo_id: "MOD0004",
        nombre_actividad: "restaRescata",
        descripcion: "Cruza un puente resolviendo restas.",
      },
      {
        actividad_id: "ACT0011",
        modulo_id: "MOD0004",
        nombre_actividad: "memoriaInversa",
        descripcion: "Elige la suma que comprueba una resta.",
      },
      {
        actividad_id: "ACT0012",
        modulo_id: "MOD0004",
        nombre_actividad: "restaCueva",
        descripcion: "Escapa resolviendo restas, si fallas retrocedes.",
      },
      {
        actividad_id: "ACT0013",
        modulo_id: "MOD0005",
        nombre_actividad: "rompePinata",
        descripcion: "Golpea la piñata con el resultado correcto.",
      },
      {
        actividad_id: "ACT0014",
        modulo_id: "MOD0005",
        nombre_actividad: "repeticionesRapidas",
        descripcion: "Agrupa elementos para representar multiplicaciones.",
      },
      {
        actividad_id: "ACT0015",
        modulo_id: "MOD0005",
        nombre_actividad: "desafioTablas",
        descripcion: "Completa tablas de multiplicar a contrarreloj.",
      },
      {
        actividad_id: "ACT0016",
        modulo_id: "MOD0006",
        nombre_actividad: "reparteDulces",
        descripcion: "Divide objetos entre personajes en partes iguales.",
      },
      {
        actividad_id: "ACT0017",
        modulo_id: "MOD0006",
        nombre_actividad: "divisionTesoro",
        descripcion: "Divide monedas según pistas del mapa.",
      },
      {
        actividad_id: "ACT0018",
        modulo_id: "MOD0006",
        nombre_actividad: "pulsaCorrecta",
        descripcion: "Elige entre opciones la división correcta.",
      },
      {
        actividad_id: "ACT0019",
        modulo_id: "MOD0007",
        nombre_actividad: "detectiveFiguras",
        descripcion: "Encuentra figuras geométricas ocultas.",
      },
      {
        actividad_id: "ACT0020",
        modulo_id: "MOD0007",
        nombre_actividad: "construyeFigura",
        descripcion: "Usa puntos y líneas para formar figuras.",
      },
      {
        actividad_id: "ACT0021",
        modulo_id: "MOD0007",
        nombre_actividad: "perimetroMagico",
        descripcion: "Calcula perímetros para desbloquear cofres.",
      },
    ]);

    // Insertar categorías de avatar (usando IDs del frontend)
    await db.insert(schema.avatar_categoria).values([
      { categoria_id: "AVC0001", nombre_categoria: "Color de Piel", id_api: "skinColor", orden: 1, emoji: "👤" },
      { categoria_id: "AVC0002", nombre_categoria: "Estilo de Cabello", id_api: "hair", orden: 2, emoji: "👑" },
      { categoria_id: "AVC0003", nombre_categoria: "Color de Cabello", id_api: "hairColor", orden: 3, emoji: "🎨" },
      { categoria_id: "AVC0004", nombre_categoria: "Ojos", id_api: "eyes", orden: 4, emoji: "👁️" },
      { categoria_id: "AVC0005", nombre_categoria: "Cejas", id_api: "eyebrows", orden: 5, emoji: "🤨" },
      { categoria_id: "AVC0006", nombre_categoria: "Boca", id_api: "mouth", orden: 6, emoji: "😊" },
      { categoria_id: "AVC0007", nombre_categoria: "Gafas", id_api: "glasses", orden: 7, emoji: "🤓" },
      { categoria_id: "AVC0008", nombre_categoria: "Pendientes", id_api: "earrings", orden: 8, emoji: "✨" },
      { categoria_id: "AVC0009", nombre_categoria: "Extras", id_api: "features", orden: 9, emoji: "⚡" },
      { categoria_id: "AVC0010", nombre_categoria: "Fondo", id_api: "backgroundColor", orden: 10, emoji: "🌈" }
    ]);

    // Definir opciones para cada categoría
    const avatarOptions = {
      AVC0001: [
        '9e5622', '763900', 'ecad80', 'fdbcb4', 'edb98a', 'd08b5b', 'ae5d29',
        '614335', 'f8d25c', 'ffcc88', 'f4a460', 'daa520', 'cd853f', 'f5deb3',
        'deb887', 'a0522d', '8b4513', '654321'
      ],
      AVC0002: [
        'none', 'long01', 'long02', 'long03', 'long04', 'long05', 'long06',
        'long07', 'long08', 'long09', 'long10', 'long11', 'long12', 'long13',
        'long14', 'long15', 'long16', 'long17', 'long18', 'long19', 'long20',
        'long21', 'long22', 'long23', 'long24', 'long25', 'short01', 'short02',
        'short03', 'short04', 'short05', 'short06', 'short07', 'short08',
        'short09', 'short10', 'short11', 'short12', 'short13', 'short14',
        'short15', 'short16', 'short17', 'short18', 'short19'
      ],
      AVC0003: [
        '0e0e0e', '3eac2c', '6a4e35', '0a0310', '2c1b18', '5c2317', '6a4c93',
        '9a031e', 'a4161a', 'ba181b', 'e5383b', 'f48c06', 'f77f00', 'fcbf49',
        'f8d25c', 'ffdd44', 'a0522d', '654321', 'daa520', 'ff4500', '2f4f4f',
        '800080'
      ],
      AVC0004: [
        'variant01', 'variant02', 'variant03', 'variant04', 'variant05',
        'variant06', 'variant07', 'variant08', 'variant09', 'variant10',
        'variant11', 'variant12', 'variant13', 'variant14', 'variant15',
        'variant16', 'variant17', 'variant18', 'variant19', 'variant20',
        'variant21', 'variant22', 'variant23', 'variant24', 'variant25', 'variant26'
      ],
      AVC0005: [
        'variant01', 'variant02', 'variant03', 'variant04', 'variant05',
        'variant06', 'variant07', 'variant08', 'variant09', 'variant10',
        'variant11', 'variant12', 'variant13', 'variant14', 'variant15'
      ],
      AVC0006: [
        'variant01', 'variant02', 'variant03', 'variant04', 'variant05',
        'variant06', 'variant07', 'variant08', 'variant09', 'variant10',
        'variant11', 'variant12', 'variant13', 'variant14', 'variant15',
        'variant16', 'variant17', 'variant18', 'variant19', 'variant20',
        'variant21', 'variant22', 'variant23', 'variant24', 'variant25',
        'variant26', 'variant27', 'variant28', 'variant29', 'variant30'
      ],
      AVC0007: [
        'none', 'variant01', 'variant02', 'variant03', 'variant04', 'variant05'
      ],
      AVC0008: [
        'none', 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06'
      ],
      AVC0009: [
        'none', 'birthmark', 'blush', 'freckles'
      ],
      AVC0010: [
        'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf',
        'ff6b6b', '4ecdc4', '45b7d1', '96ceb4', 'ffeaa7',
        'dda0dd', 'f1f5f9', 'e2e8f0', 'cbd5e1', '94a3b8',
        '64748b', '475569', '334155', '1e293b', '0f172a',
        'transparent'
      ]
    };

    // Costos base para las opciones
    const baseCosts = {
      AVC0001: 10,
      AVC0002: 20,
      AVC0003: 15,
      AVC0004: 10,
      AVC0005: 5,
      AVC0006: 5,
      AVC0007: 30,
      AVC0008: 25,
      AVC0009: 15,
      AVC0010: 10
    };

    // Opciones por defecto (para nuevos usuarios)
    const defaultOptions = {
      AVC0001: '9e5622',
      AVC0002: 'short01',
      AVC0003: '0e0e0e',
      AVC0004: 'variant01',
      AVC0005: 'variant01',
      AVC0006: 'variant02',
      AVC0007: 'none',
      AVC0008: 'none',
      AVC0009: 'none',
      AVC0010: 'b6e3f4'
    };

    let optionCounter = 1;

    // Insertar todas las opciones de avatar
    for (const [categoriaId, options] of Object.entries(avatarOptions)) {
      for (const valor of options) {
        const isDefault = defaultOptions[categoriaId as keyof typeof defaultOptions] === valor;

        const opcionId = `AVO${optionCounter.toString().padStart(4, '0')}`;
        optionCounter++;

        await db.insert(schema.avatar_opcion).values({
          opcion_id: opcionId,
          categoria_id: categoriaId,
          valor: valor,
          costo: baseCosts[categoriaId as keyof typeof baseCosts]
        });
      }
    }

    console.log("Base de datos sembrada exitosamente");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
    throw new Error("Error al generar la base de datos");
  }
}

main();