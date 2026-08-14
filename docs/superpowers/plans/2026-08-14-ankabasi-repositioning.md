# ANKABASI Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the existing Astro site so ANKABASI reads as a technology and digital company of the Arhuaco community of Gwimake, with cultural exchange as one service line rather than the whole brand.

**Architecture:** Keep the current Astro static site and i18n system. Copy lives in `src/i18n/ui.ts` (four locales). Page composition lives in `src/components/HomeSections.astro`. Nav/footer are separate components. FAQ and Organization JSON-LD are data modules. Add Node built-in tests that fail on tourism-first copy, `example.com`, and prototype testimonials. Do not rewrite CSS architecture; add section styles next to existing `.activities` / `.cursos` / `.community-section` patterns.

**Tech Stack:** Astro 7, TypeScript, `src/i18n/ui.ts` + `t()` / `tHtml()`, existing CSS in `src/styles/style.css` and `src/styles/responsive.css`, Node 22 `node --test` (no new test framework).

**Spec:** `docs/superpowers/specs/2026-08-14-ankabasi-repositioning-design.md`

## Global Constraints

- Source of truth is `src/`. Do not spend time rewriting legacy root `index.html`, `js/`, or `css/` — they are not part of `astro build`.
- Locales: `es`, `en`, `de`, `fr` only; default `es`; every new string must exist in all four.
- Do not invent prices; keep `$700.000`, `$1.300.000`, and “a consultar”.
- Do not publish `trabajo espiritual`, `hilos de protección`, or invitations to `rituales` as visitor-facing offers.
- Do not link to `example.com` or any placeholder URL.
- Do not present fictional testimonials (María González, Juan Pérez, Ana Martínez) as real people.
- Do not build a store or course platform; use “próximamente”.
- Prefer server-rendered `t(locale, 'key')` over client `data-i18n`.
- Cultural tone: respect, territory, community authorization; no extractive tourism copy.
- Node `>=22.12.0`. Do not add Vitest/Jest. Do not force-push `main`.
- Agents must not `git commit`. Skip every commit step; leave the tree ready for the human. Write: `Skip commit (human owns git).`

## File map

| Path | Responsibility |
|------|----------------|
| `scripts/content-guards.test.mjs` | Source-level acceptance tests for positioning, FAQ, placeholders, fake names |
| `package.json` | Add `"test": "node --test scripts/content-guards.test.mjs"` |
| `src/i18n/ui.ts` | All visitor-facing copy in `es`/`en`/`de`/`fr` |
| `src/i18n/utils.ts` | Unchanged `t()`, `tHtml()`, `localePath()` |
| `src/components/HomeSections.astro` | Homepage section markup and order |
| `src/components/Header.astro` | Primary nav + CTA |
| `src/components/Footer.astro` | Company tagline, pillar line, updated quick links |
| `src/data/faq.ts` | FAQ “what is ANKABASI” + includes wording |
| `src/data/site.ts` | `organizationJsonLd()` as `Organization` |
| `src/data/guides.ts` | Drop spiritual-offer wording from package/how-to copy |
| `src/data/blog-data.ts` | Category field on posts |
| `src/pages/[locale]/index.astro` | Home JSON-LD list title follows new pricing title |
| `src/pages/[locale]/faq.astro` | Lead text matches company definition |
| `src/pages/[locale]/blog/index.astro` | Mundo ANKABASI heading + category labels |
| `src/pages/[locale]/libro/index.astro` | Editorial-in-development framing |
| `src/styles/style.css` | New section styles (about, pillars, tech, actions, validation) |
| `src/styles/responsive.css` | Pillars/tech grids on tablet/mobile |

---

### Task 1: Content-guard tests

**Files:**
- Create: `scripts/content-guards.test.mjs`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` command that later tasks must keep green; assertions document the spec’s CIE gates

- [ ] **Step 1: Add the test script to `package.json`**

In the `"scripts"` object, add:

```json
"test": "node --test scripts/content-guards.test.mjs"
```

Keep existing `dev`, `build`, `preview`, `astro`.

- [ ] **Step 2: Write the failing tests**

Create `scripts/content-guards.test.mjs`:

```js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

function walkSrc(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkSrc(p, acc);
    else if (/\.(astro|ts|js|css|mjs)$/.test(name)) acc.push(p);
  }
  return acc;
}

const ui = () => read('src/i18n/ui.ts');
const home = () => read('src/components/HomeSections.astro');
const header = () => read('src/components/Header.astro');
const footer = () => read('src/components/Footer.astro');
const faq = () => read('src/data/faq.ts');
const site = () => read('src/data/site.ts');

