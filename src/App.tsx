import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import './App.css'
import { loadThinkingTools } from './data'
import {
  categoryKeys,
  type CategoryKey,
  type SortOption,
  type ThinkingTool,
  type ThinkingToolsData,
} from './types'

const sortLabels: Record<SortOption, string> = {
  alphabetical: 'Alphabetisch',
  totalScore: 'Höchste Gesamtwertung',
  selectedCategory: 'Stärkste ausgewählte Kategorie',
}

function App() {
  const [data, setData] = useState<ThinkingToolsData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    loadThinkingTools()
      .then((loadedData) => {
        if (active) {
          setData(loadedData)
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Die Denkwerkzeuge konnten nicht geladen werden.',
          )
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (error) {
    return (
      <StatusMessage title="Daten konnten nicht geladen werden" text={error} />
    )
  }

  if (!data) {
    return (
      <StatusMessage
        title="Denkwerkzeuge werden geladen"
        text="Einen Moment bitte."
      />
    )
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/tools/:toolId" element={<ToolDetailPage data={data} />} />
      </Routes>
    </HashRouter>
  )
}

interface DataPageProps {
  data: ThinkingToolsData
}

function HomePage({ data }: DataPageProps) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>(
    'all',
  )
  const [sortOption, setSortOption] = useState<SortOption>('alphabetical')

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return data.tools
      .filter((tool) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [tool.name, tool.description, tool.applicationArea]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery)

        const matchesCategory =
          selectedCategory === 'all' ||
          tool.dominantCategory === selectedCategory ||
          tool.scores[selectedCategory] >= 7

        return matchesQuery && matchesCategory
      })
      .toSorted((first, second) => {
        if (sortOption === 'totalScore') {
          return (
            second.totalScore - first.totalScore ||
            first.name.localeCompare(second.name)
          )
        }

        if (sortOption === 'selectedCategory' && selectedCategory !== 'all') {
          return (
            second.scores[selectedCategory] - first.scores[selectedCategory] ||
            first.name.localeCompare(second.name)
          )
        }

        return first.name.localeCompare(second.name)
      })
  }, [data.tools, query, selectedCategory, sortOption])

  return (
    <main className="app-shell">
      <section className="intro">
        <p className="eyebrow">ThoughtGrid MVP</p>
        <h1>Denkwerkzeug-Finder</h1>
        <p className="lead">
          Finde das passende Denkwerkzeug für deine aktuelle Denkbewegung.
        </p>
      </section>

      <section className="category-strip" aria-label="Denkbewegungen">
        {categoryKeys.map((key) => (
          <button
            className={selectedCategory === key ? 'category active' : 'category'}
            key={key}
            onClick={() => setSelectedCategory(key)}
            type="button"
          >
            <span>{data.categories[key].label}</span>
            <small>{data.categories[key].thinkingMove}</small>
          </button>
        ))}
      </section>

      <section className="controls" aria-label="Suche und Filter">
        <label className="search">
          <span>Suche</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, Beschreibung oder Anwendungsgebiet"
            type="search"
            value={query}
          />
        </label>

        <div className="filter-group" aria-label="Kategorie-Filter">
          <button
            className={selectedCategory === 'all' ? 'pill active' : 'pill'}
            onClick={() => setSelectedCategory('all')}
            type="button"
          >
            Alle
          </button>
          {categoryKeys.map((key) => (
            <button
              className={selectedCategory === key ? 'pill active' : 'pill'}
              key={key}
              onClick={() => setSelectedCategory(key)}
              type="button"
            >
              {data.categories[key].label}
            </button>
          ))}
        </div>

        <label className="sort">
          <span>Sortierung</span>
          <select
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            value={sortOption}
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="results-heading" aria-live="polite">
        <h2>{filteredTools.length} Denkwerkzeuge</h2>
        <p>
          {selectedCategory === 'all'
            ? 'Alle Kategorien'
            : data.categories[selectedCategory].description}
        </p>
      </section>

      <section className="tool-grid">
        {filteredTools.map((tool) => (
          <ToolCard categories={data.categories} key={tool.id} tool={tool} />
        ))}
      </section>
    </main>
  )
}

interface ToolCardProps {
  categories: ThinkingToolsData['categories']
  tool: ThinkingTool
}

function ToolCard({ categories, tool }: ToolCardProps) {
  return (
    <article className="tool-card">
      <div className="card-topline">
        <span>#{tool.number}</span>
        <strong>{tool.dominantCategoryLabel}</strong>
      </div>
      <h3>{tool.name}</h3>
      <p>{tool.shortDescription ?? tool.description}</p>
      <ScoreBars categories={categories} scores={tool.scores} />
      <Link className="detail-link" to={`/tools/${tool.id}`}>
        Details ansehen
      </Link>
    </article>
  )
}

