import { ui } from './ui';

export const locales = ['es', 'en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

function lookup(tree: unknown, key: string): unknown {
	return key.split('.').reduce<unknown>((acc, part) => {
		if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
			return (acc as Record<string, unknown>)[part];
		}
		return undefined;
	}, tree);
}

/** Resolve a dotted UI key for a locale (falls back to Spanish). */
export function t(locale: Locale, key: string): string {
	const primary = lookup(ui[locale], key);
	if (typeof primary === 'string') return primary;
	const fallback = lookup(ui.es, key);
	if (typeof fallback === 'string') return fallback;
	return key;
}

export function tHtml(locale: Locale, key: string): string {
	return t(locale, key);
}

export function localePath(locale: Locale, path = ''): string {
	const clean = path.replace(/^\/+/, '');
	return clean ? `/${locale}/${clean}` : `/${locale}/`;
}