describe('ANKABASI repositioning guards', () => {
  it('hero is company-first, not ancestral-experience-first', () => {
    const text = ui();
    assert.match(text, /Tecnología, cultura e innovación desde Gwimake/);
    assert.match(text, /Technology, culture and innovation from Gwimake/);
    assert.match(text, /Technologie, Kultur und Innovation aus Gwimake/);
    assert.match(text, /Technologie, culture et innovation depuis Gwimake/);
    assert.doesNotMatch(text, /subtitle: 'Una Experiencia Ancestral'/);
  });

  it('defines ANKABASI as a technology and digital company in FAQ', () => {
    const whatIs = faq().split("id: 'what-is'")[1] ?? '';
    assert.match(whatIs, /empresa tecnológica y digital/);
    assert.match(whatIs, /technology and digital company/);
    assert.match(whatIs, /una de las líneas de servicio/);
  });

  it('src/ contains no example.com placeholders', () => {
    const hits = walkSrc(join(root, 'src')).filter((p) =>
      readFileSync(p, 'utf8').includes('example.com'),
    );
    assert.deepEqual(hits, []);
  });

  it('does not present prototype testimonials as real people', () => {
    const page = home();
    for (const name of ['María González', 'Juan Pérez', 'Ana Martínez']) {
      assert.equal(page.includes(name), false, name);
    }
    assert.match(ui(), /Validación en proceso/);
  });

  it('JSON-LD describes an Organization, not a TouristAttraction', () => {
    const jsonLd = site().split('organizationJsonLd')[1] ?? '';
    assert.match(jsonLd, /'@type': 'Organization'/);
    assert.doesNotMatch(jsonLd, /TouristAttraction/);
  });

  it('homepage has company sections and company nav', () => {
    assert.match(home(), /id="quienes-somos"/);
    assert.match(home(), /id="pilares"/);
    assert.match(home(), /id="tecnologia"/);
    assert.match(header(), /#quienes-somos/);
    assert.match(header(), /#tecnologia/);
    assert.match(footer(), /footer\.pillars/);
  });
});
```

- [ ] **Step 3: Run tests and confirm they fail**

Run: `npm test`

Expected: FAIL. Typical first failure: `hero is company-first` because `src/i18n/ui.ts` still has `subtitle: 'Una Experiencia Ancestral'`. File `scripts/content-guards.test.mjs` must exist; if Node says `Cannot find module`, the path or `test` script is wrong — fix that before any product copy.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 2: i18n dictionary for the new positioning

**Files:**
- Modify: `src/i18n/ui.ts` (all four locale trees)

**Interfaces:**
- Consumes: `t(locale, key)` and `tHtml(locale, key)` from `src/i18n/utils.ts` — signature unchanged: `(locale: Locale, key: string) => string`
- Produces: the keys listed in each block below, in `es`, `en`, `de`, and `fr`. Later tasks only call these keys; they must not invent new ones.

Replace or add the following keys. Do not delete unrelated keys still used by guides/blog (`brochure.*`, `libro.startReading`, `nav.blog`, `nav.libro`, `nav.reservar` for pricing cards, `pricing.plan1_t` through `plan3_f5` except `plan1_f6` / `plan1_f7`).

Spanish (`ui.es`) — copy verbatim:

```ts
meta: {
  title: 'ANKABASI — Tecnología, cultura e innovación desde Gwimake',
  description:
    'ANKABASI es una empresa tecnológica y digital de la comunidad Arhuaca de Gwimake. Tecnología, conocimiento, educación, contenido e intercambio cultural.',
},
whatsapp: {
  prefill: 'Hola, me interesa conocer ANKABASI y sus líneas de trabajo.',
},
nav: {
  // keep inicio, blog, libro, productos, cursos, folleto, testimonios, donde, reservar, mundoAnkabasi, contacto
  quienesSomos: 'Quiénes somos',
  tecnologia: 'Tecnología',
  intercambio: 'Intercambio cultural',
  contenido: 'Contenido',
  productosServicios: 'Productos y servicios',
  ctaExperiencias: 'Conoce nuestras experiencias',
},
main: {
  title: 'ANKABASI',
  subtitle: 'Tecnología, cultura e innovación desde Gwimake',
  description:
    'Una empresa tecnológica y digital de la comunidad Arhuaca que conecta el territorio con el mundo mediante tecnología, conocimiento, educación, contenido e intercambio cultural.',
  tagline:
    'Conectamos la sabiduría ancestral con las herramientas del presente para construir oportunidades hacia el futuro.',
  support: /* keep the Universidad del Magdalena / Asoarhuaco sentence unchanged */,
  cta: 'Conoce ANKABASI',
  ctaSecondary: 'Explora nuestras experiencias',
},
about: {
  title: '¿Qué es ANKABASI?',
  p1: 'ANKABASI es una empresa tecnológica y digital que nace desde la comunidad Arhuaca de Gwimake.',
  p2: 'Somos una iniciativa impulsada por jóvenes Arhuacos que busca utilizar la tecnología como herramienta para fortalecer la identidad cultural, reducir brechas digitales, impulsar el emprendimiento y generar nuevas oportunidades de aprendizaje, innovación e intercambio cultural.',
  p3: 'Desarrollamos soluciones digitales, contenido audiovisual, procesos de formación y experiencias de intercambio cultural que conectan el territorio con personas, instituciones y organizaciones de diferentes partes del mundo.',
  closing: 'Tecnología desde el territorio y para el territorio.',
},
pillars: {
  title: '¿Qué hacemos?',
  tech_t: 'Tecnología',
  tech_d: 'Soluciones y herramientas digitales adaptadas a las necesidades del territorio.',
  content_t: 'Contenido',
  content_d: 'Producción audiovisual y narrativas digitales sobre cultura, territorio y comunidad.',
  training_t: 'Formación',
  training_d: 'Procesos de aprendizaje y apropiación de herramientas digitales.',
  exchange_t: 'Intercambio cultural',
  exchange_d: 'Experiencias que permiten conectar visitantes con el territorio y sus conocimientos.',
  venture_t: 'Emprendimiento',
  venture_d: 'Tecnología e innovación para impulsar iniciativas económicas y sociales.',
},
experience: {
  title: 'Intercambio cultural en Gwimake',
  intro:
    'Conoce una de las líneas de servicio de ANKABASI: experiencias de intercambio cultural desarrolladas desde el territorio Arhuaco de Gwimake.',
  p1: 'Estas experiencias buscan generar espacios de aprendizaje, diálogo y conexión con la comunidad, la naturaleza y el territorio, siempre desde el respeto por la identidad cultural y las orientaciones de la comunidad.',
  p2: 'No vienes solamente a visitar un lugar. Vienes a aprender, escuchar y compartir.',
  cta: 'Ver experiencias',
},
activities: {
  title: '¿Qué puedes experimentar?',
  territory_t: 'Territorio',
  territory_d: 'Conexión con el territorio y la vida en Gwimake.',
  walks_t: 'Caminatas y naturaleza',
  walks_d: 'Recorridos por la Sierra Nevada y sus paisajes.',
  dialogue_t: 'Diálogo cultural',
  dialogue_d: 'Espacios de diálogo y escucha con la comunidad.',
  food_t: 'Gastronomía local',
  food_d: 'Alimentación preparada en el territorio.',
  craft_t: 'Artesanía',
  craft_d: 'Talleres y oficios del territorio, cuando la comunidad los ofrece.',
  education_t: 'Actividades educativas',
  education_d: 'Aprendizaje compartido sobre cultura, territorio y saberes.',
  stories_t: 'Historias y memoria',
  stories_d: 'Relatos y memoria del territorio contados desde Gwimake.',
  community_t: 'Vida comunitaria',
  community_d: 'Participación en actividades comunitarias autorizadas.',
},
pricing: {
  title: 'Experiencias de intercambio cultural',
  disclaimer:
    'Los valores pueden variar según número de participantes, logística, actividades seleccionadas y condiciones de la experiencia.',
  plan1_f6: '✓ Acompañamiento cultural',
  plan1_f7: '✓ Espacios de diálogo y memoria del territorio',
},
gallery: {
  title: 'Historias desde Gwimake',
  subtitle:
    'Contamos historias sobre territorio, cultura, conocimiento, naturaleza, emprendimiento y juventud Arhuaca mediante herramientas audiovisuales y digitales.',
  tags: 'Fotografía · Video · Historias · Memoria · Cultura',
},
tech: {
  title: 'Tecnología e innovación',
  lead: 'La tecnología es uno de los pilares de ANKABASI.',
  p1: 'Buscamos desarrollar y promover herramientas digitales que respondan a las necesidades del territorio y fortalezcan las capacidades de jóvenes y emprendimientos de la comunidad.',
  visionTitle: 'Nuestra visión tecnológica',
  vision: 'Crear soluciones digitales desde el territorio y para el territorio.',
  futureIntro: 'En el futuro, esta línea podrá integrar:',
  item1: 'Diseño y desarrollo web.',
  item2: 'Soluciones digitales.',
  item3: 'Presencia y comunicación digital.',
  item4: 'Formación tecnológica.',
  item5: 'Herramientas para emprendimientos.',
  item6: 'Innovación aplicada al territorio.',
},
productos: {
  title: 'Productos de la Sierra Nevada',
  subtitle: 'Café, cacao y mochilas Arhuacas desde el territorio',
  description:
    'ANKABASI impulsa productos del territorio —café, cacao y mochilas Arhuacas— elaborados con respeto por la cultura, el comercio justo y la economía de la comunidad.',
  cta: 'Catálogo próximamente',
},
cursos: {
  title: 'Formación y aprendizaje digital',
  subtitle: 'Capacidades digitales para jóvenes y emprendedores del territorio',
  description:
    'ANKABASI busca contribuir al fortalecimiento de las capacidades digitales de jóvenes y emprendedores del territorio.',
  comingSoon: 'Próximamente: programas y talleres de formación ANKABASI.',
  course1: {
    title: 'Alfabetización digital',
    desc: 'Herramientas tecnológicas para educación, comunicación y trabajo.',
  },
  course2: {
    title: 'Emprendimiento digital',
    desc: 'Herramientas para desarrollar y fortalecer iniciativas productivas.',
  },
  course3: {
    title: 'Comunicación digital',
    desc: 'Creación de contenidos y estrategias para comunicar proyectos.',
  },
  course4: {
    title: 'Tecnología e innovación',
    desc: 'Apropiación de herramientas digitales para resolver necesidades del territorio.',
  },
},
testimonials: {
  title: 'Validación en proceso',
  note: 'Estamos recopilando las primeras experiencias y opiniones de nuestros usuarios.',
},
location: {
  title: 'Nuestro territorio',
  identity:
    'Gwimake es parte fundamental de nuestra identidad y de la propuesta de valor de ANKABASI.',
},
blog: {
  title: 'Mundo ANKABASI',
  subtitle: 'Cultura, territorio, tecnología, juventud, emprendimiento, historias y educación.',
  cat_cultura: 'Cultura',
  cat_territorio: 'Territorio',
  cat_tecnologia: 'Tecnología',
  cat_juventud: 'Juventud',
  cat_emprendimiento: 'Emprendimiento',
  cat_historias: 'Historias',
  cat_educacion: 'Educación',
},
mundo: {
  eyebrow: 'Ecosistema digital',
  subtitle: 'Historias, memoria y conocimiento compartido desde Gwimake.',
},
libro: {
  subtitle: 'Memoria de una Montaña — Archivo narrativo y memoria del territorio',
  status: 'Proyecto editorial en desarrollo.',
},
contact: {
  title: 'Contacto',
  subtitle: 'Conversemos sobre tecnología, formación, contenido e intercambio cultural.',
},
footer: {
  tagline: 'Empresa tecnológica y digital de la comunidad Arhuaca de Gwimake.',
  pillars: 'Tecnología · Cultura · Educación · Innovación · Intercambio cultural',
  copy: '© 2026 ANKABASI. Todos los derechos reservados.',
},
```

English (`ui.en`) — copy verbatim:

```ts
meta: {
  title: 'ANKABASI — Technology, culture and innovation from Gwimake',
  description:
    'ANKABASI is a technology and digital company of the Arhuaco community of Gwimake. Technology, knowledge, education, content, and cultural exchange.',
},
whatsapp: { prefill: 'Hello, I would like to learn about ANKABASI and its lines of work.' },
nav: {
  quienesSomos: 'Who we are',
  tecnologia: 'Technology',
  intercambio: 'Cultural exchange',
  contenido: 'Content',
  productosServicios: 'Products and services',
  ctaExperiencias: 'Discover our experiences',
},
main: {
  title: 'ANKABASI',
  subtitle: 'Technology, culture and innovation from Gwimake',
  description:
    'A technology and digital company of the Arhuaco community that connects the territory with the world through technology, knowledge, education, content, and cultural exchange.',
  tagline:
    'We connect ancestral wisdom with the tools of the present to build opportunities for the future.',
  cta: 'Discover ANKABASI',
  ctaSecondary: 'Explore our experiences',
},
about: {
  title: 'What is ANKABASI?',
  p1: 'ANKABASI is a technology and digital company born from the Arhuaco community of Gwimake.',
  p2: 'We are an initiative led by Arhuaco youth that uses technology to strengthen cultural identity, reduce digital gaps, foster entrepreneurship, and create new opportunities for learning, innovation, and cultural exchange.',
  p3: 'We develop digital solutions, audiovisual content, training processes, and cultural exchange experiences that connect the territory with people, institutions, and organizations around the world.',
  closing: 'Technology from the territory and for the territory.',
},
pillars: {
  title: 'What we do',
  tech_t: 'Technology',
  tech_d: 'Digital solutions and tools adapted to the needs of the territory.',
  content_t: 'Content',
  content_d: 'Audiovisual production and digital narratives about culture, territory, and community.',
  training_t: 'Training',
  training_d: 'Learning processes and appropriation of digital tools.',
  exchange_t: 'Cultural exchange',
  exchange_d: 'Experiences that connect visitors with the territory and its knowledge.',
  venture_t: 'Entrepreneurship',
  venture_d: 'Technology and innovation to boost economic and social initiatives.',
},
experience: {
  title: 'Cultural exchange in Gwimake',
  intro:
    'Discover one of ANKABASI’s service lines: cultural exchange experiences developed from Arhuaco territory in Gwimake.',
  p1: 'These experiences create space for learning, dialogue, and connection with the community, nature, and the territory, always with respect for cultural identity and community guidance.',
  p2: 'You are not only visiting a place. You come to learn, listen, and share.',
  cta: 'See experiences',
},
activities: {
  title: 'What can you experience?',
  territory_t: 'Territory',
  territory_d: 'Connection with the territory and life in Gwimake.',
  walks_t: 'Walks and nature',
  walks_d: 'Routes through the Sierra Nevada and its landscapes.',
  dialogue_t: 'Cultural dialogue',
  dialogue_d: 'Spaces for dialogue and listening with the community.',
  food_t: 'Local food',
  food_d: 'Meals prepared in the territory.',
  craft_t: 'Crafts',
  craft_d: 'Workshops and crafts of the territory, when the community offers them.',
  education_t: 'Educational activities',
  education_d: 'Shared learning about culture, territory, and knowledge.',
  stories_t: 'Stories and memory',
  stories_d: 'Stories and memory of the territory told from Gwimake.',
  community_t: 'Community life',
  community_d: 'Participation in authorized community activities.',
},
pricing: {
  title: 'Cultural exchange experiences',
  disclaimer:
    'Prices may vary according to group size, logistics, selected activities, and the conditions of the experience.',
  plan1_f6: '✓ Cultural accompaniment',
  plan1_f7: '✓ Dialogue and memory of the territory',
},
gallery: {
  title: 'Stories from Gwimake',
  subtitle:
    'We tell stories about territory, culture, knowledge, nature, entrepreneurship, and Arhuaco youth through audiovisual and digital tools.',
  tags: 'Photography · Video · Stories · Memory · Culture',
},
tech: {
  title: 'Technology and innovation',
  lead: 'Technology is one of ANKABASI’s pillars.',
  p1: 'We develop and promote digital tools that respond to the needs of the territory and strengthen the capacities of young people and community enterprises.',
  visionTitle: 'Our technology vision',
  vision: 'Create digital solutions from the territory and for the territory.',
  futureIntro: 'In the future, this line may include:',
  item1: 'Web design and development.',
  item2: 'Digital solutions.',
  item3: 'Digital presence and communication.',
  item4: 'Technology training.',
  item5: 'Tools for enterprises.',
  item6: 'Innovation applied to the territory.',
},
productos: {
  title: 'Products from the Sierra Nevada',
  subtitle: 'Coffee, cacao, and Arhuaco mochilas from the territory',
  description:
    'ANKABASI supports products of the territory — coffee, cacao, and Arhuaco mochilas — made with respect for culture, fair trade, and the community economy.',
  cta: 'Catalog coming soon',
},
cursos: {
  title: 'Digital training and learning',
  subtitle: 'Digital skills for youth and entrepreneurs of the territory',
  description:
    'ANKABASI works to strengthen the digital capacities of young people and entrepreneurs in the territory.',
  comingSoon: 'Coming soon: ANKABASI training programs and workshops.',
  course1: { title: 'Digital literacy', desc: 'Technology tools for education, communication, and work.' },
  course2: { title: 'Digital entrepreneurship', desc: 'Tools to develop and strengthen productive initiatives.' },
  course3: { title: 'Digital communication', desc: 'Content creation and strategies to communicate projects.' },
  course4: { title: 'Technology and innovation', desc: 'Appropriation of digital tools to meet needs of the territory.' },
},
testimonials: {
  title: 'Validation in progress',
  note: 'We are gathering the first experiences and feedback from our users.',
},
location: {
  title: 'Our territory',
  identity: 'Gwimake is fundamental to our identity and to ANKABASI’s value proposition.',
},
blog: {
  title: 'ANKABASI World',
  subtitle: 'Culture, territory, technology, youth, entrepreneurship, stories, and education.',
  cat_cultura: 'Culture',
  cat_territorio: 'Territory',
  cat_tecnologia: 'Technology',
  cat_juventud: 'Youth',
  cat_emprendimiento: 'Entrepreneurship',
  cat_historias: 'Stories',
  cat_educacion: 'Education',
},
mundo: {
  eyebrow: 'Digital ecosystem',
  subtitle: 'Stories, memory, and knowledge shared from Gwimake.',
},
libro: {
  subtitle: 'Memory of a Mountain — Narrative archive and memory of the territory',
  status: 'Editorial project in development.',
},
contact: {
  title: 'Contact',
  subtitle: 'Let’s talk about technology, training, content, and cultural exchange.',
},
footer: {
  tagline: 'Technology and digital company of the Arhuaco community of Gwimake.',
  pillars: 'Technology · Culture · Education · Innovation · Cultural exchange',
  copy: '© 2026 ANKABASI. All rights reserved.',
},
```

German (`ui.de`) — copy verbatim:

```ts
meta: {
  title: 'ANKABASI — Technologie, Kultur und Innovation aus Gwimake',
  description:
    'ANKABASI ist ein Technologie- und Digitalunternehmen der Arhuaco-Gemeinschaft von Gwimake. Technologie, Wissen, Bildung, Inhalte und kultureller Austausch.',
},
whatsapp: { prefill: 'Hallo, ich möchte ANKABASI und seine Arbeitsbereiche kennenlernen.' },
nav: {
  quienesSomos: 'Wer wir sind',
  tecnologia: 'Technologie',
  intercambio: 'Kultureller Austausch',
  contenido: 'Inhalte',
  productosServicios: 'Produkte und Leistungen',
  ctaExperiencias: 'Unsere Erfahrungen kennenlernen',
},
main: {
  title: 'ANKABASI',
  subtitle: 'Technologie, Kultur und Innovation aus Gwimake',
  description:
    'Ein Technologie- und Digitalunternehmen der Arhuaco-Gemeinschaft, das das Territorium durch Technologie, Wissen, Bildung, Inhalte und kulturellen Austausch mit der Welt verbindet.',
  tagline:
    'Wir verbinden überliefertes Wissen mit den Werkzeugen der Gegenwart, um Chancen für die Zukunft zu schaffen.',
  cta: 'ANKABASI kennenlernen',
  ctaSecondary: 'Unsere Erfahrungen entdecken',
},
about: {
  title: 'Was ist ANKABASI?',
  p1: 'ANKABASI ist ein Technologie- und Digitalunternehmen, das aus der Arhuaco-Gemeinschaft von Gwimake entsteht.',
  p2: 'Wir sind eine Initiative junger Arhuaco, die Technologie nutzt, um kulturelle Identität zu stärken, digitale Lücken zu verringern, Unternehmertum zu fördern und neue Chancen für Lernen, Innovation und kulturellen Austausch zu schaffen.',
  p3: 'Wir entwickeln digitale Lösungen, audiovisuelle Inhalte, Bildungsprozesse und kulturellen Austausch, die das Territorium mit Menschen, Institutionen und Organisationen weltweit verbinden.',
  closing: 'Technologie aus dem Territorium und für das Territorium.',
},
pillars: {
  title: 'Was wir tun',
  tech_t: 'Technologie',
  tech_d: 'Digitale Lösungen und Werkzeuge, angepasst an die Bedürfnisse des Territoriums.',
  content_t: 'Inhalte',
  content_d: 'Audiovisuelle Produktion und digitale Narrative zu Kultur, Territorium und Gemeinschaft.',
  training_t: 'Bildung',
  training_d: 'Lernprozesse und Aneignung digitaler Werkzeuge.',
  exchange_t: 'Kultureller Austausch',
  exchange_d: 'Erfahrungen, die Besuchende mit dem Territorium und seinem Wissen verbinden.',
  venture_t: 'Unternehmertum',
  venture_d: 'Technologie und Innovation für wirtschaftliche und soziale Initiativen.',
},
experience: {
  title: 'Kultureller Austausch in Gwimake',
  intro:
    'Lerne eine Leistungslinie von ANKABASI kennen: kultureller Austausch aus dem Arhuaco-Territorium Gwimake.',
  p1: 'Diese Erfahrungen schaffen Räume für Lernen, Dialog und Verbindung mit Gemeinschaft, Natur und Territorium — stets im Respekt vor kultureller Identität und den Orientierungen der Gemeinschaft.',
  p2: 'Du besuchst nicht nur einen Ort. Du kommst, um zu lernen, zuzuhören und zu teilen.',
  cta: 'Erfahrungen ansehen',
},
activities: {
  title: 'Was kannst du erleben?',
  territory_t: 'Territorium',
  territory_d: 'Verbindung mit dem Territorium und dem Leben in Gwimake.',
  walks_t: 'Wanderungen und Natur',
  walks_d: 'Wege durch die Sierra Nevada und ihre Landschaften.',
  dialogue_t: 'Kultureller Dialog',
  dialogue_d: 'Räume für Dialog und Zuhören mit der Gemeinschaft.',
  food_t: 'Lokale Küche',
  food_d: 'Mahlzeiten, die im Territorium zubereitet werden.',
  craft_t: 'Handwerk',
  craft_d: 'Workshops und Handwerk des Territoriums, wenn die Gemeinschaft sie anbietet.',
  education_t: 'Bildungsaktivitäten',
  education_d: 'Gemeinsames Lernen über Kultur, Territorium und Wissen.',
  stories_t: 'Geschichten und Erinnerung',
  stories_d: 'Erzählungen und Erinnerung des Territoriums aus Gwimake.',
  community_t: 'Gemeinschaftsleben',
  community_d: 'Teilnahme an autorisierten gemeinschaftlichen Aktivitäten.',
},
pricing: {
  title: 'Erfahrungen des kulturellen Austauschs',
  disclaimer:
    'Die Preise können je nach Gruppengröße, Logistik, gewählten Aktivitäten und Bedingungen der Erfahrung variieren.',
  plan1_f6: '✓ Kulturelle Begleitung',
  plan1_f7: '✓ Dialog und Erinnerung des Territoriums',
},
gallery: {
  title: 'Geschichten aus Gwimake',
  subtitle:
    'Wir erzählen Geschichten über Territorium, Kultur, Wissen, Natur, Unternehmertum und arhuaco Jugend mit audiovisuellen und digitalen Werkzeugen.',
  tags: 'Fotografie · Video · Geschichten · Erinnerung · Kultur',
},
tech: {
  title: 'Technologie und Innovation',
  lead: 'Technologie ist eine der Säulen von ANKABASI.',
  p1: 'Wir entwickeln und fördern digitale Werkzeuge, die den Bedürfnissen des Territoriums entsprechen und die Fähigkeiten junger Menschen und lokaler Unternehmungen stärken.',
  visionTitle: 'Unsere technologische Vision',
  vision: 'Digitale Lösungen aus dem Territorium und für das Territorium schaffen.',
  futureIntro: 'In Zukunft kann diese Linie umfassen:',
  item1: 'Webdesign und -entwicklung.',
  item2: 'Digitale Lösungen.',
  item3: 'Digitale Präsenz und Kommunikation.',
  item4: 'Technologische Bildung.',
  item5: 'Werkzeuge für Unternehmungen.',
  item6: 'Innovation im Territorium.',
},
productos: {
  title: 'Produkte aus der Sierra Nevada',
  subtitle: 'Kaffee, Kakao und Arhuaco-Mochilas aus dem Territorium',
  description:
    'ANKABASI stärkt Produkte des Territoriums — Kaffee, Kakao und Arhuaco-Mochilas — mit Respekt für Kultur, fairen Handel und die lokale Wirtschaft.',
  cta: 'Katalog demnächst',
},
cursos: {
  title: 'Digitale Bildung und Lernen',
  subtitle: 'Digitale Fähigkeiten für Jugendliche und Unternehmer des Territoriums',
  description:
    'ANKABASI trägt zur Stärkung der digitalen Fähigkeiten junger Menschen und Unternehmer im Territorium bei.',
  comingSoon: 'Demnächst: Bildungsprogramme und Workshops von ANKABASI.',
  course1: { title: 'Digitale Alphabetisierung', desc: 'Technologische Werkzeuge für Bildung, Kommunikation und Arbeit.' },
  course2: { title: 'Digitales Unternehmertum', desc: 'Werkzeuge zum Entwickeln und Stärken produktiver Initiativen.' },
  course3: { title: 'Digitale Kommunikation', desc: 'Inhalte und Strategien, um Projekte zu kommunizieren.' },
  course4: { title: 'Technologie und Innovation', desc: 'Aneignung digitaler Werkzeuge für Bedürfnisse des Territoriums.' },
},
testimonials: {
  title: 'Validierung läuft',
  note: 'Wir sammeln die ersten Erfahrungen und Rückmeldungen unserer Nutzerinnen und Nutzer.',
},
location: {
  title: 'Unser Territorium',
  identity: 'Gwimake ist zentral für unsere Identität und das Wertversprechen von ANKABASI.',
},
blog: {
  title: 'ANKABASI Welt',
  subtitle: 'Kultur, Territorium, Technologie, Jugend, Unternehmertum, Geschichten und Bildung.',
  cat_cultura: 'Kultur',
  cat_territorio: 'Territorium',
  cat_tecnologia: 'Technologie',
  cat_juventud: 'Jugend',
  cat_emprendimiento: 'Unternehmertum',
  cat_historias: 'Geschichten',
  cat_educacion: 'Bildung',
},
mundo: {
  eyebrow: 'Digitales Ökosystem',
  subtitle: 'Geschichten, Erinnerung und Wissen aus Gwimake.',
},
libro: {
  subtitle: 'Erinnerung an einen Berg — narratives Archiv und Gedächtnis des Territoriums',
  status: 'Editorisches Projekt in Entwicklung.',
},
contact: {
  title: 'Kontakt',
  subtitle: 'Sprechen wir über Technologie, Bildung, Inhalte und kulturellen Austausch.',
},
footer: {
  tagline: 'Technologie- und Digitalunternehmen der Arhuaco-Gemeinschaft von Gwimake.',
  pillars: 'Technologie · Kultur · Bildung · Innovation · Kultureller Austausch',
  copy: '© 2026 ANKABASI. Alle Rechte vorbehalten.',
},
```

French (`ui.fr`) — copy verbatim:

```ts
meta: {
  title: 'ANKABASI — Technologie, culture et innovation depuis Gwimake',
  description:
    'ANKABASI est une entreprise technologique et numérique de la communauté arhuaco de Gwimake. Technologie, connaissance, éducation, contenus et échange culturel.',
},
whatsapp: { prefill: 'Bonjour, je souhaite connaître ANKABASI et ses lignes de travail.' },
nav: {
  quienesSomos: 'Qui sommes-nous',
  tecnologia: 'Technologie',
  intercambio: 'Échange culturel',
  contenido: 'Contenus',
  productosServicios: 'Produits et services',
  ctaExperiencias: 'Découvrir nos expériences',
},
main: {
  title: 'ANKABASI',
  subtitle: 'Technologie, culture et innovation depuis Gwimake',
  description:
    'Une entreprise technologique et numérique de la communauté arhuaco qui relie le territoire au monde par la technologie, la connaissance, l’éducation, les contenus et l’échange culturel.',
  tagline:
    'Nous relions la sagesse ancestrale aux outils du présent pour construire des opportunités vers l’avenir.',
  cta: 'Découvrir ANKABASI',
  ctaSecondary: 'Explorer nos expériences',
},
about: {
  title: 'Qu’est-ce qu’ANKABASI ?',
  p1: 'ANKABASI est une entreprise technologique et numérique née de la communauté arhuaco de Gwimake.',
  p2: 'Nous sommes une initiative portée par des jeunes Arhuaco qui utilise la technologie pour renforcer l’identité culturelle, réduire les fractures numériques, encourager l’entrepreneuriat et ouvrir de nouvelles opportunités d’apprentissage, d’innovation et d’échange culturel.',
  p3: 'Nous développons des solutions numériques, des contenus audiovisuels, des processus de formation et des expériences d’échange culturel qui relient le territoire à des personnes, institutions et organisations du monde entier.',
  closing: 'La technologie depuis le territoire et pour le territoire.',
},
pillars: {
  title: 'Ce que nous faisons',
  tech_t: 'Technologie',
  tech_d: 'Solutions et outils numériques adaptés aux besoins du territoire.',
  content_t: 'Contenus',
  content_d: 'Production audiovisuelle et récits numériques sur la culture, le territoire et la communauté.',
  training_t: 'Formation',
  training_d: 'Processus d’apprentissage et d’appropriation des outils numériques.',
  exchange_t: 'Échange culturel',
  exchange_d: 'Expériences qui relient les visiteurs au territoire et à ses savoirs.',
  venture_t: 'Entrepreneuriat',
  venture_d: 'Technologie et innovation pour des initiatives économiques et sociales.',
},
experience: {
  title: 'Échange culturel à Gwimake',
  intro:
    'Découvrez l’une des lignes de service d’ANKABASI : des expériences d’échange culturel développées depuis le territoire arhuaco de Gwimake.',
  p1: 'Ces expériences créent des espaces d’apprentissage, de dialogue et de lien avec la communauté, la nature et le territoire, toujours dans le respect de l’identité culturelle et des orientations de la communauté.',
  p2: 'Vous ne venez pas seulement visiter un lieu. Vous venez apprendre, écouter et partager.',
  cta: 'Voir les expériences',
},
activities: {
  title: 'Que pouvez-vous vivre ?',
  territory_t: 'Territoire',
  territory_d: 'Lien avec le territoire et la vie à Gwimake.',
  walks_t: 'Marches et nature',
  walks_d: 'Parcours dans la Sierra Nevada et ses paysages.',
  dialogue_t: 'Dialogue culturel',
  dialogue_d: 'Espaces de dialogue et d’écoute avec la communauté.',
  food_t: 'Gastronomie locale',
  food_d: 'Repas préparés sur le territoire.',
  craft_t: 'Artisanat',
  craft_d: 'Ateliers et savoir-faire du territoire, lorsque la communauté les propose.',
  education_t: 'Activités éducatives',
  education_d: 'Apprentissage partagé sur la culture, le territoire et les savoirs.',
  stories_t: 'Histoires et mémoire',
  stories_d: 'Récits et mémoire du territoire racontés depuis Gwimake.',
  community_t: 'Vie communautaire',
  community_d: 'Participation à des activités communautaires autorisées.',
},
pricing: {
  title: 'Expériences d’échange culturel',
  disclaimer:
    'Les tarifs peuvent varier selon le nombre de participants, la logistique, les activités choisies et les conditions de l’expérience.',
  plan1_f6: '✓ Accompagnement culturel',
  plan1_f7: '✓ Espaces de dialogue et mémoire du territoire',
},
gallery: {
  title: 'Histoires depuis Gwimake',
  subtitle:
    'Nous racontons des histoires sur le territoire, la culture, la connaissance, la nature, l’entrepreneuriat et la jeunesse arhuaco avec des outils audiovisuels et numériques.',
  tags: 'Photographie · Vidéo · Histoires · Mémoire · Culture',
},
tech: {
  title: 'Technologie et innovation',
  lead: 'La technologie est l’un des piliers d’ANKABASI.',
  p1: 'Nous développons et promouvons des outils numériques qui répondent aux besoins du territoire et renforcent les capacités des jeunes et des initiatives de la communauté.',
  visionTitle: 'Notre vision technologique',
  vision: 'Créer des solutions numériques depuis le territoire et pour le territoire.',
  futureIntro: 'À l’avenir, cette ligne pourra intégrer :',
  item1: 'Conception et développement web.',
  item2: 'Solutions numériques.',
  item3: 'Présence et communication numériques.',
  item4: 'Formation technologique.',
  item5: 'Outils pour les initiatives productives.',
  item6: 'Innovation appliquée au territoire.',
},
productos: {
  title: 'Produits de la Sierra Nevada',
  subtitle: 'Café, cacao et mochilas arhuaco du territoire',
  description:
    'ANKABASI soutient des produits du territoire — café, cacao et mochilas arhuaco — élaborés dans le respect de la culture, du commerce équitable et de l’économie communautaire.',
  cta: 'Catalogue bientôt disponible',
},
cursos: {
  title: 'Formation et apprentissage numérique',
  subtitle: 'Capacités numériques pour les jeunes et les entrepreneurs du territoire',
  description:
    'ANKABASI contribue au renforcement des capacités numériques des jeunes et des entrepreneurs du territoire.',
  comingSoon: 'Prochainement : programmes et ateliers de formation ANKABASI.',
  course1: { title: 'Alphabétisation numérique', desc: 'Outils technologiques pour l’éducation, la communication et le travail.' },
  course2: { title: 'Entrepreneuriat numérique', desc: 'Outils pour développer et renforcer des initiatives productives.' },
  course3: { title: 'Communication numérique', desc: 'Création de contenus et stratégies pour communiquer des projets.' },
  course4: { title: 'Technologie et innovation', desc: 'Appropriation d’outils numériques pour les besoins du territoire.' },
},
testimonials: {
  title: 'Validation en cours',
  note: 'Nous recueillons les premières expériences et avis de nos utilisateurs.',
},
location: {
  title: 'Notre territoire',
  identity: 'Gwimake est fondamental pour notre identité et pour la proposition de valeur d’ANKABASI.',
},
blog: {
  title: 'Monde ANKABASI',
  subtitle: 'Culture, territoire, technologie, jeunesse, entrepreneuriat, histoires et éducation.',
  cat_cultura: 'Culture',
  cat_territorio: 'Territoire',
  cat_tecnologia: 'Technologie',
  cat_juventud: 'Jeunesse',
  cat_emprendimiento: 'Entrepreneuriat',
  cat_historias: 'Histoires',
  cat_educacion: 'Éducation',
},
mundo: {
  eyebrow: 'Écosystème numérique',
  subtitle: 'Histoires, mémoire et savoir partagés depuis Gwimake.',
},
libro: {
  subtitle: 'Mémoire d’une montagne — archive narrative et mémoire du territoire',
  status: 'Projet éditorial en cours de développement.',
},
contact: {
  title: 'Contact',
  subtitle: 'Parlons technologie, formation, contenus et échange culturel.',
},
footer: {
  tagline: 'Entreprise technologique et numérique de la communauté arhuaco de Gwimake.',
  pillars: 'Technologie · Culture · Éducation · Innovation · Échange culturel',
  copy: '© 2026 ANKABASI. Tous droits réservés.',
},
```

Remove unused activity keys that the homepage will no longer read: `activities.transport_*`, `spiritual_*`, `lodging_*`, `talks_*`, `threads_*`, `planting_*`, `guide_*`. Also remove `cursos.cta` (no course links) and `testimonials.t1`/`t2`/`t3`. Keep `nav.reservar` (`Reservar ahora` / translations) for pricing card buttons.

After editing, TypeScript `as const` still type-checks because locales are independent objects. Manually confirm each of the four locale objects has `about`, `pillars`, `tech`, `main.tagline`, `main.ctaSecondary`, `nav.quienesSomos`, `cursos.course4`, `footer.pillars`.

- [ ] **Step 1: Patch `ui.es` with the Spanish block above**

- [ ] **Step 2: Patch `ui.en`, `ui.de`, and `ui.fr` with the blocks above**

- [ ] **Step 3: Re-run `npm test`**

Expected: still FAIL on missing `#quienes-somos` / Organization JSON-LD / example.com / fake names, but PASS on `hero is company-first` (the four subtitle strings exist and `Una Experiencia Ancestral` is gone as `main.subtitle`).

If hero still fails, search `src/i18n/ui.ts` for `Una Experiencia Ancestral` and replace remaining `main.subtitle` values.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 3: Hero markup (CIE gate 1)

**Files:**
- Modify: `src/components/HomeSections.astro` (hero block, currently lines 21–32)
- Modify: `src/styles/style.css` (after `.main__support-text strong`)

**Interfaces:**
- Consumes: `t(locale, 'main.title'|'main.subtitle'|'main.description'|'main.tagline'|'main.cta'|'main.ctaSecondary'|'main.support')`, `tHtml`, `localePath`
- Produces: hero with two CTAs; `#quienes-somos` and `#experiencia` targets are created in later tasks — until then, hrefs may 404-scroll. Task 4 must add `id="quienes-somos"`.

- [ ] **Step 1: Replace the hero inner content**

In `HomeSections.astro`, replace the `.main__content` block with:

```astro
<section class="main" id="inicio">
  <div class="main__overlay"></div>
  <div class="main__content container" data-aos="fade-up">
    <h1 class="main__title">{t(locale, 'main.title')}</h1>
    <h2 class="main__subtitle">{t(locale, 'main.subtitle')}</h2>
    <p class="main__description">{t(locale, 'main.description')}</p>
    <p class="main__tagline">{t(locale, 'main.tagline')}</p>
    <div class="main__support" data-aos="fade-up" data-aos-delay="200">
      <p class="main__support-text" set:html={tHtml(locale, 'main.support')}></p>
    </div>
    <div class="main__actions">
      <a href={home + '#quienes-somos'} class="btn btn--primary btn--large">{t(locale, 'main.cta')}</a>
      <a href={home + '#experiencia'} class="btn btn--secondary btn--large">{t(locale, 'main.ctaSecondary')}</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add hero action/tagline CSS**

Append after `.main__support-text strong` in `src/styles/style.css`:

```css
.main__tagline {
    font-size: clamp(1.05rem, 2vw, 1.35rem);
    font-weight: 600;
    line-height: 1.6;
    margin: 0 0 1.75rem;
    color: rgba(255, 255, 255, 0.95);
}

.main__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.main__actions .btn--secondary {
    background-color: transparent;
    border: 2px solid var(--color-white);
    color: var(--color-white);
}

.main__actions .btn--secondary:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
}
```

- [ ] **Step 3: Visual check**

Run: `npm run dev`

Open `http://localhost:4321/es/`. Expected: H1 `ANKABASI`, H2 `Tecnología, cultura e innovación desde Gwimake`, two buttons, no `Una Experiencia Ancestral`. Repeat `/en/`, `/de/`, `/fr/` for translated subtitles.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 4: ¿Qué es ANKABASI? + five pillars (CIE gate 2)

**Files:**
- Modify: `src/components/HomeSections.astro` (insert immediately after `</section>` of `#inicio`)
- Modify: `src/styles/style.css`
- Modify: `src/styles/responsive.css`

**Interfaces:**
- Consumes: `about.*`, `pillars.*` keys from Task 2; `home` from `localePath(locale)`
- Produces: `id="quienes-somos"` and `id="pilares"`; pillar cards link to `#tecnologia`, `#contenido`, `#cursos`, `#experiencia`, `#productos`

- [ ] **Step 1: Insert about + pillars markup after the hero**

```astro
<section class="about" id="quienes-somos">
  <div class="container">
    <h2 class="section__title" data-aos="fade-up">{t(locale, 'about.title')}</h2>
    <div class="section__underline" data-aos="fade-up"></div>
    <div class="about__text" data-aos="fade-up">
      <p>{t(locale, 'about.p1')}</p>
      <p>{t(locale, 'about.p2')}</p>
      <p>{t(locale, 'about.p3')}</p>
      <p class="about__closing">{t(locale, 'about.closing')}</p>
    </div>
  </div>
</section>

<section class="pillars" id="pilares">
  <div class="container">
    <h2 class="section__title" data-aos="fade-up">{t(locale, 'pillars.title')}</h2>
    <div class="section__underline" data-aos="fade-up"></div>
    <div class="pillars__grid">
      <a class="pillars__card" href={home + '#tecnologia'} data-aos="fade-up" data-aos-delay="100">
        <div class="pillars__icon" aria-hidden="true"><i class="fa-solid fa-laptop-code"></i></div>
        <h3 class="pillars__title">{t(locale, 'pillars.tech_t')}</h3>
        <p class="pillars__desc">{t(locale, 'pillars.tech_d')}</p>
      </a>
      <a class="pillars__card" href={home + '#contenido'} data-aos="fade-up" data-aos-delay="150">
        <div class="pillars__icon" aria-hidden="true"><i class="fa-solid fa-video"></i></div>
        <h3 class="pillars__title">{t(locale, 'pillars.content_t')}</h3>
        <p class="pillars__desc">{t(locale, 'pillars.content_d')}</p>
      </a>
      <a class="pillars__card" href={home + '#cursos'} data-aos="fade-up" data-aos-delay="200">
        <div class="pillars__icon" aria-hidden="true"><i class="fa-solid fa-graduation-cap"></i></div>
        <h3 class="pillars__title">{t(locale, 'pillars.training_t')}</h3>
        <p class="pillars__desc">{t(locale, 'pillars.training_d')}</p>
      </a>
      <a class="pillars__card" href={home + '#experiencia'} data-aos="fade-up" data-aos-delay="250">
        <div class="pillars__icon" aria-hidden="true"><i class="fa-solid fa-earth-americas"></i></div>
        <h3 class="pillars__title">{t(locale, 'pillars.exchange_t')}</h3>
        <p class="pillars__desc">{t(locale, 'pillars.exchange_d')}</p>
      </a>
      <a class="pillars__card" href={home + '#productos'} data-aos="fade-up" data-aos-delay="300">
        <div class="pillars__icon" aria-hidden="true"><i class="fa-solid fa-rocket"></i></div>
        <h3 class="pillars__title">{t(locale, 'pillars.venture_t')}</h3>
        <p class="pillars__desc">{t(locale, 'pillars.venture_d')}</p>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CSS after the existing `.section__underline` block**

```css
.about,
.pillars,
.tech {
    padding: var(--section-padding);
}

.about {
    background-color: var(--color-bg);
}

.about__text {
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
}

.about__text p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
    color: var(--color-text-light);
}

