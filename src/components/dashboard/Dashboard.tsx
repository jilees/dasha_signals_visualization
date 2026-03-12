import { useEffect } from 'react'
import { useDashboardStore } from '../../stores/dashboardStore'
import { StageTabBar } from './StageTabBar'
import { MetricsRow } from './MetricsRow'
import { AspectSentimentBar } from './AspectSentimentBar'
import { SignalList } from './SignalList'
import { SummaryPanel } from './SummaryPanel'
import { ReviewDrawer } from '../drawer/ReviewDrawer'

export function Dashboard() {
  const { data, activeStage, setActiveStage, isLoading, error } = useDashboardStore()

  useEffect(() => {
    if (data && !activeStage && data.stages.length > 0) {
      setActiveStage(data.stages[0].stage)
    }
  }, [data, activeStage, setActiveStage])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-sm">
          <p className="text-red-500 font-medium mb-2">Ошибка загрузки</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-300">
        <p className="text-sm">Нет данных</p>
      </div>
    )
  }

  const stageData = activeStage ? data.stageMap[activeStage] : null

  return (
    <div className="flex flex-col h-full bg-white">
      <StageTabBar />

      {stageData ? (
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
            <MetricsRow stage={stageData} />
            <div className="h-px bg-gray-100" />
            <AspectSentimentBar stage={stageData} />
            <div className="h-px bg-gray-100" />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <SignalList stage={stageData} />
              </div>
              <div className="border-l border-gray-100 pl-6">
                <SummaryPanel stage={stageData} />
              </div>
            </div>
          </div>

          <ReviewDrawer stage={stageData} />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-300">
          <p className="text-sm">Выберите этап</p>
        </div>
      )}
    </div>
  )
}
