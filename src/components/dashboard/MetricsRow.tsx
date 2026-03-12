import type { StageData } from '../../types'

interface MetricsRowProps {
  stage: StageData
}

export function MetricsRow({ stage }: MetricsRowProps) {
  const total = stage.uniqueReviews
  const posPercent = stage.totalAspects > 0 ? Math.round((stage.posAspects / stage.totalAspects) * 100) : 0
  const negPercent = stage.totalAspects > 0 ? Math.round((stage.negAspects / stage.totalAspects) * 100) : 0
  const neuPercent = 100 - posPercent - negPercent

  const metrics = [
    { label: 'Метрика 1', value: total.toString(), sub: 'отзывов' },
    { label: 'Метрика 2', value: `${posPercent}%`, sub: 'позитивных' },
    { label: 'Метрика 3', value: `${negPercent}%`, sub: 'негативных' },
    { label: 'Метрика 4', value: `${neuPercent}%`, sub: 'нейтральных' },
    { label: 'Метрика 5', value: stage.totalAspects.toString(), sub: 'аспектов' },
  ]

  return (
    <div>
      <p className="text-xs text-gray-400 mb-3 font-medium tracking-wide uppercase">Анализ данных</p>
      <div className="flex gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-400 font-medium">{m.label}</span>
            <span className="text-3xl font-semibold text-gray-800 leading-none tracking-tight">{m.value}</span>
            <span className="text-[11px] text-gray-400">{m.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
