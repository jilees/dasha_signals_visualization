import { SentimentBadge } from '../shared/SentimentBadge'
import type { SignalData } from '../../types'
import { useDashboardStore } from '../../stores/dashboardStore'

interface DrawerHeaderProps {
  signal: SignalData
  showAll: boolean
  totalReviews: number
  onToggleShowAll: () => void
}

export function DrawerHeader({ signal, showAll, totalReviews, onToggleShowAll }: DrawerHeaderProps) {
  const { setActiveSignal } = useDashboardStore()

  return (
    <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0 bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <SentimentBadge sentiment={signal.dominantSentiment} size="md" />
          <h2 className="text-sm font-semibold text-gray-800 leading-snug">{signal.signal}</h2>
        </div>
        <button
          onClick={() => setActiveSignal(null)}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:bg-gray-100 hover:text-gray-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleShowAll}
          className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
            !showAll
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          По сигналу · {signal.weight}
        </button>
        <button
          onClick={onToggleShowAll}
          className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
            showAll
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          Все отзывы · {totalReviews}
        </button>
      </div>
    </div>
  )
}
