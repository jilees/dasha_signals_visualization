import { useEffect, useState } from 'react'
import { useDashboardStore } from '../../stores/dashboardStore'
import { DrawerHeader } from './DrawerHeader'
import { ReviewCard } from './ReviewCard'
import type { StageData } from '../../types'

interface ReviewDrawerProps {
  stage: StageData
}

export function ReviewDrawer({ stage }: ReviewDrawerProps) {
  const { activeSignal } = useDashboardStore()
  const [showAll, setShowAll] = useState(false)

  // Reset showAll when signal changes
  useEffect(() => {
    setShowAll(false)
  }, [activeSignal?.signal])

  const isOpen = activeSignal !== null

  // Collect all unique reviews for the stage
  const allStageReviews = (() => {
    if (!showAll) return []
    const seen = new Set<string>()
    const reviews = []
    for (const signal of stage.signals) {
      for (const review of signal.reviews) {
        if (!seen.has(review.id)) {
          seen.add(review.id)
          reviews.push(review)
        }
      }
    }
    return reviews
  })()

  const reviews = showAll ? allStageReviews : (activeSignal?.reviews ?? [])

  return (
    <div
      className={`flex-shrink-0 border-l border-gray-200 bg-gray-50 flex flex-col transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-[460px]' : 'w-0'
      }`}
    >
      {isOpen && activeSignal && (
        <>
          <DrawerHeader
            signal={activeSignal}
            showAll={showAll}
            totalReviews={allStageReviews.length || stage.uniqueReviews}
            onToggleShowAll={() => setShowAll((v) => !v)}
          />
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Нет отзывов</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