.about__closing {
    font-family: var(--font-heading);
    font-weight: 700;
    color: var(--color-primary) !important;
}

.pillars {
    background-color: var(--color-bg-light);
}

.pillars__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media screen and (min-width: 768px) {
    .pillars__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (min-width: 1024px) {
    .pillars__grid {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }
}

.pillars__card {
    display: block;
    background: var(--color-white);
    padding: 1.5rem 1.25rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    text-align: center;
    border: 2px solid transparent;
    transition: var(--transition);
    color: inherit;
}

.pillars__card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
}

.pillars__icon {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: 0.75rem;
}

.pillars__title {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
}

.pillars__desc {
    font-size: 0.95rem;
    color: var(--color-text-light);
    line-height: 1.5;
}

.about,
.pillars,
.tech,
#quienes-somos,
#pilares,
#tecnologia {
    scroll-margin-top: 90px;
}
```

- [ ] **Step 3: Check in the browser**

`/es/#quienes-somos` shows the company definition and closing line. `/es/#pilares` shows five cards. Clicking Tecnología jumps to `#tecnologia` (empty until Task 6 — that is OK).

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 5: Navigation and footer

**Files:**
- Modify: `src/components/Header.astro` (the `<ul class="nav__list">` and CTA)
- Modify: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `nav.inicio`, `nav.quienesSomos`, `nav.tecnologia`, `nav.intercambio`, `nav.contenido`, `nav.productosServicios`, `nav.mundoAnkabasi`, `nav.blog`, `nav.libro`, `nav.contacto`, `nav.ctaExperiencias`, `footer.tagline`, `footer.pillars`, `footer.quick`, `footer.copy`
- Produces: company-first chrome; Mundo Ankabasi group contains only Blog + Libro

