import type { Locale } from './utils';
import { localePath } from './utils';

export const pageSlugs = {
	experiencias: 'experiencias/',
	territorio: 'territorio/',
	galeria: 'galeria/',
	tecnologia: 'tecnologia/',
	formacion: 'formacion/',
	productos: 'productos/',
	contacto: 'contacto/',
} as const;

export type PageKey = keyof typeof pageSlugs;

export function pagePath(locale: Locale, key: PageKey): string {
	return localePath(locale, pageSlugs[key]);
}

export const guideSlugs = {
	packages: { es: 'paquetes', en: 'packages', de: 'pakete', fr: 'forfaits' },
	howToGetThere: {
		es: 'como-llegar',
		en: 'how-to-get-there',
		de: 'anreise',
		fr: 'comment-y-aller',
	},
	responsibleVisit: {
		es: 'visita-responsable',
		en: 'responsible-visit',
		de: 'verantwortungsvoll-reisen',
		fr: 'visite-responsable',
	},
	whatToExpect: {
		es: 'que-esperar',
		en: 'what-to-expect',
		de: 'was-dich-erwartet',
		fr: 'a-quoi-sattendre',
	},
	faq: { es: 'faq', en: 'faq', de: 'faq', fr: 'faq' },
} as const;

export type GuideKey = keyof typeof guideSlugs;

export function guidePath(locale: Locale, key: GuideKey): string {
	return localePath(locale, guideSlugs[key][locale]);
}

export function faqPath(locale: Locale): string {
	return guidePath(locale, 'faq');
}

/** Find guide key from a URL slug in any locale. */
export function guideKeyFromSlug(slug: string): GuideKey | null {
	for (const key of Object.keys(guideSlugs) as GuideKey[]) {
		const variants = Object.values(guideSlugs[key]);
		if (variants.includes(slug)) return key;
	}
	return null;
}

export const localeNames: Record<Locale, string> = {
	es: 'Español',
	en: 'English',
	de: 'Deutsch',
	fr: 'Français',
};
