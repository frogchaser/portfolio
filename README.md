# portfolio

Mohil Patel's personal portfolio — a static single-page site, no build step.

## Structure

- `index.html` — the entire site (nav, hero, about, experience, projects, contact, footer)
- `css/` — one stylesheet per concern (`variables`, `base`, `animations`, then one per section), loaded as separate `<link>` tags
- `js/` — small ES modules loaded via `<script type="module">`: `nav.js` (mobile menu), `reveal.js` (scroll-in animations), `contact-form.js` (validation + submission), `main.js` (entry point)
- `404.html` — GitHub Pages error page
- `img/` — photos referenced by the hero section

## Running locally

```
npm install
npm start
```

Serves the site at `http://localhost:8080` via `node-static` (see `index.js`). Since there's no build step, editing any HTML/CSS/JS file just needs a browser refresh.

## Contact form

The form posts to [Formspree](https://formspree.io) so submissions reach an inbox without a custom backend. To enable it:

1. Sign up at formspree.io (free tier) and create a form pointed at your email.
2. Copy the endpoint it gives you (`https://formspree.io/f/xxxxxxx`).
3. Paste it into `FORMSPREE_ENDPOINT` in `js/contact-form.js`.

Until that's set, submissions will fail gracefully and show a message pointing visitors to email you directly.
