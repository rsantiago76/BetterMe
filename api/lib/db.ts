/**
 * Database connection utility for Vercel Serverless Functions
 * 
 * This example uses Neon (serverless Postgres) but can be adapted for:
 * - Supabase
 * - PlanetScale
 * - Railway
 * - Any Postgres-compatible database
 */

import { Pool } from 'pg';

// Singleton pattern for connection pooling
let pool: Pool | null = null;

export function getDatabase() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 1, // Vercel functions are stateless - use 1 connection per function
    });
  }
  return pool;
}

/**
 * Execute a database query
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const db = getDatabase();
  const result = await db.query(text, params);
  return result.rows;
}

/**
 * Execute a query and return a single row
 */
export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] || null;
}

/**
 * Close database connection (for cleanup)
 */
export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