- [ ] **Step 1: Replace the primary list and CTA in `Header.astro`**

```astro
<ul class="nav__list">
  <li class="nav__item">
    <a href={home + '#inicio'} class="nav__link">{t(locale, 'nav.inicio')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#quienes-somos'} class="nav__link">{t(locale, 'nav.quienesSomos')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#tecnologia'} class="nav__link">{t(locale, 'nav.tecnologia')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#experiencia'} class="nav__link">{t(locale, 'nav.intercambio')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#contenido'} class="nav__link">{t(locale, 'nav.contenido')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#productos'} class="nav__link">{t(locale, 'nav.productosServicios')}</a>
  </li>
  <li class="nav__item">
    <a href={home + '#contacto'} class="nav__link">{t(locale, 'nav.contacto')}</a>
  </li>
</ul>
<div class="nav__mundo">
  <span class="nav__mundo-label">{t(locale, 'nav.mundoAnkabasi')}</span>
  <ul class="nav__mundo-list">
    <li class="nav__item nav__item--mundo">
      <a href={localePath(locale, 'blog/')} class="nav__link nav__link--mundo">{t(locale, 'nav.blog')}</a>
    </li>
    <li class="nav__item nav__item--mundo">
      <a href={localePath(locale, 'libro/')} class="nav__link nav__link--mundo">{t(locale, 'nav.libro')}</a>
    </li>
  </ul>
</div>
```

