# ThoughtGrid Content Review – Werkzeuge 1–10

## Umfang

Review der ersten 10 Denkwerkzeuge:

1. ABC-Liste
2. KaWa
3. KaGa
4. Mindmap
5. Concept Map
6. Kartenabfrage / Clustering
7. Top-10-Liste
8. Pro-und-Contra-Liste
9. Dos & Don’ts
10. Checkliste

## Ziel der Überarbeitung

- Texte konsistenter und app-tauglicher machen
- Detailseiten klarer strukturieren
- Template-Felder für spätere PDF-Downloads verbessern
- Visual-Hinweise für spätere Methodenkarte / Screenshot präzisieren
- Sprache vereinheitlichen: klar, ruhig, praktisch, nicht akademisch
- Rückwärtskompatibilität des JSON-Schemas erhalten

## Wichtige Änderungen

- `shortDescription` bei allen 10 Werkzeugen geschärft
- `detail.whatItIs` sprachlich geglättet
- `whenToUse`, `howToUse`, `pitfalls`, `goodFor`, `notIdealFor` konsistenter formuliert
- `template.fields` teilweise präzisiert
- `template.categoryFocus` bei allen 10 Werkzeugen ergänzt bzw. vereinheitlicht
- `visual.layoutHint` stärker auf spätere Screenshot-/Methodenkarten-Nutzung ausgerichtet
- Keine IDs, Scores, Quellen oder Related-Tool-IDs geändert

## Validierung

Automatisch geprüft:

- JSON ist gültig parsebar
- Es sind genau 50 Werkzeuge enthalten
- Alle IDs sind eindeutig
- Alle 50 Werkzeuge haben die erwarteten Hauptfelder
- Alle Scores liegen im Bereich 1–10
- `totalScore` entspricht der Summe der fünf Scores
- Alle `relatedTools` verweisen auf vorhandene IDs
- Für die ersten 10 Werkzeuge sind `detail`, `template`, `visual` und `categoryFocus` vollständig vorhanden

## Nutzung

Die Datei `thinking-tools-v2-review-01-10.json` kann die bestehende Datei ersetzen:

```text
public/data/thinking-tools.json
```

Danach lokal prüfen:

```bash
npm run build
npm run dev
```

## Codex-Auftrag

Bitte ersetze `public/data/thinking-tools.json` durch die neue Datei `thinking-tools-v2-review-01-10.json`.

Prüfe anschließend:
1. Ob `npm run build` erfolgreich läuft.
2. Ob die Detailseiten der Werkzeuge 1–10 sauber rendern.
3. Ob Template-Bereich, Visual-Hinweis und Related Tools weiterhin korrekt angezeigt werden.
4. Ob sich durch die Content-Änderung keine Layout-Probleme ergeben.

Bitte keine neuen Features bauen und keine Datenstruktur ändern.
