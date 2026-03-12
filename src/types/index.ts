export interface RawRow {
  _id: string
  cons: string
  pros: string
  comment: string
  aspect: string
  description: string
  mainTheme: string
  secondaryTheme: string
  sentiment: string // "-1" | "0" | "1" | ""
  stage: string
  signal: string
}

export interface Review {
  id: string
  cons: string
  pros: string
  comment: string
}

export interface SignalData {
  signal: string
  stage: string
  weight: number // unique review count
  negCount: number
  posCount: number
  neuCount: number
  dominantSentiment: -1 | 0 | 1
  reviews: Review[]
}

export interface StageData {
  stage: string
  totalAspects: number // all rows for this stage
  uniqueReviews: number
  negAspects: number
  posAspects: number
  neuAspects: number
  signals: SignalData[] // sorted by weight desc
}

export interface DashboardData {
  stages: StageData[]
  stageMap: Record<string, StageData>
  totalRows: number
  fileName: string
}
