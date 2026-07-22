# Ankabasi SEO + GEO Design Spec

**Date:** 2026-07-22  
**Status:** Approved for planning  
**Site:** Ankabasi (cultural exchange experiences with the Arhuaco community in Gwimake, Sierra Nevada de Santa Marta)

## 1. Problem

The current static site has a solid landing experience (hero, activities, pricing, gallery, blog, book, contact) but weak discoverability:

- Minimal SEO metadata (basic description only; no Open Graph, Twitter cards, canonicals, or JSON-LD)
- No `robots.txt` or XML sitemaps
- Language switching is client-side JS (`data-i18n`); crawlers and AI tools mostly see Spanish HTML
- Blog listing is JS-rendered; harder to crawl and cite
- Images are large JPEGs (~40MB gallery folder); generic `alt` text
- No structured FAQ / topic guides that answer booking and cultural questions for Google or AI assistants

## 2. Goals

Optimize equally for:

1. **Classic SEO** — rankings and bookings from Google/Bing for intent queries
2. **GEO / AEO** (Generative / Answer Engine Optimization) — citations in ChatGPT, Perplexity, Google AI Overviews, Claude, and similar

**Primary outcomes**

- Indexable pages in **ES, EN, DE, FR** on real URL paths
- Clear, quotable facts and Q&A content AI can cite
- Strong Core Web Vitals and accessibility on key templates
- A sustainable content program (topic cluster), not one-off meta tags

## 3. Non-goals (later)

- Paid ads / backlink outreach campaigns
- Full CMS admin UI or booking engine
- Unreviewed machine translation as final copy (especially DE/FR)
- Changing brand visual identity beyond performance/a11y needs

## 4. Decisions (locked)

| Decision | Choice |
|----------|--------|
| SEO vs GEO priority | Both equally |
| Languages | ES, EN, DE, FR from the start |
| i18n architecture | Full path prefixes: `/es/`, `/en/`, `/de/`, `/fr/` + `hreflang` |
| Content ambition | Heavy: technical SEO + FAQ + topic cluster guides |
| Implementation approach | Migrate to **Astro** (static output), keep existing visual design |
| Default locale | `/` → `/es/`; `hreflang x-default` → `/es/` |
| Hosting | Remains static (Netlify / Vercel as today) |

## 5. Architecture

### 5.1 Stack

- **Astro** static site generator
- Reuse existing CSS (`style.css`, `responsive.css`, blog/libro styles) with minimal adaptation
- Vanilla JS islands only where needed (gallery lightbox, contact form, nav)
- Content as Markdown / MDX + YAML frontmatter (and/or JSON for structured facts)

### 5.2 URL map

```
/                           → redirect to /es/
/{locale}/                  → home (sections: experiencia, actividades, precios, galería, contacto, …)
/{locale}/faq/
/{locale}/paquetes/         → package comparison (linked from home pricing)
/{locale}/como-llegar/      → slug localized per language
/{locale}/visita-responsable/
/{locale}/que-esperar/      → what to expect / best time
/{locale}/blog/
/{locale}/blog/{slug}/
/{locale}/libro/
```

Home remains the booking landing with anchor sections. Dedicated guide URLs exist for SEO/GEO depth and internal linking.  
Exact guide slugs are localized per language (e.g. `/en/how-to-get-there/`, `/de/anreise/`).  
Each page declares canonical + full `hreflang` alternate set.

### 5.3 Content collections

| Collection | Purpose |
|------------|---------|
| `pages` | Home and static marketing pages |
| `guides` | Topic-cluster articles (practical + cultural) |
| `faq` | Q&A items (shared by FAQ page + home FAQ block + FAQPage schema) |
| `blog` | Existing and future posts |
| `libro` | Book chapters (ported; crawlable HTML) |
| `site` | Shared facts: org name, location, prices, contact, NAP consistency |

### 5.4 Shared “entity facts” (single source of truth)

Structured data used in copy, schema, and footers:

- Brand: Ankabasi  
- Place: Gwimake, Sierra Nevada de Santa Marta, Colombia  
- Community: Arhuaco (Iku)  
- Transport hub: Aracataca  
- Offerings: 1 day / 1 night from COP $500.000; 3 days / 2 nights from COP $1.000.000; 1 week on request  
- Inclusions: transport, meals, lodging (hammock/bohío), mamo spiritual work, walks, crafts workshops (per package)

All locales must keep these facts consistent (currency formatting may localize; numbers stay accurate).

## 6. Content & GEO strategy

### 6.1 Why GEO matters here

AI answers prefer pages that:

- State who/what/where clearly in the first screenful
- Answer questions directly (not only marketing prose)
- Use consistent entity names
- Expose FAQ and Product/Trip structured data

### 6.2 Topic cluster

**Hub:** localized home (booking)

**Spokes (create in ES, then EN/DE/FR):**

1. FAQ (booking, logistics, respect, packing)
2. What’s included / package comparison (1 day vs 3 days vs week)
3. How to get there (Aracataca → Gwimake)
4. Responsible visit with the Arhuaco community
5. Best time to visit / what to expect
6. Optional deepeners: mamo/spiritual context (respectful), Sierra Nevada context, crafts/products (if products section stays)

