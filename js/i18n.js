/**
 * Ankabasi — client-side i18n (es, en, de, fr)
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'ankabasi-lang';
    const SUPPORTED = ['es', 'en', 'de', 'fr'];

    const T = {
        es: {
            meta: {
                title: 'Ankabasi - Una Experiencia Ancestral',
                description:
                    'Ankabasi - Una experiencia ancestral con los Arhuacos en la Sierra Nevada de Santa Marta, Colombia',
            },
            a11y: { langNav: 'Idioma', backToTop: 'Volver arriba' },
            whatsapp: {
                prefill:
                    'Hola, me interesa saber más sobre Ankabasi',
            },
            nav: {
                inicio: 'Inicio',
                experiencia: 'Experiencia',
                actividades: 'Actividades',
                precios: 'Precios',
                galeria: 'Galería',
                blog: 'Blog',
                libro: 'Libro',
                folleto: 'Folleto',
                testimonios: 'Testimonios',
                donde: 'Dónde',
                contacto: 'Contacto',
                reservar: 'Reservar ahora',
                mundoAnkabasi: 'Mundo Ankabasi',
            },
            main: {
                title: 'Ankabasi',
                subtitle: 'Una Experiencia Ancestral',
                description:
                    'Sumérgete en el conocimiento Arhuaco: Un diálogo ancestral sobre la Madre Tierra. Comparte con los jóvenes del lugar mientras exploras sus paisajes y ríos. Bajo las estrellas, escucha historias ancestrales alrededor de la fogata y participa en un diálogo directo con un líder espiritual.',
                support:
                    'Con el apoyo de la <strong>Universidad del Magdalena</strong> para apoyar a <strong>Asoarhuaco</strong> y el <strong>Cabildo Arhuaco del Magdalena y La Guajira</strong>',
                cta: 'Reserva tu Experiencia',
            },
            experience: {
                title: 'Una Aventura Ancestral',
                p1: 'Sumérgete en el corazón de la Sierra Nevada de Santa Marta y comparte la vida con la comunidad de <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>. Esta no es solo una visita turística; es una invitación a desconectarte del mundo moderno y reconectarte con la sabiduría ancestral de la Tierra.',
                p2: 'Aprende sobre la cosmovisión Arhuaca, participa en sus rituales diarios, comparte su comida y escucha sus historias. Saldrás con una perspectiva renovada y un profundo respeto por una cultura que protege el corazón del mundo.',
                cta: 'Descubre las Actividades',
            },
            activities: {
                title: '¿Qué incluye tu experiencia?',
                transport_t: 'Transporte',
                transport_d:
                    'Desde Aracataca hasta <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> en moto o camioneta',
                spiritual_t: 'Trabajo Espiritual',
                spiritual_d: 'Con el mamo, líder espiritual de la comunidad',
                food_t: 'Alimentación Completa',
                food_d: 'Durante toda tu estadía',
                lodging_t: 'Alojamiento',
                lodging_d: 'En hamaca o bohío tradicional',
                walks_t: 'Caminatas',
                walks_d: 'Explora la naturaleza y cascadas',
                talks_t: 'Charlas Nocturnas',
                talks_d: 'Con toque arhuaco de acordeón',
                threads_t: 'Hilos de Protección',
                threads_d: 'Entrega de hilos sagrados arhuacos',
                craft_t: 'Talleres de Artesanía',
                craft_d: 'Aprende técnicas tradicionales',
                planting_t: 'Siembra de Plantas',
                planting_d: 'Alimenticias o medicinales',
                guide_t: 'Guía Turístico',
                guide_d: 'Servicio de guía durante tu estadía',
            },
            pricing: {
                title: 'Elige tu Experiencia',
                paymentTitle: 'Formas de Pago',
                payment_bank: 'Transferencia Bancaria',
                payment_nequi: 'Nequi',
                payment_daviplata: 'Daviplata',
                payment_cash: 'Efectivo',
                paymentNote:
                    'Para más información sobre métodos de pago, contáctanos directamente',
                plan1_t: '1 Día / 1 Noche',
                from: 'Desde',
                plan1_f1: '✓ Transporte desde Aracataca',
                plan1_f2: '✓ Alimentación completa',
                plan1_f3: '✓ Alojamiento en hamaca',
                plan1_f4: '✓ Caminata a la cascada (10 min)',
                plan1_f5: '✓ Charla nocturna con música arhuaca',
                plan1_f6: '✓ Trabajo espiritual con el mamo',
                plan1_f7: '✓ Entrega de hilos de protección',
                popular: 'Popular',
                plan2_t: '3 Días / 2 Noches',
                plan2_f0: '✓ Todo lo del plan 1 día, más:',
                plan2_f1: '✓ Talleres de artesanía',
                plan2_f2: '✓ Siembra de plantas alimenticias o medicinales',
                plan2_f3: '✓ Una mochila arhuaca como obsequio especial',
                plan2_f4: '✓ Más tiempo para inmersión cultural',
                plan3_t: '1 Semana',
                price: 'Precio',
                ask: 'A consultar',
                plan3_f1: '✓ Experiencia extendida',
                plan3_f2: '✓ Inmersión profunda en la cultura Arhuaca',
                plan3_f3: '✓ Múltiples actividades y talleres',
                plan3_f4: '✓ Tiempo para conexión profunda',
                plan3_f5: '✓ Contacto personalizado',
                consult: 'Consultar precio',
            },
            gallery: {
                title: 'Explora lugares increíbles',
                subtitle:
                    'Momentos, historias y sabiduría compartida desde el corazón del mundo',
                filter_all: 'Todos',
                filter_photos: 'Fotos',
                filter_videos: 'Videos',
                moreText: 'Ver más',
            },
            brochure: {
                title: 'Conoce más sobre Ankabasi',
                subtitle:
                    'Descarga nuestro folleto informativo para conocer todos los detalles de la experiencia',
                cardTitle: 'Folleto Informativo',
                cardDesc:
                    'Descarga nuestro folleto completo con información detallada sobre la experiencia, actividades, precios y más.',
                download: '📥 Descargar Folleto',
            },
            blog: {
                title: 'Blog',
                subtitle:
                    'Historias, memorias y reflexiones desde el corazón de la Sierra Nevada',
                readMore: 'Leer artículo',
                allPosts: 'Ver todos los artículos',
                prev: 'Artículo anterior',
                next: 'Artículo siguiente',
            },
            mundo: {
                eyebrow: 'Más allá de la experiencia',
                subtitle:
                    'Historias, memorias y sabiduría compartida desde la Sierra Nevada',
            },
            libro: {
                title: 'El libro de Ankabasi',
                subtitle:
                    'Memoria de una Montaña — un relato desde la Sierra Nevada de Santa Marta',
                bookTitle: 'Memoria de una Montaña',
                excerpt:
                    'Este libro no comienza en la primera página ni termina en la última. Comienza mucho antes, en el territorio, en la memoria compartida y en los pasos dados sobre la montaña.',
                startReading: 'Comenzar lectura',
                backHome: '← Volver a Ankabasi',
                toc: 'Índice',
                prev: 'Anterior',
                next: 'Siguiente',
            },
            testimonials: {
                title: 'Experiencias de nuestros visitantes',
                t1: '"Una experiencia que cambió mi perspectiva sobre la vida y la naturaleza. Conectar con los Arhuacos fue profundamente transformador."',
                t2: '"La Sierra Nevada es mágica, y esta experiencia la hizo aún más especial. El trabajo espiritual con el mamo fue increíble."',
                t3: '"Recomiendo esta experiencia a cualquiera que busque autenticidad. Los talleres de artesanía y las charlas nocturnas fueron inolvidables."',
            },
            location: {
                title: '¿Dónde estamos?',
                subtitle:
                    'El punto de encuentro es Aracataca, desde donde comenzamos el viaje hacia <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>',
                meeting_t: 'Punto de Partida',
                meeting_line: 'Aracataca, Magdalena',
                meeting_d:
                    'Aracataca es el punto de encuentro donde te recogeremos para comenzar el viaje hacia <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> en la Sierra Nevada de Santa Marta. Desde aquí, el transporte se realiza en moto (para 1 persona) o camioneta (para 3 o más personas).',
                dest_t: 'Destino Final',
                dest_line:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta',
                dest_d:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> es una comunidad Arhuaca ubicada en el corazón de la Sierra Nevada, donde tendrás la oportunidad de vivir una experiencia ancestral única.',
                mapTitle: 'Ubicación de Gwimake, Sierra Nevada de Santa Marta',
            },
            contact: {
                title: 'Reserva tu experiencia',
                subtitle: 'Disfruta de una experiencia única con la naturaleza',
                email: 'Email',
                phone: 'Teléfono / WhatsApp',
                location: 'Ubicación',
                location_html:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta<br>Colombia',
                instagram: 'Síguenos en Instagram',
                whatsappBtn: '💬 Chatea con nosotros por WhatsApp',
            },
            footer: {
                tagline:
                    'Una experiencia ancestral con los Arhuacos en la Sierra Nevada de Santa Marta',
                quick: 'Enlaces rápidos',
                contact: 'Contacto',
                social: 'Redes sociales',
                manage: 'Gestionar mi reserva',
                copy: '© 2026 Ankabasi. Todos los derechos reservados.',
            },
        },
        en: {
            meta: {
                title: 'Ankabasi - An Ancestral Experience',
                description:
                    'Ankabasi — An ancestral experience with the Arhuaco people in the Sierra Nevada de Santa Marta, Colombia',
            },
            a11y: { langNav: 'Language', backToTop: 'Back to top' },
            whatsapp: {
                prefill: 'Hello, I would like to know more about Ankabasi',
            },
            nav: {
                inicio: 'Home',
                experiencia: 'Experience',
                actividades: 'Activities',
                precios: 'Pricing',
                galeria: 'Gallery',
                blog: 'Blog',
                libro: 'Book',
                folleto: 'Brochure',
                testimonios: 'Testimonials',
                donde: 'Location',
                contacto: 'Contact',
                reservar: 'Book now',
                mundoAnkabasi: 'Ankabasi World',
            },
            main: {
                title: 'Ankabasi',
                subtitle: 'An Ancestral Experience',
                description:
                    'Immerse yourself in Arhuaco knowledge: an ancestral dialogue about Mother Earth. Share with local youth as you explore landscapes and rivers. Under the stars, hear ancestral stories around the fire and take part in a direct dialogue with a spiritual leader.',
                support:
                    'With support from <strong>Universidad del Magdalena</strong> for <strong>Asoarhuaco</strong> and the <strong>Arhuaco Council of Magdalena and La Guajira</strong>',
                cta: 'Book your experience',
            },
            experience: {
                title: 'An Ancestral Adventure',
                p1: 'Dive into the heart of the Sierra Nevada de Santa Marta and share life with the community of <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>. This is not just a tourist visit; it is an invitation to disconnect from the modern world and reconnect with the ancestral wisdom of the Earth.',
                p2: 'Learn about the Arhuaco worldview, take part in daily rituals, share their food, and listen to their stories. You will leave with a renewed perspective and deep respect for a culture that protects the heart of the world.',
                cta: 'Discover the activities',
            },
            activities: {
                title: 'What does your experience include?',
                transport_t: 'Transport',
                transport_d:
                    'From Aracataca to <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> by motorbike or vehicle',
                spiritual_t: 'Spiritual work',
                spiritual_d: 'With the mamo, spiritual leader of the community',
                food_t: 'Full board',
                food_d: 'Throughout your stay',
                lodging_t: 'Accommodation',
                lodging_d: 'In a hammock or traditional hut',
                walks_t: 'Walks',
                walks_d: 'Explore nature and waterfalls',
                talks_t: 'Evening talks',
                talks_d: 'With Arhuaco accordion music',
                threads_t: 'Protection threads',
                threads_d: 'Sacred Arhuaco threads',
                craft_t: 'Craft workshops',
                craft_d: 'Learn traditional techniques',
                planting_t: 'Planting',
                planting_d: 'Food or medicinal plants',
                guide_t: 'Tour guide',
                guide_d: 'Guiding service during your stay',
            },
            pricing: {
                title: 'Choose your experience',
                paymentTitle: 'Payment methods',
                payment_bank: 'Bank transfer',
                payment_nequi: 'Nequi',
                payment_daviplata: 'Daviplata',
                payment_cash: 'Cash',
                paymentNote: 'Contact us directly for more information on payment methods',
                plan1_t: '1 day / 1 night',
                from: 'From',
                plan1_f1: '✓ Transport from Aracataca',
                plan1_f2: '✓ Full board',
                plan1_f3: '✓ Hammock accommodation',
                plan1_f4: '✓ Walk to the waterfall (10 min)',
                plan1_f5: '✓ Evening talk with Arhuaco music',
                plan1_f6: '✓ Spiritual work with the mamo',
                plan1_f7: '✓ Protection threads',
                popular: 'Popular',
                plan2_t: '3 days / 2 nights',
                plan2_f0: '✓ Everything in the 1-day plan, plus:',
                plan2_f1: '✓ Craft workshops',
                plan2_f2: '✓ Planting food or medicinal plants',
                plan2_f3: '✓ An Arhuaco backpack as a special gift',
                plan2_f4: '✓ More time for cultural immersion',
                plan3_t: '1 week',
                price: 'Price',
                ask: 'On request',
                plan3_f1: '✓ Extended experience',
                plan3_f2: '✓ Deep immersion in Arhuaco culture',
                plan3_f3: '✓ Multiple activities and workshops',
                plan3_f4: '✓ Time for deep connection',
                plan3_f5: '✓ Personalized contact',
                consult: 'Ask for price',
            },
            gallery: {
                title: 'Explore incredible places',
                subtitle:
                    'Moments, stories, and shared wisdom from the heart of the world',
                filter_all: 'All',
                filter_photos: 'Photos',
                filter_videos: 'Videos',
                moreText: 'See more',
            },
            brochure: {
                title: 'Learn more about Ankabasi',
                subtitle:
                    'Download our brochure for full details of the experience',
                cardTitle: 'Information brochure',
                cardDesc:
                    'Download our full brochure with detailed information on the experience, activities, prices, and more.',
                download: '📥 Download brochure',
            },
            blog: {
                title: 'Blog',
                subtitle:
                    'Stories, memories and reflections from the heart of the Sierra Nevada',
                readMore: 'Read article',
                allPosts: 'View all articles',
                prev: 'Previous article',
                next: 'Next article',
            },
            mundo: {
                eyebrow: 'Beyond the experience',
                subtitle:
                    'Stories, memories and wisdom shared from the Sierra Nevada',
            },
            libro: {
                title: 'The Ankabasi book',
                subtitle:
                    'Memory of a Mountain — a story from the Sierra Nevada de Santa Marta',
                bookTitle: 'Memory of a Mountain',
                excerpt:
                    'This book does not begin on the first page nor end on the last. It begins much earlier, in the territory, in shared memory and in steps taken on the mountain.',
                startReading: 'Start reading',
                backHome: '← Back to Ankabasi',
                toc: 'Contents',
                prev: 'Previous',
                next: 'Next',
            },
            testimonials: {
                title: 'What our visitors say',
                t1: '"An experience that changed my perspective on life and nature. Connecting with the Arhuaco people was deeply transformative."',
                t2: '"The Sierra Nevada is magical, and this experience made it even more special. The spiritual work with the mamo was incredible."',
                t3: '"I recommend this experience to anyone seeking authenticity. The craft workshops and evening talks were unforgettable."',
            },
            location: {
                title: 'Where are we?',
                subtitle:
                    'The meeting point is Aracataca, where we begin the journey to <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>',
                meeting_t: 'Starting point',
                meeting_line: 'Aracataca, Magdalena',
                meeting_d:
                    'Aracataca is the meeting point where we will pick you up to begin the journey to <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> in the Sierra Nevada de Santa Marta. From here, transport is by motorbike (1 person) or vehicle (3 or more).',
                dest_t: 'Final destination',
                dest_line:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta',
                dest_d:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> is an Arhuaco community in the heart of the Sierra Nevada, where you can live a unique ancestral experience.',
                mapTitle: 'Location of Gwimake, Sierra Nevada de Santa Marta',
            },
            contact: {
                title: 'Book your experience',
                subtitle: 'Enjoy a unique experience with nature',
                email: 'Email',
                phone: 'Phone / WhatsApp',
                location: 'Location',
                location_html:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta<br>Colombia',
                instagram: 'Follow us on Instagram',
                whatsappBtn: '💬 Chat with us on WhatsApp',
            },
            footer: {
                tagline:
                    'An ancestral experience with the Arhuaco people in the Sierra Nevada de Santa Marta',
                quick: 'Quick links',
                contact: 'Contact',
                social: 'Social media',
                manage: 'Manage my booking',
                copy: '© 2026 Ankabasi. All rights reserved.',
            },
        },
        de: {
            meta: {
                title: 'Ankabasi - Eine uralte Erfahrung',
                description:
                    'Ankabasi — Eine uralte Erfahrung mit den Arhuaco in der Sierra Nevada de Santa Marta, Kolumbien',
            },
            a11y: { langNav: 'Sprache', backToTop: 'Nach oben' },
            whatsapp: {
                prefill: 'Hallo, ich möchte mehr über Ankabasi erfahren',
            },
            nav: {
                inicio: 'Start',
                experiencia: 'Erlebnis',
                actividades: 'Aktivitäten',
                precios: 'Preise',
                galeria: 'Galerie',
                blog: 'Blog',
                libro: 'Buch',
                folleto: 'Broschüre',
                testimonios: 'Stimmen',
                donde: 'Ort',
                contacto: 'Kontakt',
                reservar: 'Jetzt buchen',
                mundoAnkabasi: 'Ankabasi Welt',
            },
            main: {
                title: 'Ankabasi',
                subtitle: 'Eine uralte Erfahrung',
                description:
                    'Tauche ein in das Wissen der Arhuaco: ein uralter Dialog über die Mutter Erde. Teile mit den jungen Menschen vor Ort, während du Landschaften und Flüsse erkundest. Unter den Sternen hörst du uralte Geschichten am Feuer und nimmst an einem direkten Gespräch mit einem spirituellen Führer teil.',
                support:
                    'Mit Unterstützung der <strong>Universidad del Magdalena</strong> für <strong>Asoarhuaco</strong> und den <strong>Arhuaco-Rat von Magdalena und La Guajira</strong>',
                cta: 'Erlebnis buchen',
            },
            experience: {
                title: 'Ein uraltes Abenteuer',
                p1: 'Tauche ein ins Herz der Sierra Nevada de Santa Marta und teile das Leben mit der Gemeinschaft von <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>. Dies ist nicht nur ein Touristenbesuch; es ist eine Einladung, sich von der modernen Welt zu lösen und sich mit dem uralten Wissen der Erde zu verbinden.',
                p2: 'Lerne die Arhuaco-Kosmologie kennen, nimm an täglichen Ritualen teil, iss mit ihnen und höre ihre Geschichten. Du wirst mit neuen Perspektiven und tiefem Respekt für eine Kultur gehen, die das Herz der Welt schützt.',
                cta: 'Aktivitäten entdecken',
            },
            activities: {
                title: 'Was beinhaltet dein Erlebnis?',
                transport_t: 'Transport',
                transport_d:
                    'Von Aracataca nach <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> mit Motorrad oder Fahrzeug',
                spiritual_t: 'Spirituelle Arbeit',
                spiritual_d: 'Mit dem Mamo, spirituellem Führer der Gemeinschaft',
                food_t: 'Vollpension',
                food_d: 'Während deines gesamten Aufenthalts',
                lodging_t: 'Unterkunft',
                lodging_d: 'In Hängematte oder traditioneller Hütte',
                walks_t: 'Wanderungen',
                walks_d: 'Natur und Wasserfälle erkunden',
                talks_t: 'Abendgespräche',
                talks_d: 'Mit arhuaco Akkordeonklängen',
                threads_t: 'Schutzfäden',
                threads_d: 'Heilige Arhuaco-Fäden',
                craft_t: 'Handwerksworkshops',
                craft_d: 'Traditionelle Techniken lernen',
                planting_t: 'Pflanzen',
                planting_d: 'Nahrung oder Heilpflanzen',
                guide_t: 'Reiseführer',
                guide_d: 'Begleitung während deines Aufenthalts',
            },
            pricing: {
                title: 'Wähle dein Erlebnis',
                paymentTitle: 'Zahlungsarten',
                payment_bank: 'Banküberweisung',
                payment_nequi: 'Nequi',
                payment_daviplata: 'Daviplata',
                payment_cash: 'Barzahlung',
                paymentNote:
                    'Kontaktiere uns direkt für weitere Informationen zu Zahlungsarten',
                plan1_t: '1 Tag / 1 Nacht',
                from: 'Ab',
                plan1_f1: '✓ Transport ab Aracataca',
                plan1_f2: '✓ Vollpension',
                plan1_f3: '✓ Übernachtung in der Hängematte',
                plan1_f4: '✓ Wanderung zum Wasserfall (10 Min.)',
                plan1_f5: '✓ Abendgespräch mit arhuaco Musik',
                plan1_f6: '✓ Spirituelle Arbeit mit dem Mamo',
                plan1_f7: '✓ Schutzfäden',
                popular: 'Beliebt',
                plan2_t: '3 Tage / 2 Nächte',
                plan2_f0: '✓ Alles aus dem 1-Tage-Plan, plus:',
                plan2_f1: '✓ Handwerksworkshops',
                plan2_f2: '✓ Anbau von Nahrung oder Heilpflanzen',
                plan2_f3: '✓ Ein Arhuaco-Rucksack als besonderes Geschenk',
                plan2_f4: '✓ Mehr Zeit für kulturelle Vertiefung',
                plan3_t: '1 Woche',
                price: 'Preis',
                ask: 'Auf Anfrage',
                plan3_f1: '✓ Verlängertes Erlebnis',
                plan3_f2: '✓ Tiefe Vertiefung in die Arhuaco-Kultur',
                plan3_f3: '✓ Mehrere Aktivitäten und Workshops',
                plan3_f4: '✓ Zeit für tiefe Verbindung',
                plan3_f5: '✓ Persönlicher Kontakt',
                consult: 'Preis anfragen',
            },
            gallery: {
                title: 'Entdecke unglaubliche Orte',
                subtitle:
                    'Momente, Geschichten und geteilte Weisheit aus dem Herzen der Welt',
                filter_all: 'Alle',
                filter_photos: 'Fotos',
                filter_videos: 'Videos',
                moreText: 'Mehr anzeigen',
            },
            brochure: {
                title: 'Mehr über Ankabasi',
                subtitle:
                    'Lade unsere Broschüre herunter, um alle Details zum Erlebnis zu erfahren',
                cardTitle: 'Informationsbroschüre',
                cardDesc:
                    'Lade unsere vollständige Broschüre mit Details zum Erlebnis, Aktivitäten, Preisen und mehr herunter.',
                download: '📥 Broschüre herunterladen',
            },
            blog: {
                title: 'Blog',
                subtitle:
                    'Geschichten, Erinnerungen und Reflexionen aus dem Herzen der Sierra Nevada',
                readMore: 'Artikel lesen',
                allPosts: 'Alle Artikel ansehen',
                prev: 'Vorheriger Artikel',
                next: 'Nächster Artikel',
            },
            mundo: {
                eyebrow: 'Jenseits des Erlebnisses',
                subtitle:
                    'Geschichten, Erinnerungen und Weisheit aus der Sierra Nevada',
            },
            libro: {
                title: 'Das Buch von Ankabasi',
                subtitle:
                    'Erinnerung an einen Berg — ein Bericht aus der Sierra Nevada de Santa Marta',
                bookTitle: 'Erinnerung an einen Berg',
                excerpt:
                    'Dieses Buch beginnt nicht auf der ersten Seite und endet nicht auf der letzten. Es beginnt viel früher, im Territorium, im geteilten Gedächtnis und in den Schritten auf dem Berg.',
                startReading: 'Lesen beginnen',
                backHome: '← Zurück zu Ankabasi',
                toc: 'Inhalt',
                prev: 'Zurück',
                next: 'Weiter',
            },
            testimonials: {
                title: 'Stimmen unserer Besucher',
                t1: '"Ein Erlebnis, das meine Sicht auf Leben und Natur verändert hat. Die Begegnung mit den Arhuaco war tief bewegend."',
                t2: '"Die Sierra Nevada ist magisch, und dieses Erlebnis hat sie noch besonderer gemacht. Die spirituelle Arbeit mit dem Mamo war unglaublich."',
                t3: '"Ich empfehle dieses Erlebnis jedem, der Authentizität sucht. Die Workshops und Abendgespräche waren unvergesslich."',
            },
            location: {
                title: 'Wo sind wir?',
                subtitle:
                    'Treffpunkt ist Aracataca, von dort starten wir nach <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>',
                meeting_t: 'Startpunkt',
                meeting_line: 'Aracataca, Magdalena',
                meeting_d:
                    'Aracataca ist der Treffpunkt, an dem wir dich abholen, um die Reise zur <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> in der Sierra Nevada de Santa Marta zu beginnen. Von hier aus geht es mit Motorrad (1 Person) oder Fahrzeug (3 oder mehr).',
                dest_t: 'Ziel',
                dest_line:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta',
                dest_d:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> ist eine Arhuaco-Gemeinschaft im Herzen der Sierra Nevada, wo du ein einzigartiges uraltes Erlebnis leben kannst.',
                mapTitle: 'Lage von Gwimake, Sierra Nevada de Santa Marta',
            },
            contact: {
                title: 'Buche dein Erlebnis',
                subtitle: 'Genieße ein einzigartiges Erlebnis in der Natur',
                email: 'E-Mail',
                phone: 'Telefon / WhatsApp',
                location: 'Ort',
                location_html:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta<br>Kolumbien',
                instagram: 'Folge uns auf Instagram',
                whatsappBtn: '💬 Schreib uns auf WhatsApp',
            },
            footer: {
                tagline:
                    'Ein uraltes Erlebnis mit den Arhuaco in der Sierra Nevada de Santa Marta',
                quick: 'Schnellzugriff',
                contact: 'Kontakt',
                social: 'Soziale Medien',
                manage: 'Meine Buchung verwalten',
                copy: '© 2026 Ankabasi. Alle Rechte vorbehalten.',
            },
        },
        fr: {
            meta: {
                title: 'Ankabasi - Une expérience ancestrale',
                description:
                    'Ankabasi — Une expérience ancestrale avec les Arhuaco dans la Sierra Nevada de Santa Marta, Colombie',
            },
            a11y: { langNav: 'Langue', backToTop: 'Haut de page' },
            whatsapp: {
                prefill: 'Bonjour, je souhaite en savoir plus sur Ankabasi',
            },
            nav: {
                inicio: 'Accueil',
                experiencia: 'Expérience',
                actividades: 'Activités',
                precios: 'Tarifs',
                galeria: 'Galerie',
                blog: 'Blog',
                libro: 'Livre',
                folleto: 'Brochure',
                testimonios: 'Témoignages',
                donde: 'Lieu',
                contacto: 'Contact',
                reservar: 'Réserver',
                mundoAnkabasi: 'Monde Ankabasi',
            },
            main: {
                title: 'Ankabasi',
                subtitle: 'Une expérience ancestrale',
                description:
                    'Plongez dans la connaissance arhuaco : un dialogue ancestral sur la Terre Mère. Partagez avec les jeunes du lieu en explorant paysages et rivières. Sous les étoiles, écoutez des histoires ancestrales autour du feu et participez à un dialogue direct avec un guide spirituel.',
                support:
                    'Avec le soutien de l’<strong>Universidad del Magdalena</strong> pour <strong>Asoarhuaco</strong> et le <strong>Cabildo Arhuaco del Magdalena y La Guajira</strong>',
                cta: 'Réservez votre expérience',
            },
            experience: {
                title: 'Une aventure ancestrale',
                p1: 'Plongez au cœur de la Sierra Nevada de Santa Marta et partagez la vie de la communauté de <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>. Ce n’est pas qu’une visite touristique ; c’est une invitation à vous déconnecter du monde moderne et à vous reconnecter à la sagesse ancestrale de la Terre.',
                p2: 'Découvrez la cosmovision arhuaco, participez aux rituels quotidiens, partagez leurs repas et leurs histoires. Vous repartirez avec un regard renouvelé et un profond respect pour une culture qui protège le cœur du monde.',
                cta: 'Découvrir les activités',
            },
            activities: {
                title: 'Que comprend votre expérience ?',
                transport_t: 'Transport',
                transport_d:
                    'D’Aracataca à <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> en moto ou véhicule',
                spiritual_t: 'Travail spirituel',
                spiritual_d: 'Avec le mamo, guide spirituel de la communauté',
                food_t: 'Pension complète',
                food_d: 'Pendant tout votre séjour',
                lodging_t: 'Hébergement',
                lodging_d: 'En hamac ou hutte traditionnelle',
                walks_t: 'Randonnées',
                walks_d: 'Explorez la nature et les cascades',
                talks_t: 'Soirées de partage',
                talks_d: 'Avec musique arhuaco à l’accordéon',
                threads_t: 'Fils de protection',
                threads_d: 'Remise de fils sacrés arhuacos',
                craft_t: 'Ateliers d’artisanat',
                craft_d: 'Apprenez les techniques traditionnelles',
                planting_t: 'Plantation',
                planting_d: 'Plantes alimentaires ou médicinales',
                guide_t: 'Guide touristique',
                guide_d: 'Accompagnement pendant votre séjour',
            },
            pricing: {
                title: 'Choisissez votre expérience',
                paymentTitle: 'Modes de paiement',
                payment_bank: 'Virement bancaire',
                payment_nequi: 'Nequi',
                payment_daviplata: 'Daviplata',
                payment_cash: 'Espèces',
                paymentNote:
                    'Contactez-nous directement pour plus d’informations sur les paiements',
                plan1_t: '1 jour / 1 nuit',
                from: 'À partir de',
                plan1_f1: '✓ Transport depuis Aracataca',
                plan1_f2: '✓ Pension complète',
                plan1_f3: '✓ Nuit en hamac',
                plan1_f4: '✓ Marche vers la cascade (10 min)',
                plan1_f5: '✓ Soirée avec musique arhuaco',
                plan1_f6: '✓ Travail spirituel avec le mamo',
                plan1_f7: '✓ Fils de protection',
                popular: 'Populaire',
                plan2_t: '3 jours / 2 nuits',
                plan2_f0: '✓ Tout le forfait 1 jour, plus :',
                plan2_f1: '✓ Ateliers d’artisanat',
                plan2_f2: '✓ Plantation de plantes alimentaires ou médicinales',
                plan2_f3: '✓ Un sac arhuaco en cadeau spécial',
                plan2_f4: '✓ Plus de temps pour l’immersion culturelle',
                plan3_t: '1 semaine',
                price: 'Prix',
                ask: 'Sur demande',
                plan3_f1: '✓ Expérience prolongée',
                plan3_f2: '✓ Immersion profonde dans la culture arhuaco',
                plan3_f3: '✓ Multiples activités et ateliers',
                plan3_f4: '✓ Temps pour une connexion profonde',
                plan3_f5: '✓ Contact personnalisé',
                consult: 'Demander le prix',
            },
            gallery: {
                title: 'Explorez des lieux incroyables',
                subtitle:
                    'Moments, histoires et sagesse partagée depuis le cœur du monde',
                filter_all: 'Tous',
                filter_photos: 'Photos',
                filter_videos: 'Vidéos',
                moreText: 'Voir plus',
            },
            brochure: {
                title: 'En savoir plus sur Ankabasi',
                subtitle:
                    'Téléchargez notre brochure pour tous les détails de l’expérience',
                cardTitle: 'Brochure informative',
                cardDesc:
                    'Téléchargez notre brochure complète avec l’expérience, les activités, les tarifs et plus encore.',
                download: '📥 Télécharger la brochure',
            },
            blog: {
                title: 'Blog',
                subtitle:
                    'Histoires, mémoires et réflexions depuis le cœur de la Sierra Nevada',
                readMore: 'Lire l\'article',
                allPosts: 'Voir tous les articles',
                prev: 'Article précédent',
                next: 'Article suivant',
            },
            mundo: {
                eyebrow: 'Au-delà de l\'expérience',
                subtitle:
                    'Histoires, mémoires et sagesse partagées depuis la Sierra Nevada',
            },
            libro: {
                title: 'Le livre d\'Ankabasi',
                subtitle:
                    'Mémoire d\'une montagne — un récit depuis la Sierra Nevada de Santa Marta',
                bookTitle: 'Mémoire d\'une montagne',
                excerpt:
                    'Ce livre ne commence pas à la première page ni ne se termine à la dernière. Il commence bien avant, sur le territoire, dans la mémoire partagée et dans les pas sur la montagne.',
                startReading: 'Commencer la lecture',
                backHome: '← Retour à Ankabasi',
                toc: 'Sommaire',
                prev: 'Précédent',
                next: 'Suivant',
            },
            testimonials: {
                title: 'Expériences de nos visiteurs',
                t1: '"Une expérience qui a changé ma vision de la vie et de la nature. Se connecter aux Arhuaco a été profondément transformateur."',
                t2: '"La Sierra Nevada est magique, et cette expérience l’a rendue encore plus spéciale. Le travail spirituel avec le mamo était incroyable."',
                t3: '"Je recommande cette expérience à quiconque cherche l’authenticité. Les ateliers et les soirées étaient inoubliables."',
            },
            location: {
                title: 'Où sommes-nous ?',
                subtitle:
                    'Le point de rendez-vous est Aracataca, d’où nous partons vers <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>',
                meeting_t: 'Point de départ',
                meeting_line: 'Aracataca, Magdalena',
                meeting_d:
                    'Aracataca est le lieu de rendez-vous où nous venons vous chercher pour commencer le voyage vers <a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> dans la Sierra Nevada de Santa Marta. De là, le transport se fait en moto (1 personne) ou véhicule (3 personnes ou plus).',
                dest_t: 'Destination',
                dest_line:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta',
                dest_d:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a> est une communauté arhuaco au cœur de la Sierra Nevada, où vous vivrez une expérience ancestrale unique.',
                mapTitle: 'Emplacement de Gwimake, Sierra Nevada de Santa Marta',
            },
            contact: {
                title: 'Réservez votre expérience',
                subtitle: 'Profitez d’une expérience unique avec la nature',
                email: 'E-mail',
                phone: 'Téléphone / WhatsApp',
                location: 'Lieu',
                location_html:
                    '<a href="https://gwimake.com/" target="_blank" rel="noopener noreferrer"><strong>Gwimake</strong></a>, Sierra Nevada de Santa Marta<br>Colombie',
                instagram: 'Suivez-nous sur Instagram',
                whatsappBtn: '💬 Écrivez-nous sur WhatsApp',
            },
            footer: {
                tagline:
                    'Une expérience ancestrale avec les Arhuaco dans la Sierra Nevada de Santa Marta',
                quick: 'Liens rapides',
                contact: 'Contact',
                social: 'Réseaux sociaux',
                manage: 'Gérer ma réservation',
                copy: '© 2026 Ankabasi. Tous droits réservés.',
            },
        },
    };

    let currentLang = 'es';

    function flatKey(lang, path) {
        const parts = path.split('.');
        let o = T[lang];
        for (let i = 0; i < parts.length; i++) {
            if (o == null) return undefined;
            o = o[parts[i]];
        }
        return o;
    }

    function resolve(lang, key) {
        const v = flatKey(lang, key);
        if (v !== undefined) return v;
        return flatKey('es', key) || key;
    }

    function setDocumentLang(lang) {
        document.documentElement.lang = lang === 'es' ? 'es' : lang;
    }

    function updateMeta(lang) {
        const m = T[lang].meta;
        document.title = m.title;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', m.description);
    }

    function updateWhatsAppLinks(lang) {
        const text = encodeURIComponent(T[lang].whatsapp.prefill);
        document.querySelectorAll('a[data-i18n-wa]').forEach(function (a) {
            const base = a.getAttribute('data-wa-base') || 'https://wa.me/573107186797';
            a.href = base + '?text=' + text;
        });
    }

    function applyPlain(el, key) {
        const v = resolve(currentLang, key);
        if (typeof v === 'string') el.textContent = v;
    }

    function applyHtml(el, key) {
        const v = resolve(currentLang, key);
        if (typeof v === 'string') el.innerHTML = v;
    }

    function walk() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (key) applyPlain(el, key);
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-html');
            if (key) applyHtml(el, key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key && el.placeholder !== undefined) {
                el.placeholder = resolve(currentLang, key);
            }
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            const key = el.getAttribute('data-i18n-title');
            if (key) el.setAttribute('title', resolve(currentLang, key));
        });
        updateMeta(currentLang);
        updateWhatsAppLinks(currentLang);
        setDocumentLang(currentLang);

        const sel = document.getElementById('lang-select');
        if (sel && sel.value !== currentLang) sel.value = currentLang;

        updateBackToTopAria();

        document.dispatchEvent(
            new CustomEvent('ankabasi:languagechange', { detail: { lang: currentLang } })
        );
    }

    function updateBackToTopAria() {
        const btn = document.querySelector('.back-to-top');
        if (btn) {
            btn.setAttribute('aria-label', resolve(currentLang, 'a11y.backToTop'));
        }
    }

    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1) lang = 'es';
        currentLang = lang;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
        walk();
    }

    function getLang() {
        return currentLang;
    }

    function t(key) {
        return resolve(currentLang, key);
    }

    function init() {
        let lang = 'es';
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED.indexOf(stored) !== -1) lang = stored;
        } catch (e) {}

        const params = new URLSearchParams(window.location.search);
        const q = params.get('lang');
        if (q && SUPPORTED.indexOf(q) !== -1) lang = q;

        currentLang = lang;

        const sel = document.getElementById('lang-select');
        if (sel) {
            sel.value = currentLang;
            sel.addEventListener('change', function () {
                setLang(this.value);
            });
        }

        walk();
    }

    window.AnkabasiI18n = {
        t: t,
        setLang: setLang,
        getLang: getLang,
        resolve: resolve,
        updateBackToTopAria: updateBackToTopAria,
        SUPPORTED: SUPPORTED,
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
