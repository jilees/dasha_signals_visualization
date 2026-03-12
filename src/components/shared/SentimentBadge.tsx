interface SentimentBadgeProps {
  sentiment: -1 | 0 | 1
  size?: 'sm' | 'md'
}

const config: Record<number, { color: string; label: string }> = {
  1: { color: 'bg-blue-400', label: 'позитивный' },
  '-1': { color: 'bg-red-400', label: 'негативный' },
  0: { color: 'bg-gray-300', label: 'нейтральный' },
}

export function SentimentBadge({ sentiment, size = 'sm' }: SentimentBadgeProps) {
  const c = config[sentiment] ?? config[0]
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${c.color} ${sizeClass}`}
      title={c.label}
    />
  )
}
