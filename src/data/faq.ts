import type { Locale } from '../i18n/utils';

export interface FaqItem {
	id: string;
	question: Record<Locale, string>;
	answer: Record<Locale, string>;
}

export const faqItems: FaqItem[] = [
	{
		id: 'what-is',
		question: {
			es: '¿Qué es ANKABASI?',
			en: 'What is ANKABASI?',
			de: 'Was ist ANKABASI?',
			fr: 'Qu’est-ce qu’ANKABASI ?',
		},
		answer: {
			es: 'ANKABASI es una empresa tecnológica y digital que nace desde la comunidad Arhuaca de Gwimake. Integramos tecnología, cultura, educación, contenido e intercambio cultural para generar conexiones entre el territorio y personas, instituciones y organizaciones de diferentes partes del mundo. Las experiencias de intercambio cultural son una de las líneas de servicio de ANKABASI.',
			en: 'ANKABASI is a technology and digital company born from the Arhuaco community of Gwimake. We integrate technology, culture, education, content, and cultural exchange to connect the territory with people, institutions, and organizations around the world. Cultural exchange experiences are one of ANKABASI’s service lines.',
			de: 'ANKABASI ist ein Technologie- und Digitalunternehmen, das aus der Arhuaco-Gemeinschaft von Gwimake entsteht. Wir verbinden Technologie, Kultur, Bildung, Inhalte und kulturellen Austausch, um das Territorium mit Menschen, Institutionen und Organisationen weltweit zu verknüpfen. Der kulturelle Austausch ist eine der Leistungslinien von ANKABASI.',
			fr: 'ANKABASI est une entreprise technologique et numérique née de la communauté arhuaco de Gwimake. Nous intégrons technologie, culture, éducation, contenus et échange culturel pour relier le territoire à des personnes, institutions et organisations du monde entier. Les expériences d’échange culturel sont l’une des lignes de service d’ANKABASI.',
		},
	},
	{
		id: 'where',
		question: {
			es: '¿Dónde ocurre la experiencia?',
			en: 'Where does the experience take place?',
			de: 'Wo findet das Erlebnis statt?',
			fr: 'Où se déroule l’expérience ?',
		},
		answer: {
			es: 'El punto de encuentro es Aracataca (Magdalena). Desde allí el transporte continúa hacia Gwimake, comunidad Arhuaca en la Sierra Nevada de Santa Marta.',
			en: 'The meeting point is Aracataca (Magdalena). From there, transport continues to Gwimake, an Arhuaco community in the Sierra Nevada de Santa Marta.',
			de: 'Treffpunkt ist Aracataca (Magdalena). Von dort geht es weiter nach Gwimake, einer Arhuaco-Gemeinde in der Sierra Nevada de Santa Marta.',
			fr: 'Le point de rendez-vous est Aracataca (Magdalena). De là, le transport continue vers Gwimake, communauté arhuaco dans la Sierra Nevada de Santa Marta.',
		},
	},
	{
		id: 'includes',
		question: {
			es: '¿Qué incluye la experiencia?',
			en: 'What does the experience include?',
			de: 'Was ist im Erlebnis enthalten?',
			fr: 'Que comprend l’expérience ?',
		},
		answer: {
			es: 'Según el paquete: transporte desde Aracataca, alimentación, alojamiento en hamaca o bohío, caminatas, espacios de diálogo cultural y, en planes más largos, talleres de artesanía y actividades educativas autorizadas por la comunidad.',
			en: 'Depending on the package: transport from Aracataca, meals, lodging in a hammock or bohío, walks, cultural dialogue, and on longer plans craft workshops and educational activities authorized by the community.',
			de: 'Je nach Paket: Transport ab Aracataca, Verpflegung, Unterkunft in Hängematte oder Bohío, Wanderungen, kultureller Dialog und bei längeren Plänen Handwerks-Workshops sowie von der Gemeinschaft autorisierte Bildungsaktivitäten.',
			fr: 'Selon le forfait : transport depuis Aracataca, repas, hébergement en hamac ou bohío, marches, dialogue culturel, et pour les séjours plus longs ateliers d’artisanat et activités éducatives autorisées par la communauté.',
		},
	},
	{
		id: 'prices',
		question: {
			es: '¿Cuánto cuesta?',
			en: 'How much does it cost?',
			de: 'Was kostet es?',
			fr: 'Combien ça coûte ?',
		},
		answer: {
			es: 'Desde $700.000 COP por 1 día / 1 noche y desde $1.300.000 COP por 3 días / 2 noches. La experiencia de 1 semana se consulta directamente.',
			en: 'From COP $700,000 for 1 day / 1 night and from COP $1,300,000 for 3 days / 2 nights. The 1-week experience is priced on request.',
			de: 'Ab COP $700.000 für 1 Tag / 1 Nacht und ab COP $1.300.000 für 3 Tage / 2 Nächte. Die 1-Wochen-Erfahrung wird auf Anfrage kalkuliert.',
			fr: 'À partir de 700 000 COP pour 1 jour / 1 nuit et à partir de 1 300 000 COP pour 3 jours / 2 nuits. L’expérience d’une semaine est sur devis.',
		},
	},
	{
		id: 'book',
		question: {
			es: '¿Cómo reservo?',
			en: 'How do I book?',
			de: 'Wie buche ich?',
			fr: 'Comment réserver ?',
		},
		answer: {
			es: 'Escríbenos por WhatsApp o email (info@ankabasi.com) con fechas deseadas y número de personas. Te confirmamos disponibilidad, logística desde Aracataca y forma de pago.',
			en: 'Contact us on WhatsApp or email (info@ankabasi.com) with desired dates and group size. We confirm availability, logistics from Aracataca, and payment options.',
			de: 'Schreib uns per WhatsApp oder E-Mail (info@ankabasi.com) mit Wunschterminen und Personenanzahl. Wir bestätigen Verfügbarkeit, Logistik ab Aracataca und Zahlungsarten.',
			fr: 'Contactez-nous par WhatsApp ou e-mail (info@ankabasi.com) avec vos dates et le nombre de personnes. Nous confirmons la disponibilité, la logistique depuis Aracataca et les modes de paiement.',
		},
	},
	{
		id: 'respect',
		question: {
			es: '¿Cómo debo comportarme en territorio Arhuaco?',
			en: 'How should I behave in Arhuaco territory?',
			de: 'Wie verhalte ich mich im Arhuaco-Gebiet?',
			fr: 'Comment se comporter en territoire arhuaco ?',
		},
		answer: {
			es: 'Con respeto, escucha y humildad. Sigue las indicaciones de la comunidad y del acompañamiento cultural. No es un espectáculo: es un intercambio. Pregunta antes de fotografiar y evita extractivismo cultural.',
			en: 'With respect, listening, and humility. Follow community guidance and cultural accompaniment. This is an exchange, not a show. Ask before photographing and avoid cultural extractivism.',
			de: 'Mit Respekt, Zuhören und Demut. Folge den Hinweisen der Gemeinschaft und der kulturellen Begleitung. Es ist ein Austausch, keine Show. Frage vor dem Fotografieren und vermeide kulturellen Extraktivismus.',
			fr: 'Avec respect, écoute et humilité. Suivez les indications de la communauté et de l’accompagnement culturel. C’est un échange, pas un spectacle. Demandez avant de photographier et évitez l’extractivisme culturel.',
		},
	},
	{
		id: 'transport',
		question: {
			es: '¿Cómo es el transporte hacia Gwimake?',
			en: 'What is transport to Gwimake like?',
			de: 'Wie ist der Transport nach Gwimake?',
			fr: 'Comment se passe le transport vers Gwimake ?',
		},
		answer: {
			es: 'Desde Aracataca: moto para 1 persona o camioneta para grupos de 3 o más, según el tamaño del grupo y las condiciones del camino.',
			en: 'From Aracataca: motorcycle for 1 person or a pickup/van for groups of 3+, depending on group size and road conditions.',
			de: 'Ab Aracataca: Motorrad für 1 Person oder Pickup/Transporter für Gruppen ab 3, je nach Gruppengröße und Wegbedingungen.',
			fr: 'Depuis Aracataca : moto pour 1 personne ou véhicule pour les groupes de 3 et plus, selon la taille du groupe et l’état de la piste.',
		},
	},
	{
		id: 'pack',
		question: {
			es: '¿Qué debo llevar?',
			en: 'What should I pack?',
			de: 'Was soll ich einpacken?',
			fr: 'Que faut-il emporter ?',
		},
		answer: {
			es: 'Ropa cómoda para clima de montaña (capas), calzado cerrado, impermeable ligero, linterna, botella de agua, protector solar y medicamentos personales. Te damos una lista detallada al confirmar la reserva.',
			en: 'Comfortable mountain-layer clothing, closed shoes, a light rain jacket, flashlight, water bottle, sunscreen, and personal medication. We share a detailed list when you confirm your booking.',
			de: 'Bequeme Schichtkleidung fürs Bergklima, geschlossene Schuhe, leichte Regenjacke, Taschenlampe, Trinkflasche, Sonnenschutz und persönliche Medikamente. Eine detaillierte Liste erhältst du bei Buchungsbestätigung.',
			fr: 'Vêtements confortables en couches pour le climat de montagne, chaussures fermées, coupe-vent léger, lampe, gourde, crème solaire et médicaments personnels. Nous envoyons une liste détaillée à la confirmation.',
		},
	},
];

export function faqJsonLd(locale: Locale) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question[locale],
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer[locale],
			},
		})),
	};
}
