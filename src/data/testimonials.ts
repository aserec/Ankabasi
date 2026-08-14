export type TestimonialLang = 'es' | 'en' | 'de' | 'fr';

export interface Testimonial {
	id: string;
	name: string;
	location: string;
	lang: TestimonialLang;
	quote: string;
	stars: 4 | 5;
}

export const TESTIMONIALS: Testimonial[] = [
	{
		id: 'daniel-en',
		name: 'Daniel Hart',
		location: 'Bristol, United Kingdom',
		lang: 'en',
		stars: 5,
		quote:
			'Spending time in Gwimake changed how I think about land and community. We were not treated as tourists passing through — people took time to walk, share meals, and talk. I left with more questions than answers, in the best way.',
	},
	{
		id: 'priya-en',
		name: 'Priya Nair',
		location: 'Edinburgh, United Kingdom',
		lang: 'en',
		stars: 5,
		quote:
			'The journey into the Sierra Nevada is already unforgettable, but the real gift was the conversation. Listening to Arhuaco knowledge about territory and care made me rethink what development even means.',
	},
	{
		id: 'thomas-en',
		name: 'Thomas Reed',
		location: 'Portland, United States',
		lang: 'en',
		stars: 4,
		quote:
			'I came looking for a beautiful landscape and found a living culture that asks you to slow down. The food, the stories, and the mountain stay with you long after you leave Aracataca.',
	},
	{
		id: 'lea-fr',
		name: 'Léa Morel',
		location: 'Lyon, France',
		lang: 'fr',
		stars: 5,
		quote:
			'À Gwimake, on n’arrive pas simplement pour visiter. On écoute, on marche, on partage la table. Cette rencontre avec le territoire arhuaco m’a profondément marquée — avec respect, sans spectacle.',
	},
	{
		id: 'jonas-de',
		name: 'Jonas Weber',
		location: 'Hamburg, Deutschland',
		lang: 'de',
		stars: 5,
		quote:
			'Gwimake ist kein Reiseprodukt. Man kommt, hört zu und versteht langsam, was Territorium für die Arhuaco-Gemeinschaft bedeutet. Die Tage in der Sierra Nevada haben meine Sicht auf Natur und Verantwortung verändert.',
	},
	{
		id: 'anna-de',
		name: 'Anna Schäfer',
		location: 'Freiburg, Deutschland',
		lang: 'de',
		stars: 5,
		quote:
			'Das Essen, die Wege, die Gespräche: alles war schlicht und echt. Ich habe gelernt, weniger zu konsumieren und mehr zuzuhören. Danke an die Menschen, die uns aufgenommen haben.',
	},
	{
		id: 'stefan-es',
		name: 'Stefan Hoffmann',
		location: 'Köln, Alemania',
		lang: 'es',
		stars: 5,
		quote:
			'Gwimake es un lugar muy especial. Yo he caminado en la montana con la comunidad y ellos nos recibir con mucho respeto. El comida es bueno, el naturaleza es impresionante. Yo pensar ahora diferente sobre el territorio. Gracias para esta experiencia.',
	},
	{
		id: 'helen-es',
		name: 'Helen Brooks',
		location: 'Manchester, Reino Unido',
		lang: 'es',
		stars: 5,
		quote:
			'Yo tuve un tiempo muy bueno en Gwimake. El gente es muy amable y yo aprender mucho de su cultura. El naturaleza es tan grande y hermoso. Yo nunca ver un lugar como este antes. Gracias por compartir su casa y su comida con nosotros, es algo que yo no olvido.',
	},
];
