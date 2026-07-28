# CivilTools.com — Code Review Package

---

## Project Summary

**CivilTools.com** is a modern web application providing free online civil engineering calculators and tools. The platform serves civil engineers, architects, contractors, and quantity surveyors with concrete/steel/brick calculators, building cost estimators (Nepal/India), land unit converters, structural design tools, and rate analysis calculators. Built with Astro (SSR), deployed on Cloudflare Workers, with Firebase Auth and Stripe payment integration.

---

## Tech Stack

| Category          | Technology                                   |
| ----------------- | -------------------------------------------- |
| Framework         | Astro v7.1.1 (SSR — `output: 'server'`)     |
| Runtime           | Node.js >=22.12.0                            |
| Language          | TypeScript v7.0.2                            |
| Styling           | Tailwind CSS v4.3.3 (via Vite plugin)        |
| Adapter           | @astrojs/cloudflare v14.1.3                  |
| Auth              | Firebase Authentication                      |
| Database          | Firestore                                     |
| Payments          | Stripe v22.3.2                               |
| Linting           | ESLint (flat config) + typescript-eslint + eslint-plugin-astro |
| Formatting        | Prettier                                      |
| Deployment        | Cloudflare Workers + Wrangler v4.112.0       |
| Type Checking     | @astrojs/check v0.9.9                        |

---

## Folder Structure

```
CivilTools.com/
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .github/
│   ├── workflows/
│   │   ├── build.yml
│   │   ├── format.yml
│   │   ├── lint.yml
│   │   └── typecheck.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .prettierignore
├── .prettierrc
├── .vscode/
│   ├── extensions.json
│   └── launch.json
├── LICENSE
├── README.md
├── astro.config.mjs
├── eslint.config.js
├── opencode.json
├── package-lock.json
├── package.json
├── tsconfig.json
├── wrangler.jsonc
├── docs/                          # (empty — placeholder)
├── scripts/
│   └── sync-sitemap.mjs
├── public/
│   ├── _headers
│   ├── apple-touch-icon.png
│   ├── favicon-96x96.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── sitemap.xml
│   ├── web-app-manifest-192x192.png
│   ├── web-app-manifest-512x512.png
│   ├── downloads/
│   │   └── version.txt
│   └── resources/
│       ├── nbc-105-seismic-design.pdf
│       ├── nbc-109-masonry.pdf
│       ├── nbc-110-concrete-structures.pdf
│       ├── nbc-111-steel-structures.pdf
│       └── nbc-114-construction-safety.pdf
└── src/
    ├── apps/                      # Android APK source (v1.0)
    ├── layouts/
    │   ├── Layout.astro           # Main site layout (nav, footer, SEO, auth)
    │   └── ToolLayout.astro       # Tool page layout wrapper
    ├── lib/
    │   ├── firebase.ts            # Firebase init (app, auth, db)
    │   ├── firebase-auth.ts       # Firebase auth re-export
    │   └── stripe.ts              # Stripe singleton + price lookup
    ├── pages/
    │   ├── index.astro            # Homepage
    │   ├── about.astro
    │   ├── cancel.astro
    │   ├── contact.astro
    │   ├── dashboard.astro
    │   ├── download.astro
    │   ├── forgot-password.astro
    │   ├── login.astro
    │   ├── privacy.astro
    │   ├── resources.astro
    │   ├── signup.astro
    │   ├── success.astro
    │   ├── terms.astro
    │   ├── tools.astro            # Tools listing page
    │   ├── api/
    │   │   └── create-checkout.ts  # Stripe checkout API endpoint
    │   └── tools/                 # 61 individual tool calculators
    │       ├── concrete-calculator.astro
    │       ├── steel-bar-weight-calculator-feet.astro
    │       ├── brick-quantity-calculator.astro
    │       ├── nepal-land-converter.astro
    │       ├── building-cost-nepal.astro
    │       └── ... (56 more)
    └── styles/
        └── tools-tailwind.css     # Tailwind v4 import + custom theme
```

---

## Build Command

```bash
npm install --legacy-peer-deps
npm run build
```

> **Note:** `--legacy-peer-deps` is required due to a peer dependency mismatch: `@astrojs/check@0.9.9` requires TypeScript `^5.0.0 || ^6.0.0`, but the project uses TypeScript `^7.0.2`. The `build` script (`astro build`) does not depend on `@astrojs/check`, so it succeeds without `--legacy-peer-deps`.

---

## Run Command

```bash
npm run dev           # Start dev server (localhost:4321)
npm run build         # Production build
npm run preview       # Preview production build
npm run deploy        # Build + wrangler deploy to Cloudflare
```

---

## Known Issues

1. **`npm install` fails without `--legacy-peer-deps`** — `@astrojs/check@0.9.9` peer-depends on `typescript@^5.0.0 || ^6.0.0`, but the project pins `typescript@^7.0.2`. The `check` and `typecheck` scripts will fail unless TypeScript is downgraded or the package is updated.

2. **`typecheck` script is broken** — `astro check` depends on `@astrojs/check`, which is incompatible with TypeScript v7. This will fail until `@astrojs/check` is updated or TypeScript is downgraded to v6.

