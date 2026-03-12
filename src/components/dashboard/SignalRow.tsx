import { WeightBar } from '../shared/WeightBar'
import { SentimentBadge } from '../shared/SentimentBadge'
import type { SignalData } from '../../types'
import { useDashboardStore } from '../../stores/dashboardStore'

interface SignalRowProps {
  signal: SignalData
  maxWeight: number
}

function pluralReviews(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} отзыва`
  return `${n} отзывов`
}

export function SignalRow({ signal, maxWeight }: SignalRowProps) {
  const { activeSignal, setActiveSignal } = useDashboardStore()
  const isActive = activeSignal?.signal === signal.signal
  const barValue = maxWeight > 0 ? (signal.weight / maxWeight) * 100 : 0

  return (
    <button
      onClick={() => setActiveSignal(isActive ? null : signal)}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors group ${
        isActive
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-50 border border-transparent'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <SentimentBadge sentiment={signal.dominantSentiment} />
        <span
          className={`flex-1 text-sm font-medium leading-snug ${
            isActive ? 'text-blue-700' : 'text-gray-800'
          }`}
          title={signal.signal}
        >
          {signal.signal}
        </span>
        <span className="text-xs text-gray-400 flex-shrink-0">
          {pluralReviews(signal.weight)}
        </span>
      </div>
      <WeightBar value={barValue} sentiment={signal.dominantSentiment} />
    </button>
  )
}
