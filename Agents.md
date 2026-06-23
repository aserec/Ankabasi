# Agents.md - Plan para Página Web de Ankabasi

## Objetivo
Crear una página web moderna de una sola página (SPA) para Ankabasi, experiencias de intercambio cultural en la Sierra Nevada de Santa Marta con los Arhuacos en Gwimake. La web debe ser similar a gwimake.com con diseño moderno, animaciones sutiles y fondos no invasivos.

## Estructura de la Página

### 1. Header/Navegación
- **Logo**: "Ankabasi" (estilo moderno, tipografía sans-serif)
- **Menú de navegación**:
  - Inicio (scroll suave a hero)
  - Experiencia
  - Galería
  - Testimonios
  - Precios
  - Contacto
- **Botón CTA**: "Reservar ahora" (destacado, color verde/naturaleza)
- **Selector de idioma**: ES/EN (opcional para futuro)

### 2. Sección Hero
- **Título principal**: "Ankabasi - Una Experiencia Ancestral"
- **Subtítulo**: "Sumérgete en el conocimiento Arhuaco: Un diálogo ancestral sobre la Madre Tierra"
- **Descripción breve**: Texto sobre la experiencia transformadora en Gwimake
- **Botón CTA**: "Reserva tu Experiencia"
- **Fondo**: Imagen de la Sierra Nevada con overlay sutil, no invasivo

### 3. Sección "Una Experiencia Transformadora"
- **Título**: "Una Aventura Ancestral"
- **Contenido**:
  - Descripción de la experiencia inmersiva
  - Enfoque en desconexión del mundo moderno
  - Reconexión con sabiduría ancestral
  - Participación en rituales, comida, historias
