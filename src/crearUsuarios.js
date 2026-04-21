const pool = require('./db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function crearUsuarios() {
  // Admin
  const adminHash = await bcrypt.hash('admin2025', 10);
  await pool.query(
    'INSERT INTO usuarios (email, password_hash, rol, org_id) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO NOTHING',
    ['admin@diagnostico.com', adminHash, 'admin', null]
  );
  console.log('Admin creado: admin@diagnostico.com / admin2025');

  // Orgs
  const orgs = await pool.query('SELECT id, nombre FROM organizaciones ORDER BY id');
  for (const org of orgs.rows) {
    const email = 'org' + org.id + '@diagnostico.com';
    const password = 'org' + org.id + '2025';
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (email, password_hash, rol, org_id) VALUES ($1,$2,$3,$4) ON CONFLICT (email) DO NOTHING',
      [email, hash, 'org', org.id]
    );
    console.log(email + ' / ' + password + ' -> ' + org.nombre.slice(0,50));
  }
  console.log('Usuarios creados correctamente');
  process.exit(0);
}

crearUsuarios().catch(e => { console.error(e); process.exit(1); });
