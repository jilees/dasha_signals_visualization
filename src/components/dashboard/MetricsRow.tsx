import type { StageData } from '../../types'

interface MetricsRowProps {
  stage: StageData
}

export function MetricsRow({ stage }: MetricsRowProps) {
  const total = stage.uniqueReviews
  const posPercent = total > 0 ? Math.round((stage.posAspects / stage.totalAspects) * 100) : 0
  const negPercent = total > 0 ? Math.round((stage.negAspects / stage.totalAspects) * 100) : 0
  const neuPercent = 100 - posPercent - negPercent

  const metrics = [
    { label: 'Отзывы', value: total.toString() },
    { label: 'Позитивные', value: `${posPercent}%` },
    { label: 'Негативные', value: `${negPercent}%` },
    { label: 'Нейтральные', value: `${neuPercent}%` },
    { label: 'Аспекты', value: stage.totalAspects.toString() },
  ]

  return (
    <div className="flex gap-6">
      {metrics.map((m, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-xs text-gray-400">{m.label}</span>
          <span className="text-2xl font-semibold text-gray-800 mt-0.5">{m.value}</span>
        </div>
      ))}
    </div>
  )
}
