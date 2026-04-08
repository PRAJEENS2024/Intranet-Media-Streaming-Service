# Database Setup Guide

## PostgreSQL Installation

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer and remember the superuser password
3. Ensure PostgreSQL service is running

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Database Creation

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE imss_db;

# Create user
CREATE USER imss_user WITH PASSWORD 'secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE imss_db TO imss_user;

# Exit
\q
```

## Running Migrations

### Linux/macOS
```bash
cd backend/migrations
bash run_migrations.sh
```

### Windows
```bash
cd backend\migrations
run_migrations.bat
```

Or manually:
```bash
psql -h localhost -U postgres -d imss_db -f migrations/001_initial_schema.sql
psql -h localhost -U postgres -d imss_db -f migrations/002_seed_categories.sql
```

## Verify Setup

```bash
psql -h localhost -U postgres -d imss_db

# Check tables
\dt

# Check data
SELECT * FROM categories;
```