function ToolDetailPage({ data }: DataPageProps) {
  const { toolId } = useParams()
  const tool = data.tools.find((item) => item.id === toolId)

  if (!tool) {
    return (
      <StatusMessage
        title="Denkwerkzeug nicht gefunden"
        text="Dieses Werkzeug ist in der Datenbasis nicht vorhanden."
      >
        <Link className="detail-link" to="/">
          Zurück zur Übersicht
        </Link>
      </StatusMessage>
    )
  }

  const chartData = categoryKeys.map((key) => ({
    category: data.categories[key].label,
    score: tool.scores[key],
  }))
  const relatedTools = (tool.relatedTools ?? [])
    .map((relatedToolId) => data.tools.find((item) => item.id === relatedToolId))
    .filter((item): item is ThinkingTool => Boolean(item))

  return (
    <main className="app-shell detail-shell">
      <Link className="back-link" to="/">
        Zurück zur Übersicht
      </Link>

      <section className="detail-hero">
        <div>
          <p className="eyebrow">
            #{tool.number} · {tool.dominantCategoryLabel}
          </p>
          <h1>{tool.name}</h1>
          <p className="lead">{tool.shortDescription ?? tool.description}</p>
        </div>
        <div className="score-total">
          <span>{tool.totalScore}</span>
          <small>Gesamtwertung</small>
        </div>
      </section>

      <section className="detail-grid">
        {tool.detail && (
          <article className="detail-panel content-panel">
            <h2>Was ist das?</h2>
            <p>{tool.detail.whatItIs}</p>

            <div className="content-sections">
              <InfoList title="Wann nutzen?" items={tool.detail.whenToUse} />
              <InfoList
                title="So funktioniert's"
                items={tool.detail.howToUse}
                ordered
              />
              <InfoList
                title="Typische Stolperfallen"
                items={tool.detail.pitfalls}
              />
            </div>

            <div className="fit-grid">
              <InfoList title="Gut geeignet für" items={tool.detail.goodFor} />
              <InfoList
                title="Eher nicht geeignet für"
                items={tool.detail.notIdealFor}
              />
            </div>

            <div className="output-box">
              <strong>Ergebnis</strong>
              <p>{tool.detail.output}</p>
            </div>
          </article>
        )}

        <article className="detail-panel">
          <h2>Anwendung</h2>
          <dl className="fact-list">
            <div>
              <dt>Anwendungsgebiet</dt>
              <dd>{tool.applicationArea}</dd>
            </div>
            <div>
              <dt>Herkunft</dt>
              <dd>{tool.origin}</dd>
            </div>
            <div>
              <dt>Mini-Beispiel</dt>
              <dd>{tool.example}</dd>
            </div>
          </dl>
        </article>

        {tool.visual && (
          <article className="detail-panel visual-panel">
            <p className="eyebrow">Visual-Hinweis</p>
            <h2>{tool.visual.headline}</h2>
            <p>{tool.visual.metaphor}</p>
            <p className="layout-hint">{tool.visual.layoutHint}</p>
            <div className="tag-list">
              {tool.visual.elements.map((element) => (
                <span key={element}>{element}</span>
              ))}
            </div>
          </article>
        )}

        <article className="detail-panel chart-panel">
          <h2>Score-Profil</h2>
          <div className="radar-wrap">
            <ResponsiveContainer height="100%" width="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tickCount={6} />
                <Radar
                  dataKey="score"
                  fill="#2563eb"
                  fillOpacity={0.24}
                  name="Score"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </article>

        {tool.template && (
          <article className="detail-panel template-panel">
            {tool.template.categoryFocus && (
              <p className="eyebrow">{tool.template.categoryFocus}</p>
            )}
            <h2>{tool.template.title}</h2>
            <p>{tool.template.intro}</p>
            {tool.template.estimatedTime && (
              <p className="template-meta">
                Geschätzte Dauer: {tool.template.estimatedTime}
              </p>
            )}
            {tool.template.steps && tool.template.steps.length > 0 && (
              <div className="template-steps">
                <h3>Schritte</h3>
                <ol>
                  {tool.template.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            {tool.template.fields.length > 0 && (
              <div className="template-fields">
                {tool.template.fields.map((field) => (
                  <label key={field.label}>
                    <span>{field.label}</span>
                    {field.helperText && <small>{field.helperText}</small>}
                    <textarea defaultValue={field.value} rows={3} />
                  </label>
                ))}
              </div>
            )}
          </article>
        )}

        {relatedTools.length > 0 && (
          <article className="detail-panel related-panel">
            <h2>Verwandte Denkwerkzeuge</h2>
            <div className="related-list">
              {relatedTools.map((relatedTool) => (
                <Link key={relatedTool.id} to={`/tools/${relatedTool.id}`}>
                  <strong>{relatedTool.name}</strong>
                  <span>{relatedTool.shortDescription ?? relatedTool.description}</span>
                </Link>
              ))}
            </div>
          </article>
        )}

        {tool.sources.length > 0 && (
          <article className="detail-panel">
            <h2>Quellen</h2>
            <ul className="source-list">
              {tool.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.title || source.url}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        )}
      </section>
    </main>
  )
}

interface InfoListProps {
  items: string[]
  ordered?: boolean
  title: string
}

function InfoList({ items, ordered = false, title }: InfoListProps) {
  if (items.length === 0) {
    return null
  }

  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <section className="info-list">
      <h3>{title}</h3>
      <ListTag>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </section>
  )
}

interface ScoreBarsProps {
  categories: ThinkingToolsData['categories']
  scores: ThinkingTool['scores']
}

function ScoreBars({ categories, scores }: ScoreBarsProps) {
  return (
    <div className="score-bars">
      {categoryKeys.map((key) => (
        <div className="score-row" key={key}>
          <span>{categories[key].label}</span>
          <div className="score-track" aria-hidden="true">
            <i style={{ width: `${scores[key] * 10}%` }} />
          </div>
          <strong>{scores[key]}</strong>
        </div>
      ))}
    </div>
  )
}

interface StatusMessageProps {
  children?: React.ReactNode
  text: string
  title: string
}

function StatusMessage({ children, text, title }: StatusMessageProps) {
  return (
    <main className="status">
      <h1>{title}</h1>
      <p>{text}</p>
      {children}
    </main>
  )
}

export default App
