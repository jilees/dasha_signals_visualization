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
    <div className="flex items-center gap-6">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Аспекты {stage.totalAspects.toLocaleString('ru')}
          </span>
          <span className="text-xs text-gray-400">
            На основе {stage.uniqueReviews} отзывов
          </span>
        </div>
        <div className="flex h-1.5 rounded-full overflow-hidden w-64 bg-gray-100">
          {negPct > 0 && (
            <div className="bg-red-400" style={{ width: `${negPct}%` }} title={`Негативные: ${negPct}%`} />
          )}
          {neuPct > 0 && (
            <div className="bg-gray-300" style={{ width: `${neuPct}%` }} title={`Нейтральные: ${neuPct}%`} />
          )}
          {posPct > 0 && (
            <div className="bg-blue-400" style={{ width: `${posPct}%` }} title={`Позитивные: ${posPct}%`} />
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />{negPct}%
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />{neuPct}%
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />{posPct}%
        </span>
      </div>
    </div>
  )
}
