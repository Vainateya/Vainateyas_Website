# vainateyar.com

Personal website of Vainateya Rangaraju — plain HTML/CSS/JS, no build step.

## Edit content (day-to-day)
All content lives in `content/*.js` — plain, commented data files:
- `site.js` — name, email, calendar link, socials
- `about.js` — mission, values, bio, at-a-glance
- `research.js` / `experience.js` / `writing.js` / `reading.js` / `community.js` — one object per entry; append and it renders

Add images to `assets/` (e.g. `assets/portrait.jpg`) and reference by path.

## Design system
All colors/fonts are CSS variables at the top of `assets/styles.css` (the config area).
Layout logic lives in `assets/app.js` — you shouldn't need to touch it for content changes.

## Deploy to vainateyar.com (Porkbun domain)
Recommended: GitHub Pages (free, static):
1. Push this folder to a GitHub repo (e.g. `Personal_Website`).
2. Repo Settings → Pages → deploy from branch → `main` / root.
3. Settings → Pages → Custom domain → `vainateyar.com`.
4. In Porkbun DNS for vainateyar.com:
   - 4 × A records @ → 185.199.108.153 / .109. / .110. / .111.153
   - CNAME www → `<username>.github.io`
5. Enable "Enforce HTTPS" once DNS propagates.

(Alternatives: Vercel or Cloudflare Pages — import repo, add custom domain, follow their DNS prompts.)

## Later (backend)
The feedback + recommendation boxes currently open a mailto:. Swap in a form endpoint
(Formspree, Cloudflare Worker, etc.) in `assets/app.js` where `location.href = 'mailto:...'` appears.
