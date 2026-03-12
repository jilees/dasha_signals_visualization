import { SentimentBadge } from '../shared/SentimentBadge'
import type { SignalData } from '../../types'
import { useDashboardStore } from '../../stores/dashboardStore'

interface DrawerHeaderProps {
  signal: SignalData
  showAll: boolean
  totalReviews: number
  onToggleShowAll: () => void
}

function pluralReviews(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} отзыва`
  return `${n} отзывов`
}

export function DrawerHeader({ signal, showAll, totalReviews, onToggleShowAll }: DrawerHeaderProps) {
  const { setActiveSignal } = useDashboardStore()

  return (
    <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <SentimentBadge sentiment={signal.dominantSentiment} size="md" />
          <h2 className="text-sm font-semibold text-gray-800 leading-snug">{signal.signal}</h2>
        </div>
        <button
          onClick={() => setActiveSignal(null)}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <span className="text-xs text-gray-500">
          {showAll
            ? `Все отзывы: ${pluralReviews(totalReviews)}`
            : `По сигналу: ${pluralReviews(signal.weight)}`}
        </span>
        <button
          onClick={onToggleShowAll}
          className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
            showAll
              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {showAll ? 'Только сигнал' : 'Все отзывы'}
        </button>
      </div>
    </div>
  )
}
