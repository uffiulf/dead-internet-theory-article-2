# Dead Internet Theory - Scrollytelling Article

En interaktiv scrollytelling-artikkel om "Dead Internet Theory" og AI-generert innhold.

## Teknisk Stack

- React 18.2.0
- Vite 6.0.0
- Framer Motion 11.0.0
- Recharts 2.10.0
- Tailwind CSS 4.0.0

## Installasjon

```bash
npm install
```

## Utvikling

```bash
npm run dev
```

## Bygge

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## GitHub Pages Deployment

Prosjektet er konfigurert for automatisk deployment til GitHub Pages via GitHub Actions.

### Automatisk Deployment

1. Push til `main` branch trigger automatisk build og deployment
2. GitHub Actions workflow bygger prosjektet og deployer til GitHub Pages
3. Nettsiden vil være tilgjengelig på: `https://uffiulf.github.io/dead-internet-theory-article-2/`

### Manuell Setup (hvis nødvendig)

1. Gå til **Settings** → **Pages** i GitHub repository
2. Under **Source**, velg **GitHub Actions**
3. Workflow vil automatisk kjøre ved push til `main` branch

### Lokal Testing av Build

For å teste build lokalt før deployment:

```bash
npm run build
npm run preview
```

Dette vil bygge prosjektet og kjøre en lokal preview-server med production build.
