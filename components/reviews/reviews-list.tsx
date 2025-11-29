"use client"

import { Star, Trash2, Edit2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export interface Review {
  id: number
  author: string
  authorId?: string
  avatar?: string
  rating: number
  comment: string
  date: string
  helpful?: number
  isOwn?: boolean
  clarity?: number
  methodology?: number
  difficulty?: number
  punctuality?: number
}

interface ReviewsListProps {
  reviews: Review[]
  onDelete?: (id: number) => void
  onEdit?: (review: Review) => void
  type?: "repository" | "forum"
}

export function ReviewsList({ reviews, onDelete, onEdit, type = "repository" }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No hay reseñas aún. ¡Sé el primero en dejar una!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-card border-border p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {review.avatar && (
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author}
                  className="w-10 h-10 rounded-full bg-muted"
                />
              )}
              <div>
                <p className="font-medium text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>

            {/* Actions */}
            {review.isOwn && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(review)}
                  className="p-2 hover:bg-muted rounded transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => onDelete?.(review.id)}
                  className="p-2 hover:bg-red-500/10 rounded transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Main Rating */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">{review.rating}.0</span>
          </div>

          {/* Detailed Ratings for Forums */}
          {type === "forum" && review.clarity !== undefined && (
            <div className="mb-3 p-3 bg-muted/50 rounded text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Claridad:</span>
                <span className="font-medium text-foreground">{review.clarity}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Metodología:</span>
                <span className="font-medium text-foreground">{review.methodology}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dificultad:</span>
                <span className="font-medium text-foreground">{review.difficulty}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Puntualidad:</span>
                <span className="font-medium text-foreground">{review.punctuality}/5</span>
              </div>
            </div>
          )}

          {/* Comment */}
          <p className="text-sm text-foreground leading-relaxed mb-3">{review.comment}</p>

          {/* Footer */}
          {review.helpful !== undefined && (
            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                ✓ Útil ({review.helpful})
              </button>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
