export const categoryKeys = [
  'generate',
  'structure',
  'analyze',
  'reduce',
  'prioritize',
] as const

export type CategoryKey = (typeof categoryKeys)[number]

export type ScoreMap = Record<CategoryKey, number>

export interface ThinkingToolsData {
  metadata: {
    title: string
    description: string
    version: string
    language: string
    scoreScale: {
      min: number
      max: number
    }
  }
  categories: Record<CategoryKey, ThinkingToolCategory>
  tools: ThinkingTool[]
}

export interface ThinkingToolCategory {
  label: string
  description: string
  thinkingMove: string
  examples: string[]
}

export interface ThinkingTool {
  id: string
  number: number
  name: string
  shortDescription?: string
  description: string
  applicationArea: string
  origin: string
  sources: ThinkingToolSource[]
  example: string
  scores: ScoreMap
  dominantCategory: CategoryKey
  dominantCategoryLabel: string
  totalScore: number
  detail?: ThinkingToolDetail | null
  visual?: ThinkingToolVisual | null
  template?: ThinkingToolTemplate
  relatedTools?: string[]
}

export interface ThinkingToolSource {
  url: string
  title: string
}

export interface ThinkingToolTemplate {
  title: string
  intro: string
  estimatedTime?: string
  categoryFocus?: string
  steps?: string[]
  fields: ThinkingToolTemplateField[]
}

export interface ThinkingToolTemplateField {
  label: string
  helperText?: string
  value: string
}

export interface ThinkingToolDetail {
  whatItIs: string
  whenToUse: string[]
  howToUse: string[]
  pitfalls: string[]
  goodFor: string[]
  notIdealFor: string[]
  output: string
}

export interface ThinkingToolVisual {
  headline: string
  metaphor: string
  layoutHint: string
  elements: string[]
}

export type SortOption = 'alphabetical' | 'totalScore' | 'selectedCategory'
