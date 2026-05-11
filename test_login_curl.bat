@echo off
echo.
echo ========================================
echo PRUEBA DE LOGIN API
echo ========================================
echo.

echo 1. Verificando que el backend esta corriendo...
curl -s -w "Status: %%{http_code}\n" http://localhost:8000/health
echo.

echo 2. Intentando login...
curl -s -X POST http://localhost:8000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"demo@example.com\",\"password\":\"DemoPassword123!\"}" | powershell -Command "ConvertFrom-Json | ConvertTo-Json -Depth 3"

echo.
echo ========================================
