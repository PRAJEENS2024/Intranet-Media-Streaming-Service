@echo off
REM Database migration runner for Windows
REM Usage: run_migrations.bat

setlocal enabledelayedexpansion

set DB_USER=%DB_USER%postgres%
set DB_PASSWORD=%DB_PASSWORD%password%
set DB_HOST=%DB_HOST%localhost%
set DB_PORT=%DB_PORT%5432%
set DB_NAME=%DB_NAME%imss_db%

REM Set PGPASSWORD for authentication
set PGPASSWORD=%DB_PASSWORD%

echo Running migrations...

for %%F in (migrations\*.sql) do (
  echo Running %%F...
  psql -h %DB_HOST% -U %DB_USER% -d %DB_NAME% -f "%%F"
  if errorlevel 1 (
    echo Migration failed: %%F
    exit /b 1
  )
  echo Completed: %%F
)

echo All migrations completed!
