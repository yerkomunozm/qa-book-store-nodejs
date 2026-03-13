# Reporte de Hallazgos

## 1. Ruta hardcodeada para cargar variables de entorno

**Descripción**  
El servidor carga variables de entorno desde una ruta absoluta fija: `/opt/nil1729/book-store-app/backend.env`. Esto hace que la aplicación dependa de una estructura de filesystem específica del autor original.

**Pasos para reproducir**

1. Clonar el repositorio en una máquina o contenedor distinto al entorno original.
2. Crear un archivo `.env` válido en la raíz del proyecto.
3. Ejecutar la aplicación con `node server` o `npm run dev`.

**Resultado esperado**  
La aplicación debería tomar configuración desde variables de entorno estándar del proceso o desde un `.env` local configurable.

**Resultado observado**  
El arranque depende de una ruta absoluta hardcodeada en [server.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/server.js), lo que puede dejar variables críticas sin cargar fuera de ese entorno.

**Severidad estimada**  
Alta

**Impacto de negocio**  
Puede impedir el arranque correcto en CI, staging o producción, y bloquea tanto validación técnica como despliegues repetibles.

**Sugerencia / siguiente paso**  
Reemplazar la ruta hardcodeada por `dotenv.config()` estándar o permitir un path configurable por variable de entorno.

---

## 2. Fuerte acoplamiento a Stripe y SMTP en flujos de negocio clave

**Descripción**  
Los flujos de registro y orden ejecutan integraciones reales de correo y pago dentro del request cycle. Esto aumenta la fragilidad operativa y dificulta pruebas estables.

**Pasos para reproducir**

1. Levantar la aplicación sin configurar correctamente credenciales de SMTP o Stripe.
2. Intentar registrar un usuario desde `/users/register` o completar una compra vía `/users/order`.

**Resultado esperado**  
El sistema debería degradar de forma controlada, o bien permitir desacoplar esas integraciones en ambientes de testing.

**Resultado observado**  
Los flujos dependen directamente de `NodemailerTransporter.sendMail(...)` y de llamadas reales a Stripe en [routes/users.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/routes/users.js), por lo que errores externos pueden romper escenarios funcionales completos.

**Severidad estimada**  
Media

**Impacto de negocio**  
Reduce la confiabilidad operativa y vuelve más costosa la validación de releases. También dificulta pruebas automatizadas repetibles sobre checkout y registro.

**Sugerencia / siguiente paso**  
Introducir un modo de testing o adapters mockeables para Stripe y SMTP, o aislar esas dependencias detrás de servicios internos.

---

## 3. Baja testabilidad del arranque de la aplicación

**Descripción**  
La app arranca el servidor directamente y no exporta la instancia de Express. Además, la conexión a DB se ejecuta dentro del callback de `listen`. Esto complica pruebas de integración y reduce flexibilidad para automatización.

**Pasos para reproducir**

1. Intentar reutilizar la app desde un runner de tests para levantarla programáticamente.
2. Intentar ejecutar pruebas de integración aisladas sin abrir un puerto real.

**Resultado esperado**  
La aplicación debería separar creación de la app, arranque HTTP y conexión a DB para permitir composición y testabilidad.

**Resultado observado**  
En [server.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/server.js), el proceso crea la app y llama a `app.listen(...)` directamente, sin exportar `app`. Esto obliga a probar contra un proceso completo y hace más difícil controlar setup/teardown.

**Severidad estimada**  
Media

**Impacto de negocio**  
Incrementa el costo de automatización, complica CI y reduce la velocidad para detectar regresiones con pruebas más finas.

**Sugerencia / siguiente paso**  
Separar `app` de `server`: exportar la instancia Express y mover `listen()` a un entrypoint del runtime.

---

## 4. Uso de `res.redirect('back')` en flujos protegidos y de error

**Descripción**  
Varias rutas y middlewares dependen de `res.redirect('back')` como mecanismo de recuperación o denegación. Ese comportamiento depende del navegador y del header `Referer`, por lo que puede ser inconsistente.

**Pasos para reproducir**

1. Acceder directamente a flujos protegidos o provocar una condición de error sin navegación previa clara.
2. Ejecutar la misma acción desde distintos navegadores o desde un contexto automatizado.

**Resultado esperado**  
Las rutas deberían redirigir a destinos explícitos y estables, por ejemplo `/users/login`, `/books` o `/admin`.

**Resultado observado**  
Hay varios usos de `res.redirect('back')` en [routes/users.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/routes/users.js), [routes/comments.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/routes/comments.js) y [middleware/checkAuthorization.js](/Users/yerkomunoz/Test-personal/Passline/book-store-nodejs/middleware/checkAuthorization.js). Esto puede producir navegación ambigua o difícil de automatizar.

**Severidad estimada**  
Media

**Impacto de negocio**  
Puede generar experiencias inconsistentes para el usuario y falsos negativos o inestabilidad en suites automatizadas.

**Sugerencia / siguiente paso**  
Reemplazar redirects implícitos por destinos explícitos según el caso de uso y el rol del usuario.

---

## 5. Flujos autenticados automatizados dependen de credenciales/datos válidos no garantizados

**Descripción**  
La ejecución real de la suite mostró que los tests autenticados (`smoke` y `e2e`) no logran salir de `/users/login`. Los checks HTTP públicos pasan, pero los flujos que requieren sesión fallan porque el login no se concreta con las credenciales provistas al entorno de pruebas.

**Pasos para reproducir**

1. Configurar `PLAYWRIGHT_BASE_URL` y variables `QA_ADMIN_*` / `QA_CUSTOMER_*`.
2. Levantar la aplicación.
3. Ejecutar:

```bash
npm run test
```

**Resultado esperado**  
Los tests autenticados deberían iniciar sesión correctamente y continuar hacia `/books`, `/users/dashboard` o `/admin`, según el flujo.

**Resultado observado**  
La corrida reportada muestra:

- `4 passed`
- `3 failed`

Fallan:

- `tests/e2e/admin-create-book.spec.ts`
- `tests/smoke/smoke.spec.ts` en login customer
- `tests/smoke/smoke.spec.ts` en acceso admin autenticado

En todos los casos, Playwright espera navegación a `/books`, pero la URL observada permanece en `/users/login`, lo que indica que la autenticación no se completa.

**Severidad estimada**  
Media

**Impacto de negocio**  
Reduce la reproducibilidad del framework de QA y la confianza de release en ambientes nuevos o review environments. También indica que la suite depende de precondiciones externas no garantizadas, como usuarios seed válidos o credenciales sincronizadas con la base de datos activa.

**Sugerencia / siguiente paso**  
Documentar explícitamente el requisito de usuarios QA preexistentes y validar al inicio de la ejecución que las credenciales configuradas correspondan a cuentas reales del ambiente. Como mejora posterior, agregar una estrategia mínima de seed controlado o una verificación previa de autenticación para fallar con un mensaje más claro.
