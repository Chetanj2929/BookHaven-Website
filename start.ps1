#!/usr/bin/env pwsh
<#
.SYNOPSIS
    BookHaven — Start MySQL + Django in one command.

.DESCRIPTION
    Starts the MySQL 8.4 server and the Django development server.
    Run from the "BookHaven website" root directory.

.EXAMPLE
    .\start.ps1
#>

$MYSQL_BIN = "C:\Program Files\MySQL\MySQL Server 8.4\bin"
$MYSQL_DATA = "C:\MySQL\data"
$BACKEND_DIR = "$PSScriptRoot\backend"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  BookHaven — Starting Backend Stack  " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# ── 1. Start MySQL ───────────────────────────────────────────────
$mysqlRunning = Get-Process -Name mysqld -ErrorAction SilentlyContinue
if ($mysqlRunning) {
    Write-Host "[MySQL]  Already running (PID $($mysqlRunning.Id))" -ForegroundColor Green
} else {
    Write-Host "[MySQL]  Starting MySQL 8.4..." -ForegroundColor Yellow
    Start-Process -FilePath "$MYSQL_BIN\mysqld.exe" `
        -ArgumentList "--datadir=`"$MYSQL_DATA`"" `
        -WindowStyle Hidden
    Start-Sleep 4

    # Verify MySQL is up
    $env:Path += ";$MYSQL_BIN"
    $test = & mysql -u bookhaven_user -pBookHaven@2026 bookhaven_db -e "SELECT 1;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[MySQL]  Running on port 3306" -ForegroundColor Green
    } else {
        Write-Host "[MySQL]  WARNING: Could not connect. Check if port 3306 is in use." -ForegroundColor Red
    }
}

Write-Host ""

# ── 2. Start Django ──────────────────────────────────────────────
Write-Host "[Django] Starting Django development server..." -ForegroundColor Yellow

Set-Location $BACKEND_DIR
& ".\venv\Scripts\Activate.ps1"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Django API:  http://127.0.0.1:8000  " -ForegroundColor White
Write-Host "  Admin:       http://127.0.0.1:8000/admin/  " -ForegroundColor White
Write-Host "  DB:          bookhaven_db @ MySQL 8.4  " -ForegroundColor White
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

python manage.py runserver 8000
