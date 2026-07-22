# SEO + GEO Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Ankabasi to Astro with `/es|/en|/de|/fr` URLs, technical SEO/GEO foundations, FAQ + topic guides, and preserved visual design.

**Architecture:** Astro static site; locale-prefixed pages; shared `site` facts + UI dictionaries from existing `js/i18n.js`; CSS/JS assets reused; content collections for FAQ, guides, blog.

**Tech Stack:** Astro 5, TypeScript, existing CSS, vanilla JS islands (gallery/contact/nav), `@astrojs/sitemap`

## Global Constraints

- Locales: `es`, `en`, `de`, `fr` only; default `es`; `/` redirects to `/es/`
- `hreflang x-default` → `/es/`
- Astro `site` configurable (placeholder `https://ankabasi.com` until real domain confirmed)
- Keep cultural tone from `Agents.md`; do not invent false prices — use amounts already on the live HTML (`$700.000` / `$1.300.000` / consult)
- Prefer server-rendered copy over client `data-i18n` for crawlable HTML
- Do not commit secrets; do not force-push `main`

## File map (create/modify)

| Path | Responsibility |
|------|----------------|
| `package.json`, `astro.config.mjs`, `tsconfig.json` | Astro project |
| `src/i18n/ui.ts`, `src/i18n/utils.ts`, `src/i18n/routes.ts` | Dictionaries, `t()`, localized path helpers |
| `src/data/site.ts` | Entity facts (NAP, prices, offers) |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO meta, OG, hreflang, JSON-LD slot |
| `src/components/Header.astro`, `Footer.astro`, `LangSwitcher.astro`, `SkipLink.astro` | Chrome + a11y |
| `src/pages/index.astro` | Redirect → `/es/` |
| `src/pages/[locale]/index.astro` | Localized home |
| `src/pages/[locale]/faq.astro` | FAQ |
| `src/pages/[locale]/[guide].astro` | Topic guides via localized slugs |
| `src/pages/[locale]/blog/index.astro`, `.../[slug].astro` | Blog |
| `src/pages/[locale]/libro/index.astro` | Book reader shell (Phase later if needed) |
| `src/content/config.ts` + `src/content/{faq,guides,blog}/**` | Collections |
| `public/**` | images, videos, fonts assets, `robots.txt`, `llms.txt` |
| `src/styles/**` | Copied/adapted CSS |
| `src/scripts/**` | main/gallery/contact (path-fixed) |

---

### Task 1: Scaffold Astro + move static assets

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`
- Move/copy: `css/` → `src/styles/`, `images/` `videos/` → `public/`, legacy HTML kept temporarily at repo root until cutover

- [ ] **Step 1:** Initialize Astro (static, minimal) in repo root without overwriting `docs/`

```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git --yes
```

If the CLI refuses a non-empty dir, create files manually: `package.json` with `astro`, scripts `dev`/`build`/`preview`, and `astro.config.mjs` with `output: 'static'`, `site: 'https://ankabasi.com'`, `@astrojs/sitemap` integration.

- [ ] **Step 2:** Copy assets

```bash
mkdir -p public src/styles src/scripts
cp -R images videos public/
cp -R css/* src/styles/
cp -R js/* src/scripts/
```

- [ ] **Step 3:** Add root redirect page `src/pages/index.astro`:

```astro
---
return Astro.redirect('/es/', 302);
---
```

- [ ] **Step 4:** Verify `npm run build` succeeds (empty/minimal pages OK).

- [ ] **Step 5:** Commit `chore: scaffold Astro for SEO/GEO migration`

---

### Task 2: i18n utilities + site facts

**Files:**
- Create: `src/i18n/ui.ts` (export dictionaries from existing `js/i18n.js` `T` object)
- Create: `src/i18n/utils.ts`, `src/i18n/routes.ts`, `src/data/site.ts`

**Interfaces:**
- Produces: `locales`, `defaultLocale`, `t(locale, key)`, `getLocalizedPath(locale, routeKey)`, `SITE` facts object

- [ ] **Step 1:** Extract `T` from `js/i18n.js` into `src/i18n/ui.ts` as `export const ui = { es: {...}, en: {...}, de: {...}, fr: {...} }`
- [ ] **Step 2:** Implement `src/i18n/utils.ts`:

```ts
import { ui } from './ui';
export const locales = ['es', 'en', 'de', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
export function t(locale: Locale, key: string): string { /* dot-path lookup; fallback es */ }
export function tHtml(locale: Locale, key: string): string { return t(locale, key); }
```

- [ ] **Step 3:** `src/i18n/routes.ts` — map logical keys → localized slugs:

```ts
export const guideSlugs = {
  packages: { es: 'paquetes', en: 'packages', de: 'pakete', fr: 'forfaits' },
  howToGetThere: { es: 'como-llegar', en: 'how-to-get-there', de: 'anreise', fr: 'comment-y-aller' },
  responsibleVisit: { es: 'visita-responsable', en: 'responsible-visit', de: 'verantwortungsvoll-reisen', fr: 'visite-responsable' },
  whatToExpect: { es: 'que-esperar', en: 'what-to-expect', de: 'was-dich-erwartet', fr: 'a-quoi-sattendre' },
  faq: { es: 'faq', en: 'faq', de: 'faq', fr: 'faq' },
} as const;
```

- [ ] **Step 4:** `src/data/site.ts` with org name, Gwimake, Aracataca, prices matching current HTML, contact placeholders from existing contact section.
- [ ] **Step 5:** Commit `feat: add i18n helpers and site entity facts`

---

### Task 3: BaseLayout (SEO + a11y chrome)

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/SkipLink.astro`, `src/components/LangSwitcher.astro`

