// ===== Inicialización AOS =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// ===== Navegación Mobile =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Scroll Suave =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== Form Validation Helper =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9+\s()-]{10,}$/;
    return re.test(phone);
}

// ===== Lazy Loading Images =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Parallax Effect (Opcional) =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const experience = document.querySelector('.experience');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (experience) {
        const experienceTop = experience.offsetTop;
        const experienceHeight = experience.offsetHeight;
        
        if (scrolled > experienceTop - window.innerHeight && scrolled < experienceTop + experienceHeight) {
            const parallaxSpeed = 0.3;
            experience.style.backgroundPositionY = `${(scrolled - experienceTop) * parallaxSpeed}px`;
        }
    }
});

// ===== Smooth Scroll Polyfill para navegadores antiguos =====
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
    document.body.appendChild(script);
}

// ===== Preloader (Opcional) =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== Back to Top Button (Opcional) =====
const createBackToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Volver arriba');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
    if (window.AnkabasiI18n && typeof window.AnkabasiI18n.updateBackToTopAria === 'function') {
        window.AnkabasiI18n.updateBackToTopAria();
    }
};

// Crear botón de volver arriba
createBackToTop();

// ===== Google Maps API (Para usar cuando se agregue la API key) =====
/*
// Descomenta y configura cuando tengas tu API key de Google Maps
function initMap() {
    // Coordenadas del centro de Aracataca (pueblo), Magdalena, Colombia
    const aracataca = { lat: 10.591944, lng: -74.189722 };
    
    // Crear el mapa centrado en Aracataca
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: aracataca,
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });
    
    // Agregar marcador
    const marker = new google.maps.Marker({
        position: aracataca,
        map: map,
        title: 'Aracataca - Punto de encuentro para Ankabasi',
        animation: google.maps.Animation.DROP
    });
    
    // Info window con información
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #2d5016;">Aracataca</h3>
                <p style="margin: 0; color: #4a4a4a;">
                    Punto de encuentro para comenzar el viaje hacia Gwimake
                </p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Para usar esta función:
// 1. Obtén una API key de Google Maps en: https://console.cloud.google.com/
// 2. Reemplaza 'TU_API_KEY_AQUI' en el script del HTML con tu API key
// 3. Descomenta el script y el div#map en index.html
// 4. Comenta o elimina el iframe de Google Maps
*/







