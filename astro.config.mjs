// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://ankabasi.com',
	trailingSlash: 'always',
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
