-- Portfolio Database Schema + Seed Data
-- Run manually: mysql -u root -p < db/schema.sql
-- Or run automatically: node db/init.js

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS projects (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  tech_stack VARCHAR(255) NOT NULL,
  live_url VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE projects;

INSERT INTO projects (title, description, tech_stack, live_url) VALUES
('Northstar — Infrastructure Monitor','A real-time operations dashboard that collects EC2 and application metrics, highlights anomalies, and sends targeted alerts before small issues become outages.','Node.js · AWS CloudWatch · SNS · MySQL · WebSockets','https://github.com'),
('Parcel — Secure Object Storage','A cloud file platform with presigned uploads, role-based access, audit trails, and lifecycle policies designed for safe, cost-aware storage on Amazon S3.','Express · AWS S3 · IAM · Redis · Docker','https://github.com'),
('Relay — Event Delivery Service','A resilient webhook delivery engine with signed requests, exponential retries, delivery history, and dead-letter handling for unreliable downstream systems.','Node.js · SQS · Lambda · PostgreSQL · REST','https://github.com'),
('Atlas — Deployment Control Plane','A lightweight deployment dashboard for managing releases across environments, tracking health checks, and rolling back services without direct server access.','Express · EC2 · Docker · Nginx · GitHub Actions','https://github.com');
