"use client"

import { useState, useEffect } from "react"
import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: ReviewData) => void
  title: string
  type: "repository" | "forum"
  initialData?: ReviewData & { id?: number }
}

export interface ReviewData {
  rating: number
  comment: string
  clarity?: number
  methodology?: number
  difficulty?: number
  punctuality?: number
}

export function ReviewModal({ isOpen, onClose, onSubmit, title, type, initialData }: ReviewModalProps) {
  const [rating, setRating] = useState(initialData?.rating || 0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(initialData?.comment || "")
  const [clarity, setClarity] = useState(initialData?.clarity || 0)
  const [methodology, setMethodology] = useState(initialData?.methodology || 0)
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || 0)
  const [punctuality, setPunctuality] = useState(initialData?.punctuality || 0)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating)
      setComment(initialData.comment)
      setClarity(initialData.clarity || 0)
      setMethodology(initialData.methodology || 0)
      setDifficulty(initialData.difficulty || 0)
      setPunctuality(initialData.punctuality || 0)
      setError("")
    }
  }, [initialData, isOpen])

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Por favor selecciona una calificación")
      return
    }

    if (comment.trim().length < 10) {
      setError("El comentario debe tener al menos 10 caracteres")
      return
    }

    setIsSubmitting(true)

    const reviewData: ReviewData = {
      rating,
      comment,
    }

    if (type === "forum") {
      reviewData.clarity = clarity
      reviewData.methodology = methodology
      reviewData.difficulty = difficulty
      reviewData.punctuality = punctuality
    }

    // Simular envío
    setTimeout(() => {
      onSubmit(reviewData)
      setRating(0)
      setComment("")
      setClarity(0)
      setMethodology(0)
      setDifficulty(0)
      setPunctuality(0)
      setError("")
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  if (!isOpen) return null

  const isEditing = !!initialData?.id

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{isEditing ? "Editar Reseña" : "Dejar una Reseña"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Calificación General</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Ratings for Forums */}
          {type === "forum" && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-3">Calificaciones Detalladas</p>

              {[
                { label: "Claridad", value: clarity, setValue: setClarity },
                { label: "Metodología", value: methodology, setValue: setMethodology },
                { label: "Dificultad", value: difficulty, setValue: setDifficulty },
                { label: "Puntualidad", value: punctuality, setValue: setPunctuality },
              ].map(({ label, value, setValue }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted-foreground">{label}</label>
                    <span className="text-xs font-medium text-foreground">{value}/5</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setValue(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= value ? "fill-blue-400 text-blue-400" : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Comentario</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tu experiencia de forma respetuosa y académica..."
              className="w-full px-4 py-3 bg-muted text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={5}
            />
            <p className="text-xs text-muted-foreground mt-2">Mínimo 10 caracteres. Sé respetuoso y académico.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Guidelines */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-600/80 font-medium mb-2">Guía de Reseñas</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Sé constructivo y específico en tus comentarios</li>
              <li>✓ Evita lenguaje ofensivo o ataques personales</li>
              <li>✓ Basa tu reseña en hechos, no en prejuicios</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Guardando..." : isEditing ? "Guardar Cambios" : "Publicar Reseña"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
