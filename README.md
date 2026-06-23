# Ankabasi - Página Web de Intercambio Cultural

Página web moderna de una sola página (SPA) para Ankabasi, experiencias de intercambio cultural en la Sierra Nevada de Santa Marta con los Arhuacos en Gwimake.

## 🚀 Características

- ✅ Diseño moderno y responsivo
- ✅ Animaciones sutiles al hacer scroll
- ✅ Galería de fotos y videos con lightbox
- ✅ Formulario de contacto con validación
- ✅ Sección de precios y formatos de experiencia
- ✅ Testimonios de visitantes
- ✅ Navegación suave entre secciones
- ✅ Optimizado para móvil, tablet y desktop

## 📁 Estructura de Archivos

```
Ankabasi/
├── index.html              # Página principal
├── css/
│   ├── style.css          # Estilos principales
│   └── responsive.css     # Estilos responsive
├── js/
│   ├── main.js            # Navegación, scroll y efectos
│   ├── gallery.js         # Galería y filtros
│   └── contact.js         # Formulario de contacto
├── images/                 # Imágenes (agregar tus propias imágenes)
│   ├── hero/
│   ├── gallery/
│   └── testimonials/
└── videos/                # Videos (opcional)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **JavaScript (Vanilla)**: Funcionalidades interactivas
- **Librerías Externas**:
  - [AOS](https://michalsnik.github.io/aos/) - Animate On Scroll
  - [GLightbox](https://biati-digital.github.io/glightbox/) - Lightbox para galería
  - [Google Fonts](https://fonts.google.com/) - Montserrat y Open Sans

## 📦 Instalación

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo! No requiere servidor para desarrollo local

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






























