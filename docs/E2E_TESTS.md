# Pruebas E2E

## Flujo automatizado

El flujo de usuario E2E elegido para el MVP es:

1. un admin inicia sesión
2. accede al panel administrativo
3. crea un nuevo libro
4. se valida que el libro quedó visible en la vista esperada

## Por qué se eligió este flujo

Este escenario tiene alto valor porque cubre una capacidad operativa central del negocio, basado en los riesgos:  
**mantener actualizado el catálogo que luego consume el cliente final**.

Desde una mirada de riesgo, este flujo detecta fallas importantes en:

- autenticación
- autorización por rol
- navegación administrativa
- envío de formularios
- persistencia de datos
- renderización posterior del contenido creado

## Componentes del sistema que cubre

Aunque el test es corto, recorre varias capas del sistema:

- **login web**
  - formulario de autenticación y creación de sesión
- **control de acceso**
  - ingreso correcto al panel admin
- **panel administrativo**
  - disponibilidad de la operación para crear libros
- **formulario de alta de libro**
  - carga de campos requeridos y submit
- **backend de libros**
  - creación efectiva del recurso en la base de datos
- **vista de confirmación / detalle**
  - validación de que el libro fue persistido y renderizado
- **catálogo**
  - validación final de visibilidad del libro creado

## Valor de negocio del flujo

Si este flujo falla, el equipo pierde capacidad de operar el catálogo, lo que impacta directamente la experiencia comercial del sitio.  
En una bookstore app, un catálogo desactualizado o no administrable afecta la capacidad de vender, exhibir nuevos productos y mantener el contenido disponible para customers.