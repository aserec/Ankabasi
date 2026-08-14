# Spec: Reposicionar ANKABASI como empresa tecnológica y digital

**Date:** 2026-08-14  
**Status:** Approved for implementation (superallin auto-approve)  
**Product:** Sitio web ANKABASI (Astro, locales `es` / `en` / `de` / `fr`)

## Problema

El sitio comunica principalmente una “experiencia ancestral/turística”. El proyecto de grado define ANKABASI como **empresa tecnológica y digital de la comunidad Arhuaca de Gwimake**. No se rehace el sitio: se **reposiciona**.

## Segmentación de mercados (líneas de valor)

1. **Educación en tecnología** — cursos y programas (gobierno, ONGs nacionales e internacionales) para jóvenes Arhuacos de Gwimake.
2. **Intercambio cultural** — turismo comunitario que integra saberes ancestrales con el resto de la humanidad.
3. **Productos** — café, cacao y mochilas Arhuacas.

El intercambio cultural es **una línea de servicio**, no la definición de la empresa.

## Enfoques considerados

1. **Reposicionar in situ** (elegido): conservar Astro, i18n y el diseño visual; cambiar copy, menú, orden de secciones, FAQ y schema. Encaja en un PMV para el CIE.
2. **Rehacer como sitio corporativo multi-página**: más claro a largo plazo, demasiado alcance para este ciclo.
3. **Dos sitios** (empresa vs turismo): fragmenta el PMV y duplica i18n.

## Mensaje de producto (CIE)

> Este sitio web constituye nuestro Producto Mínimo Viable. Actualmente permite validar una primera línea comercial de ANKABASI, correspondiente al intercambio cultural, mientras que la arquitectura digital está diseñada para incorporar progresivamente nuestras líneas de tecnología, formación y contenido audiovisual.

## Fuera de alcance

- No rehacer el diseño visual completo ni migrar de Astro.
- No crear una tienda funcional ni plataformas de cursos.
- No editar los artefactos legacy de pre-Astro en la raíz (`index.html`, `js/`, `css/`): no entran al `astro build`.
- No publicar prácticas espirituales sensibles (`trabajo espiritual`, `hilos de protección`, `participa en sus rituales`) como oferta a visitantes, salvo validación comunitaria explícita (no existe en este spec).
- No presentar testimonios ficticios como reales.
- No enlazar a `example.com` ni a cualquier URL placeholder.

## Decisiones explícitas

- **Mundo Ankabasi** en el menú es un grupo etiquetado (Blog, Libro), no un único ancla.
- **Productos y servicios** en el menú apunta a `#productos`. Formación vive en `#cursos`; precios en `#precios` bajo intercambio.
- La galería usa `id="contenido"` (el menú Contenido). No se mantiene `id="galeria"`.
- Folleto permanece junto a las experiencias; no va en el menú principal.
- La nota de validación de testimonios puede ir justo antes de Contacto.
- Nav CTA: `Conoce nuestras experiencias` → `#experiencia`. Los botones de las cards de precio siguen usando `nav.reservar`.
- `organizationJsonLd()` es `Organization`. El ItemList `TouristTrip` de paquetes puede quedarse.

## Requisitos funcionales

### RF1 — Portada

Eliminar “Una Experiencia Ancestral” como mensaje principal.

Mostrar:

- Título: `ANKABASI`
- Subtítulo: `Tecnología, cultura e innovación desde Gwimake`
- Descripción: empresa tecnológica y digital de la comunidad Arhuaca que conecta el territorio con el mundo mediante tecnología, conocimiento, educación, contenido e intercambio cultural.
- Cierre: `Conectamos la sabiduría ancestral con las herramientas del presente para construir oportunidades hacia el futuro.`
- CTAs: `Conoce ANKABASI` (a `#quienes-somos`) y `Explora nuestras experiencias` (a `#experiencia`).

### RF2 — ¿Qué es ANKABASI?

Nueva sección `#quienes-somos` inmediatamente después de la portada, con el texto del briefing (empresa tecnológica y digital; jóvenes Arhuacos; brechas digitales; emprendimiento; soluciones digitales, contenido, formación e intercambio). Cierre: `Tecnología desde el territorio y para el territorio.`

### RF3 — Cinco pilares

Sección `#pilares` “¿Qué hacemos?” con cinco tarjetas: Tecnología, Contenido, Formación, Intercambio cultural, Emprendimiento. Cada tarjeta enlaza a su sección (`#tecnologia`, `#contenido`, `#cursos`, `#experiencia`, `#productos`).

### RF4 — Menú

Reemplazar el menú turístico por:

`Inicio | Quiénes somos | Tecnología | Intercambio cultural | Contenido | Productos y servicios | Mundo Ankabasi | Contacto`

CTA destacado: `Conoce nuestras experiencias` → `#experiencia`.

Mundo Ankabasi permanece como grupo (Blog, Libro). FAQ, Folleto, Testimonios y Dónde salen del menú principal (siguen en página y/o footer).

### RF5 — Intercambio cultural

Retitular “Una Aventura Ancestral” a **Intercambio cultural en Gwimake**. Presentarlo como una línea de servicio. No invitar a “participar en rituales”. Cierre: `No vienes solamente a visitar un lugar. Vienes a aprender, escuchar y compartir.`

