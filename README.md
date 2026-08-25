# Safarov Yusuf — Portfolio

A single-page portfolio site built with React, Vite, and Tailwind CSS.

**Live domain:** [yusuvdev.uz](https://yusuvdev.uz)

## Tech stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-variable design tokens, dark/light theming)
- [Framer Motion](https://motion.dev) for scroll reveals and micro-interactions
- [Lucide React](https://lucide.dev) for icons
- [react-i18next](https://react.i18next.com) for Uzbek / Russian / English translations
- A serverless function (Vercel or Netlify) that relays contact-form submissions to Telegram

## Project structure

```
src/
  components/     Reusable UI (Navbar, Footer, ThemeToggle, LanguageSwitcher, RevealOnScroll, ...)
  sections/       Page sections (Hero, About, Skills, Projects, Experience, Education, Contact)
  data/           Content data (skills, projects, experience, education, nav links)
  locales/        uz.json / ru.json / en.json — all UI text, per language
  hooks/          useTheme, useTypewriter
  index.css       Design tokens (CSS variables) and global styles
  App.jsx         Composes the page from sections
lib/
  contact-handler.js   Shared logic for the contact form's serverless function
api/
  contact.js      Vercel serverless function (POST /api/contact)
netlify/functions/
  contact.js      Netlify function (also reachable at /api/contact via netlify.toml)
```

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env   # then fill in TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID, see below
npm run dev
```

The dev server runs at `http://localhost:5173` by default (Vite will pick the next free port if it's taken).

Plain `vite dev` only serves the frontend — the contact form's `/api/contact` endpoint is a serverless
function and won't respond under plain `vite dev`. To test the contact form locally, run the project
through the Vercel or Netlify CLI instead, which serve the frontend **and** the function together:

```bash
# Netlify — export .env into the shell first; an unlinked project doesn't auto-load it
set -a && source .env && set +a
npx netlify-cli dev --functions netlify/functions

# or Vercel (auto-loads .env)
npx vercel dev
```

Either way, open the site at the URL the CLI prints (Netlify: `http://localhost:8888`) and submit the
contact form — a message should arrive in your Telegram chat within a second or two.

## Editing content

All personal content (skills, projects, experience, education, nav links) lives in `src/data/`.
Edit those files directly — no need to touch the components.

## Building for production

```bash
npm run build
```

Outputs a static, production-ready build to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploying to `yusuvdev.uz`

The frontend is a static build (`npm run build`) plus one small serverless function for the contact
form — both Vercel and Netlify auto-detect this project (Vite + `/api` or `netlify/functions`) with
zero extra configuration.

### Option A — Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`. Output directory: `dist`.
4. Deploy.
5. In the Vercel project settings, go to **Domains** and add `yusuvdev.uz`.
6. At your domain registrar, point the domain to Vercel:
   - `A` record for `yusuvdev.uz` → `76.76.21.21`, **or**
   - `CNAME` for `www.yusuvdev.uz` → `cname.vercel-dns.com`
   (Vercel shows the exact records to use once you add the domain.)

Alternatively, deploy straight from the CLI:

```bash
npm install -g vercel
vercel --prod
```

### Option B — Netlify

1. Push this project to a GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.
5. In **Site settings → Domain management**, add `yusuvdev.uz` as a custom domain.
6. At your domain registrar, point the domain to Netlify:
   - `A` record for `yusuvdev.uz` → `75.2.60.5`, **or**
   - Use Netlify DNS by pointing your registrar's nameservers to Netlify's (shown in the dashboard).

Or deploy from the CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### DNS propagation

DNS changes can take anywhere from a few minutes up to 24–48 hours to propagate fully. Both Vercel and
Netlify issue free HTTPS certificates automatically once the domain is verified.

## Contact form → Telegram

Submitting the contact form calls a serverless function (`api/contact.js` on Vercel, or
`netlify/functions/contact.js` on Netlify — same shared logic in `lib/contact-handler.js`), which
validates the fields and sends them to a Telegram chat via the Bot API. The bot token is never sent to
the browser: it only ever lives in the serverless function's environment variables, server-side.

**⚠️ Before deploying, set these two environment variables in your hosting dashboard** (Vercel: *Project
Settings → Environment Variables*; Netlify: *Site configuration → Environment variables*) — the contact
form will not work in production without them:

| Variable | Description |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | The bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | The numeric chat ID that should receive form submissions |

For local development, copy `.env.example` to `.env` and fill in the same two values — `.env` is
git-ignored and never committed. To get a chat ID: message your bot once from the account/group that
should receive notifications (a bot can't message a chat it hasn't been talked to first), then check
`https://api.telegram.org/bot<token>/getUpdates` for the `chat.id` of that message.

## SEO

`index.html` includes title, meta description, Open Graph, and Twitter Card tags targeting
`yusuvdev.uz`, plus JSON-LD structured data. A generated `public/og-image.png` (1200×630) is included
as the social preview image — swap it for a custom design before going live if you'd like.
