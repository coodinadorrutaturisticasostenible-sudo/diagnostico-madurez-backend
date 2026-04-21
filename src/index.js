const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND activo = true', [email]);
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    const token = jwt.sign({ id: user.id, rol: user.rol, org_id: user.org_id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, rol: user.rol, org_id: user.org_id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// MI DIAGNÓSTICO
app.get('/api/diagnostico/mio', authMiddleware, async (req, res) => {
  try {
    const { org_id } = req.user;
    const org = await pool.query('SELECT * FROM organizaciones WHERE id = $1', [org_id]);
    const diag = await pool.query('SELECT * FROM diagnostico WHERE org_id = $1', [org_id]);
    res.json({ organizacion: org.rows[0], diagnostico: diag.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ADMIN: todas las organizaciones
app.get('/api/admin/organizaciones', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Sin permisos' });
    const result = await pool.query(`
      SELECT o.*, d.* FROM organizaciones o
      JOIN diagnostico d ON d.org_id = o.id
      ORDER BY o.municipio, o.nombre
    `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ADMIN: gestión de usuarios
app.get('/api/admin/usuarios', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Sin permisos' });
    const result = await pool.query(`
      SELECT u.id, u.email, u.rol, u.activo, o.nombre as org_nombre, o.municipio
      FROM usuarios u LEFT JOIN organizaciones o ON o.id = u.org_id
      ORDER BY u.rol, o.municipio, o.nombre
    `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/admin/usuarios/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') return res.status(403).json({ error: 'Sin permisos' });
    const { activo, password } = req.body;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await pool.query('UPDATE usuarios SET password_hash = $1 WHERE id = $2', [hash, req.params.id]);
    }
    if (activo !== undefined) {
      await pool.query('UPDATE usuarios SET activo = $1 WHERE id = $2', [activo, req.params.id]);
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor corriendo en puerto ' + (process.env.PORT || 3000)));
