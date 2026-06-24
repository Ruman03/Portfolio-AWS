# Portfolio — Cloud Computing Assignment

A monolithic full-stack portfolio website demonstrating live MySQL database
connectivity on a single AWS EC2 instance inside a custom VPC.

## Tech stack

| Layer    | Technology                |
|----------|---------------------------|
| Runtime  | Node.js 18+               |
| Server   | Express 4                 |
| Templates| EJS                       |
| Database | MySQL 8 / mysql2 package  |
| Config   | dotenv                    |

## Project structure

```
portfolio/
├── server.js          # Express entry point + MySQL pool + routes
├── package.json
├── .env.example       # Copy to .env and fill in credentials
├── .gitignore
├── CLAUDE.md          # This file
├── db/
│   ├── schema.sql     # CREATE DATABASE / TABLE + seed data
│   └── init.js        # Node script that executes schema.sql
└── views/
    └── index.ejs      # Single-page portfolio (HTML + CSS + EJS)
```

## Quick-start on EC2 (Ubuntu 22.04)

### 1. Install dependencies

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 18 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# MySQL Server
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Set up MySQL user and run schema

```bash
# Enter the MySQL root shell
sudo mysql

# Inside MySQL:
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Then seed the database from the command line:

```bash
cd ~/portfolio
node db/init.js          # Creates DB, table, and 4 seed projects
# OR run the raw SQL directly:
# mysql -u root -p < db/schema.sql
```

### 3. Configure environment

```bash
cp .env.example .env
nano .env
```

Minimum required values:

```
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=portfolio_user
DB_PASSWORD=StrongPassword123!
DB_NAME=portfolio_db
```

### 4. Install npm packages and start

```bash
npm install
npm start
# Server listens on http://localhost:3000
```

### 5. Open port 3000 on the EC2 Security Group

In the AWS Console → EC2 → Security Groups → Inbound rules:

| Type        | Port | Source    |
|-------------|------|-----------|
| Custom TCP  | 3000 | 0.0.0.0/0 |

Then visit **http://\<EC2-Public-IP\>:3000** in your browser.

---

## Useful commands

| Task                         | Command                          |
|------------------------------|----------------------------------|
| Start server                 | `npm start`                      |
| Re-seed database             | `node db/init.js`                |
| Manual SQL seed              | `mysql -u root -p < db/schema.sql` |
| Health check                 | `curl http://localhost:3000/health` |
| Check MySQL is running       | `sudo systemctl status mysql`    |
| View MySQL tables            | `mysql -u portfolio_user -p portfolio_db -e "SELECT * FROM projects;"` |

---

## How grading requirement is met

The `/` route in `server.js` calls `pool.query(...)` against the local MySQL
process before rendering the page. The EJS template loops over the returned
rows and renders each project card live. The green badge on the page shows
how many rows were fetched, proving live database connectivity.
