import { SignalRow } from './SignalRow'
import type { StageData } from '../../types'

interface SignalListProps {
  stage: StageData
}

export function SignalList({ stage }: SignalListProps) {
  const signals = stage.signals
  const maxWeight = signals[0]?.weight ?? 1

  if (signals.length === 0) {
    return <div className="text-sm text-gray-400 py-4">Нет сигналов для этого этапа</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          ТОП сигналов
        </h2>
        <span className="text-xs text-gray-300">{signals.length}</span>
      </div>
      <div className="flex flex-col">
        {signals.map((signal, i) => (
          <SignalRow key={signal.signal} signal={signal} maxWeight={maxWeight} rank={i + 1} />
        ))}
      </div>
    </div>
  )
}
