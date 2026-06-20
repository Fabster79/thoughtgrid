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

  const { detail, relatedTools, scores, sources, template, visual } = value

  return (
    typeof value.id === 'string' &&
    typeof value.number === 'number' &&
    optionalString(value.shortDescription) &&
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
    (template === undefined || isTemplate(template)) &&
    (detail === undefined || detail === null || isDetail(detail)) &&
    (visual === undefined || visual === null || isVisual(visual)) &&
    (relatedTools === undefined ||
      (Array.isArray(relatedTools) &&
        relatedTools.every((toolId) => typeof toolId === 'string')))
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
    typeof value.intro === 'string' &&
    optionalString(value.estimatedTime) &&
    optionalString(value.categoryFocus) &&
    (value.steps === undefined ||
      (Array.isArray(value.steps) &&
        value.steps.every((step) => typeof step === 'string'))) &&
    Array.isArray(value.fields) &&
    value.fields.every(
      (field) =>
        isRecord(field) &&
        typeof field.label === 'string' &&
        optionalString(field.helperText) &&
        typeof field.value === 'string',
    )
  )
}

function isDetail(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.whatItIs === 'string' &&
    isStringList(value.whenToUse) &&
    isStringList(value.howToUse) &&
    isStringList(value.pitfalls) &&
    isStringList(value.goodFor) &&
    isStringList(value.notIdealFor) &&
    typeof value.output === 'string'
  )
}

function isVisual(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.headline === 'string' &&
    typeof value.metaphor === 'string' &&
    typeof value.layoutHint === 'string' &&
    isStringList(value.elements)
  )
}

function isStringList(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function optionalString(value: unknown) {
  return value === undefined || typeof value === 'string'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
