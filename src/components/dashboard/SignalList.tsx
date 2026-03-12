import { SignalRow } from './SignalRow'
import type { StageData } from '../../types'

interface SignalListProps {
  stage: StageData
}

export function SignalList({ stage }: SignalListProps) {
  const signals = stage.signals
  const maxWeight = signals[0]?.weight ?? 1

  if (signals.length === 0) {
    return (
      <div className="text-sm text-gray-400 py-4">
        Нет сигналов для этого этапа
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Сигналы
        </h2>
        <span className="text-xs text-gray-400">{signals.length} сигналов</span>
      </div>
      <div className="flex flex-col gap-1">
        {signals.map((signal) => (
          <SignalRow key={signal.signal} signal={signal} maxWeight={maxWeight} />
        ))}
      </div>
    </div>
  )
}
