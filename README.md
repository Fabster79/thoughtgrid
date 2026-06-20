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

Die App nutzt `HashRouter`, damit Detailseiten auch auf GitHub Pages ohne Server-Rewrite funktionieren. Für ein Repository-Deployment kann der Vite-Base-Pfad beim Build gesetzt werden:

```bash
VITE_BASE=/thoughtgrid/ npm run build
```

Falls das Repository anders heißt, ersetze `thoughtgrid` durch den Repository-Namen. Die fertigen Dateien liegen danach in `dist/`.
