import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Declarar la variable global para el cache de la conexión
declare global {
  var __drizzle: ReturnType<typeof drizzle> | undefined;
}

// Función para crear la conexión
function createDrizzleConnection() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

// Implementación del patrón Singleton
export const db = (() => {
  // En desarrollo, usar globalThis para evitar reconexiones en hot reload
  if (process.env.NODE_ENV === 'development') {
    if (!globalThis.__drizzle) {
      globalThis.__drizzle = createDrizzleConnection();
    }
    return globalThis.__drizzle;
  }
  
  // En producción, crear nueva instancia
  return createDrizzleConnection();
})();