### RF6 — Actividades

Retitular a **¿Qué puedes experimentar?** Reemplazar la grilla actual por:

- Conexión con el territorio
- Caminatas y naturaleza
- Espacios de diálogo cultural
- Gastronomía local
- Artesanía
- Actividades educativas
- Historias y memoria del territorio
- Participación en actividades comunitarias autorizadas

### RF7 — Precios

Mantener los tres paquetes y montos (`$700.000`, `$1.300.000`, consultar). Título: **Experiencias de intercambio cultural**. Añadir: `Los valores pueden variar según número de participantes, logística, actividades seleccionadas y condiciones de la experiencia.` Quitar de los bullets públicos las prácticas espirituales no autorizadas.

### RF8 — Tecnología

Nueva sección `#tecnologia`. Visión: `Crear soluciones digitales desde el territorio y para el territorio.` Lista futura: diseño y desarrollo web; soluciones digitales; presencia y comunicación digital; formación tecnológica; herramientas para emprendimientos; innovación aplicada al territorio.

### RF9 — Contenido audiovisual

Retitular la galería a **Historias desde Gwimake**. Presentarla como línea de valor (Fotografía · Video · Historias · Memoria · Cultura), no como álbum turístico. `id="contenido"`.

### RF10 — Productos

Mantener la sección. Mencionar café, cacao y mochilas Arhuacas. CTA: `Catálogo próximamente` (no enlace). Cero `example.com`.

### RF11 — Formación

Retitular a **Formación y aprendizaje digital**. Cuatro líneas: Alfabetización digital, Emprendimiento digital, Comunicación digital, Tecnología e innovación. Cierre: `Próximamente: programas y talleres de formación ANKABASI.` Sin botones a cursos inexistentes.

### RF12 — Testimonios

Eliminar María González, Juan Pérez y Ana Martínez (nombres de prototipo). Sustituir por **Validación en proceso** y `Estamos recopilando las primeras experiencias y opiniones de nuestros usuarios.`

### RF13 — FAQ

La respuesta a “¿Qué es ANKABASI?” debe definir la empresa tecnológica y digital, y aclarar que las experiencias de intercambio cultural son **una** línea de servicio.

### RF14 — Territorio

Retitular “¿Dónde estamos?” a **Nuestro territorio**. Añadir: `Gwimake es parte fundamental de nuestra identidad y de la propuesta de valor de ANKABASI.` No añadir coordenadas ni detalle sensible extra.

### RF15 — Mundo ANKABASI / Blog

El blog se presenta como **Mundo ANKABASI**, con categorías: Cultura, Territorio, Tecnología, Juventud, Emprendimiento, Historias, Educación. Los posts actuales se etiquetan `cultura` y `territorio`; no se inventan artículos.

### RF16 — Libro

Mantener *Memoria de una Montaña* como **archivo narrativo y memoria del territorio**. Mostrar `Proyecto editorial en desarrollo.` No presentarlo como producto terminado.

### RF17 — Idiomas

Las cuatro versiones (`es`, `en`, `de`, `fr`) deben contener el nuevo posicionamiento traducido de verdad, no solo el selector.

### RF18 — Footer

Reemplazar “Una experiencia ancestral…” por:

- `Empresa tecnológica y digital de la comunidad Arhuaca de Gwimake.`
- `Tecnología · Cultura · Educación · Innovación · Intercambio cultural`
- Conservar `© 2026 ANKABASI. Todos los derechos reservados.`

### RF19 — Orden de la página de inicio

1. Portada (`#inicio`)
2. ¿Qué es ANKABASI? (`#quienes-somos`)
3. Cinco pilares (`#pilares`)
4. Nuestro territorio (`#donde`)
5. Intercambio cultural + qué puedes experimentar + precios (`#experiencia`, `#actividades`, `#precios`)
6. Tecnología e innovación (`#tecnologia`)
7. Historias desde Gwimake (`#contenido`)
8. Formación digital (`#cursos`)
9. Productos (`#productos`)
10. Mundo ANKABASI (`#mundo-ankabasi`)
11. Contacto (`#contacto`)

Folleto puede permanecer cerca de las experiencias; no va en el menú principal. La nota de validación puede ir antes de Contacto.

### RF20 — JSON-LD

`organizationJsonLd()` debe describir una `Organization` (empresa), no un `TouristAttraction`. Los `TouristTrip` de paquetes pueden permanecer como evidencia de la línea comercial de intercambio.

## Prioridad CIE (si el tiempo se acaba)

1. Portada
2. ¿Qué es ANKABASI?
3. Tecnología e innovación
4. Formación digital
5. Definición en FAQ
6. Eliminar `example.com`
7. Quitar testimonios ficticios

## Criterios de aceptación

- Un visitante en `/es/` lee primero “empresa tecnológica y digital”, no “experiencia ancestral”.
- El menú no está dominado por turismo.
- `src/` no contiene `example.com`.
- No hay nombres de testigos inventados en la página.
- FAQ define ANKABASI como empresa; el intercambio es una línea.
- `en`, `de` y `fr` muestran el mismo posicionamiento.
- `npm run build` termina en 0.
- `npm test` termina en 0.
