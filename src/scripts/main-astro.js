// Client helpers for Astro pages (nav scroll, header, gallery filters)

function onReady(fn) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', fn);
	} else {
		fn();
	}
}

onReady(() => {
	// Smooth scroll for same-page hashes (/es/#contacto)
	document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			const href = anchor.getAttribute('href');
			if (!href || href.startsWith('http')) return;
			const hashIndex = href.indexOf('#');
			if (hashIndex === -1) return;
			const hash = href.slice(hashIndex);
			if (hash === '#') return;
			const pathOnly = href.slice(0, hashIndex);
			const currentPath = window.location.pathname.replace(/\/?$/, '/');
			const targetPath = pathOnly
				? new URL(pathOnly, window.location.origin).pathname.replace(/\/?$/, '/')
				: currentPath;
			if (targetPath !== currentPath && pathOnly) return;
			const target = document.querySelector(hash);
			if (!target) return;
			e.preventDefault();
			const headerOffset = 70;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
			window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
			const menu = document.getElementById('nav-menu');
			const toggle = document.getElementById('nav-toggle');
			if (menu) menu.classList.remove('active');
			if (toggle) {
				toggle.classList.remove('active');
				toggle.setAttribute('aria-expanded', 'false');
			}
		});
	});

	const header = document.getElementById('header');
	if (header) {
		window.addEventListener('scroll', () => {
			header.classList.toggle('scrolled', window.scrollY > 50);
		});
	}

	const dropdowns = document.querySelectorAll('.nav__dropdown, .lang-switcher');
	dropdowns.forEach((el) => {
		el.addEventListener('toggle', () => {
			if (!el.open) return;
			dropdowns.forEach((other) => {
				if (other !== el) other.open = false;
			});
		});
	});
	document.addEventListener('click', (e) => {
		const target = e.target;
		if (!(target instanceof Node)) return;
		dropdowns.forEach((el) => {
			if (!el.contains(target)) el.open = false;
		});
	});

	const filters = document.querySelectorAll('.gallery__filter');
	const items = document.querySelectorAll('.gallery__item');
	filters.forEach((btn) => {
		btn.addEventListener('click', () => {
			const filter = btn.getAttribute('data-filter') || 'all';
			filters.forEach((b) => b.classList.remove('active'));
			btn.classList.add('active');
			items.forEach((item) => {
				const cat = item.getAttribute('data-category');
				const show = filter === 'all' || cat === filter;
				item.style.display = show ? '' : 'none';
			});
		});
	});

	const moreBtn = document.querySelector('.gallery__more');
	if (moreBtn) {
		moreBtn.addEventListener('click', () => {
			document.querySelectorAll('.gallery__item.is-hidden').forEach((el) => {
				el.classList.remove('is-hidden');
			});
			moreBtn.remove();
		});
	}
});
