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
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
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
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p className="text-sm">Нет данных</p>
      </div>
    )
  }

  const stageData = activeStage ? data.stageMap[activeStage] : null

  return (
    <div className="flex flex-col h-full">
      <StageTabBar />

      {stageData ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            <MetricsRow stage={stageData} />
            <AspectSentimentBar stage={stageData} />
            <div className="border-t border-gray-100" />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <SignalList stage={stageData} />
              </div>
              <div>
                <SummaryPanel stage={stageData} />
              </div>
            </div>
          </div>

          {/* Review drawer */}
          <ReviewDrawer stage={stageData} />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">Выберите этап</p>
        </div>
      )}
    </div>
  )
}