Change the header CTA:

```astro
<a href={home + '#experiencia'} class="btn btn--primary">{t(locale, 'nav.ctaExperiencias')}</a>
```

Remove unused `faqPath` import from `Header.astro` if it is no longer referenced.

- [ ] **Step 2: Update footer identity and quick links**

In the logo column, after `footer__description`:

```astro
<p class="footer__description">{t(locale, 'footer.tagline')}</p>
<p class="footer__pillars">{t(locale, 'footer.pillars')}</p>
```

Quick links:

```astro
<ul class="footer__links">
  <li><a href={home + '#inicio'}>{t(locale, 'nav.inicio')}</a></li>
  <li><a href={home + '#quienes-somos'}>{t(locale, 'nav.quienesSomos')}</a></li>
  <li><a href={home + '#tecnologia'}>{t(locale, 'nav.tecnologia')}</a></li>
  <li><a href={home + '#experiencia'}>{t(locale, 'nav.intercambio')}</a></li>
  <li><a href={faqPath(locale)}>FAQ</a></li>
  <li><a href={home + '#contacto'}>{t(locale, 'nav.contacto')}</a></li>
</ul>
```

Mundo column: Blog, Libro only (keep responsible-visit / what-to-expect if they remain useful; they are not the primary brand story).

Add CSS:

