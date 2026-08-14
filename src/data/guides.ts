import type { Locale } from '../i18n/utils';
import type { GuideKey } from '../i18n/routes';

export interface GuideContent {
	key: GuideKey;
	title: Record<Locale, string>;
	description: Record<Locale, string>;
	lead: Record<Locale, string>;
	body: Record<Locale, string[]>;
}

export const guides: GuideContent[] = [
	{
		key: 'packages',
		title: {
			es: 'Paquetes Ankabasi: 1 día, 3 días o 1 semana',
			en: 'Ankabasi packages: 1 day, 3 days, or 1 week',
			de: 'Ankabasi-Pakete: 1 Tag, 3 Tage oder 1 Woche',
			fr: 'Forfaits Ankabasi : 1 jour, 3 jours ou 1 semaine',
		},
		description: {
			es: 'Compara los formatos de experiencia Ankabasi en Gwimake: precios desde $700.000 COP y qué incluye cada plan.',
			en: 'Compare Ankabasi experience formats in Gwimake: prices from COP $700,000 and what each plan includes.',
			de: 'Vergleiche Ankabasi-Formate in Gwimake: Preise ab COP $700.000 und Leistungen je Plan.',
			fr: 'Comparez les formats Ankabasi à Gwimake : tarifs dès 700 000 COP et contenu de chaque forfait.',
		},
		lead: {
			es: 'Ankabasi ofrece tres formatos en Gwimake (Sierra Nevada de Santa Marta): 1 día/1 noche desde $700.000 COP, 3 días/2 noches desde $1.300.000 COP, y 1 semana a consultar. Todos incluyen transporte desde Aracataca, alimentación y acompañamiento cultural.',
			en: 'Ankabasi offers three formats in Gwimake (Sierra Nevada de Santa Marta): 1 day/1 night from COP $700,000, 3 days/2 nights from COP $1,300,000, and 1 week on request. All include transport from Aracataca, meals, and cultural accompaniment.',
			de: 'Ankabasi bietet drei Formate in Gwimake (Sierra Nevada de Santa Marta): 1 Tag/1 Nacht ab COP $700.000, 3 Tage/2 Nächte ab COP $1.300.000 und 1 Woche auf Anfrage. Alle inkludieren Transport ab Aracataca, Verpflegung und kulturelle Begleitung.',
			fr: 'Ankabasi propose trois formats à Gwimake (Sierra Nevada de Santa Marta) : 1 jour/1 nuit dès 700 000 COP, 3 jours/2 nuits dès 1 300 000 COP, et 1 semaine sur devis. Tous incluent transport depuis Aracataca, repas et accompagnement culturel.',
		},
		body: {
			es: [
				'El plan de 1 día / 1 noche es ideal para una primera inmersión: caminata a la cascada, charla nocturna y acompañamiento cultural y espacios de diálogo.',
				'El plan de 3 días / 2 noches profundiza con talleres de artesanía, siembra y más tiempo de convivencia; incluye una mochila arhuaca como obsequio.',
				'La semana permite una inmersión extendida. Contáctanos para diseñar fechas y ritmo con la comunidad.',
			],
			en: [
				'The 1 day / 1 night plan is ideal for a first immersion: waterfall walk, evening talk, and cultural accompaniment and spaces for dialogue.',
				'The 3 days / 2 nights plan deepens the stay with craft workshops, planting, and more shared time; it includes an Arhuaco mochila as a gift.',
				'The week enables an extended immersion. Contact us to shape dates and pace with the community.',
			],
			de: [
				'Der Plan 1 Tag / 1 Nacht eignet sich für eine erste Immersion: Wasserfallwanderung, Abendgespräch und kulturelle Begleitung und Räume für Dialog.',
				'Der Plan 3 Tage / 2 Nächte vertieft mit Handwerks-Workshops, Aussaat und mehr gemeinsamer Zeit; inklusive Arhuaco-Mochila als Geschenk.',
				'Die Woche ermöglicht eine längere Immersion. Kontaktiere uns für Termine und Rhythmus mit der Gemeinschaft.',
			],
			fr: [
				'Le forfait 1 jour / 1 nuit convient à une première immersion : marche à la cascade, causerie du soir et accompagnement culturel et espaces de dialogue.',
				'Le forfait 3 jours / 2 nuits approfondit avec ateliers d’artisanat, semis et plus de temps partagé ; une mochila arhuaco est offerte.',
				'La semaine permet une immersion prolongée. Contactez-nous pour caler dates et rythme avec la communauté.',
			],
		},
	},
	{
		key: 'howToGetThere',
		title: {
			es: 'Cómo llegar a Ankabasi: Aracataca → Gwimake',
			en: 'How to get to Ankabasi: Aracataca → Gwimake',
			de: 'Anreise zu Ankabasi: Aracataca → Gwimake',
			fr: 'Comment rejoindre Ankabasi : Aracataca → Gwimake',
		},
		description: {
			es: 'Guía práctica: punto de encuentro en Aracataca y traslado hacia Gwimake en la Sierra Nevada de Santa Marta.',
			en: 'Practical guide: meeting point in Aracataca and transfer to Gwimake in the Sierra Nevada de Santa Marta.',
			de: 'Praxisleitfaden: Treffpunkt in Aracataca und Transfer nach Gwimake in der Sierra Nevada de Santa Marta.',
			fr: 'Guide pratique : rendez-vous à Aracataca et transfert vers Gwimake dans la Sierra Nevada de Santa Marta.',
		},
		lead: {
			es: 'Para vivir Ankabasi, el punto de partida es Aracataca (Magdalena, Colombia). Desde allí organizamos el traslado hacia Gwimake, comunidad Arhuaca en la Sierra Nevada de Santa Marta, en moto (1 persona) o camioneta (3+).',
			en: 'To experience Ankabasi, the starting point is Aracataca (Magdalena, Colombia). From there we arrange transfer to Gwimake, an Arhuaco community in the Sierra Nevada de Santa Marta, by motorcycle (1 person) or pickup (3+).',
			de: 'Für Ankabasi startest du in Aracataca (Magdalena, Kolumbien). Von dort organisieren wir den Transfer nach Gwimake, einer Arhuaco-Gemeinde in der Sierra Nevada de Santa Marta, per Motorrad (1 Person) oder Pickup (3+).',
			fr: 'Pour Ankabasi, le départ est Aracataca (Magdalena, Colombie). Nous organisons ensuite le transfert vers Gwimake, communauté arhuaco dans la Sierra Nevada de Santa Marta, en moto (1 personne) ou véhicule (3+).',
		},
		body: {
			es: [
				'Llega a Aracataca por vía terrestre desde Santa Marta u otras ciudades de la Costa. Te confirmamos hora y lugar exactos al reservar.',
				'El camino hacia Gwimake es rural: lleva poco equipaje, calzado cerrado y disposición para un trayecto de montaña.',
				'Gwimake es el destino de la experiencia — comunidad y territorio, no un hotel convencional.',
			],
			en: [
				'Reach Aracataca overland from Santa Marta or other Caribbean-coast cities. We confirm exact time and place when you book.',
				'The road to Gwimake is rural: pack light, wear closed shoes, and expect a mountain transfer.',
				'Gwimake is the destination — community and territory, not a conventional hotel.',
			],
			de: [
				'Reise über Land nach Aracataca aus Santa Marta oder anderen Städten der Karibikküste. Uhrzeit und Treffpunkt bestätigen wir bei der Buchung.',
				'Der Weg nach Gwimake ist ländlich: leichtes Gepäck, geschlossene Schuhe, Bergtransfer einplanen.',
				'Gwimake ist das Ziel — Gemeinschaft und Territorium, kein konventionelles Hotel.',
			],
			fr: [
				'Rejoignez Aracataca par la route depuis Santa Marta ou d’autres villes de la côte. Nous confirmons l’heure et le lieu exacts à la réservation.',
				'La piste vers Gwimake est rurale : bagage léger, chaussures fermées, transfert de montagne.',
				'Gwimake est la destination — communauté et territoire, pas un hôtel classique.',
			],
		},
	},
	{
		key: 'responsibleVisit',
		title: {
			es: 'Visita responsable con el pueblo Arhuaco',
			en: 'Responsible visit with the Arhuaco people',
			de: 'Verantwortungsvoll reisen mit dem Arhuaco-Volk',
			fr: 'Visite responsable avec le peuple arhuaco',
		},
		description: {
			es: 'Principios de respeto para el intercambio cultural Ankabasi en territorio Arhuaco de Gwimake.',
			en: 'Respect principles for the Ankabasi cultural exchange in Arhuaco territory at Gwimake.',
			de: 'Respektprinzipien für den kulturellen Austausch Ankabasi im Arhuaco-Gebiet Gwimake.',
			fr: 'Principes de respect pour l’échange culturel Ankabasi en territoire arhuaco à Gwimake.',
		},
		lead: {
			es: 'Ankabasi es un intercambio cultural responsable en Gwimake. Priorizamos la escucha, el consentimiento de la comunidad y el apoyo a iniciativas locales — no el turismo extractivo.',
			en: 'Ankabasi is a responsible cultural exchange in Gwimake. We prioritize listening, community consent, and support for local initiatives — not extractive tourism.',
			de: 'Ankabasi ist ein verantwortungsvoller kultureller Austausch in Gwimake. Wir priorisieren Zuhören, Zustimmung der Gemeinschaft und Unterstützung lokaler Initiativen — keinen extraktiven Tourismus.',
			fr: 'Ankabasi est un échange culturel responsable à Gwimake. Nous priorisons l’écoute, le consentement de la communauté et le soutien aux initiatives locales — pas le tourisme extractif.',
		},
		body: {
			es: [
				'Pide permiso antes de fotografiar personas, ceremonias o lugares sensibles.',
				'Sigue las orientaciones del mamo y del acompañamiento cultural; algunos espacios o momentos no son públicos.',
				'El valor de la experiencia incluye reciprocidad: tu presencia debe aportar respeto y cuidado al territorio.',
			],
			en: [
				'Ask permission before photographing people, ceremonies, or sensitive places.',
				'Follow guidance from the mamo and cultural hosts; some spaces or moments are not public.',
				'The experience includes reciprocity: your presence should bring respect and care for the territory.',
			],
			de: [
				'Bitte um Erlaubnis vor dem Fotografieren von Personen, Zeremonien oder sensiblen Orten.',
				'Folge den Hinweisen des Mamo und der kulturellen Begleitung; manche Räume oder Momente sind nicht öffentlich.',
				'Das Erlebnis beinhaltet Reziprozität: Deine Anwesenheit soll Respekt und Fürsorge für das Territorium bringen.',
			],
			fr: [
				'Demandez la permission avant de photographier des personnes, cérémonies ou lieux sensibles.',
				'Suivez les indications du mamo et de l’accompagnement culturel ; certains espaces ou moments ne sont pas publics.',
				'L’expérience implique la réciprocité : votre présence doit apporter respect et soin au territoire.',
			],
		},
	},
	{
		key: 'whatToExpect',
		title: {
			es: 'Qué esperar en Ankabasi',
			en: 'What to expect at Ankabasi',
			de: 'Was dich bei Ankabasi erwartet',
			fr: 'À quoi s’attendre avec Ankabasi',
		},
		description: {
			es: 'Ritmo, alojamiento, comida y convivencia en el intercambio cultural Ankabasi en Gwimake.',
			en: 'Pace, lodging, food, and shared life in the Ankabasi cultural exchange in Gwimake.',
			de: 'Rhythmus, Unterkunft, Essen und Zusammenleben beim kulturellen Austausch Ankabasi in Gwimake.',
			fr: 'Rythme, hébergement, repas et vie partagée dans l’échange culturel Ankabasi à Gwimake.',
		},
		lead: {
			es: 'En Ankabasi dormirás en hamaca o bohío, compartirás alimentación completa y participarás en caminatas, charlas y acompañamiento cultural y diálogo. El ritmo sigue la vida de la comunidad en Gwimake, no un itinerario de resort.',
			en: 'At Ankabasi you sleep in a hammock or bohío, share full meals, and join walks, talks, and cultural accompaniment and dialogue. The pace follows community life in Gwimake — not a resort itinerary.',
			de: 'Bei Ankabasi schläfst du in Hängematte oder Bohío, teilst Vollverpflegung und nimmst an Wanderungen, Gesprächen und kultureller Begleitung und Dialog teil. Der Rhythmus folgt dem Gemeinschaftsleben in Gwimake — keinem Resort-Plan.',
			fr: 'Chez Ankabasi vous dormez en hamac ou bohío, partagez les repas et participez à marches, causeries et accompagnement culturel et dialogue. Le rythme suit la vie communautaire à Gwimake — pas un emploi du temps de resort.',
		},
		body: {
			es: [
				'Habrá momentos de silencio, caminata y fogata. La conectividad puede ser limitada: es parte de la desconexión.',
				'El clima de montaña cambia; lleva capas e impermeable ligero.',
				'Saldrás con una comprensión más cercana de la cosmovisión Arhuaca y del cuidado de la Madre Tierra.',
			],
			en: [
				'Expect silence, walking, and fireside time. Connectivity may be limited — that is part of the disconnection.',
				'Mountain weather shifts; bring layers and a light rain jacket.',
				'You leave with a closer understanding of Arhuaco worldview and care for Mother Earth.',
			],
			de: [
				'Erwarte Stille, Wandern und Zeit am Feuer. Konnektivität kann eingeschränkt sein — das gehört zur Entschleunigung.',
				'Bergwetter wechselt; nimm Schichten und eine leichte Regenjacke mit.',
				'Du gehst mit einem engeren Verständnis der Arhuaco-Weltanschauung und der Sorge um die Mutter Erde.',
			],
			fr: [
				'Attendez-vous au silence, à la marche et au feu. La connectivité peut être limitée — c’est aussi la déconnexion.',
				'Le climat de montagne change ; prévoyez des couches et un coupe-vent léger.',
				'Vous repartez avec une compréhension plus proche de la cosmovision arhuaco et du soin de la Terre Mère.',
			],
		},
	},
];

export function getGuide(key: GuideKey): GuideContent {
	const g = guides.find((x) => x.key === key);
	if (!g) throw new Error(`Unknown guide: ${key}`);
	return g;
}