- [ ] **Step 1:** `BaseLayout` props: `locale`, `title`, `description`, `canonicalPath`, `ogImage?`, `jsonLd?`
- [ ] **Step 2:** Emit `<html lang={locale}>`, unique title/description, canonical, OG/Twitter, full hreflang mesh + x-default
- [ ] **Step 3:** Skip link; import global CSS; slot for body
- [ ] **Step 4:** Commit `feat: add BaseLayout with SEO meta and hreflang`

---

### Task 4: Header/Footer + localized home

**Files:**
- Create: `src/components/Header.astro`, `Footer.astro`, home section components or single `HomePage.astro`
- Create: `src/pages/[locale]/index.astro`
- Modify: `src/scripts/main.js` paths for `/` public assets

- [ ] **Step 1:** Port header/nav with locale-prefixed links (`/${locale}/#experiencia`, blog → `/${locale}/blog/`)
- [ ] **Step 2:** LangSwitcher as `<a href>` list (not only select)
- [ ] **Step 3:** Port home sections from `index.html` using `t()` / `tHtml()` (server-rendered)
- [ ] **Step 4:** Wire gallery/contact scripts as `<script src>` or bundled client scripts with correct `/images` paths
- [ ] **Step 5:** `getStaticPaths` for four locales; 404 for invalid locale
- [ ] **Step 6:** `npm run build` — confirm `/es/index.html` … `/fr/index.html` exist with translated titles
- [ ] **Step 7:** Commit `feat: ship localized home pages`

---

### Task 5: FAQ collection + page + schema

**Files:**
- Create: `src/content/config.ts`, `src/content/faq/*.md` (or one JSON per locale)
- Create: `src/pages/[locale]/faq.astro`
- Modify: home to include FAQ teaser linking to full FAQ

- [ ] **Step 1:** Define FAQ content schema (`question`, `answer`, `locale`, `order`)
- [ ] **Step 2:** Author ≥8 Q&As in ES; translate EN/DE/FR
- [ ] **Step 3:** FAQ page with FAQPage JSON-LD
- [ ] **Step 4:** Commit `feat: add multilingual FAQ with schema`

---

### Task 6: Topic guide pages

**Files:**
- Create: `src/content/guides/**` or MDX per locale slug
- Create: `src/pages/[locale]/[guide].astro`

- [ ] **Step 1:** Four guides: packages, how-to-get-there, responsible-visit, what-to-expect — answer-first intros
- [ ] **Step 2:** Internal links to home contact + sibling guides
- [ ] **Step 3:** Article + BreadcrumbList JSON-LD
- [ ] **Step 4:** Commit `feat: add SEO topic-cluster guides`

---

### Task 7: Blog port (crawlable)

**Files:**
- Create: `src/content/blog/**` from existing articles
- Create: `src/pages/[locale]/blog/index.astro`, `[slug].astro`

- [ ] **Step 1:** Port existing ES posts to content collection; EN/DE/FR stubs or translations if available in `blog-content.js`
- [ ] **Step 2:** Server-render list + article HTML (no empty `#blog-list` dependency)
- [ ] **Step 3:** Commit `feat: server-render localized blog`

---

### Task 8: robots, sitemap, llms.txt, Organization schema

**Files:**
- Create: `public/robots.txt`, `public/llms.txt`
- Modify: `astro.config.mjs` (`@astrojs/sitemap`, i18n-aware)
- Modify: `BaseLayout` default Organization JSON-LD

- [ ] **Step 1:** robots allow all; `Sitemap: https://ankabasi.com/sitemap-index.xml`
- [ ] **Step 2:** Enable sitemap integration
- [ ] **Step 3:** `llms.txt` summarizing Ankabasi + key locale URLs
- [ ] **Step 4:** Commit `feat: add robots, sitemap, and llms.txt`

---

### Task 9: Accessibility + performance pass

**Files:**
- Modify: Header (aria-expanded), focus CSS if missing, gallery alts, hero `fetchpriority`
- Optional: defer AOS/GLightbox

- [ ] **Step 1:** Skip link + keyboard nav toggle
- [ ] **Step 2:** Improve gallery `alt` strings (descriptive)
- [ ] **Step 3:** Hero image dimensions + fetchpriority; lazy below fold
- [ ] **Step 4:** Commit `fix: a11y and LCP basics on key templates`

---

### Task 10: Verify build + smoke checklist

- [ ] **Step 1:** `npm run build && npm run preview`
- [ ] **Step 2:** Confirm files: `/es/`, `/en/faq/`, guide slugs, blog, `sitemap-index.xml`, `llms.txt`
- [ ] **Step 3:** Grep built HTML for `hreflang`, `application/ld+json`, unique `<title>`
- [ ] **Step 4:** Document cutover notes in README (dev/build; legacy root `index.html` deprecated)
- [ ] **Step 5:** Commit `docs: note Astro cutover and SEO verification`

---

## Self-review

1. Spec coverage: Phases 0–4 mapped to Tasks 1–10; libro can remain linked to a minimal port or existing path in Task 4 footer — if time-boxed, ship libro as static copy under `public/libro` then Astro page in follow-up.
2. No TBD placeholders in task steps.
3. Prices: use live HTML amounts, not outdated Agents.md $500k/$1M if HTML differs.