**Internal linking:** hub ↔ spokes ↔ blog stories ↔ contact/booking CTA.

### 6.3 On-page writing rules

- One H1; H2s phrased as real questions where natural
- **Answer-first** lead: 40–60 words stating the core answer before narrative
- Explicit entities in prose (Ankabasi, Gwimake, Arhuacos, Sierra Nevada de Santa Marta, Aracataca)
- Tone: respectful, non-exploitative, sustainability-aware (per `Agents.md`)
- Same FAQ content on `/faq/` and as a home section (schema once, or both with consistent answers)

### 6.4 AI discovery extras

- `llms.txt` at site root listing key URLs and a short site summary (per locale or one multilingual index)
- Optional `/llms-full.txt` linking to primary guides (low priority)

## 7. Technical SEO

Per page/locale:

- Unique `<title>` and meta description
- Open Graph + Twitter Card tags; default OG image (brand/place)
- Canonical URL
- `hreflang` for es, en, de, fr + `x-default`
- JSON-LD as applicable:
  - `Organization` / `TouristAttraction` or local business-style entity
  - `TouristTrip` or `Product`/`Offer` for packages
  - `FAQPage` for FAQ
  - `Article` / `BlogPosting` for blog and guides
  - `BreadcrumbList` on nested pages

Site-wide:

- `robots.txt` allowing crawl; pointing to sitemap index
- `sitemap-index.xml` + per-locale sitemaps
- Language switcher as real `<a href>` links (select may remain as progressive enhancement)
- Server-rendered blog index and article bodies (no empty shells awaiting JS)

## 8. Accessibility

- Skip link to main content
- Correct `lang` on `<html>` per locale
- Visible focus styles; keyboard-operable mobile nav with `aria-expanded` on the toggle and Escape to close
- Form controls with associated labels and announced errors
- Meaningful image `alt` (subject + context); decorative images `alt=""`
- Logical heading hierarchy; sufficient color contrast
- Prefer inline SVG icons over icon-font-only meaning where practical

## 9. Performance

- Convert hero/gallery assets to WebP (and AVIF where feasible) with `srcset` / `sizes`
- Explicit `width` / `height` (or aspect-ratio) to limit CLS
- LCP: single priority hero image (`fetchpriority="high"`); lazy-load below fold
- Subset/self-host fonts; `font-display: swap`
- Defer non-critical third parties (AOS, GLightbox); evaluate replacing Font Awesome with a small SVG set
- Targets: mobile LCP &lt; 2.5s; Lighthouse Performance ≥ 90 on home; no critical a11y audit failures on key templates

## 10. Rollout phases

| Phase | Work | Done when |
|-------|------|-----------|
| **0** | Astro scaffold; port ES home + shared layout/CSS/JS | Site builds and deploys; visual parity on home |
| **1** | Meta, OG, schema, robots, sitemaps, a11y fixes, image/perf pass | Technical foundation live on ES |
| **2** | EN/DE/FR routes + hreflang + language links | All four locales for core pages |
| **3** | FAQ + topic-cluster guides; blog/libro ported as collections | Content program live in ES; translations in progress or complete |
| **4** | GEO polish (`llms.txt`, answer-first edits), Search Console / Bing, baselines | Measurement hooked; spot-check AI citations |

Phases can overlap slightly (e.g. start ES guide drafts during Phase 1), but i18n routes should not ship without hreflang + canonicals.

## 11. Measurement

- Google Search Console + Bing Webmaster Tools (property covering all locales)
- Index coverage per locale path prefix
- Impressions/clicks for branded and core intent queries
- Periodic Lighthouse on: home, one guide, one blog post (per major release)
- Manual GEO spot checks: ask ChatGPT/Perplexity/AI Overviews questions like “cultural experience with Arhuacos near Santa Marta” and record whether Ankabasi is cited

**Success (3–6 months after launch of Phases 0–3):**

- Pages indexed under all four language prefixes
- Measurable impressions on non-brand and brand queries
- At least FAQ/guide URLs occasionally cited or paraphrased in AI answers (qualitative)
- Performance and a11y targets met on key templates

## 12. Open assumptions

- **Production domain** for canonicals/sitemaps is not confirmed yet; Astro `site` must be a single config value (use a placeholder like `https://ankabasi.com` until the real domain is provided — no hardcoded domain scattered in templates).
- Human review of DE/FR translations before treating them as final.
- Pricing and inclusions remain as in current site/`Agents.md` unless the business updates them.

## 13. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Migration regresses design | Port CSS first; visual QA checklist per section |
| Translation drift on facts | Single `site` facts file; locales only change wording/format |
| Thin translated pages | Ship ES content first if needed; don’t publish empty locale stubs |
| Over-commercial tone harms trust | Keep AGENTS.md cultural guidelines in content review |
| CDN / third-party JS hurts LCP | Defer or remove; prefer local assets |

## 14. Approval record

- Architecture (Astro + locale paths): approved  
- Content & GEO cluster: approved  
- Technical SEO / a11y / performance: approved  
- Phased rollout & success criteria: approved  
- Overall design: approved 2026-07-22
