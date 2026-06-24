'use strict';

require('dotenv').config();

const express = require('express');
const mysql   = require('mysql2/promise');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Template engine ────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Static assets (inline CSS/JS in EJS keeps dependencies at zero) ────────
app.use(express.static(path.join(__dirname, 'public')));

// ── MySQL connection pool ───────────────────────────────────────────────────
const pool = mysql.createPool({
  host:               process.env.DB_HOST     || '127.0.0.1',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'portfolio_user',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'portfolio_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// ── Routes ──────────────────────────────────────────────────────────────────

// Portfolio home — queries projects from the database
app.get('/', async (req, res) => {
  try {
    const [projects] = await pool.query(
      'SELECT id, title, description, tech_stack, live_url FROM projects ORDER BY id ASC'
    );
    res.render('index', { projects });
  } catch (err) {
    console.error('DB query error:', err.message);
    res.status(500).send('Database error — check your connection settings.');
  }
});

// Health check — useful for EC2 load-balancer pings
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unreachable' });
  }
});

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
  console.log(`Database host: ${process.env.DB_HOST || '127.0.0.1'}`);
});
