# Pruebas API / HTTP

## Endpoints dentro de la cobertura

### `GET /books`

**Qué valida**

- que el catálogo principal responde correctamente
- que la ruta pública más importante del front está disponible
- que la aplicación entrega HTML válido en el punto de entrada comercial

**Por qué fue elegido**

- Es la ruta pública principal del negocio.
- Si esta ruta falla, la aplicación queda esencialmente caída para el usuario final.

**Riesgo que cubre**

- caída general de la app
- errores de routing
- fallas de render del catálogo
- problemas básicos de disponibilidad post-deploy

---

### `POST /users/login` con credenciales inválidas

**Qué valida**

- que el sistema no autentica usuarios con credenciales incorrectas
- que el flujo de login mantiene la protección esperada
- que, después del intento fallido, el usuario sigue sin acceso a rutas protegidas

**Por qué fue elegido**

- El login es un flujo troncal del sistema.
- Un error aquí impacta seguridad y acceso a casi todas las funcionalidades del customer panel y admin panel.

**Riesgo que cubre**

- autenticación incorrecta
- sesiones creadas indebidamente

---

### `GET /admin` sin sesión o sin permisos

**Qué valida**

- que el panel administrativo no sea accesible para usuarios anónimos
- que la ruta esté protegida por autenticación y autorización

**Por qué fue elegido**

- El panel admin es el punto más sensible del sistema desde la perspectiva de control de acceso.
- Es una validación pequeña, rápida y de alto valor para negocio y seguridad.

**Riesgo que cubre**

- exposición accidental del panel admin
- fallas en middleware de autorización
- regresiones severas en control de roles

