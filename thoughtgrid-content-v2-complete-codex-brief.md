# ThoughtGrid Content V2 – Complete Dataset Integration

## Ziel

Integriere die vollständige V2-Datenbasis für ThoughtGrid in die bestehende App.

## Datei

Ersetze die bestehende Datei:

```text
public/data/thinking-tools.json
```

durch die neue Datei:

```text
thoughtgrid-content-v2-complete.json
```

Die Datei muss im Projekt anschließend wieder so heißen:

```text
public/data/thinking-tools.json
```

## Inhalt

Die neue JSON-Datei enthält alle 50 Denkwerkzeuge mit erweitertem Content-Schema:

- `shortDescription`
- `detail.whatItIs`
- `detail.whenToUse`
- `detail.howToUse`
- `detail.pitfalls`
- `detail.goodFor`
- `detail.notIdealFor`
- `detail.output`
- `template.title`
- `template.intro`
- `template.estimatedTime`
- `template.steps`
- `template.fields`
- `visual.headline`
- `visual.metaphor`
- `visual.layoutHint`
- `visual.elements`
- `relatedTools`

## Bitte prüfen

1. App lokal starten.
2. Alle Detailseiten sollen weiterhin funktionieren.
3. Keine Detailseite soll leere Bereiche für `detail`, `template` oder `visual` anzeigen.
4. Related Tools sollen nur dann angezeigt werden, wenn die verknüpften IDs gefunden werden.
5. `npm run build` muss erfolgreich laufen.

## Noch nicht umsetzen

Bitte noch keinen PDF-Export bauen. Die Inhalte sind bereits dafür vorbereitet, aber der PDF-Download kommt in einem späteren Schritt.

## Commit-Vorschlag

```bash
git add public/data/thinking-tools.json
git commit -m "Complete enriched ThoughtGrid content"
git push
```
