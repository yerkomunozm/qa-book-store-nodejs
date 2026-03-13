# Framework QA con Playwright

Este repositorio incluye una base mínima de QA con Playwright para la aplicación Express + EJS.

## Variables de entorno requeridas

Defínelas antes de ejecutar las suites:

```bash
export PLAYWRIGHT_BASE_URL=http://127.0.0.1:5050
export QA_ADMIN_EMAIL=admin@example.com
export QA_ADMIN_PASSWORD=secret123
export QA_CUSTOMER_EMAIL=customer@example.com
export QA_CUSTOMER_PASSWORD=secret123
```

`PLAYWRIGHT_BASE_URL` es opcional y por defecto usa `http://127.0.0.1:5050`.

## Estructura de carpetas

- `tests/api`: checks HTTP sobre rutas usando el cliente `request` de Playwright
- `tests/e2e`: journeys de usuario desde navegador
- `tests/smoke`: checks rápidos de confianza sobre páginas core y guards de autenticación
- `tests/support`: helpers compartidos de autenticación y entorno

## Comandos

```bash
npm run test:qa
npm run test:smoke
npm run test:e2e
npm run test:api
npm run test:qa:report
npm run test:qa:install
```

## Tags

Cada suite usa tags de Playwright en el título del test:

- `@smoke`
- `@e2e`
- `@api`

Los scripts de npm filtran por tag usando `--grep`.

## Supuestos

- La aplicación ya está corriendo y es accesible en `PLAYWRIGHT_BASE_URL`.
- Los datos respaldados en Mongo ya existen, incluyendo un usuario admin y un usuario customer.
- La cobertura inicial de QA evita flujos con side effects fuertes, como registro, checkout con Stripe y acciones destructivas de admin.
