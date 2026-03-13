# Reporte de Hallazgos

## 1. Falla de autenticación en E2E: admin no puede crear un libro

**Descripción**  
El test E2E `admin-create-book.spec.ts` falla antes de llegar al flujo de creación de libros. La autenticación como admin no se completa y la aplicación permanece en la página de login.

**Pasos para reproducir**

1. Levantar la aplicación con la base de datos configurada.
2. Definir `PLAYWRIGHT_BASE_URL`, `QA_ADMIN_EMAIL` y `QA_ADMIN_PASSWORD`.
3. Ejecutar:

```bash
npm run test
```

4. Revisar el resultado del test:

```text
tests/e2e/admin-create-book.spec.ts
```

**Resultado esperado**  
El admin debería autenticarse correctamente, navegar a `/books` y continuar con el flujo de creación del libro.

**Resultado observado**  
Según `playwright-report/index.html`, el test falla en `tests/support/auth.ts` al esperar:

```text
expect(page).toHaveURL(/\/books$/)
```

La URL observada permanece en:

```text
http://127.0.0.1:5050/users/login
```

**Severidad estimada**  
Media

**Impacto de negocio**  
Impide validar el flujo administrativo más importante automatizado en la suite y reduce la confianza sobre la operación del catálogo en un ambiente nuevo.

**Sugerencia / siguiente paso**  
Verificar que las credenciales `QA_ADMIN_*` correspondan a un usuario admin real en la base de datos del ambiente bajo prueba.

---

## 2. Falla de autenticación en smoke: customer no llega al dashboard

**Descripción**  
El smoke test de login customer no logra completar la autenticación. El sistema no redirige al usuario autenticado hacia `/books`, por lo que el check de dashboard falla.

**Pasos para reproducir**

1. Levantar la aplicación con la base de datos configurada.
2. Definir `PLAYWRIGHT_BASE_URL`, `QA_CUSTOMER_EMAIL` y `QA_CUSTOMER_PASSWORD`.
3. Ejecutar:

```bash
npm run test:smoke
```

4. Revisar el resultado del test:

```text
tests/smoke/smoke.spec.ts
```

**Resultado esperado**  
El customer debería autenticarse, ser redirigido a `/books` y luego acceder correctamente a `/users/dashboard`.

**Resultado observado**  
Según `playwright-report/index.html`, el test falla en `tests/support/auth.ts` al esperar:

```text
expect(page).toHaveURL(/\/books$/)
```

La URL observada permanece en:

```text
http://127.0.0.1:5050/users/login
```

El caso afectado en el reporte es:

```text
customer login works and dashboard is reachable @smoke
```

**Severidad estimada**  
Media

**Impacto de negocio**  
La smoke suite deja de responder confiablemente si el sistema quedó sano después de un deploy, porque uno de sus checks troncales depende de un login que no está funcionando en el ambiente probado.

**Sugerencia / siguiente paso**  
Validar que las credenciales `QA_CUSTOMER_*` estén sincronizadas con un usuario customer existente y activo en el ambiente.

---

## 3. Falla de autenticación en smoke: admin no llega al panel administrativo

**Descripción**  
El smoke test que valida la respuesta del panel admin falla porque la autenticación previa no se completa. El flujo no sale de `/users/login`, por lo que nunca llega a `/admin`.

**Pasos para reproducir**

1. Levantar la aplicación con la base de datos configurada.
2. Definir `PLAYWRIGHT_BASE_URL`, `QA_ADMIN_EMAIL` y `QA_ADMIN_PASSWORD`.
3. Ejecutar:

```bash
npm run test:smoke
```

4. Revisar el resultado del test:

```text
tests/smoke/smoke.spec.ts
```

**Resultado esperado**  
El admin debería autenticarse correctamente y acceder al panel administrativo en `/admin`.

**Resultado observado**  
Según `playwright-report/index.html`, el test falla en `tests/support/auth.ts` al esperar:

```text
expect(page).toHaveURL(/\/books$/)
```

La URL observada permanece en:

```text
http://127.0.0.1:5050/users/login
```

El caso afectado en el reporte es:

```text
admin panel responds for an authenticated admin @smoke
```

**Severidad estimada**  
Media

**Impacto de negocio**  
Reduce el valor del smoke suite como gate post-deploy, porque uno de los checks principales del rol admin no es ejecutable con las precondiciones actuales del ambiente.

**Sugerencia / siguiente paso**  
Confirmar que el usuario configurado en `QA_ADMIN_*` tenga rol `admin` en la base de datos y que el ambiente bajo prueba use esa misma fuente de datos.
