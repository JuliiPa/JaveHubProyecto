"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle, Users, Clock, Tag, Reply, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReviewModal, type ReviewData } from "@/components/reviews/review-modal"
import { useReviews } from "@/contexts/reviews-context"

interface Forum {
  id: number
  title: string
  description: string
  subject: string
  author: string
  messageCount: number
  participantCount: number
  lastActivity: string
  category: string
  tags?: string[]
}

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
  replies: Comment[]
}

interface ForumDetailViewProps {
  forumId: number
  forum: Forum
  onBack: () => void
}

export function ForumDetailView({ forumId, forum, onBack }: ForumDetailViewProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Juan García",
      content: "Excelente pregunta. La solución es aplicar la regla de la cadena correctamente.",
      timestamp: "Hace 2 horas",
      replies: [
        {
          id: 2,
          author: "María López",
          content: "Gracias Juan, me ayudó mucho tu explicación.",
          timestamp: "Hace 1 hora",
          replies: [],
        },
      ],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [showReviewModal, setShowReviewModal] = useState(false)
  const { addReview } = useReviews()

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: comments.length + 1,
      author: "Tu Nombre",
      content: newComment,
      timestamp: "Ahora",
      replies: [],
    }

    setComments([...comments, comment])
    setNewComment("")
    console.log("[v0] Comentario agregado al foro:", comment)
  }

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((c) => c.id !== commentId))
    console.log("[v0] Comentario eliminado:", commentId)
  }

  const handleReviewSubmit = (review: ReviewData) => {
    console.log("[v0] Reseña guardada para foro:", { forumId, review })
    addReview({
      id: Date.now(),
      type: "forum",
      targetId: forumId,
      targetName: forum.title,
      rating: review.rating,
      comment: review.comment,
      author: "Tu Nombre",
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <div className="w-full">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="outline"
        className="mb-6 border-border text-foreground hover:bg-muted gap-2 bg-transparent"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Foros
      </Button>

      {/* Forum Header */}
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{forum.title}</h1>
              <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground">
                <span>
                  por <span className="font-semibold text-foreground">{forum.author}</span>
                </span>
                <span>•</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{forum.subject}</span>
                <span>•</span>
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full">{forum.category}</span>
              </div>
            </div>

            <p className="text-base text-muted-foreground">{forum.description}</p>

            {forum.tags && forum.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {forum.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="flex gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-semibold text-foreground">{forum.messageCount}</span> mensajes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-semibold text-foreground">{forum.participantCount}</span> participantes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  Última actividad: <span className="font-semibold text-foreground">{forum.lastActivity}</span>
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Leave Review Button */}
      <div className="mb-8">
        <Button
          onClick={() => setShowReviewModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          Dejar Reseña
        </Button>
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Comentarios ({comments.length})</h2>

        {/* New Comment Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario aquí..."
                className="w-full min-h-24 p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleAddComment}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-end"
                disabled={!newComment.trim()}
              >
                <Reply className="w-4 h-4" />
                Publicar Comentario
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Aún no hay comentarios. Sé el primero en comentar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        title={forum.title}
        type="forum"
      />
    </div>
  )
}
