/**
 * Ankabasi — libro reader (TOC, progress, navigation, i18n)
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'ankabasi-libro-position';

    var sections = [];
    var tocLinks = [];
    var currentIndex = 0;

    function getLang() {
        return window.AnkabasiI18n && window.AnkabasiI18n.getLang
            ? window.AnkabasiI18n.getLang()
            : 'es';
    }

    function getSections() {
        return Array.from(document.querySelectorAll('.libro-section[id]'));
    }

    function renderSectionContent(sectionEl, sectionData) {
        if (!sectionData) return;

        sectionEl.setAttribute('data-nav-title', sectionData.navTitle);

        var partEl = sectionEl.querySelector('.libro-section__part');
        if (partEl) {
            if (sectionData.part) {
                partEl.textContent = sectionData.part;
                partEl.hidden = false;
            } else {
                partEl.hidden = true;
            }
        }

        var titleEl =
            sectionEl.querySelector('.libro-portada__title') ||
            sectionEl.querySelector('.libro-section__title');
        if (titleEl && sectionData.title) {
            titleEl.textContent = sectionData.title;
        }

        var subtitleEl =
            sectionEl.querySelector('.libro-portada__subtitle') ||
            sectionEl.querySelector('.libro-section__subtitle');
        if (subtitleEl) {
            if (sectionData.subtitle) {
                subtitleEl.textContent = sectionData.subtitle;
                subtitleEl.hidden = false;
            } else {
                subtitleEl.hidden = true;
            }
        }

        var contentEl = sectionEl.querySelector('.libro-section__content');
        if (contentEl && sectionData.paragraphs && sectionData.paragraphs.length) {
            contentEl.innerHTML = sectionData.paragraphs
                .map(function (p) {
                    return '<p>' + p + '</p>';
                })
                .join('');
        }
    }

    function renderToc(lang) {
        var content =
            typeof getLibroContent === 'function'
                ? getLibroContent(lang)
                : null;
        var tocNav = document.querySelector('.libro-toc');
        if (!tocNav || !content || !content.toc) return;

        tocNav.innerHTML = content.toc
            .map(function (part) {
                return (
                    '<div class="libro-toc__part">' +
                    '<p class="libro-toc__part-title">' +
                    part.partTitle +
                    '</p>' +
                    '<ul class="libro-toc__list">' +
                    part.links
                        .map(function (link) {
                            return (
                                '<li><a href="' +
                                link.href +
                                '" class="libro-toc__link">' +
                                link.label +
                                '</a></li>'
                            );
                        })
                        .join('') +
                    '</ul></div>'
                );
            })
            .join('');
    }

    function applyLibroI18n() {
        if (typeof getLibroContent !== 'function') return;

        var lang = getLang();
        var content = getLibroContent(lang);

        document.title = content.meta.title;
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', content.meta.description);

        var headerTitle = document.querySelector('.libro-header__title');
        if (headerTitle && content.sections.portada) {
            headerTitle.textContent = content.sections.portada.title;
        }

        renderToc(lang);

        Object.keys(content.sections).forEach(function (sectionId) {
            var sectionEl = document.getElementById(sectionId);
            if (sectionEl) {
                renderSectionContent(sectionEl, content.sections[sectionId]);
            }
        });

        sections = getSections();
        tocLinks = Array.from(document.querySelectorAll('.libro-toc__link'));
        setActiveToc(getActiveSectionIndex());
    }

    function updateProgress() {
        var bar = document.getElementById('libro-progress-bar');
        if (!bar) return;

        var scrollTop = window.pageYOffset;
        var docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }

    function getActiveSectionIndex() {
        var scrollY = window.pageYOffset + 100;
        var active = 0;

        sections.forEach(function (section, i) {
            if (section.offsetTop <= scrollY) {
                active = i;
            }
        });

        return active;
    }

    function setActiveToc(index) {
        currentIndex = index;
        var activeId = sections[index] ? sections[index].id : '';

        tocLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + activeId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        updateNavButtons();
    }

    function updateNavButtons() {
        var prevBtn = document.getElementById('libro-prev');
        var nextBtn = document.getElementById('libro-next');
        if (!prevBtn || !nextBtn) return;

        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= sections.length - 1;

        if (sections[currentIndex - 1]) {
            prevBtn.querySelector('.libro-nav-bottom__text').textContent =
                sections[currentIndex - 1].getAttribute('data-nav-title') ||
                sections[currentIndex - 1].querySelector('.libro-section__title')
                    ?.textContent ||
                '';
        }

        if (sections[currentIndex + 1]) {
            nextBtn.querySelector('.libro-nav-bottom__text').textContent =
                sections[currentIndex + 1].getAttribute('data-nav-title') ||
                sections[currentIndex + 1].querySelector('.libro-section__title')
                    ?.textContent ||
                '';
        }
    }

    function scrollToSection(index) {
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            closeSidebar();
        }
    }

    function openSidebar() {
        var sidebar = document.getElementById('libro-sidebar');
        var overlay = document.getElementById('libro-sidebar-overlay');
        if (sidebar) sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        var sidebar = document.getElementById('libro-sidebar');
        var overlay = document.getElementById('libro-sidebar-overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function savePosition() {
        if (sections[currentIndex]) {
            try {
                localStorage.setItem(STORAGE_KEY, sections[currentIndex].id);
            } catch (e) {
                /* ignore */
            }
        }
    }

    function restorePosition() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return;
            var el = document.getElementById(saved);
            if (el && !window.location.hash) {
                setTimeout(function () {
                    el.scrollIntoView();
                }, 300);
            }
        } catch (e) {
            /* ignore */
        }
    }

    function initScrollSpy() {
        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateProgress();
                    setActiveToc(getActiveSectionIndex());
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('beforeunload', savePosition);
    }

    function initToc() {
        var tocNav = document.querySelector('.libro-toc');
        if (!tocNav || tocNav.dataset.bound === 'true') return;

        tocNav.addEventListener('click', function (e) {
            var link = e.target.closest('.libro-toc__link');
            if (!link) return;
            e.preventDefault();
            var id = link.getAttribute('href').slice(1);
            var el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                closeSidebar();
            }
        });

        tocNav.dataset.bound = 'true';
        tocLinks = Array.from(document.querySelectorAll('.libro-toc__link'));
    }

    function initNav() {
        var prevBtn = document.getElementById('libro-prev');
        var nextBtn = document.getElementById('libro-next');
        var tocBtn = document.getElementById('libro-toc-toggle');
        var overlay = document.getElementById('libro-sidebar-overlay');

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (currentIndex > 0) scrollToSection(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (currentIndex < sections.length - 1)
                    scrollToSection(currentIndex + 1);
            });
        }

        if (tocBtn) {
            tocBtn.addEventListener('click', openSidebar);
        }

        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
    }

    function init() {
        if (!document.querySelector('.libro-layout')) return;

        applyLibroI18n();
        sections = getSections();
        initToc();
        initNav();
        initScrollSpy();
        updateProgress();
        setActiveToc(getActiveSectionIndex());
        restorePosition();

        if (window.location.hash) {
            var target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(function () {
                    target.scrollIntoView();
                }, 100);
            }
        }
    }

    document.addEventListener('DOMContentLoaded', init);
    document.addEventListener('ankabasi:languagechange', function () {
        if (!document.querySelector('.libro-layout')) return;
        applyLibroI18n();
    });
})();
