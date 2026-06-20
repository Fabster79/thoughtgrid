import { categoryKeys, type ThinkingTool, type ThinkingToolsData } from './types'

const dataPath = `${import.meta.env.BASE_URL}data/thinking-tools.json`

export async function loadThinkingTools(): Promise<ThinkingToolsData> {
  const response = await fetch(dataPath)

  if (!response.ok) {
    throw new Error(
      `Die Denkwerkzeuge konnten nicht geladen werden (${response.status}).`,
    )
  }

  const value: unknown = await response.json()

  if (!isThinkingToolsData(value)) {
    throw new Error('Die Datenstruktur der Denkwerkzeuge ist ungültig.')
  }

  return value
}

function isThinkingToolsData(value: unknown): value is ThinkingToolsData {
  if (!isRecord(value)) {
    return false
  }

  const { metadata, categories, tools } = value

  return (
    isRecord(metadata) &&
    isRecord(metadata.scoreScale) &&
    typeof metadata.title === 'string' &&
    typeof metadata.description === 'string' &&
    typeof metadata.version === 'string' &&
    typeof metadata.language === 'string' &&
    typeof metadata.scoreScale.min === 'number' &&
    typeof metadata.scoreScale.max === 'number' &&
    isRecord(categories) &&
    categoryKeys.every((key) => isCategory(categories[key])) &&
    Array.isArray(tools) &&
    tools.every(isThinkingTool)
  )
}

function isCategory(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.label === 'string' &&
    typeof value.description === 'string' &&
    typeof value.thinkingMove === 'string' &&
    Array.isArray(value.examples) &&
    value.examples.every((example) => typeof example === 'string')
  )
}

function isThinkingTool(value: unknown): value is ThinkingTool {
  if (!isRecord(value)) {
    return false
  }

  const { sources, scores, template } = value

  return (
    typeof value.id === 'string' &&
    typeof value.number === 'number' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.applicationArea === 'string' &&
    typeof value.origin === 'string' &&
    Array.isArray(sources) &&
    sources.every(isSource) &&
    typeof value.example === 'string' &&
    isRecord(scores) &&
    categoryKeys.every((key) => typeof scores[key] === 'number') &&
    categoryKeys.includes(value.dominantCategory as never) &&
    typeof value.dominantCategoryLabel === 'string' &&
    typeof value.totalScore === 'number' &&
    isTemplate(template)
  )
}

function isSource(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.url === 'string' &&
    typeof value.title === 'string'
  )
}

function isTemplate(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.title === 'string' &&
    typeof value.categoryFocus === 'string' &&
    typeof value.intro === 'string' &&
    Array.isArray(value.fields) &&
    value.fields.every(
      (field) =>
        isRecord(field) &&
        typeof field.label === 'string' &&
        typeof field.value === 'string',
    )
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
