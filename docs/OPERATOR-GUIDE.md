# Manual de operación — ankabasi.com

Léelo antes de cambiar, construir o publicar el sitio.

**Si eres un asistente de IA:** sigue este archivo por encima de `AGENTS.md`, del `README.md` de la raíz y de cualquier `index.html` / `css/` / `js/` en la raíz del repositorio. Esos tres últimos son una copia antigua y **no** son lo que se publica.

Después de cualquier cambio de contenido o código: ejecuta `npm test` y luego `npm run build`. Para publicar: `npm run deploy` (hace falta credenciales FTP en `.env`).

---

## 1. Para quién es este manual

No hace falta ser desarrollador web. Sí hace falta poder:

1. Abrir este proyecto en una terminal (o pedírselo a un asistente de IA).
2. Ejecutar los comandos de abajo.
3. Recorrer la vista local y el sitio en producción.
4. Pegar este manual en cualquier chat de IA y decir qué quieres cambiar.

**Sí** necesitas los datos FTP del hosting del dominio (host, usuario, contraseña y la carpeta remota que debe contener `index.html` — suele ser `public_html`).

---

## 2. Preparar la máquina (una sola vez)

### 2.1 Instalar Node.js 22+

Comprueba:

```bash
node -v
```

Hace falta `v22.12.0` o superior. Si la versión es más antigua, instala Node 22 LTS desde https://nodejs.org o con un gestor de versiones (`nvm`, `fnm`, `volta`).

npm viene con Node. Comprueba:

```bash
npm -v
```

### 2.2 Tener el código

```bash
cd /ruta/a/Ankabasi
```

Si clonas el repositorio:

```bash
git clone <url-del-repositorio>
cd Ankabasi
```

### 2.3 Instalar dependencias de JavaScript

```bash
npm install
```

Esto crea `node_modules/`. Esa carpeta está en `.gitignore`. Hay que ejecutar `npm install` en cada máquina nueva (y cuando alguien añada un paquete).

En este repo **no** hay un `package-lock.json` versionado (está en `.gitignore`). `npm install` resolverá las versiones actuales de Astro y de la librería FTP.

### 2.4 Secretos FTP (solo para publicar)

Copia el archivo de ejemplo y rellénalo con valores reales. **Nunca subas `.env` a git.**

```bash
cp .env.example .env
```

