import type { StageData } from '../../types'

interface AspectSentimentBarProps {
  stage: StageData
}

export function AspectSentimentBar({ stage }: AspectSentimentBarProps) {
  const total = stage.totalAspects || 1
  const negPct = Math.round((stage.negAspects / total) * 100)
  const posPct = Math.round((stage.posAspects / total) * 100)
  const neuPct = 100 - negPct - posPct

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-sm font-medium text-gray-700">
          Аспекты {stage.totalAspects.toLocaleString('ru')}
        </span>
        <span className="text-xs text-gray-400">
          На основе {stage.uniqueReviews} отзывов
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        {negPct > 0 && (
          <div className="bg-red-400 rounded-l-full" style={{ width: `${negPct}%` }} title={`Негативные: ${negPct}%`} />
        )}
        {neuPct > 0 && (
          <div className="bg-gray-300" style={{ width: `${neuPct}%` }} title={`Нейтральные: ${neuPct}%`} />
        )}
        {posPct > 0 && (
          <div className="bg-blue-400 rounded-r-full" style={{ width: `${posPct}%` }} title={`Позитивные: ${posPct}%`} />
        )}
      </div>
      <div className="flex gap-4 mt-1">
        <span className="text-xs text-red-400">{negPct}% негативные</span>
        <span className="text-xs text-gray-400">{neuPct}% нейтральные</span>
        <span className="text-xs text-blue-400">{posPct}% позитивные</span>
      </div>
    </div>
  )
}
