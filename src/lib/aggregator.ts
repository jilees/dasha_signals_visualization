import type { RawRow, Review, SignalData, StageData, DashboardData } from '../types'
import { STAGE_ORDER } from './stageOrder'

interface SignalAccum {
  reviewIds: Set<string>
  negCount: number
  posCount: number
  neuCount: number
}

interface StageAspectCounts {
  total: number
  neg: number
  pos: number
  neu: number
  reviewIds: Set<string>
}

export function aggregateRows(rows: RawRow[], fileName: string): DashboardData {
  // Pass 1 — build review dedup map
  const reviewsMap: Record<string, Review> = {}
  for (const row of rows) {
    if (!reviewsMap[row._id]) {
      reviewsMap[row._id] = {
        id: row._id,
        cons: row.cons?.trim() ?? '',
        pros: row.pros?.trim() ?? '',
        comment: row.comment?.trim() ?? '',
      }
    }
  }

  // Pass 2 — per-stage, per-signal accumulator (only rows with signal)
  const stageSignalAccum: Record<string, Record<string, SignalAccum>> = {}

  // Pass 3 — per-stage aspect counts (all rows)
  const stageAspectCounts: Record<string, StageAspectCounts> = {}

  for (const row of rows) {
    const stage = row.stage?.trim() || row.mainTheme?.trim()
    if (!stage) continue

    const sentiment = parseInt(row.sentiment, 10)
    const validSentiment = sentiment === 1 ? 1 : sentiment === -1 ? -1 : 0

    // aspect counts for all rows
    if (!stageAspectCounts[stage]) {
      stageAspectCounts[stage] = { total: 0, neg: 0, pos: 0, neu: 0, reviewIds: new Set() }
    }
    stageAspectCounts[stage].total++
    stageAspectCounts[stage].reviewIds.add(row._id)
    if (validSentiment === -1) stageAspectCounts[stage].neg++
    else if (validSentiment === 1) stageAspectCounts[stage].pos++
    else stageAspectCounts[stage].neu++

    // signal accumulator (skip empty signals)
    const signal = row.signal?.trim()
    if (!signal) continue

    if (!stageSignalAccum[stage]) stageSignalAccum[stage] = {}
    if (!stageSignalAccum[stage][signal]) {
      stageSignalAccum[stage][signal] = { reviewIds: new Set(), negCount: 0, posCount: 0, neuCount: 0 }
    }
    const accum = stageSignalAccum[stage][signal]
    accum.reviewIds.add(row._id)
    if (validSentiment === -1) accum.negCount++
    else if (validSentiment === 1) accum.posCount++
    else accum.neuCount++
  }

  // Materialize StageData[]
  const stageMap: Record<string, StageData> = {}
  const allStageNames = new Set([
    ...Object.keys(stageSignalAccum),
    ...Object.keys(stageAspectCounts),
  ])

  for (const stage of allStageNames) {
    const aspectCounts = stageAspectCounts[stage] ?? { total: 0, neg: 0, pos: 0, neu: 0, reviewIds: new Set() }
    const signalAccums = stageSignalAccum[stage] ?? {}

    const signals: SignalData[] = Object.entries(signalAccums)
      .map(([signal, accum]) => {
        const weight = accum.reviewIds.size
        const dominantSentiment: -1 | 0 | 1 =
          accum.negCount > accum.posCount ? -1 : accum.posCount > accum.negCount ? 1 : 0
        const reviews: Review[] = [...accum.reviewIds].map((id) => reviewsMap[id]).filter(Boolean)
        return {
          signal,
          stage,
          weight,
          negCount: accum.negCount,
          posCount: accum.posCount,
          neuCount: accum.neuCount,
          dominantSentiment,
          reviews,
        }
      })
      .sort((a, b) => b.weight - a.weight)

    stageMap[stage] = {
      stage,
      totalAspects: aspectCounts.total,
      uniqueReviews: aspectCounts.reviewIds.size,
      negAspects: aspectCounts.neg,
      posAspects: aspectCounts.pos,
      neuAspects: aspectCounts.neu,
      signals,
    }
  }

  // Sort stages by canonical order
  const stages = [...allStageNames]
    .sort((a, b) => {
      const ia = STAGE_ORDER.indexOf(a)
      const ib = STAGE_ORDER.indexOf(b)
      if (ia === -1 && ib === -1) return a.localeCompare(b, 'ru')
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })
    .map((stage) => stageMap[stage])

  return { stages, stageMap, totalRows: rows.length, fileName }
}
