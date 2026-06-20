# Codex-Auftrag: Denkwerkzeug-Finder MVP

Baue eine statische Web-App namens **Denkwerkzeug-Finder**.

## Ziel
Die App soll 50 Denkwerkzeuge übersichtlich darstellen, nach fünf Denkbewegungen filterbar machen und pro Denkwerkzeug eine Detailansicht mit Beschreibung, Anwendung, Herkunft, Beispiel, Score-Visualisierung und Template anzeigen.

## Tech Stack
- Vite
- React
- TypeScript
- Recharts
- CSS Modules oder schlichtes CSS
- Deployment-fähig für GitHub Pages

## Datenbasis
Nutze die Datei `thinking-tools.json`.
Lege sie im Projekt unter folgendem Pfad ab:

```text
public/data/thinking-tools.json
```

Die JSON-Datei enthält:
- `metadata`
- `categories`
- `tools`

Jedes Tool enthält unter anderem:
- `id`
- `number`
- `name`
- `description`
- `applicationArea`
- `origin`
- `sources`
- `example`
- `scores`
- `dominantCategory`
- `dominantCategoryLabel`
- `totalScore`
- `template`

## MVP-Funktionen

### Startseite
1. Titel: **Denkwerkzeug-Finder**
2. Kurze Erklärung: „Finde das passende Denkwerkzeug für deine aktuelle Denkbewegung.“
3. Darstellung der fünf Kategorien:
   - Generieren
   - Strukturieren
   - Analysieren
   - Reduzieren
   - Priorisieren
4. Suchfeld für Denkwerkzeuge
5. Filterbuttons für die fünf Kategorien
6. Sortierung:
   - alphabetisch
   - höchste Gesamtwertung
   - stärkste ausgewählte Kategorie
7. Card-Grid mit allen Denkwerkzeugen

### Tool Cards
Jede Card zeigt:
- Name
- Kurzbeschreibung
- dominierende Kategorie
- fünf kleine Score-Balken
- Button oder Link: „Details ansehen“

### Detailansicht
Die Detailansicht zeigt:
- Name
- Beschreibung
- Anwendungsgebiet
- Herkunft
- Quellen, falls vorhanden
- Mini-Beispiel
- Radar Chart mit den fünf Scores
- Template-Bereich mit Feldern aus `template.fields`

### Visualisierung
- Auf der Detailseite: Radar Chart mit Recharts
- Auf der Card: einfache horizontale Score-Balken

### Routing
Nutze React Router.
Die App muss auf GitHub Pages funktionieren. Achte daher auf korrekte `base`-Konfiguration in `vite.config.ts` oder erkläre in der README, wie der Repository-Name gesetzt wird.

## Design
- Modern, klar, ruhig, seriös
- Mobile-first
- Gute Lesbarkeit
- Kein überladenes Dashboard
- Kartenlayout mit großzügigem Abstand

## Deployment
Erstelle eine README mit:
- Installation
- lokaler Entwicklung
- Build
- Deployment auf GitHub Pages

## Qualitätsanforderungen
- TypeScript-Typen für das Datenmodell anlegen
- Keine API Keys
- Keine Backend-Abhängigkeit
- JSON beim Laden robust behandeln
- Falls Daten nicht geladen werden können, eine verständliche Fehlermeldung anzeigen
