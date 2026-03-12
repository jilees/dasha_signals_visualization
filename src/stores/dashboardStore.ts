import { create } from 'zustand'
import { parseCSV } from '../lib/csvParser'
import { aggregateRows } from '../lib/aggregator'
import type { DashboardData, SignalData } from '../types'

const DEFAULT_CSV = `${import.meta.env.BASE_URL}data/dasha.marketplace-feedbacks.csv`

interface DashboardStore {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  activeStage: string | null
  activeSignal: SignalData | null

  loadDefault: () => Promise<void>
  loadFromFile: (file: File) => Promise<void>
  setActiveStage: (stage: string) => void
  setActiveSignal: (signal: SignalData | null) => void
}

async function processText(text: string, fileName: string): Promise<DashboardData> {
  const { rows, errors } = parseCSV(text)
  if (errors.length > 0) throw new Error(errors.join('; '))
  return aggregateRows(rows, fileName)
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  activeStage: null,
  activeSignal: null,

  loadDefault: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch(DEFAULT_CSV)
      if (!res.ok) throw new Error(`Не удалось загрузить файл: ${res.status}`)
      const text = await res.text()
      const data = await processText(text, 'dasha.marketplace-feedbacks.csv')
      set({ data, isLoading: false, activeStage: data.stages[0]?.stage ?? null, activeSignal: null })
    } catch (e) {
      set({ isLoading: false, error: (e as Error).message })
    }
  },

  loadFromFile: async (file: File) => {
    set({ isLoading: true, error: null })
    try {
      const text = await file.text()
      const data = await processText(text, file.name)
      set({ data, isLoading: false, activeStage: data.stages[0]?.stage ?? null, activeSignal: null })
    } catch (e) {
      set({ isLoading: false, error: (e as Error).message })
    }
  },

  setActiveStage: (stage: string) => {
    set({ activeStage: stage, activeSignal: null })
  },

  setActiveSignal: (signal: SignalData | null) => {
    set({ activeSignal: signal })
  },
}))
