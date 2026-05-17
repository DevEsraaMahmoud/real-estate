# Nile Key Realty

A multilingual **Next.js 16** real-estate showcase for Egyptian properties (sale and rent). Browse listings, compare units, save favorites, view analytics, and explore a demo admin dashboard — with full **Arabic (RTL)** and **English** support via [next-intl](https://next-intl-docs.vercel.app/).

## Status

![Tests](https://github.com/DevEsraaMahmoud/real-estate/actions/workflows/tests.yml/badge.svg)
![Code Style](https://github.com/DevEsraaMahmoud/real-estate/actions/workflows/pint.yml/badge.svg)
![Static Analysis](https://github.com/DevEsraaMahmoud/real-estate/actions/workflows/phpstan.yml/badge.svg)

## Features

- Bilingual routing: `ar` (default) and `en`
- Property listings with filters and search
- Analytics dashboard (Recharts)
- Side-by-side compare (up to 3 properties)
- Favorites and recently viewed (localStorage)
- Demo admin dashboard
- CI: tests, formatting, and static analysis

---

## Architecture

```mermaid
flowchart TB
  subgraph Client["Browser"]
    UI["React Pages & Components"]
    Bag["PropertyBag Context"]
    LS[("localStorage")]
    UI --> Bag
    Bag --> LS
  end

  subgraph Next["Next.js App Router"]
    MW["middleware.ts\nnext-intl"]
    Layout["app/[locale]/layout.tsx"]
    Pages["Pages: listings, compare, saved…"]
    MW --> Layout --> Pages
  end

  subgraph Data["Data Layer"]
    Props["data/properties.ts"]
    Msg["messages/ar.json · en.json"]
  end

  User((User)) --> MW
  Pages --> UI
  Pages --> Props
  Layout --> Msg
```

---

## Routing

```mermaid
flowchart LR
  Root["/"] --> MW["Middleware\nlocale detection"]

  MW --> AR["/ar"]
  MW --> EN["/en"]

  subgraph Pages["App pages under /[locale]"]
    Home["/"]
    List["/listings"]
    Detail["/properties/:slug"]
    Saved["/saved"]
    Compare["/compare"]
    Analytics["/analytics"]
    Admin["/admin"]
    Auth["/auth"]
    Contact["/contact"]
  end

  AR --> Home
  EN --> Home
  Home --> List
  List --> Detail
  Home --> Saved
  Home --> Compare
  Home --> Analytics
  Home --> Admin
  Home --> Auth
  Home --> Contact
```

---

## User flows

```mermaid
sequenceDiagram
  actor U as User
  participant L as Listings
  participant D as Property Detail
  participant B as PropertyBag
  participant S as Saved / Compare

  U->>L: Browse and filter properties
  L->>D: Open property by slug
  D->>B: addRecent(slug)
  U->>D: Toggle favorite
  D->>B: toggleFavorite → localStorage
  U->>D: Add to compare (max 3)
  D->>B: toggleCompare
  U->>S: View saved or compare pages
  S->>B: Read favorites / compareIds
```

---

## Project structure

```mermaid
graph TD
  app["app/"]
  app --> locale["[locale]/"]
  locale --> pages["page.tsx, listings/, properties/…"]
  app --> global["layout.tsx · globals.css"]

  components["components/"]
  components --> ui["ui/ — shadcn-style"]
  components --> feature["landing, listings, properties…"]

  i18n["i18n/ — routing, navigation, request"]
  data["data/properties.ts"]
  context["context/property-bag.tsx"]
  messages["messages/ar.json · en.json"]
  lib["lib/ — format, utils"]
```

---

## CI pipeline

```mermaid
flowchart LR
  Push["push / pull_request"] --> T["tests.yml\nVitest + build"]
  Push --> P["pint.yml\nPrettier check"]
  Push --> A["phpstan.yml\nTypeScript tsc"]

  T --> OK{{merge ready?}}
  P --> OK
  A --> OK
```

---

## Tech stack

| Layer     | Tools                   |
| --------- | ----------------------- |
| Framework | Next.js 16, React 19    |
| Styling   | Tailwind CSS 4          |
| i18n      | next-intl               |
| UI        | Radix UI, Framer Motion |
| Charts    | Recharts                |
| Tests     | Vitest                  |
| CI        | GitHub Actions          |

---

## Getting started

```bash
npm install
cp .env.example .env   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/ar` or `/en`.

### Environment

| Variable               | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata (default: `http://localhost:3000`) |

---

## Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start development server   |
| `npm run build`        | Production build           |
| `npm run start`        | Run production server      |
| `npm run lint`         | ESLint                     |
| `npm test`             | Vitest unit tests          |
| `npm run typecheck`    | TypeScript static analysis |
| `npm run format:check` | Verify Prettier formatting |
| `npm run format`       | Apply Prettier formatting  |

---

## CI

Workflows in [`.github/workflows/`](.github/workflows/):

| Workflow      | Purpose                              |
| ------------- | ------------------------------------ |
| `tests.yml`   | Unit tests + production build        |
| `pint.yml`    | Prettier — fails on formatting drift |
| `phpstan.yml` | `tsc` static analysis                |

---

## Learn more

- [Next.js Docs](https://nextjs.org/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)

## Deploy

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) or any Node.js host that supports Next.js.

---

## License

Private demo project — adjust the license as needed for open source release.
