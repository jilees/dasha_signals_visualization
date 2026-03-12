import Papa from 'papaparse'
import type { RawRow } from '../types'

const REQUIRED_COLUMNS = ['_id', 'signal', 'stage', 'sentiment', 'cons', 'pros', 'comment']

export interface ParseResult {
  rows: RawRow[]
  errors: string[]
}

export function parseCSV(text: string): ParseResult {
  const result = Papa.parse<RawRow>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })

  if (result.errors.length > 0 && result.data.length === 0) {
    return {
      rows: [],
      errors: result.errors.map((e) => e.message),
    }
  }

  const headers = result.meta.fields ?? []
  const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col))
  if (missing.length > 0) {
    return {
      rows: [],
      errors: [`Отсутствуют обязательные колонки: ${missing.join(', ')}`],
    }
  }

  return { rows: result.data, errors: [] }
}
