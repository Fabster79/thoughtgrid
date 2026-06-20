# Denkwerkzeug-Finder

Statische Web-App für 50 Denkwerkzeuge mit Suche, Kategorie-Filter, Sortierung, Detailansichten und Radar-Chart.

## Installation

```bash
npm install
```

## Lokale Entwicklung

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment auf GitHub Pages

Die App nutzt `HashRouter`, damit Detailseiten auch auf GitHub Pages ohne Server-Rewrite funktionieren. Der Vite-Base-Pfad ist in `vite.config.ts` auf `/thoughtgrid/` gesetzt.

Das Deployment läuft über GitHub Actions in `.github/workflows/deploy.yml`. Bei jedem Push auf `main` wird:

```bash
npm ci
npm run build
```

ausgeführt und der Build-Output aus `dist/` nach GitHub Pages veröffentlicht.
