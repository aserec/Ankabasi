/**
 * Ankabasi — blog utilities and listing renderer
 */
(function () {
    'use strict';

    function formatDate(dateStr, locale) {
        var date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString(locale || 'es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function getSortedPosts(posts) {
        return posts.slice().sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    function getPostBySlug(posts, slug) {
        return posts.find(function (p) {
            return p.slug === slug;
        });
    }

    function getAdjacentPosts(posts, slug) {
        var sorted = getSortedPosts(posts);
        var index = sorted.findIndex(function (p) {
            return p.slug === slug;
        });
        return {
            prev: index < sorted.length - 1 ? sorted[index + 1] : null,
            next: index > 0 ? sorted[index - 1] : null,
        };
    }

    function postHref(post, basePath, inBlogFolder) {
        if (inBlogFolder) {
            return post.slug + '.html';
        }
        return (basePath || '') + 'blog/' + post.slug + '.html';
    }

    function renderBlogCard(post, readMoreLabel, basePath, inBlogFolder) {
        basePath = basePath || '';
        var href = postHref(post, basePath, inBlogFolder);
        return (
            '<article class="blog-card" data-aos="fade-up">' +
            '<a href="' +
            href +
            '">' +
            '<img class="blog-card__image" src="' +
            post.featuredImage +
            '" alt="' +
            post.title +
            '" loading="lazy">' +
            '</a>' +
            '<div class="blog-card__body">' +
            '<time class="blog-card__date" datetime="' +
            post.date +
            '">' +
            formatDate(post.date) +
            '</time>' +
            '<h2 class="blog-card__title">' +
            '<a href="' +
            href +
            '">' +
            post.title +
            '</a>' +
            '</h2>' +
            '<p class="blog-card__excerpt">' +
            post.excerpt +
            '</p>' +
            '<a href="' +
            href +
            '" class="btn btn--primary blog-card__link">' +
            readMoreLabel +
            '</a>' +
            '</div>' +
            '</article>'
        );
    }

    function renderBlogList(container, posts, options) {
        if (!container || !posts) return;
        options = options || {};
        var readMore =
            options.readMore ||
            (window.AnkabasiI18n && container.getAttribute('data-read-more-key')
                ? window.AnkabasiI18n.t(container.getAttribute('data-read-more-key'))
                : null) ||
            container.getAttribute('data-read-more') ||
            'Leer artículo';
        var basePath = options.basePath || '';
        var inBlogFolder =
            options.inBlogFolder ||
            container.getAttribute('data-in-blog-folder') === 'true';
        var sorted = getSortedPosts(posts);
        container.innerHTML = sorted
            .map(function (post) {
                return renderBlogCard(post, readMore, basePath, inBlogFolder);
            })
            .join('');
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    function initBlogLists() {
        var listEl = document.getElementById('blog-list');
        if (listEl && typeof BLOG_POSTS !== 'undefined') {
            renderBlogList(listEl, BLOG_POSTS);
        }

        var homeEl = document.getElementById('blog-teaser-list');
        if (homeEl && typeof BLOG_POSTS_HOME !== 'undefined') {
            var limit = parseInt(homeEl.getAttribute('data-limit') || '2', 10);
            var sorted = getSortedPosts(BLOG_POSTS_HOME).slice(0, limit);
            var readMore =
                (window.AnkabasiI18n && homeEl.getAttribute('data-read-more-key')
                    ? window.AnkabasiI18n.t(homeEl.getAttribute('data-read-more-key'))
                    : null) ||
                homeEl.getAttribute('data-read-more') ||
                'Leer más';
            homeEl.innerHTML = sorted
                .map(function (post) {
                    return renderBlogCard(post, readMore, '');
                })
                .join('');
        }
    }

    document.addEventListener('DOMContentLoaded', initBlogLists);
    document.addEventListener('ankabasi:languagechange', initBlogLists);

    window.AnkabasiBlog = {
        formatDate: formatDate,
        getSortedPosts: getSortedPosts,
        getPostBySlug: getPostBySlug,
        getAdjacentPosts: getAdjacentPosts,
        renderBlogList: renderBlogList,
        renderBlogCard: renderBlogCard,
    };
})();