```css
.footer__pillars {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    color: var(--color-text-light);
    line-height: 1.5;
}
```

- [ ] **Step 3: Check desktop and hamburger (`< 1000px`)**

Expected: no Experiencia/Actividades/Precios/Galería/Folleto/FAQ/Testimonios/Dónde in the primary list. CTA reads `Conoce nuestras experiencias`. Footer tagline is the company sentence.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 6: Tecnología e innovación (CIE gate 3)

**Files:**
- Modify: `src/components/HomeSections.astro` (new section; exact placement locked in Task 13 — insert after pricing for now is fine)
- Modify: `src/styles/style.css` (`.tech` rules from Task 4 plus list styles)

**Interfaces:**
- Consumes: `tech.title`, `tech.lead`, `tech.p1`, `tech.visionTitle`, `tech.vision`, `tech.futureIntro`, `tech.item1`…`tech.item6`
- Produces: `id="tecnologia"`

- [ ] **Step 1: Add the section markup**

```astro
<section class="tech" id="tecnologia">
  <div class="container">
    <h2 class="section__title" data-aos="fade-up">{t(locale, 'tech.title')}</h2>
    <div class="section__underline" data-aos="fade-up"></div>
    <p class="section__subtitle" data-aos="fade-up">{t(locale, 'tech.lead')}</p>
    <div class="tech__body" data-aos="fade-up">
      <p>{t(locale, 'tech.p1')}</p>
      <h3 class="tech__vision-title">{t(locale, 'tech.visionTitle')}</h3>
      <p class="tech__vision">{t(locale, 'tech.vision')}</p>
      <p>{t(locale, 'tech.futureIntro')}</p>
      <ul class="tech__list">
        <li>{t(locale, 'tech.item1')}</li>
        <li>{t(locale, 'tech.item2')}</li>
        <li>{t(locale, 'tech.item3')}</li>
        <li>{t(locale, 'tech.item4')}</li>
        <li>{t(locale, 'tech.item5')}</li>
        <li>{t(locale, 'tech.item6')}</li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.tech {
    background-color: var(--color-bg);
}

.tech__body {
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    color: var(--color-text-light);
    font-size: 1.05rem;
    line-height: 1.8;
}

.tech__vision-title {
    font-family: var(--font-heading);
    color: var(--color-primary);
    margin: 2rem 0 0.75rem;
}

.tech__vision {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--color-primary) !important;
    margin-bottom: 1.5rem;
}

.tech__list {
    list-style: none;
    display: grid;
    gap: 0.65rem;
    margin-top: 1rem;
    text-align: left;
}

.tech__list li {
    padding: 0.75rem 1rem;
    background: var(--color-bg-light);
    border-radius: var(--border-radius);
    border-left: 4px solid var(--color-primary);
}
```

- [ ] **Step 3: Open `/es/#tecnologia`**

Expected: vision sentence visible; six future-line items; nav Tecnología scrolls here.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 7: Formación digital (CIE gate 4)

**Files:**
- Modify: `src/components/HomeSections.astro` (section `#cursos`, currently the three `example.com` course cards)

**Interfaces:**
- Consumes: `cursos.title`, `cursos.subtitle`, `cursos.description`, `cursos.comingSoon`, `cursos.course1.title/desc` … `cursos.course4.title/desc`
- Produces: four cards, zero outbound course links