Luego edita `.env` (ver [§10 Desplegar por FTP](#10-desplegar-por-ftp)).

---

## 3. Comandos del día a día

Ejecútalos desde la **raíz del repositorio** (la carpeta que contiene `package.json`).

| Comando | Qué hace |
|---------|----------|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo, normalmente http://localhost:4321 |
| `npm run build` | Genera el sitio de producción en `dist/` |
| `npm run preview` | Sirve `dist/` en local (lo que verán los visitantes) |
| `npm test` | Tests de contenido + tests del script FTP |
| `npm run deploy:ftp:dry` | Muestra qué se subiría; no se conecta |
| `npm run deploy:ftp:check` | Entra por FTP y lista la carpeta remota; no sube nada |
| `npm run deploy:ftp` | Sube el `dist/` **ya existente** (haz `build` antes) |
| `npm run deploy` | `build` y luego subida FTP |

Detén el servidor de desarrollo con `Ctrl+C`.

### 3.1 URLs locales que conviene abrir

Después de `npm run dev`:

- http://localhost:4321/ → redirige a `/es/`
- http://localhost:4321/es/ — inicio en español
- http://localhost:4321/en/ — inicio en inglés
- http://localhost:4321/de/ — inicio en alemán
- http://localhost:4321/fr/ — inicio en francés
- http://localhost:4321/es/faq/
- http://localhost:4321/es/paquetes/
- http://localhost:4321/es/blog/
- http://localhost:4321/libro/ — lector interactivo del libro

`astro.config.mjs` reescribe `/libro/index.html` → `/libro/` en desarrollo para que los marcadores antiguos sigan funcionando.

---

## 4. Cómo se arma el sitio publicado

```
Archivos fuente (git)       Build                  Lo que debe hospedar el servidor
─────────────────────       ─────                  ─────────────────────────────────
src/pages/          ─┐
src/components/      │
src/layouts/         │
src/i18n/            ├─ npm run build ──► dist/ ──► FTP a public_html (o equivalente)
src/data/            │
src/styles/          │
src/scripts/         │
public/             ─┘  (se copia tal cual a dist/)
```

- **`src/`** — páginas, layout, componentes, textos, datos, CSS, JS del cliente. Este es el sitio real.
- **`public/`** — archivos copiados byte a byte a `dist/` en la misma ruta de URL. Imágenes, videos, `robots.txt`, `llms.txt`, PDF, algo de JS del libro.
- **`dist/`** — resultado del build. Está en `.gitignore`. Se regenera en cada build. **Esto es lo que debe recibir el FTP.**
- **`index.html`, `css/`, `js/`, `blog/*.html`, `libro/index.html` en la raíz** — legado. No forman parte del build de Astro. Ignóralos.

Ajustes de Astro que importan al publicar (`astro.config.mjs`):

- `site: 'https://ankabasi.com'` — URLs canónicas, Open Graph, sitemap.
- `trailingSlash: 'always'` — cada URL de página termina en `/` (ejemplo: `/es/faq/`, no `/es/faq`).
- `@astrojs/sitemap` — escribe los sitemaps en `dist/` al hacer build.

---

## 5. Mapa de URLs públicas

Las páginas de marketing están localizadas. Los slugs de las guías cambian según el idioma; los del blog **no**.

### 5.1 Inicio (una página larga + anclas)

| Español | Inglés | Alemán | Francés |
|---------|--------|--------|---------|
| `/es/` | `/en/` | `/de/` | `/fr/` |

IDs de sección del inicio (añade `#id` después del home del idioma):

| ID | Sección |
|----|---------|
| `#inicio` | Hero |
| `#quienes-somos` | Qué es ANKABASI |
| `#pilares` | Qué hacemos |
| `#experiencia` | Intercambio cultural |
| `#actividades` | Qué incluye la estancia |
| `#donde` | Territorio / Gwimake |
| `#precios` | Paquetes y precios |
| `#folleto` | Folleto PDF |
| `#tecnologia` | Línea de tecnología |
| `#contenido` | Galería / historias (no `#galeria`) |
| `#cursos` | Cursos (próximamente) |
| `#productos` | Productos (próximamente) |
| `#mundo-ankabasi` | Teasers de blog y libro |
| `#blog` | Teaser del blog |
| `#libro` | Teaser del libro |
| `#faq` | Teaser de FAQ (tres preguntas) |
| `#testimonios` | Testimonios (**oculto** hasta que haya datos) |
| `#contacto` | Contacto / WhatsApp |

Ejemplo: precios en español = `https://ankabasi.com/es/#precios`

### 5.2 Guías y FAQ

| Clave | ES | EN | DE | FR |
|-------|----|----|----|-----|
| FAQ | `/es/faq/` | `/en/faq/` | `/de/faq/` | `/fr/faq/` |
| Paquetes | `/es/paquetes/` | `/en/packages/` | `/de/pakete/` | `/fr/forfaits/` |
| Cómo llegar | `/es/como-llegar/` | `/en/how-to-get-there/` | `/de/anreise/` | `/fr/comment-y-aller/` |
| Visita responsable | `/es/visita-responsable/` | `/en/responsible-visit/` | `/de/verantwortungsvoll-reisen/` | `/fr/visite-responsable/` |
| Qué esperar | `/es/que-esperar/` | `/en/what-to-expect/` | `/de/was-dich-erwartet/` | `/fr/a-quoi-sattendre/` |

Los slugs están en `src/i18n/routes.ts`. Si añades un idioma o renombras un slug, actualiza ese archivo **y** `src/data/guides.ts`.

### 5.3 Blog

Índice: `/{locale}/blog/`  
Artículo: `/{locale}/blog/{slug}/`

Slugs actuales (iguales en todos los idiomas):

- `los-sabios-de-la-montana`
- `donachwi-y-su-entorno`

### 5.4 Libro

- Portada localizada: `/{locale}/libro/`
- Lector interactivo (una sola URL, selector de idioma en JS): `/libro/`

### 5.5 Archivos técnicos (`public/` + el build)

| URL | Función |
|-----|---------|
| `/robots.txt` | Permite rastreadores; apunta al sitemap |
| `/sitemap-index.xml` | Lo escribe Astro en el build |
| `/llms.txt` | Resumen corto para rastreadores de IA |
| `/Ankabasi folleto.pdf` | Descarga del folleto |
| `/favicon.svg`, `/favicon.ico` | Iconos |
| `/images/...` | Fotos, logos |
| `/videos/...` | Video del hero y de la galería |

---

## 6. Mapa del repositorio (qué editar)

```
Ankabasi/
├── package.json              scripts npm, versión de Node, dependencias
├── astro.config.mjs          URL del sitio, barras finales, sitemap, rewrite de /libro
├── tsconfig.json             TypeScript (extiende la config estricta de Astro)
├── .env.example              nombres de variables FTP (sin secretos)
├── .env                      secretos FTP — solo local, en .gitignore
├── .gitignore
├── docs/OPERATOR-GUIDE.md    este archivo
├── scripts/
│   ├── content-guards.test.mjs   reglas de marca/contenido (deben seguir en verde)
│   ├── ftp-deploy.mjs            CLI: subir dist/ por FTP
│   ├── ftp-deploy.lib.mjs        config, listado de archivos, rutas
│   └── ftp-deploy.test.mjs       tests de los helpers FTP
├── src/
│   ├── pages/                    rutas (archivo = URL)
│   ├── layouts/BaseLayout.astro  cascarón HTML, SEO, JSON-LD, header/footer
│   ├── components/               Header, Footer, secciones del home, selector de idioma
│   ├── i18n/                     textos de UI + helpers de locale + slugs de guías
│   ├── data/                     datos, FAQ, guías, blog, testimonios
│   ├── styles/                   CSS (la hoja de estilos real)
│   └── scripts/                  JS de cliente empaquetado o copiado a las páginas
└── public/                       estáticos (imágenes, videos, robots.txt, JS del libro)
```

### 6.1 Páginas (`src/pages/`)

| Archivo | URL |
|---------|-----|
| `index.astro` | `/` → HTTP 302 a `/es/` |
| `[locale]/index.astro` | `/{es,en,de,fr}/` inicio |
| `[locale]/faq.astro` | `/{locale}/faq/` |
| `[locale]/[guide].astro` | Guías localizadas (paquetes, cómo llegar, …) |
| `[locale]/blog/index.astro` | Listado del blog |
| `[locale]/blog/[slug].astro` | Artículo del blog |
| `[locale]/libro/index.astro` | Portada del libro |
| `libro/index.astro` | Lector interactivo en `/libro/` |

`[locale]` es un nombre de carpeta. Astro lo rellena con `es`, `en`, `de`, `fr` mediante `getStaticPaths()`.

### 6.2 Datos y textos (casi todos los cambios de contenido viven aquí)

| Archivo | Cámbialo cuando quieras… |
|---------|--------------------------|
| `src/data/site.ts` | Nombre legal, correos, teléfonos, id de WhatsApp, Instagram, lugares, **precios de paquetes para schema.org**, imagen OG |
| `src/i18n/ui.ts` | Casi todos los textos visibles (nav, hero, pilares, listas de precios, etiquetas de contacto, …) en cuatro idiomas |
| `src/i18n/utils.ts` | Lista de locales, búsqueda `t()`, helper de URL |
| `src/i18n/routes.ts` | Slugs de URL de las guías por idioma |
| `src/data/faq.ts` | Preguntas/respuestas del FAQ + JSON-LD del FAQ |
| `src/data/guides.ts` | Títulos, descripciones y párrafos de las guías |
| `src/data/blog-data.ts` | Slugs, fechas, categorías e imágenes del blog |
| `src/data/blog-content.ts` | HTML del cuerpo, título y excerpt del blog por idioma |
| `src/data/testimonials.ts` | Citas de visitantes (ahora **vacío** → sección oculta) |
| `src/components/HomeSections.astro` | Estructura del home, markup de la galería, **importes de precio en duro** `$700.000` / `$1.300.000` |
| `src/components/Header.astro` | Navegación principal |
| `src/components/Footer.astro` | Enlaces del pie (usa `SITE.email` / teléfono / Instagram) |
| `src/layouts/BaseLayout.astro` | Title, description, canonical, hreflang, Open Graph, fuentes, AOS, GLightbox |
| `src/styles/style.css` | Colores, tipografía, layout (**esta** es la hoja de estilos, no `css/style.css` de la raíz) |
| `src/styles/responsive.css` | Breakpoints |
| `src/styles/blog.css` | Listado y artículo del blog |
| `src/styles/libro.css` | Lector del libro |
| `public/images/` | Fotos y logos |
| `public/videos/` | Videos |
| `public/robots.txt` | Reglas de rastreo |
| `public/llms.txt` | Texto corto para sistemas de IA |
| `public/js/libro.js` + `libro-content.js` + `i18n.js` | Libro interactivo (JS legado aún en uso) |

---

## 7. Recetario (cambiar X)

Trabaja en `src/` (y en `public/` para archivos). Mantén los **cuatro idiomas** al día salvo que estés actualizando un locale a propósito.

### 7.1 Teléfono, correo, WhatsApp, Instagram, dirección

Edita `src/data/site.ts`:

- `email`, `emailAlt`
- `phoneDisplay` (se muestra en el pie)
- `phoneE164`
- `whatsappE164` — solo dígitos, **sin `+`**, se usa como `https://wa.me/{whatsappE164}`
- `instagram`
- `place.community`, `region`, `country`, `meetingPoint`

El WhatsApp del home usa `SITE.whatsappE164` más el texto previo en `src/i18n/ui.ts` → `whatsapp.prefill` (una cadena por idioma).

Algunas líneas de contacto del home siguen diciendo `info@ankabasi.com` y `@ankabasi` en `HomeSections.astro`. Si cambias el correo o el handle públicos, actualiza también esos literales.

El pie muestra `SITE.phoneDisplay` junto al icono de WhatsApp, y puede no coincidir con `whatsappE164`. Si deben ser el mismo, unifícalos en `site.ts`.

### 7.2 Título del hero, subtítulo, relato, etiquetas de nav

`src/i18n/ui.ts` — objetos `es`, `en`, `de`, `fr`. Claves como `meta.title`, `main.subtitle`, `about.*`, `nav.*`.

El helper `t(locale, 'main.subtitle')` busca esa clave con puntos. Si falta en un idioma, **cae a español** y, si tampoco está, a nombre de la clave.

**No** vuelvas a poner el eslogan antiguo «Una Experiencia Ancestral» como `main.subtitle`. Los tests fallarán. La línea actual del hero es de empresa primero («Tecnología, cultura e innovación desde Gwimake» y traducciones).

### 7.3 Precios de los paquetes

Los precios aparecen en **varios** sitios. Cámbialos juntos:

1. Importes visibles en las tarjetas del home: `src/components/HomeSections.astro` (`$700.000` y `$1.300.000`).
2. Datos estructurados: `src/data/site.ts` → `offers` (`priceFromCOP` y `priceDisplay`).
3. Respuesta `prices` del FAQ en `src/data/faq.ts`.
4. Textos de la guía en `src/data/guides.ts` (lead/descripción de paquetes).
5. `public/llms.txt` si ahí se citan precios.
6. Tests: `scripts/content-guards.test.mjs` **exige** hoy `$700.000` y `$1.300.000` en la sección de precios del home. Actualiza el test en el mismo cambio.

Las viñetas de cada plan son cadenas de UI: `pricing.plan1_f1`, `pricing.plan2_f0`, … en `ui.ts`.

### 7.4 FAQ

`src/data/faq.ts` — cada ítem necesita `id` más `question` y `answer` para `es`, `en`, `de`, `fr`.

El teaser del home muestra los **tres primeros** (`faqItems.slice(0, 3)` en `HomeSections.astro`). Pon primero las preguntas más importantes.

La respuesta `what-is` debe seguir describiendo ANKABASI como **empresa tecnológica y digital**, con el intercambio cultural como **línea de servicio**. Los tests buscan esas frases.

### 7.5 Páginas de guía

`src/data/guides.ts` — `title`, `description`, `lead` y `body` (array de párrafos) por idioma.

No anuncies «trabajo espiritual» / «spiritual work» en las guías. Los tests lo prohíben. Usa «acompañamiento cultural» / «cultural accompaniment».

### 7.6 Artículo nuevo del blog

1. Añade imágenes en `public/images/blog/` (y/o reutiliza `public/images/gallery/`).
2. Añade una entrada en `src/data/blog-data.ts`:
   - `slug` (segmento de URL, minúsculas, guiones, **sin** prefijo de idioma)
   - `date` (`YYYY-MM-DD`)
   - `category`: ahora `cultura` o `territorio` (claves de UI `blog.cat_cultura` / `blog.cat_territorio`)
   - `featuredImage` e `images` como rutas del sitio que empiecen por `/images/...`
3. Añade HTML en **los cuatro idiomas** en `src/data/blog-content.ts` bajo ese slug (`title`, `metaDescription`, `featuredAlt`, `excerpt` si se usa, `bodyHtml`).
4. Haz build y abre `/{locale}/blog/{slug}/`.

El teaser del blog en el home usa el orden de `BLOG_POSTS`.

### 7.7 Testimonios

`src/data/testimonials.ts`.

Ahora mismo:

```ts
export const TESTIMONIALS: Testimonial[] = [];
```

La sección del home **solo se pinta si el array no está vacío**.

Cada ítem:

```ts
{
  id: 'id-unico',
  name: 'Nombre real de la persona',
  location: 'Ciudad, País',
  lang: 'es', // es | en | de | fr
  quote: 'Sus palabras',
  stars: 5,   // 4 o 5
}
```

**Reglas:**

- Publica solo comentarios **reales** de visitantes, con permiso.
- **No** inventes nombres. Los tests bloquean una lista de nombres de prototipo (María González, Juan Pérez, Daniel Hart, …).
- El test actual **también** exige `TESTIMONIALS = []`. Cuando añadas el primer testimonio real, **actualiza ese test** para que ya no pida el array vacío, pero siga prohibiendo nombres inventados.

### 7.8 Galería (home «Contenido»)

El markup está en `src/components/HomeSections.astro` dentro de `<section id="contenido">`.

- Pon archivos nuevos en `public/images/gallery/` o `public/videos/`.
- Referéncialos como `/images/gallery/fotoN.jpeg` o `/videos/videoN.mp4`.
- Conserva `class="gallery__link"` en los enlaces del lightbox (GLightbox).
- No renombres el id de la sección otra vez a `galeria`. Los tests exigen `#contenido` y ningún `#galeria` en `src/`.
- El `alt` debe describir la foto. No uses «Experiencia Ancestral» como marco de la galería; el título es «Historias desde Gwimake».

Los filtros del cliente («todo / foto / video») y «cargar más» están en `src/scripts/main-astro.js`.

### 7.9 Colores, fuentes, espaciado

`src/styles/style.css` al principio:

```css
:root {
  --color-primary: #2d5016;
  --color-primary-light: #4a7c2a;
  --color-secondary: #8b6f47;
  --color-accent: #4a90e2;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
}
```

Las fuentes se cargan desde Google Fonts en `BaseLayout.astro`. Los breakpoints están sobre todo en `src/styles/responsive.css` (mobile-first: &lt;768, 768–1024, &gt;1024).

**No** edites `css/style.css` de la raíz esperando que cambie el sitio publicado.

### 7.10 Logo y favicon

| Archivo | Uso |
|---------|-----|
| `public/images/logo/ankabasi-icon-outline.png` | Header |
| `public/images/logo/ankabasi-logo-full.png` | Footer |
| `public/images/logo/favicon-32.png` | Favicon |
| `public/images/logo/apple-touch-icon.png` | Pantalla de inicio iOS |
| `public/favicon.svg` / `public/favicon.ico` | Pestaña del navegador |

Sustituye los archivos **conservando los mismos nombres**, o cambia el `src` / `href` en Header, Footer y `BaseLayout.astro`.

### 7.11 Folleto PDF

Sustituye `public/Ankabasi folleto.pdf` (mismo nombre) o actualiza el `href` en el bloque `#folleto` de `HomeSections.astro`.

### 7.12 Navegación

`src/components/Header.astro`.

Nav principal actual (empresa primero): Inicio, Quiénes somos, Tecnología, Intercambio cultural, Contenido, Productos y servicios, luego Mundo Ankabasi (Blog, Libro), luego Contacto. El botón verde hace scroll a `#experiencia`.

Los tests **prohíben** devolver FAQ / actividades / precios / galería / folleto / testimonios / «Reservar» a esa nav principal. Sí puedes enlazar esas secciones desde el cuerpo y el pie.

### 7.13 Cursos y productos

Secciones del home `#cursos` y `#productos`. Los textos están en `ui.ts` (`cursos.*`, `productos.*`). Los cursos son cuatro tarjetas marcadas como próximamente, **sin enlaces de salida**. Los tests lo exigen.

### 7.14 SEO / compartir / rastreadores de IA

| Tema | Dónde |
|------|-------|
| Title y description por página | `t(locale, 'meta.*')` en el home; campos de guía/blog en los archivos de datos |
| Canonical + hreflang | `BaseLayout.astro` (automático según locale y ruta) |
| Imagen Open Graph | `SITE.ogImage` (`/images/gallery/foto4.jpeg` por defecto) |
| JSON-LD de Organization | `organizationJsonLd()` en `site.ts` — tipo **Organization**, no TouristAttraction |
| JSON-LD de ofertas | `offersJsonLd` en la home |
| JSON-LD de FAQ | `faqJsonLd()` en `faq.ts` |
| Sitemap | se genera en el build; `site` debe seguir siendo `https://ankabasi.com` |
| robots.txt | `public/robots.txt` |
| llms.txt | `public/llms.txt` — alínealo con el relato **actual** cuando lo edites |

Si cambia el dominio público, actualiza `SITE.url` **y** `astro.config.mjs` → `site`.

### 7.15 «Formulario» de contacto

**No** hay un formulario de contacto funcionando en el home de Astro. Quien visita usa WhatsApp y el correo. `src/scripts/contact.js` es resto del sitio antiguo (incluye una URL placeholder de Formspree). No lo conectes salvo que añadas a propósito un formulario en `HomeSections.astro` y un backend real.

---

## 8. Reglas de internacionalización

- Locales: `es` (por defecto), `en`, `de`, `fr` — `src/i18n/utils.ts`.
- El home y la mayoría de páginas son **HTML real por idioma** (mejor para Google y para respuestas de IA). No es una sola página en español con un switcher JS, salvo el lector `/libro/`.
- Selector de idioma: `src/components/LangSwitcher.astro`. Te deja en la misma página en el otro idioma (usa `pathAfterLocale`).
- Los slugs de las guías cambian por idioma (`paquetes` vs `packages`). Los del blog no.
- Cuando añadas una clave de UI, añádela en los **cuatro** objetos de locale de `ui.ts`.
- Tono: respeto a la cultura arhuaca; no extractivo; no «experiencia ancestral» como titular de la empresa. El intercambio cultural es una línea de servicio de una **empresa tecnológica y digital**.

---

## 9. Tests (ejecútalos antes de fiarte de un cambio)

```bash
npm test
```

Esto corre cada archivo `*.test.mjs` bajo `scripts/` que está listado en `package.json`.

### 9.1 Guardianes de contenido (`scripts/content-guards.test.mjs`)

No son detalles de estilo opcionales. Codifican el reposicionamiento del sitio. Espera fallos si:

- Restituyes «Una Experiencia Ancestral» como subtítulo del hero
- Describes ANKABASI solo como producto turístico y no como empresa tecnológica/digital
- Pones `example.com` en cualquier archivo bajo `src/`
- Publicas nombres de testimonio inventados, o muestras testimonios mientras el array debe seguir vacío
- Cambias el JSON-LD de Organization a TouristAttraction
- Reviertes la nav de empresa / ocultas secciones de empresa
- Quinas el aviso de variación de precios o los importes publicados `$700.000` / `$1.300.000` sin actualizar el test
- Pones «trabajo espiritual» en las guías
- Renombras `#contenido` otra vez a `#galeria`
- Añades enlaces de salida en las cuatro tarjetas de cursos
- Rompes el cableado del lector `/libro/`

**Si un test falla después de un cambio de contenido deliberado:** actualiza el test en el **mismo** commit/PR para que describa la nueva realidad acordada. No borres el archivo. No te saltes los tests.

### 9.2 Tests del helper FTP (`scripts/ftp-deploy.test.mjs`)

**No** se conectan a internet. Comprueban el parseo del env, el empalme de rutas, el listado de `dist/` y que `--clean` no borre `.htaccess` / `cgi-bin` / `.well-known`.

### 9.3 Revisión visual

```bash
npm run dev
```

Haz clic: selector de idioma, enlace de WhatsApp, precios, FAQ, una guía, un artículo del blog, `/libro/`, menú móvil (estrecha la ventana), lightbox de la galería.

Luego:

```bash
npm run build
npm run preview
```

Confirma que `/` sigue redirigiendo a `/es/` y que imágenes/videos cargan desde `/images/` y `/videos/`.

---

## 10. Desplegar por FTP

Producción es un hosting estático clásico: **los archivos de `dist/` deben convertirse en los archivos de la raíz web.**

**No** subas `src/`, `node_modules/` ni el repo git.

### 10.1 Una vez: credenciales

1. Copia `.env.example` a `.env`.
2. Rellena los valores del panel de hosting (a menudo «cuentas FTP» en cPanel / Plesk / el registrador).

| Variable | Obligatoria | Significado |
|----------|-------------|-------------|
| `FTP_HOST` | sí | Hostname, p. ej. `ftp.ankabasi.com` o `ankabasi.com` |
| `FTP_USER` | sí | Usuario FTP |
| `FTP_PASSWORD` | sí | Contraseña FTP |
| `FTP_REMOTE_DIR` | sí | Carpeta que debe contener `index.html` tras la subida. Típico: `/public_html` o `public_html`. Si el usuario FTP ya entra en la raíz web, usa `/` |
| `FTP_PORT` | no | Por defecto `21` |
| `FTP_SECURE` | no | `false` (FTP plano, por defecto), `true` (FTPS explícito) o `implicit` |
| `FTP_TLS_REJECT_UNAUTHORIZED` | no | Pon `false` solo si FTPS falla por un certificado autofirmado |

`.env` está en `.gitignore`. No pegues la contraseña en chats, tickets ni git.

Este script habla **FTP / FTPS**, no SFTP (SSH). Si el host solo ofrece SFTP en el puerto 22, este uploader no servirá; usa el administrador de archivos del host o un cliente SFTP, subiendo igual **el contenido de `dist/`**.

### 10.2 Qué se sube

Después de `npm run build`, `dist/` se parece a:

```
dist/
├── index.html              (redirige a /es/)
├── es/  en/  de/  fr/      (HTML localizado)
├── libro/
├── images/
├── videos/
├── robots.txt
├── llms.txt
├── sitemap-index.xml
├── sitemap-0.xml
└── _astro/                 (CSS/JS con hash del build)
```

Esos archivos se suben **dentro** de `FTP_REMOTE_DIR`, conservando carpetas. Tras un deploy correcto, `https://ankabasi.com/es/` debe servir `dist/es/index.html`.

Un build de producción actual ronda **100+ MB**, sobre todo por videos en `public/videos/`. La primera subida FTP puede tardar varios minutos en una conexión lenta. Las siguientes siguen enviando todos los archivos (el script sobrescribe; no hace sync solo por fecha).

### 10.3 Comandos

Desde la raíz del repo, con `.env` relleno:

```bash
npm run deploy:ftp:dry     # imprime cada archivo local → ruta remota; sin red
npm run deploy:ftp:check   # login, lista la carpeta remota, no sube nada
npm run deploy             # build + subida
```

Solo subida (si `dist/` ya está fresco):

```bash
npm run deploy:ftp
```

Log verboso del protocolo FTP:

```bash
node scripts/ftp-deploy.mjs --verbose
```

Otro archivo de entorno:

```bash
node scripts/ftp-deploy.mjs --env-file .env.production
```

### 10.4 `--clean` (peligroso)

La subida por defecto **sobrescribe** archivos del mismo nombre y **deja** los demás archivos remotos. Eso es lo que quieres en una raíz web que también puede tener `.htaccess`, correo o `cgi-bin`.

```bash
node scripts/ftp-deploy.mjs --clean
```

borra archivos remotos bajo `FTP_REMOTE_DIR` que no estén en `dist/`, **salvo** los nombres de esta lista protegida: `.htaccess`, `.htpasswd`, `cgi-bin`, `error_log`, `php.ini`, `.well-known`.

No apuntes `FTP_REMOTE_DIR` a `/` en una cuenta que guarda correo u otros sitios y luego pases `--clean`.

### 10.5 Después de cada deploy (lista)

- [ ] https://ankabasi.com/ redirige o aterriza en español
- [ ] https://ankabasi.com/es/ carga, cargan las imágenes, carga el video del hero
- [ ] El selector de idioma llega a `/en/`, `/de/`, `/fr/`
- [ ] https://ankabasi.com/es/faq/ y un artículo del blog cargan
- [ ] https://ankabasi.com/libro/ abre el lector
- [ ] El botón de WhatsApp abre un chat con el número esperado
- [ ] Existe https://ankabasi.com/sitemap-index.xml
- [ ] Ver código fuente sigue teniendo `<link rel="canonical"` y JSON-LD
- [ ] Recarga forzada (o una ventana privada) para no mirar una caché vieja

### 10.6 Scripts implicados

| Archivo | Función |
|---------|---------|
| `scripts/ftp-deploy.mjs` | CLI que se ejecuta de verdad |
| `scripts/ftp-deploy.lib.mjs` | Parseo de `.env`, listado de `dist/`, rutas remotas, plan de `--clean` |
| `scripts/ftp-deploy.test.mjs` | Tests unitarios (sin FTP real) |

Los alias npm están en `package.json`: `deploy`, `deploy:ftp`, `deploy:ftp:dry`, `deploy:ftp:check`.

---

## 11. Trabajar con cualquier asistente de IA

Puedes usar Cursor, ChatGPT, Claude, Gemini u otro. El asistente trabajará mejor si **pegas o @-mencionas este manual** y das un solo pedido comprobable.

### 11.1 Briefing para pegar

```
Estás editando el sitio web de Ankabasi (sitio estático Astro).

Lee docs/OPERATOR-GUIDE.md y síguelo.

Fuente de verdad: src/ y public/. Nunca edites index.html, css/ ni js/ de la raíz (legado).
No tomes AGENTS.md como la especificación actual del producto.

Después de los cambios: ejecuta npm test y npm run build. Corrige los fallos. No debilites
los content-guards salvo que la persona usuaria haya cambiado esa regla de producto.

Despliega solo si te lo piden: npm run deploy (las credenciales FTP están en .env, ignorado por git).
```

### 11.2 Pedidos buenos

- «Cambia el número de WhatsApp a +57 … en la fuente de verdad y en cualquier sitio donde esté escrito a mano.»
- «Añade un ítem de FAQ en es/en/de/fr sobre el tamaño del grupo, y deja el teaser del home en tres preguntas.»
- «Sustituye la imagen de galería foto12.jpeg; mantén un alt factual.»
- «Sube el precio de 1 día a $800.000 en todos los sitios donde se listen precios, y actualiza el test content-guard.»

### 11.3 Pedidos malos (el asistente probablemente rompa tests o archivos equivocados)

- «Actualiza el index.html de la raíz.»
- «Haz que el hero diga otra vez Una Experiencia Ancestral.»
- «Inventa tres testimonios de María, Juan y Ana.»
- «Borra los tests que fallan.»

### 11.4 Qué debe ejecutar el asistente

```bash
npm test
npm run build
```

Opcional: `npm run deploy:ftp:dry` para confirmar que el nuevo `dist/` sigue siendo subible.

---

## 12. Restricciones de marca al editar textos

- Respeta la cultura arhuaca. Sin lenguaje de espectáculo, sin «trabajo espiritual para turistas», sin branding ancestral falso como titular de la empresa.
- ANKABASI es una **empresa tecnológica y digital** de Gwimake (tecnología, contenido, educación, emprendimiento, intercambio cultural).
- Estancias culturales: punto de encuentro **Aracataca**, destino **Gwimake**, alojamiento hamaca/bohío, acompañamiento — no es un producto de hotel.
- Pregunta antes de implicar derechos de fotografía o de nombrar personas en testimonios.
- La línea de apoyo Universidad del Magdalena / Asoarhuaco / Cabildo está en `main.support` (HTML) en `ui.ts`. No quites nombres de aliados sin una decisión humana.

---

## 13. Solución de problemas

| Síntoma | Qué probar |
|---------|------------|
| `engine` / Node demasiado antiguo | Instala Node ≥ 22.12 y abre una terminal nueva |
| `Cannot find package 'astro'` | Ejecuta `npm install` en la raíz del repo |
| Puerto 4321 ocupado | Detén el otro `npm run dev`, o Astro elegirá otro puerto (lee la terminal) |
| Estilos/imágenes faltan en local | Estás abriendo el `index.html` de la raíz en el navegador. Usa `npm run dev` |
| El build falla por TypeScript | Lee el primer error en `src/`; `tsconfig` es estricto |
| `npm test` falla tras un cambio de copy | O reviertes la phrasing prohibida o actualizas el guard **y** los cuatro idiomas |
| `Missing FTP settings` | Crea `.env` a partir de `.env.example` |
| `Build output folder not found` | Ejecuta `npm run build` antes de `deploy:ftp` |
| Falla el login FTP | Confirma host/usuario/contraseña/puerto. Prueba `FTP_SECURE=true`. Algunos hosts quieren `ftp.dominio.com`, otros el dominio |
| Error de certificado FTPS | `FTP_TLS_REJECT_UNAUTHORIZED=false` (solo si confías en ese host) |
| La subida funciona pero sigue el sitio viejo | Subiste a la carpeta remota equivocada, hay caché/CDN, o subiste la raíz git en vez de `dist/` |
| `/es/` da 404 en el servidor | `FTP_REMOTE_DIR` no es la raíz web, o están desactivados trailing-slash / directory-index (pide al host que sirva `index.html` dentro de las carpetas) |
| URLs del sitemap incorrectas | `astro.config.mjs` `site` debe ser `https://ankabasi.com` |
| WhatsApp abre el chat equivocado | `SITE.whatsappE164` en `site.ts` (solo dígitos) |
| El lector del libro se ve sin estilos | Desplegaste el `libro/index.html` legado en vez del `dist/libro/` de Astro |
| El selector de idioma te manda a la guía equivocada | Los mapas de slug en `src/i18n/routes.ts` deben incluir esa página |

---

## 14. Seguridad

- Nunca subas a git `.env`, contraseñas ni volcados FTP.
- Nunca pongas claves privadas de Formspree/EmailJS en JS de cliente si más adelante añades un formulario.
- `--clean` puede borrar archivos en el servidor. Mantén `FTP_REMOTE_DIR` acotado a la raíz web de este sitio.
- Producción son archivos estáticos. No hay servidor de aplicación, base de datos ni login.

---

## 15. Qué significa «listo» en un cambio de contenido típico

1. Edita los archivos de [§6.2](#62-datos-y-textos-casi-todos-los-cambios-de-contenido-viven-aquí) / [§7](#7-recetario-cambiar-x).
2. `npm test` — todo en verde.
3. `npm run build` — termina bien; `dist/` actualizado.
4. `npm run preview` — revisa el cambio en todos los idiomas que hayas tocado.
5. `npm run deploy` — cuando una persona pida publicar.
6. Pasa la [lista post-deploy](#105-después-de-cada-deploy-lista).

---

## 16. Referencia: scripts npm (fuente de verdad en `package.json`)

```text
dev              astro dev
build            astro build
preview          astro preview
test             node --test scripts/content-guards.test.mjs scripts/ftp-deploy.test.mjs
deploy           npm run build && node scripts/ftp-deploy.mjs
deploy:ftp       node scripts/ftp-deploy.mjs
deploy:ftp:dry   node scripts/ftp-deploy.mjs --dry-run
deploy:ftp:check node scripts/ftp-deploy.mjs --check
```
