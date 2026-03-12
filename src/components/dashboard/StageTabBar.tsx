import { useDashboardStore } from '../../stores/dashboardStore'

const STAGE_COLORS = [
  { active: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
  { active: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  { active: 'bg-violet-100 text-violet-700', dot: 'bg-violet-400' },
  { active: 'bg-teal-100 text-teal-700', dot: 'bg-teal-400' },
  { active: 'bg-pink-100 text-pink-700', dot: 'bg-pink-400' },
  { active: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  { active: 'bg-cyan-100 text-cyan-700', dot: 'bg-cyan-400' },
  { active: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-400' },
  { active: 'bg-rose-100 text-rose-700', dot: 'bg-rose-400' },
  { active: 'bg-lime-100 text-lime-700', dot: 'bg-lime-400' },
]

export function StageTabBar() {
  const { data, activeStage, setActiveStage } = useDashboardStore()
  if (!data) return null

  return (
    <nav className="flex items-center gap-1.5 border-b border-gray-100 overflow-x-auto flex-shrink-0 px-5 py-2.5">
      {data.stages.map((stageData, i) => {
        const isActive = stageData.stage === activeStage
        const color = STAGE_COLORS[i % STAGE_COLORS.length]
        return (
          <button
            key={stageData.stage}
            onClick={() => setActiveStage(stageData.stage)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              isActive
                ? `${color.active} shadow-sm`
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? color.dot : 'bg-gray-300'}`} />
            {stageData.stage}
          </button>
        )
      })}
    </nav>
  )
}
