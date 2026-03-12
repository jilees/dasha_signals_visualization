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
    <div className="rounded-xl border border-gray-100 bg-white p-4 flex flex-col gap-3 shadow-sm">
      {hasComment && (
        <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
      )}
      {(hasPros || hasCons) && (
        <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
          {hasPros && (
            <div className="flex gap-2">
              <span className="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
              <p className="text-xs text-gray-500 leading-relaxed">{review.pros}</p>
            </div>
          )}
          {hasCons && (
            <div className="flex gap-2">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
              <p className="text-xs text-gray-500 leading-relaxed">{review.cons}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
