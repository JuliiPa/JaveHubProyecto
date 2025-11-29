"use client"

import { useState } from "react"
import { BookOpen, Users, FileText, Calendar, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ReviewModal, type ReviewData } from "@/components/reviews/review-modal"

interface RepositoryCardProps {
  id: number
  name: string
  description: string
  subject: string
  owner: string
  materialCount: number
  memberCount: number
  createdAt: string
  tags: string[]
  rating?: number
  reviewCount?: number
  onViewRepository?: (id: number) => void
}

export function RepositoryCard({
  id,
  name,
  description,
  subject,
  owner,
  materialCount,
  memberCount,
  createdAt,
  tags,
  rating = 0,
  reviewCount = 0,
  onViewRepository,
}: RepositoryCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false)

  const handleReviewSubmit = (review: ReviewData) => {
    console.log("[v0] Nueva reseña para repositorio:", { id, review })
  }

  return (
    <>
      <Card className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">{name}</h3>
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        {/* Subject Badge */}
        <div className="mb-4">
          <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground">
            {subject}
          </Badge>
        </div>

        {/* Owner Info */}
        <div className="mb-4 pb-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Creado por <span className="font-medium text-foreground">{owner}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Materiales</p>
              <p className="text-sm font-semibold text-foreground">{materialCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Miembros</p>
              <p className="text-sm font-semibold text-foreground">{memberCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Creado</p>
              <p className="text-sm font-semibold text-foreground">
                {new Date(createdAt).toLocaleDateString("es-CO", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Rating Section */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {rating > 0 ? `${rating.toFixed(1)}` : "Sin reseñas"} ({reviewCount})
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onViewRepository?.(id)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Ver Repositorio
          </Button>
          <Button
            onClick={() => setShowReviewModal(true)}
            variant="outline"
            className="flex-1 border-border text-foreground hover:bg-muted"
          >
            <Star className="w-4 h-4 mr-2" />
            Reseña
          </Button>
        </div>
      </Card>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        title={name}
        type="repository"
      />
    </>
  )
}
