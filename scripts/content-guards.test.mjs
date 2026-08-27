import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
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
    const data = read('src/data/testimonials.ts');
    for (const name of [
      'María González',
      'Juan Pérez',
      'Ana Martínez',
      'Daniel Hart',
      'Priya Nair',
      'Thomas Reed',
      'Léa Morel',
      'Jonas Weber',
      'Anna Schäfer',
      'Stefan Hoffmann',
      'Helen Brooks',
    ]) {
      assert.equal(page.includes(name), false, name);
      assert.equal(data.includes(name), false, name);
    }
  });

  it('hides visitor experiences from the public site', () => {
    const data = read('src/data/testimonials.ts');
    assert.match(data, /export const TESTIMONIALS/);
    assert.match(data, /TESTIMONIALS[\s\S]*?=\s*\[\s*\]/);
    assert.doesNotMatch(home(), /testimonials/);
    assert.doesNotMatch(home(), /TESTIMONIALS/);
    assert.doesNotMatch(header(), /nav\.testimonios/);
  });

  it('JSON-LD describes an Organization, not a TouristAttraction', () => {
    const jsonLd = site().split('organizationJsonLd')[1] ?? '';
    assert.match(jsonLd, /'@type': 'Organization'/);
    assert.doesNotMatch(jsonLd, /TouristAttraction/);
  });

  it('homepage has company sections and company nav', () => {
    assert.match(home(), /id="quienes-somos"/);
    assert.match(home(), /id="pilares"/);
    assert.doesNotMatch(home(), /id="tecnologia"/);
    assert.match(header(), /nav\.gwimake/);
    assert.match(header(), /nav\.mundoAnkabasi/);
    assert.match(footer(), /footer\.pillars/);
  });

  it('primary nav is Inicio, Gwimake dropdown and Mundo Ankabasi dropdown', () => {
    const h = header();
    assert.match(h, /nav\.inicio/);
    assert.match(h, /nav\.gwimake/);
    assert.match(h, /nav\.mundoAnkabasi/);
    assert.match(h, /pagePath\(locale, 'experiencias'\)/);
    assert.match(h, /pagePath\(locale, 'territorio'\)/);
    assert.match(h, /pagePath\(locale, 'galeria'\)/);
    assert.match(h, /pagePath\(locale, 'contacto'\)/);
    assert.match(h, /pagePath\(locale, 'tecnologia'\)/);
    assert.match(h, /pagePath\(locale, 'formacion'\)/);
    assert.match(h, /pagePath\(locale, 'productos'\)/);
    assert.match(h, /faqPath\(locale\)/);
    assert.match(h, /nav\.blog/);
    assert.match(h, /nav\.libro/);
    assert.doesNotMatch(h, /nav\.ctaExperiencias/);
    assert.doesNotMatch(h, /class="btn btn--primary"/);
    assert.doesNotMatch(h, /nav\.actividades/);
    assert.doesNotMatch(h, /nav\.precios/);
    assert.doesNotMatch(h, /nav\.folleto/);
    assert.doesNotMatch(h, /nav\.testimonios/);
    assert.doesNotMatch(h, /nav\.reservar/);
    const homePage = home();
    assert.match(homePage, /nav\.ctaExperiencias/);
    assert.match(homePage, /pagePath\(locale, 'experiencias'\)/);
  });

  it('cursos section has four cards, comingSoon, and no outbound course links', () => {
    const page = read('src/pages/[locale]/formacion.astro');
    assert.match(page, /id="cursos"/);
    assert.equal((page.match(/class="cursos__card"/g) ?? []).length, 1);
    assert.match(page, /cursos\.course1\.title|cursos\.\$\{course\}\.title/);
    assert.match(page, /course1/);
    assert.match(page, /course4/);
    assert.match(page, /cursos\.comingSoon/);
    assert.match(page, /class="cursos__soon"/);
    assert.doesNotMatch(page, /example\.com/);
    assert.doesNotMatch(page, /cursos\.cta/);
    assert.doesNotMatch(page, /curso-emprendimiento|curso-digital|curso-liderazgo/);
    const css = read('src/styles/style.css');
    const grid = css.split('.cursos__grid {')[1]?.split('}')[0] ?? '';
    assert.match(grid, /auto-fit/);
    const soon = css.split('.cursos__soon {')[1]?.split('}')[0] ?? '';
    assert.match(soon, /text-align:\s*center/);
    assert.match(soon, /--color-primary/);
  });

  it('footer shows company tagline, pillars, and company quick links', () => {
    const f = footer();
    assert.match(f, /footer\.tagline/);
    assert.match(f, /class="footer__pillars"/);
    assert.match(f, /footer\.pillars/);
    assert.match(f, /#quienes-somos/);
    assert.match(f, /pagePath\(locale, 'tecnologia'\)/);
    assert.match(f, /nav\.intercambio/);
    assert.match(f, /faqPath\(locale\)/);
    assert.doesNotMatch(f, /nav\.experiencia[^s]/);
    assert.doesNotMatch(f, /nav\.precios/);
    const css = read('src/styles/style.css');
    const pillars = css.split('.footer__pillars {')[1]?.split('}')[0] ?? '';
    assert.match(pillars, /color:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/);
    assert.doesNotMatch(pillars, /--color-text-light/);
  });

  it('experience section is a service line without ritual invitation', () => {
    const page = read('src/pages/[locale]/experiencias.astro');
    assert.match(page, /id="experiencia"/);
    assert.match(page, /experience\.intro/);
    assert.match(page, /experience\.p2/);
    assert.doesNotMatch(page, /tHtml\(locale, 'experience/);
    assert.doesNotMatch(ui(), /participa en sus rituales/);
    assert.match(ui(), /Intercambio cultural en Gwimake/);
  });

  it('activities grid has eight cultural cards and four desktop columns', () => {
    const page = read('src/pages/[locale]/experiencias.astro');
    const order = [
      "key: 'territory'",
      "key: 'walks'",
      "key: 'dialogue'",
      "key: 'food'",
      "key: 'craft'",
      "key: 'education'",
      "key: 'stories'",
      "key: 'community'",
    ];
    let last = -1;
    for (const key of order) {
      const i = page.indexOf(key);
      assert.ok(i > last, key);
      last = i;
    }
    assert.match(page, /fa-mountain/);
    assert.match(page, /fa-chalkboard-user/);
    assert.match(page, /fa-book-open/);
    assert.match(page, /fa-people-group/);
    assert.match(page, /id="actividades"/);
    const css = read('src/styles/style.css');
    assert.match(
      css,
      /@media screen and \(min-width: 1024px\) \{\s*\.activities__grid \{\s*grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/s,
    );
  });

  it('pricing keeps published amounts and shows variation disclaimer', () => {
    const page = read('src/pages/[locale]/experiencias.astro');
    assert.match(page, /id="precios"/);
    assert.match(page, /pricing\.disclaimer/);
    assert.match(page, /\$700\.000/);
    assert.match(page, /\$1\.300\.000/);
    assert.match(page, /payment__whisper/);
    assert.match(ui(), /Los valores pueden variar según número de participantes/);
  });

  it('territory section titles Gwimake as identity, not unique ancestral experience', () => {
    const page = read('src/pages/[locale]/territorio.astro');
    assert.match(page, /id="donde"/);
    assert.match(page, /class="location__identity"/);
    assert.match(page, /location\.identity/);
    const text = ui();
    assert.match(text, /title: 'Dónde estamos'/);
    assert.match(text, /origen de la identidad y la propuesta de valor de ANKABASI/);
    assert.doesNotMatch(text, /experiencia ancestral única/);
    assert.doesNotMatch(text, /unique ancestral experience/);
  });

  it('guides do not advertise spiritual work to visitors', () => {
    const g = read('src/data/guides.ts');
    assert.doesNotMatch(g, /trabajo espiritual/i);
    assert.doesNotMatch(g, /spiritual work/i);
    assert.doesNotMatch(g, /spiritueller Arbeit/i);
    assert.doesNotMatch(g, /travail spirituel/i);
    assert.match(g, /acompañamiento cultural/);
    assert.match(g, /cultural accompaniment/);
  });

  it('gallery is a dedicated page with a bare title and no ancestral-experience alts', () => {
    const page = read('src/pages/[locale]/galeria.astro');
    const grid = read('src/components/GalleryGrid.astro');
    assert.match(page, /<section class="page gallery" id="contenido">/);
    assert.match(page, /gallery\.title/);
    assert.doesNotMatch(page, /gallery\.subtitle/);
    assert.doesNotMatch(page, /gallery\.tags/);
    assert.doesNotMatch(page, /Experiencia Ancestral/);
    assert.doesNotMatch(grid, /Experiencia Ancestral/);
    assert.match(ui(), /title: 'Galería'/);
    const css = read('src/styles/style.css');
    const contenido = css.split('#contenido {')[1]?.split('}')[0] ?? '';
    assert.match(contenido, /scroll-margin-top:\s*90px/);
    const srcHits = walkSrc(join(root, 'src')).filter((p) =>
      /#galeria/.test(readFileSync(p, 'utf8')),
    );
    assert.deepEqual(srcHits, []);
  });

  it('blog posts expose cultura/territorio categories and index badges', () => {
    const data = read('src/data/blog-data.ts');
    assert.match(data, /slug: 'los-sabios-de-la-montana'[\s\S]*?category: 'cultura'/);
    assert.match(data, /slug: 'donachwi-y-su-entorno'[\s\S]*?category: 'territorio'/);
    const index = read('src/pages/[locale]/blog/index.astro');
    assert.match(index, /blog\.title/);
    assert.match(index, /blog-card__cat/);
    assert.match(index, /blog\.cat_\$\{post\.category\}/);
  });

  it('FAQ and guide paths keep trailing slashes for local Astro routing', () => {
    const routes = read('src/i18n/routes.ts');
    assert.match(routes, /function faqPath[\s\S]*localePath\(locale, 'faq\/'\)/);
    assert.match(routes, /function guidePath[\s\S]*\$\{guideSlugs\[key\]\[locale\]\}\//);
  });

  it('FAQ lives as its own page, not as a homepage teaser', () => {
    assert.doesNotMatch(home(), /faq-teaser/);
    assert.match(header(), /faqPath\(locale\)/);
    const text = ui();
    assert.match(text, /title: 'Preguntas frecuentes'/);
    assert.match(text, /seeMore: 'Ver más preguntas'/);
    assert.match(text, /title: 'Frequently asked questions'/);
    assert.match(text, /title: 'Häufige Fragen'/);
    assert.match(text, /title: 'Questions fréquentes'/);
  });

  it('libro page shows editorial-in-development status', () => {
    assert.doesNotMatch(home(), /libro-teaser__status/);
    const libro = read('src/pages/[locale]/libro/index.astro');
    assert.match(libro, /libro\.subtitle/);
    assert.match(libro, /<strong>\{t\(locale, 'libro\.status'\)\}<\/strong>/);
    assert.match(libro, /href="\/libro\/"/);
    assert.match(ui(), /status: 'Proyecto editorial en desarrollo\.'/);
  });

  it('interactive libro reader is an Astro page with bundled styles', () => {
    assert.equal(existsSync(join(root, 'src/pages/libro/index.astro')), true);
    const reader = read('src/pages/libro/index.astro');
    assert.match(reader, /styles\/libro\.css/);
    assert.match(reader, /styles\/style\.css/);
    assert.match(reader, /class="libro-layout"/);
    assert.doesNotMatch(reader, /\.\.\/css\//);
    assert.doesNotMatch(reader, /\.\.\/js\//);
    assert.match(reader, /scripts\/libro\.js|\/js\/libro\.js/);
    assert.equal(existsSync(join(root, 'public/js/libro.js')), true);
    assert.equal(existsSync(join(root, 'public/js/libro-content.js')), true);
    assert.equal(existsSync(join(root, 'public/js/i18n.js')), true);
  });

  it('does not ship a public libro HTML that depends on missing /css assets', () => {
    assert.equal(existsSync(join(root, 'public/libro/index.html')), false);
  });

  it('legacy /libro/index.html redirects to the Astro reader', () => {
    const config = read('astro.config.mjs');
    assert.match(config, /['"]\/libro\/index\.html['"]/);
    assert.match(config, /['"]\/libro\/['"]/);
  });
});
