# Pruebas Smoke

## Propósito

La smoke suite fue diseñada para responder una pregunta concreta después de un deploy:

**“¿El sistema sigue estando sano?”**

Su objetivo es entregar un feedback rápido y confiable de que la aplicación sigue operativa en sus capacidades esenciales.

## Checks incluidos

La suite cubre únicamente verificaciones de alto valor y ejecución rápida:

1. **La aplicación responde**
   - el storefront principal carga correctamente

2. **La login page carga**
   - la pantalla de acceso está disponible y renderiza el formulario esperado

3. **El catálogo carga**
   - la ruta principal de libros sigue accesible para el usuario final

4. **El login de customer funciona**
   - un usuario válido puede autenticarse y acceder a su dashboard

5. **El panel admin responde**
   - un administrador autenticado puede ingresar al panel administrativo

## Por qué se seleccionaron estos checks

Estos checks fueron elegidos porque, juntos, cubren la salud funcional mínima del sistema:

- **disponibilidad básica**
  - la app levanta y responde
- **autenticación**
  - el acceso principal al sistema funciona
- **operación comercial visible**
  - el catálogo sigue disponible
- **control por rol**
  - el acceso admin sigue operativo

En una aplicación de bookstore, si alguno de estos puntos falla, la confianza de release cae de inmediato, incluso aunque otras funcionalidades menores sigan sanas.
