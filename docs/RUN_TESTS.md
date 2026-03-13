# Ejecutar Tests

## 1. Instalar dependencias

```bash
npm install
```

## 2. Instalar browsers de Playwright

```bash
npm run test:qa:install
```

## 3. Configurar variables de entorno

Definir las variables necesarias para ejecutar los tests:

```bash
export PLAYWRIGHT_BASE_URL=http://127.0.0.1:5050
export QA_ADMIN_EMAIL=admin@example.com
export QA_ADMIN_PASSWORD=secret123
export QA_CUSTOMER_EMAIL=customer@example.com
export QA_CUSTOMER_PASSWORD=secret123
```

## 4. Levantar la aplicación

Los tests asumen que la app ya está corriendo y accesible en `PLAYWRIGHT_BASE_URL`.

Ejemplo:

```bash
npm run dev
```

## 5. Ejecutar todos los tests

```bash
npm run test
```

## 6. Ejecutar solo API tests

```bash
npm run test:api
```

## 7. Ejecutar solo E2E tests

```bash
npm run test:e2e
```

## 8. Ejecutar solo smoke tests

```bash
npm run test:smoke
```

## 9. Abrir el HTML report

```bash
npm run test:qa:report
```

## Notas

- La suite usa Playwright para API, E2E y smoke.
- Los tests no levantan la app automáticamente.
- Para una validación rápida post-deploy, correr primero `npm run test:smoke`.
