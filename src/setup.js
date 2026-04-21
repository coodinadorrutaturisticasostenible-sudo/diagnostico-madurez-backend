const pool = require('./db');

async function setup() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS organizaciones (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      municipio TEXT NOT NULL,
      alcance TEXT,
      tiempo_existencia TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS diagnostico (
      id SERIAL PRIMARY KEY,
      org_id INTEGER REFERENCES organizaciones(id),
      v1_1 NUMERIC, v1_2 NUMERIC, v1_3 NUMERIC, v1_4 NUMERIC, v1_5 NUMERIC, v1_6 NUMERIC,
      v2_1 NUMERIC, v2_2 NUMERIC, v2_3 NUMERIC, v2_4 NUMERIC, v2_5 NUMERIC,
      v3_1 NUMERIC, v3_2 NUMERIC, v3_3 NUMERIC,
      v4_1 NUMERIC, v4_2 NUMERIC, v4_3 NUMERIC, v4_4 NUMERIC, v4_5 NUMERIC,
      v5_1 NUMERIC, v5_2 NUMERIC, v5_3 NUMERIC, v5_4 NUMERIC, v5_5 NUMERIC,
      v6_1 NUMERIC, v6_2 NUMERIC, v6_3 NUMERIC, v6_4 NUMERIC,
      v7_1 NUMERIC, v7_2 NUMERIC, v7_3 NUMERIC
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      rol TEXT NOT NULL DEFAULT 'org',
      activo BOOLEAN DEFAULT true,
      org_id INTEGER REFERENCES organizaciones(id)
    )
  `);

  console.log('Tablas creadas correctamente');
  process.exit(0);
}

setup().catch(e => { console.error(e); process.exit(1); });
