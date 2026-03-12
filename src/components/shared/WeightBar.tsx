interface WeightBarProps {
  value: number // 0–100 percentage of max
  sentiment: -1 | 0 | 1
}

const sentimentColor: Record<number, string> = {
  1: 'bg-blue-400',
  '-1': 'bg-red-400',
  0: 'bg-gray-300',
}

export function WeightBar({ value, sentiment }: WeightBarProps) {
  const color = sentimentColor[sentiment] ?? 'bg-gray-300'
  return (
    <div className="w-full bg-gray-100 rounded-full overflow-hidden h-1.5">
      <div
        className={`${color} h-1.5 rounded-full transition-all duration-300`}
        style={{ width: `${Math.max(2, value)}%` }}
      />
    </div>
  )
}
