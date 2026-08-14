// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://ankabasi.com',
	trailingSlash: 'always',
	vite: {
		plugins: [
			{
				name: 'libro-index-html',
				configureServer(server) {
					server.middlewares.use((req, _res, next) => {
						const [pathname, search] = (req.url ?? '').split('?');
						if (pathname === '/libro/index.html') {
							req.url = search ? `/libro/?${search}` : '/libro/';
						}
						next();
					});
				},
			},
		],
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: {
					es: 'es-CO',
					en: 'en',
					de: 'de',
					fr: 'fr',
				},
			},
		}),
	],
});
