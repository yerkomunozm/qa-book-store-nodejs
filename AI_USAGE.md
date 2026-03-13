# Uso de IA

## Propósito

La IA fue usada en este ejercicio técnico como acelerador para redactar, estructurar e iterar sobre los entregables de QA.  
No fue usada como reemplazo del criterio de QA, la priorización ni la revisión técnica.

## Herramientas de IA Utilizadas

- ChatGPT / asistente de código para:
  - redactar scaffolding inicial de tests en Playwright
  - generar estructura inicial de documentación en Markdown
  - acelerar redacción de documentos de estrategia, alcance y hallazgos

## Tipos de Prompts / Instrucciones Utilizados

Los prompts dados a la IA fueron específicos y orientados a tareas concretas. Ejemplos de instrucciones utilizadas:

- crear un framework mínimo de QA con Playwright para una app Node.js + EJS
- proponer una smoke suite enfocada en salud post-deploy
- redactar tests API-style para rutas Express con redirects y login por formulario
- documentar una estrategia de QA enfocada en priorización, riesgo y alcance MVP
- redactar entregables de QA concisos y profesionales para una prueba técnica

## En Qué Partes Influyó la IA

La IA ayudó en:

- la estructura inicial del framework con Playwright
- una primera versión del código para smoke, E2E y tests HTTP-level
- la generación de borradores de documentación
- redacción, formato y consolidación del paquete de entrega

## Qué Fue Revisado o Adaptado Manualmente

Las siguientes partes fueron revisadas y ajustadas manualmente:

- alcance y priorización de los tests
- selección de flujos incluidos en el MVP
- decisión de enfocarse en release confidence por encima de cobertura amplia
- adaptación de los tests a la estructura y rutas reales del repositorio
- validación de que los tests propuestos correspondieran a una app Express server-rendered y no a una API REST
- revisión de selectores, assertions y áreas de riesgo en base al código real
- alcance de la documentación, severidad y redacción de los hallazgos reportados

## Decisiones Manuales de QA

Las decisiones centrales de QA fueron tomadas manualmente, incluyendo:

- qué automatizar primero
- qué excluir del MVP
- cómo balancear valor, velocidad y mantenibilidad
- qué riesgos eran suficientemente relevantes para documentar
- cómo presentar la solución de forma clara para un reviewer

## Nota Final

La IA aportó velocidad y estructura, pero el entregable final refleja revisión manual, adaptación y decisiones de priorización QA tomadas por mi.  
La intención fue usar la IA como herramienta de productividad, manteniendo la responsabilidad sobre la precisión técnica, la relevancia y la selección de alcance en manos del autor.
