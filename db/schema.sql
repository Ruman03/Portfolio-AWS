-- ============================================================
-- Portfolio Database Schema + Seed Data
-- Run manually:  mysql -u root -p < db/schema.sql
-- Or run automatically:  node db/init.js
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Create dedicated app user (skip if already exists)
-- Adjust credentials to match your .env file.
-- CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password_here';
-- GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
-- FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS projects (
  id          INT          NOT NULL AUTO_INCREMENT,
  title       VARCHAR(120) NOT NULL,
  description TEXT         NOT NULL,
  tech_stack  VARCHAR(255) NOT NULL,
  live_url    VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Clear existing rows before re-seeding
TRUNCATE TABLE projects;

INSERT INTO projects (title, description, tech_stack, live_url) VALUES
(
  'CloudVault – Secure File Storage Platform',
  'A full-stack cloud storage application that lets users upload, organise, and share files with end-to-end encryption. Features include role-based access control, real-time upload progress, and presigned S3 URLs for secure delivery.',
  'Node.js · Express · React · AWS S3 · PostgreSQL · Redis',
  'https://github.com'
),
(
  'InfraPulse – Cloud Infrastructure Monitor',
  'A real-time dashboard that aggregates metrics from AWS CloudWatch, visualises CPU, memory, and network throughput across multiple EC2 instances, and fires SNS alerts when thresholds are breached.',
  'Python · FastAPI · React · AWS CloudWatch · SNS · DynamoDB',
  'https://github.com'
),
(
  'ThreadSync – Real-time Chat Application',
  'A scalable messaging platform supporting public channels and private DMs. Messages are delivered via WebSockets with sub-100ms latency. Horizontal scaling is handled through a Redis pub/sub message broker.',
  'Node.js · Socket.io · Vue.js · MySQL · Redis · Docker',
  'https://github.com'
),
(
  'DataFlow – ML Training Pipeline',
  'An automated end-to-end MLOps pipeline that ingests raw CSV data from S3, performs feature engineering with Pandas, trains scikit-learn models on SageMaker, and exposes predictions through a versioned REST API.',
  'Python · AWS SageMaker · S3 · Lambda · scikit-learn · Flask',
  'https://github.com'
);
