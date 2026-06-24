/**
 * Automatic database initialiser.
 * Reads schema.sql and executes it against the configured MySQL server.
 *
 * Usage:  node db/init.js
 * Needs:  a .env file (or env vars) with DB_* values + DB_USER must have
 *         CREATE DATABASE / CREATE TABLE / INSERT privileges.
 */

'use strict';

require('dotenv').config();
const fs   = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const SQL_FILE = path.join(__dirname, 'schema.sql');

async function main() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || '127.0.0.1',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('Connected to MySQL. Running schema.sql …');

  const sql = fs.readFileSync(SQL_FILE, 'utf8');
  await conn.query(sql);

  console.log('Database initialised and seeded successfully.');
  await conn.end();
}

main().catch(err => {
  console.error('DB init failed:', err.message);
  process.exit(1);
});