- [ ] **Step 1: Replace the cursos inner content**

Keep `id="cursos"` and the `community-section` wrappers. Replace the intro + grid with:

```astro
<section class="community-section community-section--cursos" id="cursos">
  <div class="community-section__stripe" aria-hidden="true"></div>
  <div class="container">
    <h2 class="section__title" data-aos="fade-up">{t(locale, 'cursos.title')}</h2>
    <div class="section__underline" data-aos="fade-up"></div>
    <p class="section__subtitle" data-aos="fade-up">{t(locale, 'cursos.subtitle')}</p>
    <p class="community-section__intro" data-aos="fade-up">{t(locale, 'cursos.description')}</p>
    <div class="cursos__grid">
      <article class="cursos__card" data-aos="fade-up" data-aos-delay="100">
        <div class="cursos__icon" aria-hidden="true"><i class="fa-solid fa-laptop"></i></div>
        <h3 class="cursos__title">{t(locale, 'cursos.course1.title')}</h3>
        <p class="cursos__desc">{t(locale, 'cursos.course1.desc')}</p>
      </article>
      <article class="cursos__card" data-aos="fade-up" data-aos-delay="150">
        <div class="cursos__icon" aria-hidden="true"><i class="fa-solid fa-seedling"></i></div>
        <h3 class="cursos__title">{t(locale, 'cursos.course2.title')}</h3>
        <p class="cursos__desc">{t(locale, 'cursos.course2.desc')}</p>
      </article>
      <article class="cursos__card" data-aos="fade-up" data-aos-delay="200">
        <div class="cursos__icon" aria-hidden="true"><i class="fa-solid fa-comments"></i></div>
        <h3 class="cursos__title">{t(locale, 'cursos.course3.title')}</h3>
        <p class="cursos__desc">{t(locale, 'cursos.course3.desc')}</p>
      </article>
      <article class="cursos__card" data-aos="fade-up" data-aos-delay="250">
        <div class="cursos__icon" aria-hidden="true"><i class="fa-solid fa-microchip"></i></div>
        <h3 class="cursos__title">{t(locale, 'cursos.course4.title')}</h3>
        <p class="cursos__desc">{t(locale, 'cursos.course4.desc')}</p>
      </article>
    </div>
    <p class="cursos__soon" data-aos="fade-up">{t(locale, 'cursos.comingSoon')}</p>
  </div>
</section>
```

There must be no `<a href="https://example.com/...">` in this section.

Add:

```css
.cursos__grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.cursos__soon {
    text-align: center;
    margin-top: 2rem;
    font-weight: 600;
    color: var(--color-primary);
}
```

- [ ] **Step 2: Confirm no course links**

Run: `rg "example.com" src/components/HomeSections.astro`

Expected: remaining hits only in `#productos` until Task 9, or none if you already removed them. This task must remove the three `curso-*` anchors.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 8: FAQ + Organization JSON-LD (CIE gate 5)

**Files:**
- Modify: `src/data/faq.ts` (item `id: 'what-is'` and `id: 'includes'`)
- Modify: `src/pages/[locale]/faq.astro` (lead paragraph)
- Modify: `src/data/site.ts` (`organizationJsonLd`)
- Modify: `src/data/guides.ts` (packages body sentences that advertise `trabajo espiritual`)

**Interfaces:**
- Consumes: none from UI keys for FAQ answers (FAQ stores per-locale strings on the item)
- Produces: FAQ + schema that match RF13 and RF20

- [ ] **Step 1: Replace the `what-is` answers**

```ts
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
```

- [ ] **Step 2: Replace the `includes` answers (no spiritual-offer list)**

```ts
es: 'Según el paquete: transporte desde Aracataca, alimentación, alojamiento en hamaca o bohío, caminatas, espacios de diálogo cultural y, en planes más largos, talleres de artesanía y actividades educativas autorizadas por la comunidad.',
en: 'Depending on the package: transport from Aracataca, meals, lodging in a hammock or bohío, walks, cultural dialogue, and on longer plans craft workshops and educational activities authorized by the community.',
de: 'Je nach Paket: Transport ab Aracataca, Verpflegung, Unterkunft in Hängematte oder Bohío, Wanderungen, kultureller Dialog und bei längeren Plänen Handwerks-Workshops sowie von der Gemeinschaft autorisierte Bildungsaktivitäten.',
fr: 'Selon le forfait : transport depuis Aracataca, repas, hébergement en hamac ou bohío, marches, dialogue culturel, et pour les séjours plus longs ateliers d’artisanat et activités éducatives autorisées par la communauté.',
```

- [ ] **Step 3: Update FAQ page lead in `src/pages/[locale]/faq.astro`**

Replace the four-locale lead with:

```astro
{
  locale === 'es'
    ? 'Respuestas sobre ANKABASI, empresa tecnológica y digital de la comunidad Arhuaca de Gwimake, y sobre su línea de intercambio cultural.'
    : locale === 'en'
      ? 'Answers about ANKABASI, a technology and digital company of the Arhuaco community of Gwimake, and its cultural exchange line.'
      : locale === 'de'
        ? 'Antworten zu ANKABASI, dem Technologie- und Digitalunternehmen der Arhuaco-Gemeinschaft von Gwimake, und zur Linie des kulturellen Austauschs.'
        : 'Réponses sur ANKABASI, entreprise technologique et numérique de la communauté arhuaco de Gwimake, et sur sa ligne d’échange culturel.'
}
```

- [ ] **Step 4: Change `organizationJsonLd` in `src/data/site.ts`**

```ts
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
```

Keep the homepage `TouristTrip` ItemList in `src/pages/[locale]/index.astro` — that list is the commercial exchange line, not the organization type.

- [ ] **Step 5: In `src/data/guides.ts` packages `body.es[0]` (and en/de/fr equivalents)**

Replace “trabajo espiritual con el mamo” / “spiritual work with the mamo” with “acompañamiento cultural y espacios de diálogo”.

- [ ] **Step 6: Run tests**

Run: `npm test`

Expected: FAQ and JSON-LD tests PASS. `example.com` and fake names may still FAIL.

Open `/es/faq/`. Expected: first answer starts with empresa tecnológica y digital.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 9: Remove placeholder store links (CIE gate 6)

**Files:**
- Modify: `src/components/HomeSections.astro` (`#productos` card)

**Interfaces:**
- Consumes: `productos.title`, `productos.subtitle`, `productos.description`, `productos.cta`
- Produces: products section with no `href` to a shop

- [ ] **Step 1: Replace the product CTA anchor with a non-link**

```astro
<p class="community-section__text">{t(locale, 'productos.description')}</p>
<p class="productos__soon">{t(locale, 'productos.cta')}</p>
```

Do not use `<a href="https://example.com/tienda-ankabasi">`. Do not use `href="#"` pretending to be a store.

```css
.productos__soon {
    display: inline-block;
    margin-top: 1.25rem;
    padding: 12px 30px;
    border-radius: var(--border-radius);
    font-family: var(--font-heading);
    font-weight: 600;
    background-color: var(--color-bg-light);
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
}
```

- [ ] **Step 2: Grep**

Run: `rg "example.com" src`

Expected: no matches.

- [ ] **Step 3: `npm test`**

Expected: `src/ contains no example.com placeholders` PASS.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 10: Testimonials → validation in progress (CIE gate 7)

**Files:**
- Modify: `src/components/HomeSections.astro` (`#testimonios`)
- Modify: `src/styles/style.css`

**Interfaces:**
- Consumes: `testimonials.title`, `testimonials.note`
- Produces: no personal names on the homepage

- [ ] **Step 1: Replace the three cards**

```astro
<section class="testimonials" id="testimonios">
  <div class="container">
    <h2 class="section__title" data-aos="fade-up">{t(locale, 'testimonials.title')}</h2>
    <div class="section__underline" data-aos="fade-up"></div>
    <p class="testimonials__note" data-aos="fade-up">{t(locale, 'testimonials.note')}</p>
  </div>
</section>
```

```css
.testimonials__note {
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--color-text-light);
}
```

- [ ] **Step 2: `npm test`**

Expected: prototype-names test PASS.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 11: Cultural exchange, activities, pricing, territory

**Files:**
- Modify: `src/components/HomeSections.astro` (`#experiencia`, `#actividades`, `#precios`, `#donde`)
- Modify: `src/styles/style.css` (activities grid 8 cards → 4 columns on desktop)

**Interfaces:**
- Consumes: `experience.*`, `activities.territory_*` … `community_*`, `pricing.title`, `pricing.disclaimer`, `pricing.plan1_f6`, `pricing.plan1_f7`, `location.title`, `location.identity`, existing meeting/dest keys
- Produces: tourism framed as a service line; no ritual/spiritual marketing

- [ ] **Step 1: Experience copy block**

```astro
<h2 class="section__title">{t(locale, 'experience.title')}</h2>
<div class="section__underline"></div>
<div class="experience__text">
  <p>{t(locale, 'experience.intro')}</p>
  <p>{t(locale, 'experience.p1')}</p>
  <p>{t(locale, 'experience.p2')}</p>
</div>
<a href={home + '#precios'} class="btn btn--secondary">{t(locale, 'experience.cta')}</a>
```

