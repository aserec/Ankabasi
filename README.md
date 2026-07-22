# Ankabasi - Página Web de Intercambio Cultural

Sitio estático **Astro** (SEO + GEO) para experiencias de intercambio cultural con los Arhuacos en Gwimake, Sierra Nevada de Santa Marta.

## Desarrollo (Astro)

```bash
npm install
npm run dev      # http://localhost:4321 → redirige a /es/
npm run build    # salida en dist/
npm run preview
```

**Idiomas:** `/es/`, `/en/`, `/de/`, `/fr/`  
**SEO:** meta/OG/hreflang, JSON-LD, `robots.txt`, sitemap, `llms.txt`  
**Guías:** FAQ, paquetes, cómo llegar, visita responsable, qué esperar  
**Specs:** `docs/superpowers/specs/2026-07-22-seo-geo-design.md`

> El `index.html` legado en la raíz queda obsoleto: despliega el contenido de `dist/`.

## Características

- Diseño moderno y responsivo (CSS existente)
- Páginas localizadas crawlables (sin depender del switcher JS)
- Galería, precios, blog multilingüe, contacto WhatsApp
- Optimizado para búsqueda clásica y respuestas de IA (GEO/AEO)

## Estructura (Astro)

```
src/
├── pages/[locale]/     # home, faq, guías, blog, libro
├── layouts/BaseLayout.astro
├── components/          # Header, Footer, HomeSections…
├── i18n/                # diccionarios y rutas
├── data/                # site facts, FAQ, guides, blog
└── styles/              # CSS portado
public/                  # images, videos, robots.txt, llms.txt
```

## Tecnologías

- **Astro** (static) + TypeScript
- CSS existente + AOS / GLightbox / Font Awesome (CDN)
- `@astrojs/sitemap`

## Instalación legacy (solo referencia)

Los archivos `index.html` / `css/` / `js/` en la raíz son el sitio anterior. Preferir `npm run dev` / `dist/`.

## 📦 Instalación (legacy note)

1. Preferido: `npm install && npm run build` y publicar `dist/`
2. Alternativa histórica: abrir `index.html` (sin i18n por URL)

## 🎨 Personalización

### Colores

Los colores se pueden modificar en `css/style.css` en la sección de variables:

```css
:root {
    --color-primary: #2d5016;
    --color-primary-light: #4a7c2a;
    --color-secondary: #8b6f47;
    /* ... más colores */
}
```

### Imágenes

Reemplaza las imágenes de placeholder en `index.html`:

- **Hero**: Cambia la URL de la imagen de fondo en la sección `.hero`
- **Galería**: Agrega tus propias imágenes en la sección `.gallery__grid`
- **Experiencia**: Cambia la imagen de fondo en la sección `.experience`

### Contenido

Edita el contenido directamente en `index.html`:
- Textos de secciones
- Precios y descripciones
- Testimonios
- Información de contacto

## 📧 Configuración del Formulario de Contacto

El formulario actualmente simula el envío. Para integrarlo con un servicio real:

### Opción 1: Formspree

1. Crea una cuenta en [Formspree](https://formspree.io/)
2. Obtén tu Form ID
3. En `js/contact.js`, descomenta la función `submitToFormspree` y reemplaza `YOUR_FORM_ID`

### Opción 2: EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio y plantilla
3. En `js/contact.js`, descomenta la función `submitToEmailJS` y configura tus credenciales

### Opción 3: Backend Propio

Modifica la función de envío en `js/contact.js` para hacer una petición a tu API.

## 📱 Responsive Design

La página está optimizada para:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Navegadores Soportados

- Chrome (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Edge (últimas versiones)

## 📝 Notas

- Las imágenes de ejemplo usan Unsplash (placeholder)
- Reemplaza con tus propias imágenes para producción
- Los videos de YouTube en la galería son ejemplos
- Actualiza la información de contacto con datos reales

## 🚀 Despliegue

Para desplegar la página:

1. **Netlify**: Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. **Vercel**: Usa [Vercel CLI](https://vercel.com/cli) o conecta tu repositorio
3. **GitHub Pages**: Sube el proyecto a GitHub y activa GitHub Pages
4. **Servidor propio**: Sube los archivos vía FTP/SFTP

## 📄 Licencia

Este proyecto fue creado para Ankabasi. Todos los derechos reservados.

## 👤 Contacto

Para más información sobre Ankabasi, visita la sección de contacto en la página web.

---

**Desarrollado con ❤️ para Ankabasi**






























