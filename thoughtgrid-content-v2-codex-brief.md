# ThoughtGrid Content V2 – Integration Brief

Ziel: Die ThoughtGrid-App soll das erweiterte Content-Schema aus `thinking-tools.json` nutzen. Die ersten 10 Denkwerkzeuge enthalten bereits angereicherte Inhalte für Detailseite, PDF-Template und Visual-Vorschau.

## Datenmodell erweitern

Ergänze im TypeScript-Modell optional folgende Felder pro Tool:

```ts
shortDescription?: string;
detail?: {
  whatItIs: string;
  whenToUse: string[];
  howToUse: string[];
  pitfalls: string[];
  goodFor: string[];
  notIdealFor: string[];
  output: string;
} | null;
template?: {
  title: string;
  intro: string;
  estimatedTime?: string;
  categoryFocus?: string;
  steps: string[];
  fields: Array<{
    label: string;
    helperText?: string;
    value: string;
  }>;
};
visual?: {
  headline: string;
  metaphor: string;
  layoutHint: string;
  elements: string[];
} | null;
relatedTools?: string[];
```

## Detailseite erweitern

Wenn `detail` vorhanden ist, zeige zusätzlich:

1. Was ist das?
2. Wann nutzen?
3. So funktioniert’s
4. Typische Stolperfallen
5. Gut geeignet für / Weniger geeignet für
6. Ergebnis

Wenn `visual` vorhanden ist, zeige eine Visual-Preview-Box:
- Headline
- Metapher
- Elemente als kleine Tags

Wenn `template` vorhanden ist, zeige:
- Template-Titel
- Intro
- geschätzte Dauer
- Schritte
- Template-Felder

## Rückwärtskompatibilität

Für Werkzeuge ohne `detail` oder `visual` sollen weiterhin die alten Felder angezeigt werden. Die App darf nicht crashen, wenn Felder fehlen oder `null` sind.

## Wichtig

Noch kein PDF-Export implementieren. Nur die Datenstruktur und Anzeige vorbereiten.