Do not use `tHtml` for `experience.p1` unless it still contains the Gwimake link. If you keep a Gwimake link, put it only in `experience.p1` HTML in `ui.ts` and use `tHtml`. Do not mention rituales.

- [ ] **Step 2: Replace the 10 activity cards with these 8, in this order**

| Icon class | Title key | Description key |
|---|---|---|
| `fa-solid fa-mountain` | `activities.territory_t` | `activities.territory_d` |
| `fa-solid fa-person-hiking` | `activities.walks_t` | `activities.walks_d` |
| `fa-solid fa-comments` | `activities.dialogue_t` | `activities.dialogue_d` |
| `fa-solid fa-utensils` | `activities.food_t` | `activities.food_d` |
| `fa-solid fa-palette` | `activities.craft_t` | `activities.craft_d` |
| `fa-solid fa-chalkboard-user` | `activities.education_t` | `activities.education_d` |
| `fa-solid fa-book-open` | `activities.stories_t` | `activities.stories_d` |
| `fa-solid fa-people-group` | `activities.community_t` | `activities.community_d` |

Remove cards for transporte, trabajo espiritual, alojamiento, charlas, hilos, siembra, guía as standalone visitor-facing spiritual/logistics marketing. Logistics stay in pricing bullets (`plan1_f1`–`f5`).

Change desktop grid:

```css
@media screen and (min-width: 1024px) {
    .activities__grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
```

- [ ] **Step 3: Pricing heading + disclaimer**

Immediately under `.section__underline` of `#precios`:

```astro
<p class="section__subtitle" data-aos="fade-up">{t(locale, 'pricing.disclaimer')}</p>
```

Keep amounts `$700.000` and `$1.300.000`. Keep payment methods. `plan1_f6` / `plan1_f7` now come from Task 2 (no mamo/hilos).

- [ ] **Step 4: Territory section**

Keep map and Aracataca → Gwimake facts. Change the visible title via `location.title`. Add after subtitle:

```astro
<p class="location__identity" data-aos="fade-up">{t(locale, 'location.identity')}</p>
```

Update `location.dest_d` in `ui.ts` if it still says “experiencia ancestral única”: use “Gwimake es una comunidad Arhuaca en la Sierra Nevada, origen de la identidad y la propuesta de valor de ANKABASI.” (and EN/DE/FR equivalents already implied by `location.identity`; dest_d may be shortened to avoid duplicating ancestral-experience language).

- [ ] **Step 5: Browser check**

`/es/#experiencia` does not invite ritual participation. `/es/#actividades` has eight cards. `/es/#precios` shows the disclaimer. `/es/#donde` heading is `Nuestro territorio`.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 12: Historias, Mundo ANKABASI, libro

**Files:**
- Modify: `src/components/HomeSections.astro` (`#galeria` → also `id="contenido"`; mundo + libro teaser)
- Modify: `src/data/blog-data.ts`
- Modify: `src/pages/[locale]/blog/index.astro`
- Modify: `src/pages/[locale]/libro/index.astro`

**Interfaces:**
- Consumes: `gallery.title`, `gallery.subtitle`, `gallery.tags`, `blog.title`, `blog.cat_*`, `libro.subtitle`, `libro.status`
- Produces: `id="contenido"` for nav; posts expose `category: 'cultura' | 'territorio'`

- [ ] **Step 1: Gallery heading**

Change the gallery `<section>` opening tag to:

```astro
<section class="gallery" id="contenido">
```

Keep `id="galeria"` out to avoid duplicate IDs. Update any leftover `#galeria` hrefs in the repo to `#contenido`.

Add under the subtitle:

```astro
<p class="gallery__tags">{t(locale, 'gallery.tags')}</p>
```

```css
.gallery__tags {
    text-align: center;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--color-secondary);
    margin: -1.5rem 0 2rem;
    letter-spacing: 0.04em;
}

#contenido {
    scroll-margin-top: 90px;
}
```

Keep existing photos/videos/filters/lightbox. This section is now a content line, not a tour album title.

- [ ] **Step 2: Add categories to posts**

In `src/data/blog-data.ts`:

```ts
export const BLOG_POSTS = [
  {
    slug: 'los-sabios-de-la-montana',
    date: '2026-05-20',
    category: 'cultura',
    featuredImage: '/images/blog/DSC09240.jpg',
    images: [ /* unchanged */ ],
  },
  {
    slug: 'donachwi-y-su-entorno',
    date: '2026-05-08',
    category: 'territorio',
    featuredImage: '/images/blog/DSC09322.jpg',
    images: [ /* unchanged */ ],
  },
];
```

- [ ] **Step 3: Blog index heading + badge**

In `src/pages/[locale]/blog/index.astro`, the `<h1>` already uses `blog.title` (now `Mundo ANKABASI`). On each card, after `<time>`:

```astro
<p class="blog-card__cat">{t(locale, `blog.cat_${post.category}`)}</p>
```

Valid `post.category` values used today: `cultura`, `territorio`. Do not invent extra posts.

On the homepage mundo teaser, the block title already uses `blog.title`. Keep libro teaser; under the book title add:

```astro
<p class="libro-teaser__status">{t(locale, 'libro.status')}</p>
```

- [ ] **Step 4: Libro page framing**

In `src/pages/[locale]/libro/index.astro`, show status above the read button:

```astro
<p>{t(locale, 'libro.subtitle')}</p>
<p><strong>{t(locale, 'libro.status')}</strong></p>
```

Keep the existing reader link to `/libro/index.html`. Do not retitle the work as a finished commercial book.

- [ ] **Step 5: Check**

`/es/#contenido` title is `Historias desde Gwimake`. `/es/blog/` H1 is `Mundo ANKABASI` with category labels. `/es/libro/` shows proyecto editorial en desarrollo.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

### Task 13: Homepage order, full verification

**Files:**
- Modify: `src/components/HomeSections.astro` (reorder section blocks only; do not rewrite inner markup)
- Test: `scripts/content-guards.test.mjs`, `npm run build`

**Interfaces:**
- Consumes: all sections created in Tasks 3–12
- Produces: DOM order matching RF19

- [ ] **Step 1: Reorder sections in `HomeSections.astro` to this sequence**

1. `#inicio` (hero)  
2. `#quienes-somos`  
3. `#pilares`  
4. `#donde` (Nuestro territorio)  
5. `#experiencia`  
6. `#actividades`  
7. `#precios`  
8. `#folleto` (keep; not in main nav)  
9. `#tecnologia`  
10. `#contenido` (Historias)  
11. `#cursos`  
12. `#productos`  
13. `#mundo-ankabasi`  
14. `#testimonios` (validation note; short)  
15. `#contacto`  

Move entire `<section>…</section>` blocks; do not nest sections. Contact stays last.

- [ ] **Step 2: Run the full gate**

```bash
npm test
npm run build
rg "example.com" src dist
rg "Una Experiencia Ancestral" src dist
rg "María González|Juan Pérez|Ana Martínez" src dist
```

Expected:

- `npm test` exit 0  
- `npm run build` exit 0  
- no `example.com` in `src` or `dist`  
- no `Una Experiencia Ancestral` in built HTML (legacy root `index.html` may still contain it; that file is not in `dist` — do not fail the task on it)  
- no prototype names in `src` or `dist`

Open `dist/es/index.html` and confirm the first `<h2>` after the hero is `¿Qué es ANKABASI?`. Repeat a skim of `dist/en/index.html`, `dist/de/index.html`, `dist/fr/index.html` for the translated company subtitle.

- [ ] **Skip commit (human owns git).**

Do not run `git commit`. Leave files saved and uncommitted.


---

## Self-review (spec coverage)

| Spec | Task |
|------|------|
| RF1 Portada | 2, 3 |
| RF2 Qué es ANKABASI | 2, 4 |
| RF3 Cinco pilares | 2, 4 |
| RF4 Menú | 5 |
| RF5 Intercambio cultural | 2, 11 |
| RF6 Actividades | 2, 11 |
| RF7 Precios | 2, 11 |
| RF8 Tecnología | 2, 6 |
| RF9 Contenido / galería | 2, 12 |
| RF10 Productos / no example.com | 2, 9 |
| RF11 Formación | 2, 7 |
| RF12 Testimonios | 2, 10 |
| RF13 FAQ | 8 |
| RF14 Territorio | 2, 11 |
| RF15 Mundo ANKABASI / categorías | 2, 12 |
| RF16 Libro | 2, 12 |
| RF17 Idiomas | 2, 13 |
| RF18 Footer | 2, 5 |
| RF19 Orden de página | 13 |
| RF20 JSON-LD Organization | 8 |
| CIE 7 gates | 3, 4, 6, 7, 8, 9, 10 |
| No spiritual-offer marketing | 2, 8, 11 |
| Tests | 1, then every later `npm test` |

Placeholder scan: no TBD/TODO; all copy is in Task 2; all markup snippets are in later tasks.

Key consistency: `about`, `pillars`, `tech`, `nav.quienesSomos`, `nav.ctaExperiencias`, `main.tagline`, `main.ctaSecondary`, `cursos.course4`, `cursos.comingSoon`, `productos.cta`, `testimonials.note`, `location.identity`, `footer.pillars`, `gallery.tags`, `libro.status` are defined in Task 2 and consumed under those exact names.

Section ids used everywhere: `inicio`, `quienes-somos`, `pilares`, `tecnologia`, `experiencia`, `contenido`, `productos`, `cursos`, `contacto`, `donde`, `precios`, `mundo-ankabasi`.
