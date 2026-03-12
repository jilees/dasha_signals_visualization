import { useDashboardStore } from '../../stores/dashboardStore'

export function StageTabBar() {
  const { data, activeStage, setActiveStage } = useDashboardStore()
  if (!data) return null

  return (
    <nav className="flex items-end gap-0 border-b border-gray-200 overflow-x-auto flex-shrink-0 px-6">
      {data.stages.map((stageData) => {
        const isActive = stageData.stage === activeStage
        return (
          <button
            key={stageData.stage}
            onClick={() => setActiveStage(stageData.stage)}
            className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              isActive
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {stageData.stage}
            <span className={`ml-1.5 text-xs rounded-full px-1.5 py-0.5 ${
              isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {stageData.uniqueReviews}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
