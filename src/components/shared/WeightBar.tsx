interface WeightBarProps {
  value: number // 0–100 percentage of max
  sentiment: -1 | 0 | 1
  height?: string
}

const sentimentColor: Record<number, string> = {
  1: 'bg-blue-500',
  '-1': 'bg-red-400',
  0: 'bg-gray-400',
}

export function WeightBar({ value, sentiment, height = 'h-2' }: WeightBarProps) {
  const color = sentimentColor[sentiment] ?? 'bg-gray-400'
  return (
    <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-300`}
        style={{ width: `${Math.max(2, value)}%` }}
      />
    </div>
  )
}
