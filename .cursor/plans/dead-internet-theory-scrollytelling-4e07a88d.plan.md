<!-- 4e07a88d-c5ce-4678-860b-6c625a80612d 1e5ef833-63a5-4ac9-ab68-cf96d9ff4d3e -->
# Dead Internet Theory Scrollytelling - Implementeringsplan

## Teknisk Stack

- React 18.2.0 (ikke React 19)
- Vite 6.0.0
- Framer Motion 11.0.0
- Recharts 2.10.0
- Tailwind CSS 4.0.0
- Deployment: Vercel

## Prosjektstruktur

```
dead-internet-theory/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Hero.jsx
│   │   ├── Section.jsx
│   │   ├── ImageFull.jsx
│   │   ├── QuoteCard.jsx
│   │   ├── EliasChat.jsx
│   │   ├── GlitchEffect.jsx
│   │   ├── charts/
│   │   │   ├── ChartLine.jsx
│   │   │   ├── ChartSlope.jsx
│   │   │   ├── ChartBigNumber.jsx
│   │   │   └── ChartContainer.jsx
│   │   └── ui/
│   │       └── TypingIndicator.jsx
│   ├── data/
│   │   ├── content.json
│   │   └── charts/
│   │       ├── botData.json
│   │       ├── chatgptData.json
│   │       └── numbers.json
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## MVP Features (8 totalt)

1. Fullscreen Hero med overlay
2. Fade-in scroll animasjoner (tekst + bilder)
3. Smooth scroll
4. Dark theme med gradienter
5. Responsive design (mobil-first)
6. 3 interaktive charts (4-stegs tilnærming)
7. Quote cards (4 stk)
8. Elias chat interface (scroll-triggered, typing indicator, glitch)

## Implementeringsrekkefølge

### Fase 1: Setup & Fundament (Dag 1)

- Vite + React 18 prosjekt setup
- Installer dependencies (Framer Motion, Recharts, Tailwind)
- Opprett filstruktur
- Layout.jsx med dark theme container
- globals.css med Tailwind imports + smooth scroll
- App.jsx grunnleggende struktur
- Deploy til Vercel for testing

### Fase 2: Hero & Grunnleggende Komponenter (Dag 2)

- Hero.jsx: Fullscreen hero med overlay, Framer Motion fade-in
- Section.jsx: Gjenbrukbar tekstseksjon med fade-in animasjon
- ImageFull.jsx: Fullbredde bilder med fade-in
- Test på mobil og desktop

### Fase 3: PDF→JSON Konvertering & Alle Seksjoner (Dag 3)

- Les Claude.pdf og ekstraher alle 9 seksjoner
- Strukturer innhold i content.json format
- Identifiser chart-plasseringer, quote cards, Elias chat
- Mappe alle seksjoner i App.jsx
- Integrere alle bilder (4 bilder + 1 screenshot)
- Fade-in på alle seksjoner og bilder

### Fase 4: Charts - Steg 1 & 2 (Dag 4)

**4-stegs tilnærming:**

- Steg 1: Statiske charts (baseline)
  - ChartBigNumber.jsx med statiske tall
  - ChartLine.jsx med statisk line chart
  - ChartSlope.jsx med statisk slope chart
- Steg 2: Fade-in animasjoner
  - Wrapp alle charts i motion.div med whileInView
  - Test fade-in på alle charts

### Fase 5: Charts - Steg 3 & Quote Cards (Dag 5)

- Steg 3: Animerte charts
  - ChartLine.jsx: Animated line drawing med Framer Motion
  - ChartBigNumber.jsx: Count-up animasjon
  - ChartSlope.jsx: Animated slope
- QuoteCard.jsx: 4 quote cards med fade-in
- Hvis tid: Steg 4 (scroll-synkronisering)

### Fase 6: Elias Chat & Responsive (Dag 6)

- TypingIndicator.jsx: CSS "..." animasjon
- GlitchEffect.jsx: CSS glitch keyframes
- EliasChat.jsx: Chat-bobler med scroll-triggered fade-in
- Integrere typing indicator og glitch-effekt
- Responsive testing og bug-fixes

### Fase 7: Testing & Deployment (Dag 7)

- Full testing på desktop (Chrome, Firefox, Safari)
- Full testing på mobil (iOS, Android)
- Performance-test (Lighthouse)
- Bug-fixes og fine-tuning
- SEO-optimalisering
- Final deployment

## Data-struktur

### content.json format

```json
{
  "sections": [
    {
      "id": 1,
      "title": "Seksjon tittel",
      "content": "Tekst...",
      "image": "URL",
      "imageAlt": "Beskrivelse",
      "type": "text|chart",
      "chartType": "line|slope|number",
      "hasImage": true
    }
  ],
  "quotes": [...],
  "eliasChat": [...]
}
```

## Framer Motion Pattern

Bruk `whileInView` for alle scroll-animasjoner:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

## Chart 4-stegs Strategi

1. **Stativ** (må ha): Chart vises korrekt
2. **Fade-in** (må ha): Chart animeres inn ved scroll
3. **Animated** (hvis tid): Linjer tegnes animert
4. **Scroll-synkronisert** (nice to have): Chart oppdateres ved scroll

## Fallback Plan

Hvis noe går galt, minimum for levering:

- Hero
- Fade-in tekst (alle 9 seksjoner)
- Dark theme
- Responsive

Dropp hvis nødvendig:

- Animerte charts (bruk statiske)
- Elias chat
- Quote cards

## Testing Strategi

- Test hver dag (5-15 min)
- Test på mobil fra dag 2
- Test hver komponent individuelt
- Performance-test dag 7

## Kritisk Informasjon

- Ingen React-erfaring → bruk React 18 (ikke 19)
- Markdown-fil (compass_artifact_wf-694a774a-7932-46de-9ede-42526d8d4bef_text_markdown.md) er kilde
- Alle bilder har eksterne URLs
- Mobil-first responsive tilnærming
- Incremental approach: noe som fungerer > perfekt

## Agent-Strategi for Prosjektet

### Cursor AI - Hovedagent (Primær)

**Rolle:** Bygge alle komponenter, strukturere kode, implementere features

**Bruksområder:**

- Setup og konfigurasjon (package.json, vite.config, tailwind.config)
- Alle React-komponenter (Hero, Section, Charts, etc.)
- Framer Motion animasjoner
- Recharts implementering
- Data-strukturering (JSON-filer)
- Testing og debugging

**Hvordan bruke:**

- Gi klare, spesifikke instruksjoner per komponent
- Test hver komponent individuelt før neste
- Hold instruksjoner enkle og isolerte
- Bruk "ask mode" først for å forstå, deretter "agent mode" for implementering

### Markdown Parser - Data-ekstraksjon (Dag 3)

**Rolle:** Konvertere markdown til strukturert JSON

**Bruksområder:**

- Ekstrahere seksjoner fra "D. LONG-READ STRUCTURE"
- Identifisere datasett fra "B. KEY DATA, NUMBERS & DATASETS"
- Ekstrahere quotes fra "EXPERT PERSPECTIVES"
- Strukturere content.json

**Hvordan bruke:**

- Cursor AI kan lese markdown direkte
- Bruk codebase_search for å finne spesifikke seksjoner
- Manuell strukturering hvis nødvendig

### Chart Data Generator - Datavisualisering (Dag 4-5)

**Rolle:** Konvertere datasett til chart-formatert JSON

**Bruksområder:**

- botData.json (Dataset #1: 2013-2024 bot/human traffic)
- chatgptData.json (Dataset #2: Pre/post ChatGPT content surge)
- numbers.json (Big numbers: $770B, 51%, etc.)

**Hvordan bruke:**

- Cursor AI kan lese datasett fra markdown
- Strukturer data i Recharts-format
- Valider data-struktur før implementering

### Testing Agent - Kvalitetssikring (Dag 6-7)

**Rolle:** Systematisk testing og bug-fixing

**Bruksområder:**

- Test hver komponent isolert
- Test på mobil og desktop
- Performance-testing (Lighthouse)
- Browser-kompatibilitet

**Hvordan bruke:**

- Test hver dag (5-15 min)
- Dokumenter bugs umiddelbart
- Fiks bugs før neste komponent

### Deployment Agent - Leveranse (Dag 7)

**Rolle:** Final deployment og verifisering

**Bruksområder:**

- Vercel deployment
- Live URL testing
- SEO-optimalisering
- Final checks

**Hvordan bruke:**

- Automatisk via Vercel GitHub integration
- Manuell verifisering av live site

### To-dos

- [ ] Dag 1: Setup Vite + React 18, installer dependencies, opprett filstruktur, Layout.jsx, globals.css, deploy til Vercel
- [ ] Dag 2: Bygg Hero.jsx (fullscreen med overlay), Section.jsx (gjenbrukbar fade-in), ImageFull.jsx, test på mobil
- [ ] Dag 3: Konverter Claude.pdf til content.json, strukturere alle 9 seksjoner, mappe i App.jsx, integrere bilder
- [ ] Dag 4: Bygg statiske charts (ChartBigNumber, ChartLine, ChartSlope), legg til fade-in animasjoner (steg 1-2)
- [ ] Dag 5: Animerte charts (steg 3), count-up tall, QuoteCard.jsx med 4 quotes, hvis tid: scroll-synkronisering (steg 4)
- [ ] Dag 6: EliasChat.jsx med scroll-triggered meldinger, TypingIndicator.jsx, GlitchEffect.jsx, responsive testing
- [ ] Dag 7: Full testing (desktop + mobil), performance-test, bug-fixes, SEO, final deployment