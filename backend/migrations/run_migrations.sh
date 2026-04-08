#!/bin/bash

# Database migration runner
# Usage: ./run_migrations.sh

DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-password}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-imss_db}

# Set environment
export PGPASSWORD=$DB_PASSWORD

# Run migrations
echo "Running migrations..."

for migration in migrations/*.sql; do
  echo "Running $migration..."
  psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f "$migration"
  if [ $? -eq 0 ]; then
    echo "✅ $migration completed"
  else
    echo "❌ $migration failed"
    exit 1
  fi
done

echo "✅ All migrations completed!"
