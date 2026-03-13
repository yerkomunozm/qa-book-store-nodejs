# Estrategia de Testing

## Módulos principales del sistema

- **Autenticación y sesiones**
  - Registro, login, logout y control de acceso por usuario autenticado.
- **Catálogo de libros**
  - Listado de libros, detalle de producto y navegación principal del storefront.
- **Customer panel**
  - Dashboard, carrito, actualización implícita de cantidades, checkout y consulta de órdenes.
- **Admin panel**
  - Acceso restringido, visibilidad operativa del sistema y gestión de libros.
- **Checkout y órdenes**
  - Confirmación de compra, persistencia de orden y vaciado de carrito.
- **Notificaciones**
  - Correos asociados a registro y compra.

## Flujos críticos de negocio

1. **Usuario puede autenticarse y acceder a su dashboard**
   - Sin este flujo, el cliente no puede usar carrito, checkout ni ver órdenes.

2. **Catálogo carga y permite navegar al detalle del libro**
   - Es la entrada principal del negocio y el punto de inicio de compra.

3. **Cliente agrega un libro al carrito y lo visualiza en su panel**
   - Es el puente entre browsing y conversión.

4. **Admin accede al panel y puede gestionar libros**
   - Es el flujo operativo más importante del rol administrador.

5. **Checkout genera una orden**
   - Es el flujo transaccional de mayor impacto, aunque tiene dependencias externas.

## Riesgos principales

- **Autorización y roles**
  - Riesgo de que rutas protegidas queden expuestas o redirijan incorrectamente.

- **Dependencias externas**
  - Stripe y SMTP pueden introducir fallas no determinísticas, lentitud y side effects reales.

- **Datos compartidos**
  - Operaciones como crear libros, modificar carrito o generar órdenes pueden contaminar el ambiente si no se controla el dataset.

- **App web server-rendered**
  - El sistema depende de formularios, redirects y sesiones, por lo que muchas regresiones se manifiestan en navegación y no en respuestas JSON.

- **Configuración de entorno**
  - Base de datos, credenciales, Stripe y email requieren variables de entorno válidas; cualquier desalineación impacta la estabilidad de pruebas.

## Qué automatizar primero

### 1. Smoke suite post-deploy

Automatizar primero una suite que responda: **“¿sigue sano el sistema?”**

Cobertura recomendada:

- La aplicación responde.
- Página de login carga.
- El catálogo carga.
- EL login de customer funciona.
- El panel de admin responde.

**¿Por qué?**

- Da señal rápida de disponibilidad y salud funcional.
- Cubre rutas críticas con bajo costo de mantenimiento.
- Es apta para CI y validación temprana de deploys.

### 2. Checks sobre rutas web

Automatizar con Playwright, el contexto de la app:

- `GET /books` responde correctamente.
- `POST /users/login` con credenciales inválidas no autentica.
- `GET /admin` está protegido sin sesión.

**Por qué?**

- Valida reglas base de acceso y comportamiento HTTP real del sistema.
- Son pruebas rápidas, estables y útiles para detectar regresiones tempranas.

### 3. E2E de mayor valor de negocio

Automatizar pocos flujos, pero relevantes:

- admin crea un libro y el libro queda visible.
- customer inicia sesión y navega catálogo → detalle → carrito.

**Por qué?**

- Cubren funcionalidad visible para negocio.
- Detectan roturas entre capas: UI, rutas, sesión, DB y render.

## Qué dejar fuera del MVP.

- **Pago real con Stripe**
  - Tiene valor, pero depende de terceros (Stripe) y agrega fragilidad. Por otro lado, Stripe no es parte del desarrollo del sistema.

- **Validación de correos reales**
  - Aporta poco valor a la confianza sobre la app, versus el costo de infraestructura y observabilidad. 

- **Registro end-to-end**
  - Genera datos persistentes y además dispara notificaciones. No es prioritario para un smoke test.

- **Cobertura de validaciones negativas**
  - Es valiosa, pero no es lo primero para una prueba técnica orientada a priorización.

- **CRUD completo de comentarios**
  - Existe en el sistema, pero es secundario frente a auth, catálogo, carrito y admin. Baja criticidad.