'use strict';

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'portfolio_user',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Querying MySQL before rendering proves the live database connection.
app.get('/', async (req, res) => {
  try {
    const [projects] = await pool.query(
      'SELECT id, title, description, tech_stack, live_url FROM projects ORDER BY id ASC'
    );
    res.render('index', { projects });
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).send('Database error — check your connection settings.');
  }
});

// Suitable for direct checks and EC2 load-balancer health checks.
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unreachable' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Hassan Tahir portfolio running on port ${PORT}`);
  console.log(`Database host: ${process.env.DB_HOST || '127.0.0.1'}`);
});
