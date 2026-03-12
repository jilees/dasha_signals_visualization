import { SentimentBadge } from '../shared/SentimentBadge'
import type { StageData } from '../../types'

interface SummaryPanelProps {
  stage: StageData
}

export function SummaryPanel({ stage }: SummaryPanelProps) {
  const total = stage.uniqueReviews || 1
  const topSignals = stage.signals.slice(0, 10)

  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Охват по сигналам
      </h2>
      <div className="flex flex-col gap-0.5">
        {topSignals.map((signal) => {
          const pct = Math.round((signal.weight / total) * 100)
          return (
            <div key={signal.signal} className="flex items-center gap-2 px-1 py-1.5 rounded-lg hover:bg-gray-50">
              <SentimentBadge sentiment={signal.dominantSentiment} />
              <span className="flex-1 text-xs text-gray-600 leading-snug line-clamp-1" title={signal.signal}>
                {signal.signal}
              </span>
              <span className="text-xs font-semibold text-gray-500 flex-shrink-0 tabular-nums w-8 text-right">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
