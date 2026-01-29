# John's Glazenwassersbedrijf

Website for John's Glazenwassersbedrijf, a professional window cleaning company based in the Betuwe region of the Netherlands.

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Icon library

## Project Structure

```
/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/         # Optimized images (auto-converted to WebP)
│   ├── components/
│   │   ├── common/         # Header, Footer
│   │   └── home/           # Hero, ServiceCards, Reviews, TrustBar
│   ├── layouts/
│   │   └── Layout.astro    # Base layout
│   ├── lib/                # Utilities
│   ├── pages/
│   │   ├── diensten/       # Service pages
│   │   ├── index.astro     # Homepage
│   │   ├── over-ons.astro  # About page
│   │   ├── contact.astro   # Contact page
│   │   └── offerte.astro   # Quote calculator
│   └── styles/
│       └── global.css      # Global styles
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |

## Services

- Glasbewassing (Window cleaning)
- Zonnepanelen reinigen (Solar panel cleaning)
- Dakgoten leegmaken (Gutter cleaning)
- Houtwerk & Trespa (Woodwork & Trespa cleaning)
- Bouwoplevering (Construction handover cleaning)
- Kantoor reiniging (Office cleaning)
- Dakpannen reinigen (Roof tile cleaning)
- Telewash systeem (High-reach cleaning)
