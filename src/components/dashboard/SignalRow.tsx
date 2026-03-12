import { WeightBar } from '../shared/WeightBar'
import { SentimentBadge } from '../shared/SentimentBadge'
import type { SignalData } from '../../types'
import { useDashboardStore } from '../../stores/dashboardStore'

interface SignalRowProps {
  signal: SignalData
  maxWeight: number
  rank: number
}

export function SignalRow({ signal, maxWeight, rank }: SignalRowProps) {
  const { activeSignal, setActiveSignal } = useDashboardStore()
  const isActive = activeSignal?.signal === signal.signal
  const barValue = maxWeight > 0 ? (signal.weight / maxWeight) * 100 : 0

  return (
    <button
      onClick={() => setActiveSignal(isActive ? null : signal)}
      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-50'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="text-[11px] text-gray-300 font-medium w-4 flex-shrink-0 text-right">{rank}</span>
        <SentimentBadge sentiment={signal.dominantSentiment} />
        <span
          className={`flex-1 text-sm leading-snug ${
            isActive ? 'text-blue-700 font-medium' : 'text-gray-700'
          }`}
          title={signal.signal}
        >
          {signal.signal}
        </span>
        <span className="text-xs text-gray-400 font-medium flex-shrink-0 tabular-nums">
          {signal.weight}
        </span>
      </div>
      <div className="pl-[26px]">
        <WeightBar value={barValue} sentiment={signal.dominantSentiment} />
      </div>
    </button>
  )
}
