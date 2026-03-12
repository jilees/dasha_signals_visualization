import type { Review } from '../../types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const hasPros = review.pros?.trim()
  const hasCons = review.cons?.trim()
  const hasComment = review.comment?.trim()

  if (!hasPros && !hasCons && !hasComment) return null

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 flex flex-col gap-2.5">
      {hasPros && (
        <div>
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Плюсы</span>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">{review.pros}</p>
        </div>
      )}
      {hasCons && (
        <div>
          <span className="text-xs font-semibold text-red-500 uppercase tracking-wide">Минусы</span>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">{review.cons}</p>
        </div>
      )}
      {hasComment && (
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Отзыв</span>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">{review.comment}</p>
        </div>
      )}
      <div className="text-right">
        <span className="text-[10px] text-gray-300">#{review.id}</span>
      </div>
    </div>
  )
}
