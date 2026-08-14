/** Single source of truth for entity facts (SEO/GEO + schema). */
export const SITE = {
	name: 'Ankabasi',
	legalName: 'Ankabasi',
	url: 'https://ankabasi.com',
	email: 'info@ankabasi.com',
	emailAlt: 'contacto@ankabasi.com',
	phoneDisplay: '+57 310 553 3470',
	phoneE164: '+573105533470',
	whatsappE164: '573107186797',
	instagram: 'https://www.instagram.com/ankabasi',
	localeDefault: 'es',
	place: {
		community: 'Gwimake',
		communityUrl: 'https://gwimake.com/',
		region: 'Sierra Nevada de Santa Marta',
		country: 'Colombia',
		meetingPoint: 'Aracataca, Magdalena',
	},
	offers: [
		{
			id: '1d1n',
			duration: '1 day / 1 night',
			priceFromCOP: 700_000,
			priceDisplay: '$700.000',
		},
		{
			id: '3d2n',
			duration: '3 days / 2 nights',
			priceFromCOP: 1_300_000,
			priceDisplay: '$1.300.000',
			featured: true,
		},
		{
			id: '1w',
			duration: '1 week',
			priceFromCOP: null,
			priceDisplay: null,
		},
	],
	ogImage: '/images/gallery/foto4.jpeg',
	sameAs: ['https://www.instagram.com/ankabasi', 'https://gwimake.com/'],
} as const;

export function organizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE.name,
		legalName: SITE.legalName,
		url: SITE.url,
		email: SITE.email,
		telephone: SITE.phoneDisplay,
		image: `${SITE.url}${SITE.ogImage}`,
		address: {
			'@type': 'PostalAddress',
			addressLocality: SITE.place.community,
			addressRegion: SITE.place.region,
			addressCountry: SITE.place.country,
		},
		sameAs: SITE.sameAs,
		description:
			'Technology and digital company of the Arhuaco community of Gwimake, connecting territory and world through technology, knowledge, education, content, and cultural exchange.',
	};
}
