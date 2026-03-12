import { SentimentBadge } from '../shared/SentimentBadge'
import type { StageData } from '../../types'

interface SummaryPanelProps {
  stage: StageData
}

export function SummaryPanel({ stage }: SummaryPanelProps) {
  const total = stage.uniqueReviews || 1
  const topSignals = stage.signals.slice(0, 8)

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Топ сигналов по охвату
      </h2>
      <div className="flex flex-col gap-2">
        {topSignals.map((signal) => {
          const pct = Math.round((signal.weight / total) * 100)
          return (
            <div key={signal.signal} className="flex items-center gap-2">
              <SentimentBadge sentiment={signal.dominantSentiment} />
              <span className="flex-1 text-sm text-gray-700 leading-snug line-clamp-1" title={signal.signal}>
                {signal.signal}
              </span>
              <span className="text-sm font-semibold text-gray-600 flex-shrink-0">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
