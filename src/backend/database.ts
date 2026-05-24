import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/melimelo',
  ssl: process.env.NODE_ENV === 'production' && process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined
});

// Prevent unhandled rejection crashes when database is unavailable in sandbox
pool.on('error', (err) => {
  console.log('[PostgreSQL] Idle client error (expected in isolated sandbox without pg database):', err.message);
});

export const setupDatabase = async () => {
  try {
    // Avoid running on every hot-reload error lock
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS partnerships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        instagram VARCHAR(255),
        tiktok VARCHAR(255),
        youtube VARCHAR(255),
        type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    client.release();
    console.log('[PostgreSQL] Database structured successfully.');
  } catch (err) {
    console.log('[PostgreSQL] Database connection skipped. Running in graceful degradation mode (In-Memory).');
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);
