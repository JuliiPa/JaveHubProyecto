"use client"

import { useState } from "react"
import { MessageCircle, Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewModal, type ReviewData } from "@/components/reviews/review-modal"

interface ForumCardProps {
  id: number
  title: string
  description: string
  subject: string
  author: string
  messageCount: number
  participantCount: number
  lastActivity: string
  tags?: string[]
  rating?: number
  reviewCount?: number
}

export function ForumCard({
  id,
  title,
  description,
  subject,
  author,
  messageCount,
  participantCount,
  lastActivity,
  tags,
  rating = 0,
  reviewCount = 0,
}: ForumCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false)

  const handleReviewSubmit = (review: ReviewData) => {
    console.log("[v0] Nueva reseña para foro:", { id, review })
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground text-lg line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{subject}</span>
              <span className="text-xs text-muted-foreground">por {author}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

          {tags && tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rating Section */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground">
              {rating > 0 ? `${rating.toFixed(1)}` : "Sin reseñas"} ({reviewCount})
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border flex-wrap gap-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{messageCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{participantCount}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{lastActivity}</span>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setShowReviewModal(true)}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted gap-2"
          >
            <Star className="w-4 h-4" />
            Dejar Reseña
          </Button>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        title={title}
        type="forum"
      />
    </>
  )
}
