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

  it('hides the testimonials section when there are no visitor comments', () => {
    const data = read('src/data/testimonials.ts');
    assert.match(data, /export const TESTIMONIALS/);
    assert.match(data, /TESTIMONIALS[\s\S]*?=\s*\[\s*\]/);
    const page = home();
    assert.match(page, /from '\.\.\/data\/testimonials'/);
    assert.match(page, /TESTIMONIALS\.length\s*>\s*0/);
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

  it('primary nav is company-first; Mundo Ankabasi is Blog and Libro only', () => {
    const h = header();
    assert.match(h, /nav\.quienesSomos/);
    assert.match(h, /nav\.tecnologia/);
    assert.match(h, /nav\.intercambio/);
    assert.match(h, /nav\.contenido/);
    assert.match(h, /nav\.productosServicios/);
    assert.match(h, /nav\.ctaExperiencias/);
    assert.match(h, /href=\{home \+ '#experiencia'\} class="btn btn--primary"/);
    assert.doesNotMatch(h, /faqPath/);
    assert.doesNotMatch(h, /nav\.actividades/);
    assert.doesNotMatch(h, /nav\.precios/);
    assert.doesNotMatch(h, /nav\.galeria/);
    assert.doesNotMatch(h, /nav\.folleto/);
    assert.doesNotMatch(h, /nav\.testimonios/);
    assert.doesNotMatch(h, /nav\.donde/);
    assert.doesNotMatch(h, /nav\.reservar/);
    const mundo = h.split('nav__mundo-list')[1]?.split('</ul>')[0] ?? '';
    assert.match(mundo, /nav\.blog/);
    assert.match(mundo, /nav\.libro/);
    assert.doesNotMatch(mundo, /nav\.productos[^S]/);
    assert.doesNotMatch(mundo, /nav\.cursos/);
  });

  it('cursos section has four cards, comingSoon, and no outbound course links', () => {
    const page = home();
    const cursos = page.split('id="cursos"')[1]?.split('id="mundo-ankabasi"')[0] ?? '';
    assert.equal((cursos.match(/class="cursos__card"/g) ?? []).length, 4);
    assert.match(cursos, /cursos\.course1\.title/);
    assert.match(cursos, /cursos\.course2\.title/);
    assert.match(cursos, /cursos\.course3\.title/);
    assert.match(cursos, /cursos\.course4\.title/);
    assert.match(cursos, /cursos\.comingSoon/);
    assert.match(cursos, /class="cursos__soon"/);
    assert.doesNotMatch(cursos, /example\.com/);
    assert.doesNotMatch(cursos, /cursos\.cta/);
    assert.doesNotMatch(cursos, /curso-emprendimiento|curso-digital|curso-liderazgo/);
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
    assert.match(f, /#tecnologia/);
    assert.match(f, /nav\.intercambio/);
    assert.match(f, /faqPath\(locale\)/);
    assert.doesNotMatch(f, /nav\.experiencia/);
    assert.doesNotMatch(f, /nav\.precios/);
    const css = read('src/styles/style.css');
    const pillars = css.split('.footer__pillars {')[1]?.split('}')[0] ?? '';
    assert.match(pillars, /color:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/);
    assert.doesNotMatch(pillars, /--color-text-light/);
  });

  it('experience section is a service line without ritual invitation', () => {
    const page = home();
    const exp = page.split('id="experiencia"')[1]?.split('id="actividades"')[0] ?? '';
    assert.match(exp, /experience\.intro/);
    assert.match(exp, /experience\.p1/);
    assert.match(exp, /experience\.p2/);
    assert.match(exp, /home \+ '#precios'/);
    assert.doesNotMatch(exp, /tHtml\(locale, 'experience/);
    assert.doesNotMatch(ui(), /participa en sus rituales/);
    assert.match(ui(), /Intercambio cultural en Gwimake/);
  });

  it('activities grid has eight cultural cards and four desktop columns', () => {
    const page = home();
    const acts = page.split('id="actividades"')[1]?.split('id="donde"')[0] ?? '';
    assert.equal((acts.match(/class="activity__card"/g) ?? []).length, 8);
    const order = [
      'activities.territory_t',
      'activities.walks_t',
      'activities.dialogue_t',
      'activities.food_t',
      'activities.craft_t',
      'activities.education_t',
      'activities.stories_t',
      'activities.community_t',
    ];
    let last = -1;
    for (const key of order) {
      const i = acts.indexOf(key);
      assert.ok(i > last, key);
      last = i;
    }
    assert.match(acts, /fa-mountain/);
    assert.match(acts, /fa-chalkboard-user/);
    assert.match(acts, /fa-book-open/);
    assert.match(acts, /fa-people-group/);
    for (const gone of [
      'activities.spiritual_',
      'activities.transport_',
      'activities.lodging_',
      'activities.talks_',
      'activities.threads_',
      'activities.planting_',
      'activities.guide_',
    ]) {
      assert.equal(acts.includes(gone), false, gone);
    }
    const css = read('src/styles/style.css');
    assert.match(
      css,
      /@media screen and \(min-width: 1024px\) \{\s*\.activities__grid \{\s*grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/s,
    );
  });

  it('pricing keeps published amounts and shows variation disclaimer', () => {
    const page = home();
    const pricing = page.split('id="precios"')[1]?.split('id="tecnologia"')[0] ?? '';
    assert.match(pricing, /pricing\.disclaimer/);
    assert.match(pricing, /\$700\.000/);
    assert.match(pricing, /\$1\.300\.000/);
    assert.match(ui(), /Los valores pueden variar según número de participantes/);
  });

  it('territory section titles Gwimake as identity, not unique ancestral experience', () => {
    const page = home();
    const loc = page.split('id="donde"')[1]?.split('id="precios"')[0] ?? '';
    assert.match(loc, /class="location__identity"/);
    assert.match(loc, /location\.identity/);
    const text = ui();
    assert.match(text, /title: 'Nuestro territorio'/);
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

  it('gallery is contenido with Historias framing, tags, and no ancestral-experience alts', () => {
    const page = home();
    const gallery = page.split('id="contenido"')[1]?.split('id="cursos"')[0] ?? '';
    assert.match(page, /<section class="gallery" id="contenido">/);
    assert.doesNotMatch(page, /id="galeria"/);
    assert.match(gallery, /gallery\.title/);
    assert.match(gallery, /gallery\.subtitle/);
    assert.match(gallery, /gallery\.tags/);
    assert.doesNotMatch(gallery, /Experiencia Ancestral/);
    assert.match(ui(), /title: 'Historias desde Gwimake'/);
    const css = read('src/styles/style.css');
    const tags = css.split('.gallery__tags {')[1]?.split('}')[0] ?? '';
    assert.match(tags, /text-align:\s*center/);
    assert.match(tags, /--color-secondary/);
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

  it('homepage FAQ teaser shows three questions and links to the FAQ page', () => {
    const page = home();
    const teaser = page.split('id="faq"')[1]?.split('id="contacto"')[0] ?? '';
    assert.match(page, /<section class="faq-teaser" id="faq">/);
    assert.match(home(), /faqItems\.slice\(0,\s*3\)/);
    assert.match(teaser, /teaserFaqs\.map/);
    assert.match(teaser, /class="faq-teaser__item"/);
    assert.match(teaser, /faq\.title/);
    assert.match(teaser, /faq\.seeMore/);
    assert.match(teaser, /faqPath\(locale\)/);
    const blog = page.split('id="blog"')[1]?.split('id="libro"')[0] ?? '';
    assert.doesNotMatch(blog, /faqPath/);
    const text = ui();
    assert.match(text, /title: 'Preguntas frecuentes'/);
    assert.match(text, /seeMore: 'Ver más preguntas'/);
    assert.match(text, /title: 'Frequently asked questions'/);
    assert.match(text, /title: 'Häufige Fragen'/);
    assert.match(text, /title: 'Questions fréquentes'/);
  });

  it('libro teaser and page show editorial-in-development status', () => {
    const page = home();
    const teaser = page.split('id="libro"')[1]?.split('</section>')[0] ?? '';
    assert.match(teaser, /libro-teaser__status/);
    assert.match(teaser, /libro\.status/);
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
