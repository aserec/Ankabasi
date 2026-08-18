# Ankabasi

Static [Astro](https://astro.build) site for **ANKABASI** — a technology and digital company of the Arhuaco community of Gwimake (Sierra Nevada de Santa Marta, Colombia). Cultural-exchange stays are one service line of the company.

**Full operating manual** (build, edit, test, FTP deploy, and how to brief an AI assistant):

**[docs/OPERATOR-GUIDE.md](docs/OPERATOR-GUIDE.md)**

## Quick start

Requires **Node.js 22.12+**.

```bash
npm install
npm run dev      # http://localhost:4321 → /es/
npm test
npm run build    # output in dist/
npm run preview
```

Publish the **contents of `dist/`** over FTP (not this git folder):

```bash
cp .env.example .env   # fill in FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR
npm run deploy         # build + upload
```

Languages: `/es/` (default), `/en/`, `/de/`, `/fr/`. Production URL: https://ankabasi.com

## What to edit

Real site: `src/` (pages, copy, CSS) and `public/` (images, videos, `robots.txt`).  
Do **not** edit root `index.html`, `css/`, or `js/` — leftover from an older site.

## License

Created for Ankabasi. All rights reserved.
