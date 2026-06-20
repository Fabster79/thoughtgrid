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
  description: string
  applicationArea: string
  origin: string
  sources: ThinkingToolSource[]
  example: string
  scores: ScoreMap
  dominantCategory: CategoryKey
  dominantCategoryLabel: string
  totalScore: number
  template: ThinkingToolTemplate
}

export interface ThinkingToolSource {
  url: string
  title: string
}

export interface ThinkingToolTemplate {
  title: string
  categoryFocus: string
  intro: string
  fields: ThinkingToolTemplateField[]
}

export interface ThinkingToolTemplateField {
  label: string
  value: string
}

export type SortOption = 'alphabetical' | 'totalScore' | 'selectedCategory'
