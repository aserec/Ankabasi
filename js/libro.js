/**
 * Ankabasi — libro reader (TOC, progress, navigation)
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'ankabasi-libro-position';

    var sections = [];
    var tocLinks = [];
    var currentIndex = 0;

    function getSections() {
        return Array.from(document.querySelectorAll('.libro-section[id]'));
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
        tocLinks = Array.from(document.querySelectorAll('.libro-toc__link'));

        tocLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var id = link.getAttribute('href').slice(1);
                var el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    closeSidebar();
                }
            });
        });
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

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.querySelector('.libro-layout')) return;

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
    });
})();
