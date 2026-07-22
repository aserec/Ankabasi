/**
 * Ankabasi — blog article page i18n renderer
 */
(function () {
    'use strict';

    var DATE_LOCALES = {
        es: 'es-CO',
        en: 'en-US',
        de: 'de-DE',
        fr: 'fr-FR',
    };

    var lightboxInstance = null;

    function getSlug() {
        var article = document.querySelector('.blog-article[data-blog-slug]');
        if (article) return article.getAttribute('data-blog-slug');
        var path = window.location.pathname.split('/').pop() || '';
        return path.replace(/\.html$/, '');
    }

    function formatDate(dateStr, lang) {
        var locale = DATE_LOCALES[lang] || 'es-CO';
        var date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function getPostMeta(slug) {
        if (typeof BLOG_POSTS === 'undefined') return null;
        return BLOG_POSTS.find(function (p) {
            return p.slug === slug;
        });
    }

    function initLightbox() {
        if (typeof GLightbox === 'undefined') return;
        if (lightboxInstance && lightboxInstance.destroy) {
            lightboxInstance.destroy();
        }
        lightboxInstance = GLightbox({ selector: '.glightbox' });
    }

    function renderArticle() {
        var slug = getSlug();
        if (!slug || typeof getBlogPostContent !== 'function') return;

        var lang =
            window.AnkabasiI18n && window.AnkabasiI18n.getLang
                ? window.AnkabasiI18n.getLang()
                : 'es';
        var content = getBlogPostContent(slug, lang);
        var meta = getPostMeta(slug);
        if (!content) return;

        document.title = content.title + ' — Ankabasi';

        var desc = document.querySelector('meta[name="description"]');
        if (desc && content.metaDescription) {
            desc.setAttribute('content', content.metaDescription);
        }

        var breadcrumbCurrent = document.querySelector(
            '.blog-breadcrumb span:last-child'
        );
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = content.title;

        var dateEl = document.querySelector('.blog-article__date');
        if (dateEl && meta) {
            dateEl.textContent = formatDate(meta.date, lang);
        }

        var titleEl = document.querySelector('.blog-article__title');
        if (titleEl) titleEl.textContent = content.title;

        var featuredImg = document.querySelector(
            '.blog-article__featured img'
        );
        if (featuredImg && content.featuredAlt) {
            featuredImg.alt = content.featuredAlt;
        }

        var contentEl = document.querySelector('.blog-article__content');
        if (contentEl && content.bodyHtml) {
            contentEl.innerHTML = content.bodyHtml;
        }

        var nav = document.querySelector('.blog-article__nav');
        if (nav) {
            nav.innerHTML = '';

            if (content.navPrev) {
                var prevLink = document.createElement('a');
                prevLink.href = content.navPrev.slug + '.html';
                prevLink.className = 'blog-article__nav-link';
                prevLink.innerHTML =
                    '<span data-i18n="blog.prev">Artículo anterior</span> ' +
                    content.navPrev.title;
                nav.appendChild(prevLink);
            }

            if (content.navNext) {
                var nextLink = document.createElement('a');
                nextLink.href = content.navNext.slug + '.html';
                nextLink.className =
                    'blog-article__nav-link blog-article__nav-link--next';
                nextLink.innerHTML =
                    '<span data-i18n="blog.next">Artículo siguiente</span> ' +
                    content.navNext.title;
                nav.appendChild(nextLink);
            }
        }

        if (window.AnkabasiI18n) {
            document.querySelectorAll('[data-i18n]').forEach(function (el) {
                var key = el.getAttribute('data-i18n');
                if (key) el.textContent = window.AnkabasiI18n.t(key);
            });
        }

        initLightbox();
    }

    document.addEventListener('DOMContentLoaded', renderArticle);
    document.addEventListener('ankabasi:languagechange', renderArticle);
})();