3. **ESLint config references `src/apps/**` in ignores** — `src/apps/` contains an APK binary and text files, excluded from linting. The APK (`Civil-Tools-v1.0.apk`) is ~3.4MB, stored in source — consider using Git LFS or removing.

4. **`public/sitemap.xml` is manually generated** — The `sync-sitemap` script generates it from the `src/pages/` directory. It should be auto-generated on build via an Astro integration.

5. **Firebase API key is exposed** — `src/lib/firebase.ts` contains the Firebase API key in plaintext — this is acceptable for Firebase (API keys are meant to be client-side as per Firebase security model, but the Auth domain and project ID are exposed).

---

## TODOs

- [ ] Resolve `@astrojs/check` / TypeScript v7 peer dependency conflict
- [ ] Add `@astrojs/sitemap` integration to auto-generate sitemap on build
- [ ] Implement payment webhook (Stripe) for post-checkout fulfillment
- [ ] Migrate Android APK (`src/apps/`) out of source tree or use Git LFS
- [ ] Write unit tests for calculator logic
- [ ] Add proper 404 page
- [ ] Implement rate limiting on API routes
- [ ] Add CSP headers in `_headers` or `wrangler.jsonc`
- [ ] Complete empty tool categories (Material Lab Test, Concrete Technology, etc.)

---

## Dependencies

### Production (8)

| Package                 | Version | Purpose                          |
| ----------------------- | ------- | -------------------------------- |
| `@astrojs/check`        | ^0.9.9  | Astro type checking              |
| `@astrojs/cloudflare`   | ^14.1.3 | Cloudflare Workers adapter       |
| `@tailwindcss/vite`     | ^4.3.3  | Tailwind CSS Vite plugin         |
| `astro`                 | ^7.1.1  | Web framework                    |
| `firebase`              | ^12.16.0 | Firebase Auth + Firestore        |
| `stripe`                | ^22.3.2 | Payment processing               |
| `tailwindcss`           | ^4.3.3  | CSS utility framework            |
| `typescript`            | ^7.0.2  | TypeScript compiler              |

### Dev (1)

| Package   | Version   | Purpose                 |
| --------- | --------- | ----------------------- |
| `wrangler` | ^4.112.0 | Cloudflare Workers CLI  |

---

## Routes

### Static Pages

| Route              | File                        |
| ------------------ | --------------------------- |
| `/`                | `src/pages/index.astro`     |
| `/about`           | `src/pages/about.astro`     |
| `/cancel`          | `src/pages/cancel.astro`    |
| `/contact`         | `src/pages/contact.astro`   |
| `/dashboard`       | `src/pages/dashboard.astro` |
| `/download`        | `src/pages/download.astro`  |
| `/forgot-password` | `src/pages/forgot-password.astro` |
| `/login`           | `src/pages/login.astro`     |
| `/privacy`         | `src/pages/privacy.astro`   |
| `/resources`       | `src/pages/resources.astro` |
| `/signup`          | `src/pages/signup.astro`    |
| `/success`         | `src/pages/success.astro`   |
| `/terms`           | `src/pages/terms.astro`     |
| `/tools`           | `src/pages/tools.astro`     |

### API Route

| Route                    | File                             |
| ------------------------ | -------------------------------- |
| `POST /api/create-checkout` | `src/pages/api/create-checkout.ts` |

### Tool Pages (61 total)

All under `/tools/` — see `src/pages/tools/` for the complete list. Tools are organized into 25 categories in the tools listing page.

---

## Components

| Component                    | File                               | Description                                  |
| ---------------------------- | ---------------------------------- | -------------------------------------------- |
| `Layout`                     | `src/layouts/Layout.astro`         | Main layout — nav, footer, SEO meta, OG, JSON-LD, auth state |
| `ToolLayout`                 | `src/layouts/ToolLayout.astro`     | Tool page wrapper with title/description hero |

**Note:** No reusable UI components exist yet — calculators are implemented as standalone page-level Astro components with inline styles.

---

## Features

- 61 free civil engineering calculators
- Firebase Authentication (email/password, signup/login/logout)
- Payment integration via Stripe (Pro/Lifetime plans)
- Cloudflare Workers deployment with Server-Side Rendering
- SEO optimized (JSON-LD, Open Graph, Twitter Cards, sitemap, proper meta)
- Fully responsive (mobile/tablet/desktop)
- PWA support (web manifest, favicons)
- Security headers (`_headers`: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Nepal building codes download (NBC 105, 109, 110, 111, 114)
- Android APK download (Civil Tools v1.0)
- 25 tool categories (9 with active tools, 16 marked "Coming Soon")
- Region-specific building cost calculators (Nepal, Nepal Terai, India)

---

## Build Artifact Check

The following were excluded as build artifacts (not included in this package):

- `node_modules/` — dependencies
- `.astro/` — generated types
- `dist/` — build output
- `.wrangler/`, `.wrangler-local/` — Cloudflare local state
- `.agents/`, `skills-lock.json` — OpenCode agent config
- `deploy-app.bat` — machine-specific local deploy script

All remaining files are source code or configuration.