- **Fondo**: Imagen sutil de naturaleza con blur/overlay
- **Animación**: Fade-in al hacer scroll`

### 4. Sección de Actividades
- **Título**: "¿Qué incluye tu experiencia?"
- **Grid de actividades** (con iconos):
  - Transporte desde Aracataca hasta Gwimake
  - Trabajo espiritual con el mamo
  - Alimentación completa
  - Alojamiento en hamaca o bohío
  - Acompañamiento cultural
  - Caminatas en la naturaleza
  - Charlas con los arhuacos
  - Entrega de hilos de protección
  - Talleres de artesanía
  - Siembra de plantas alimenticias o medicinales

### 5. Sección de Precios y Formatos
- **Título**: "Elige tu Experiencia"
- **Cards de precios** (3 columnas en desktop, stack en mobile):

#### Opción 1: 1 Día / 1 Noche - Desde $500.000
- Transporte desde Aracataca hasta Gwimake (moto para 1 persona, camioneta para 3+)
- Alimentación completa
- Alojamiento en hamaca
- Caminata a la cascada (10 minutos)
- Charla nocturna con toque arhuaco de acordeón
- Trabajo espiritual con el mamo
- Entrega de hilos de protección

#### Opción 2: 3 Días / 2 Noches - Desde $1.000.000
- Todo lo de la opción 1, más:
- Talleres de artesanía
- Siembra de plantas alimenticias o medicinales
- Una mochila arhuaca como obsequio especial

#### Opción 3: 1 Semana - Precio a consultar
- Experiencia extendida
- Inmersión profunda en la cultura Arhuaca
- Múltiples actividades y talleres
- Contacto para más información

- **Botón en cada card**: "Reservar ahora"

### 6. Sección Galería
- **Título**: "Explora lugares increíbles"
- **Subtítulo**: "Momentos, historias y sabiduría compartida desde el corazón del mundo"
- **Layout**: Grid responsivo (masonry o grid uniforme)
- **Contenido**:
  - Fotos de la naturaleza, cascadas, comunidad Arhuaca
  - Videos embebidos (YouTube/Vimeo)
  - Lightbox para visualización ampliada
- **Filtros opcionales**: Fotos / Videos / Todos

### 7. Sección Testimonios
- **Título**: "Experiencias de nuestros visitantes"
- **Layout**: Carrusel o grid de testimonios
- **Cada testimonio incluye**:
  - Foto del visitante (opcional)
  - Nombre
  - Texto del testimonio
  - Calificación (estrellas)
- **Testimonios sugeridos** (extraídos de experiencias similares):
  - "Una experiencia que cambió mi perspectiva sobre la vida y la naturaleza"
  - "Conectar con los Arhuacos fue profundamente transformador"
  - "La Sierra Nevada es mágica, y esta experiencia la hizo aún más especial"
  - "Recomiendo esta experiencia a cualquiera que busque autenticidad"

### 8. Sección Contacto
- **Título**: "Reserva con Nelo y disfruta de una experiencia única con la naturaleza"
- **Formulario de contacto**:
  - Nombre completo
  - Email
  - Teléfono
  - Fecha de viaje deseada
  - Número de personas
  - Tipo de experiencia (dropdown)
  - Mensaje
  - Botón "Enviar"
- **Información de contacto**:
  - Email
  - Teléfono
  - Redes sociales (Instagram)
  - Ubicación: Sierra Nevada de Santa Marta, Colombia

### 9. Footer
- **Información**:
  - Logo Ankabasi
  - Enlaces rápidos
  - Redes sociales
  - Ubicación
  - Copyright
- **Botones**:
  - "Gestionar mi reserva"
  - Enlaces a redes sociales

## Especificaciones Técnicas

### Tecnologías
- **HTML5**: Estructura semántica
- **CSS3**: 
  - Variables CSS para colores y tipografía
  - Flexbox/Grid para layouts
  - Animaciones CSS (fade-in, slide-up)
  - Media queries para responsividad
- **JavaScript (Vanilla o librerías)**:
  - Scroll suave
  - Animaciones al hacer scroll (Intersection Observer API)
  - Galería con lightbox
  - Formulario de contacto (validación y envío)
  - Carrusel de testimonios (opcional: Swiper.js)
- **Librerías sugeridas**:
  - AOS (Animate On Scroll) para animaciones
  - Lightbox2 o GLightbox para galería
  - Swiper.js para carruseles (opcional)
  - Formspree o similar para formulario de contacto

### Diseño Visual

#### Paleta de Colores
- **Primario**: Verde naturaleza (#2d5016, #4a7c2a)
- **Secundario**: Tierra (#8b6f47, #a0826d)
- **Acento**: Azul cielo (#4a90e2)
- **Fondo**: Blanco (#ffffff) y grises claros (#f5f5f5, #e8e8e8)
- **Texto**: Gris oscuro (#2c2c2c, #4a4a4a)

#### Tipografía
- **Títulos**: Sans-serif moderna (Montserrat, Poppins, o similar)
- **Cuerpo**: Sans-serif legible (Open Sans, Roboto, o similar)
- **Tamaños**: Responsivos (clamp() o rem)

#### Efectos Visuales
- **Fondos**: Imágenes con overlay oscuro/blur (opacity: 0.3-0.5)
- **Animaciones**:
  - Fade-in al hacer scroll
  - Slide-up para cards
  - Parallax sutil (opcional)
- **Transiciones**: Suaves (ease-in-out, 0.3s-0.5s)

### Responsividad
- **Mobile First**: Diseño desde móvil hacia desktop
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Navegación móvil**: Menú hamburguesa

### Performance
- **Imágenes**: Optimizadas (WebP con fallback)
- **Lazy loading**: Para imágenes y videos
- **Minificación**: CSS y JS
- **CDN**: Para librerías externas

## Contenido Extraído

### Del PDF y gwimake.com:
- **Ubicación**: Gwimake, Sierra Nevada de Santa Marta, Colombia
- **Comunidad**: Arhuacos
- **Actividades principales**:
  - Trabajo espiritual con mamo
  - Caminatas a cascadas
  - Charlas nocturnas con música arhuaca
  - Talleres de artesanía
  - Siembra de plantas
- **Alojamiento**: Hamacas o bohíos
- **Transporte**: Desde Aracataca (moto o camioneta)
- **Precios**:
  - 1 día/1 noche: Desde $500.000
  - 3 días/2 noches: Desde $1.000.000
  - 1 semana: A consultar

## Estructura de Archivos

```
Ankabasi/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── gallery.js
│   └── contact.js
├── images/
│   ├── hero/
│   ├── gallery/
│   └── testimonials/
├── videos/
└── Agents.md (este archivo)
```

## Tareas de Implementación

1. ✅ Crear estructura HTML básica
2. ✅ Diseñar header con navegación
3. ✅ Crear sección hero
4. ✅ Implementar sección de experiencia
5. ✅ Crear sección de actividades
6. ✅ Diseñar cards de precios
7. ✅ Implementar galería con lightbox
8. ✅ Crear sección de testimonios
9. ✅ Diseñar formulario de contacto
10. ✅ Añadir footer
11. ✅ Implementar animaciones al scroll
12. ✅ Optimizar para móvil
13. ✅ Añadir imágenes y videos
14. ✅ Probar formulario de contacto
15. ✅ Optimizar performance

## Notas Adicionales

- La web debe transmitir respeto por la cultura Arhuaca
- Enfoque en sostenibilidad e intercambio cultural responsable
- Diseño que refleje la conexión con la naturaleza
- Mensajes auténticos y no comercializados
- Considerar aspectos culturales y sensibles


