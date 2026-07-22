// ===== Gallery Filter =====
let galleryLightbox = null;

function getGalleryMoreText() {
    if (window.AnkabasiI18n && typeof window.AnkabasiI18n.t === 'function') {
        return window.AnkabasiI18n.t('gallery.moreText');
    }
    return 'Ver más';
}

function initGalleryLightbox() {
    if (galleryLightbox) {
        try {
            if (typeof galleryLightbox.destroy === 'function') {
                galleryLightbox.destroy();
            }
        } catch (e) {}
        galleryLightbox = null;
    }
    galleryLightbox = GLightbox({
        selector: '.gallery__link',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        slideEffect: 'slide',
        moreText: getGalleryMoreText(),
        moreLength: 60,
        closeButton: true,
        touchFollowAxis: true,
        keyboardNavigation: true,
        closeOnOutsideClick: true,
        draggable: true
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.gallery__filter');
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remover active de todos los filtros
            filters.forEach(f => f.classList.remove('active'));
            // Agregar active al filtro clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                    // Re-animar con AOS
                    item.setAttribute('data-aos', 'fade-up');
                    AOS.refresh();
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    initGalleryLightbox();
});

document.addEventListener('ankabasi:languagechange', initGalleryLightbox);

// ===== Lazy Load Gallery Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery__image[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

