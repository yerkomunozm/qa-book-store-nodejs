# Entrega Técnica QA Automation Engineer

## Repositorio

- Link del repositorio: `https://github.com/yerkomunozm/qa-book-store-nodejs`

## Stack / Herramientas Elegidas

- Playwright
- TypeScript
- Playwright Request Context para checks HTTP/API-style
- Playwright HTML Reporter
- Node.js / scripts npm para ejecución
- Documentación en Markdown para estrategia, alcance y hallazgos

## Setup y Ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Instalar browsers de Playwright:

```bash
npm run test:qa:install
```

3. Configurar variables de entorno:

```bash
export PLAYWRIGHT_BASE_URL=http://127.0.0.1:5050
export QA_ADMIN_EMAIL=admin@example.com
export QA_ADMIN_PASSWORD=secret123
export QA_CUSTOMER_EMAIL=customer@example.com
export QA_CUSTOMER_PASSWORD=secret123
```

4. Levantar la aplicación:

```bash
npm run dev
```

5. Ejecutar tests:

```bash
npm run test
npm run test:api
npm run test:e2e
npm run test:smoke
```

6. Abrir el HTML report:

```bash
npm run test:qa:report
```

## Resumen de Decisiones Principales

Se construyó un MVP de automatización QA mínimo, enfocado en release confidence en lugar de cobertura amplia.  
Usé Playwright como herramienta única para smoke, E2E y checks HTTP-level para mantener la solución pequeña y fácil de revisar.  
La estrategia de testing prioriza riesgo de negocio core: disponibilidad de la aplicación, autenticación, protección por rol, disponibilidad del storefront y operatividad básica del panel admin.  
Para la cobertura API, validé comportamiento HTTP real sobre rutas web en lugar de asumir una API REST que no existe en este proyecto.  
Para E2E, elegí un flujo admin de alto valor: crear un libro y verificar que quede visible.  
Para smoke, mantuve solo checks rápidos que responden si el sistema quedó sano después de un deploy.  
Documenté alcance, riesgos, exclusiones y pasos de ejecución para que el reviewer pueda entender rápido tanto la implementación como el criterio QA detrás de la entrega.

## Priorización

- Checks rápidos de la versión actual.
- Flujos de negocio de alto valor, por encima de cobertura alta.
- Autenticación y control de acceso.
- Complejidad mínima del framework y mantenibilidad
- Documentación del criterio QA, riesgos y decisiones de alcance

## Qué Haría Después con Más Tiempo

- Agregar un flujo E2E de customer para catálogo → detalle → carrito.
- Agregar cobertura positiva de login API/HTTP y assertions de sesión más robustos.
- Agregar la limpieza de datos de prueba.
- Agregar ejecución en pipeline de CI con smoke como primer paso luego del deploy.
- Tener un mock las integraciones de Stripe y correo para automatizar mejor.

## Dónde Revisar Resultados / Evidencia

- Estrategia de testing: [docs/TEST_STRATEGY.md](qa-book-store-nodejs/docs/TEST_STRATEGY.md)
- Alcance API/HTTP: [docs/API_TESTS.md](qa-book-store-nodejs/docs/API_TESTS.md)
- Alcance E2E: [docs/E2E_TESTS.md](qa-book-store-nodejs/docs/E2E_TESTS.md)
- Alcance smoke: [docs/SMOKE_TESTS.md](qa-book-store-nodejs/docs/SMOKE_TESTS.md)
- Riesgos / hallazgos: [docs/BUG_REPORT.md](qa-book-store-nodejs/docs/BUG_REPORT.md)
- Guía de ejecución: [docs/RUN_TESTS.md](qa-book-store-nodejs/docs/RUN_TESTS.md)
- HTML report de ejecución: generado con `npm run test:qa:report`
