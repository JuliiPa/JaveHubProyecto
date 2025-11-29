"use client"

import { useState } from "react"
import {
  ChevronLeft,
  FileText,
  Users,
  Star,
  Download,
  Share2,
  MoreVertical,
  Folder,
  Plus,
  Search,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ReviewModal, type ReviewData } from "@/components/reviews/review-modal"
import { ReviewsList } from "@/components/reviews/reviews-list"
import type { RepositoryDetail } from "@/components/models/repository"
import { useReviews } from "@/contexts/reviews-context"

interface RepositoryDetailViewProps {
  repositoryId: number
  onBack: () => void
}

const mockRepositoryDetail: RepositoryDetail = {
  id: 1,
  name: "Cálculo I - Semestre 2024-2",
  description: "Repositorio colaborativo con apuntes, parciales y soluciones de Cálculo I",
  subject: "Cálculo I",
  owner: "María García",
  ownerId: "user_1",
  materialCount: 24,
  memberCount: 18,
  createdAt: "2024-09-15",
  updatedAt: "2024-09-28",
  tags: ["Matemáticas", "Parciales", "Estudios"],
  isPublic: true,
  accessLevel: "viewer",
  materials: [
    {
      id: 1,
      name: "Apuntes Clase 1 - Límites",
      type: "pdf",
      size: 2.5,
      uploadedAt: "2024-09-15",
      uploadedBy: "María García",
      downloads: 156,
      folderId: 1,
      description: "Introducción a límites y continuidad",
    },
    {
      id: 2,
      name: "Primer Parcial 2024-2",
      type: "pdf",
      size: 1.8,
      uploadedAt: "2024-09-20",
      uploadedBy: "Prof. López",
      downloads: 89,
      folderId: 2,
      description: "Examen del primer parcial con soluciones",
    },
    {
      id: 3,
      name: "Taller Derivadas",
      type: "docx",
      size: 0.8,
      uploadedAt: "2024-09-22",
      uploadedBy: "Carlos López",
      downloads: 45,
      folderId: 3,
      description: "Ejercicios propuestos sobre derivadas",
    },
  ],
  folders: [
    { id: 1, name: "Apuntes de Clase", createdAt: "2024-09-15", materialCount: 8 },
    { id: 2, name: "Parciales y Exámenes", createdAt: "2024-09-15", materialCount: 5 },
    { id: 3, name: "Talleres", createdAt: "2024-09-15", materialCount: 6 },
    { id: 4, name: "Proyectos", createdAt: "2024-09-15", materialCount: 5 },
  ],
  collaborators: [
    {
      id: "user_1",
      name: "María García",
      email: "maria.garcia@javeriana.edu.co",
      role: "owner",
      joinedAt: "2024-09-15",
    },
    {
      id: "user_2",
      name: "Carlos López",
      email: "carlos.lopez@javeriana.edu.co",
      role: "collaborator",
      joinedAt: "2024-09-16",
    },
    {
      id: "user_3",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@javeriana.edu.co",
      role: "collaborator",
      joinedAt: "2024-09-17",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "Juan Pérez",
      authorId: "user_4",
      rating: 5,
      comment: "Excelente repositorio, muy bien organizado y con mucho material útil.",
      date: "2024-09-25",
      helpful: 12,
      isOwn: false,
    },
    {
      id: 2,
      author: "Laura Martínez",
      authorId: "user_5",
      rating: 4,
      comment: "Muy bueno, solo le faltaría más material de ejercicios resueltos.",
      date: "2024-09-24",
      helpful: 8,
      isOwn: false,
    },
  ],
}

export function RepositoryDetailView({ repositoryId, onBack }: RepositoryDetailViewProps) {
  const [activeTab, setActiveTab] = useState("materiales")
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [searchMaterials, setSearchMaterials] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<number[]>([1])
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const { getReviewsByTarget, addReview, updateReview, deleteReview } = useReviews()

  const contextReviews = getReviewsByTarget(repositoryId, "repository")

  const handleReviewSubmit = (review: ReviewData) => {
    if (editingReviewId) {
      updateReview(editingReviewId, {
        rating: review.rating,
        comment: review.comment,
        clarity: review.clarity,
        methodology: review.methodology,
        difficulty: review.difficulty,
        punctuality: review.punctuality,
      })
      setEditingReviewId(null)
      console.log("[v0] Reseña actualizada en contexto:", editingReviewId)
    } else {
      addReview({
        type: "repository",
        targetId: repositoryId,
        targetName: mockRepositoryDetail.name,
        rating: review.rating,
        comment: review.comment,
        clarity: review.clarity,
        methodology: review.methodology,
        difficulty: review.difficulty,
        punctuality: review.punctuality,
        author: "Usuario Actual",
      })
      console.log("[v0] Nueva reseña guardada en contexto")
    }
    setShowReviewModal(false)
  }

  const handleEditReview = (reviewId: string) => {
    setEditingReviewId(reviewId)
    setShowReviewModal(true)
  }

  const handleDeleteReview = (id: string) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteReview(deleteConfirm)
      setDeleteConfirm(null)
      console.log("[v0] Reseña eliminada del contexto:", deleteConfirm)
    }
  }

  const filteredMaterials = mockRepositoryDetail.materials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchMaterials.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchMaterials.toLowerCase()),
  )

  const getFileIcon = (type: string) => {
    const iconClass = "w-5 h-5"
    switch (type) {
      case "pdf":
        return <FileText className={`${iconClass} text-red-500`} />
      case "docx":
        return <FileText className={`${iconClass} text-blue-500`} />
      case "pptx":
        return <FileText className={`${iconClass} text-orange-500`} />
      case "zip":
        return <FileText className={`${iconClass} text-purple-500`} />
      default:
        return <FileText className={`${iconClass} text-gray-500`} />
    }
  }

  const rating =
    contextReviews.length > 0 ? contextReviews.reduce((sum, r) => sum + r.rating, 0) / contextReviews.length : 0

  return (
    <div className="w-full">
      <div className="mb-8">
        <Button onClick={onBack} variant="ghost" className="mb-4 text-primary hover:text-primary/90 gap-2 pl-0">
          <ChevronLeft className="w-5 h-5" />
          Volver
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Folder className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">{mockRepositoryDetail.name}</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">{mockRepositoryDetail.description}</p>

            <div className="flex gap-2 mb-4 flex-wrap">
              {mockRepositoryDetail.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-secondary/50">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Creado por: {mockRepositoryDetail.owner}</span>
              <span>•</span>
              <span>
                {new Date(mockRepositoryDetail.createdAt).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-col">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
            <Button variant="outline" className="border-border gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card border-border p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Materiales</p>
              <p className="text-2xl font-bold text-foreground">{mockRepositoryDetail.materialCount}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Colaboradores</p>
              <p className="text-2xl font-bold text-foreground">{mockRepositoryDetail.memberCount}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm text-muted-foreground">Calificación</p>
              <p className="text-2xl font-bold text-foreground">{rating.toFixed(1)}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-card border-border p-4">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Descargas</p>
              <p className="text-2xl font-bold text-foreground">
                {mockRepositoryDetail.materials.reduce((sum, m) => sum + m.downloads, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="w-full">
        <div className="flex gap-4 border-b border-border mb-6">
          <Button
            onClick={() => setActiveTab("materiales")}
            variant={activeTab === "materiales" ? "default" : "ghost"}
            className={
              activeTab === "materiales"
                ? "bg-primary text-primary-foreground border-b-2 border-primary rounded-none"
                : "text-muted-foreground hover:text-foreground rounded-none border-b-2 border-transparent"
            }
          >
            Materiales
          </Button>
          <Button
            onClick={() => setActiveTab("colaboradores")}
            variant={activeTab === "colaboradores" ? "default" : "ghost"}
            className={
              activeTab === "colaboradores"
                ? "bg-primary text-primary-foreground border-b-2 border-primary rounded-none"
                : "text-muted-foreground hover:text-foreground rounded-none border-b-2 border-transparent"
            }
          >
            Colaboradores
          </Button>
          <Button
            onClick={() => setActiveTab("resenas")}
            variant={activeTab === "resenas" ? "default" : "ghost"}
            className={
              activeTab === "resenas"
                ? "bg-primary text-primary-foreground border-b-2 border-primary rounded-none"
                : "text-muted-foreground hover:text-foreground rounded-none border-b-2 border-transparent"
            }
          >
            Reseñas ({contextReviews.length})
          </Button>
        </div>

        {activeTab === "materiales" && (
          <div>
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar materiales..."
                    value={searchMaterials}
                    onChange={(e) => setSearchMaterials(e.target.value)}
                    className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Material
                </Button>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {mockRepositoryDetail.folders.map((folder) => (
                <Card key={folder.id} className="bg-card border-border overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedFolders((prev) =>
                        prev.includes(folder.id) ? prev.filter((id) => id !== folder.id) : [...prev, folder.id],
                      )
                    }
                    className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{folder.name}</p>
                        <p className="text-xs text-muted-foreground">{folder.materialCount} materiales</p>
                      </div>
                    </div>
                    <ChevronLeft
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedFolders.includes(folder.id) ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedFolders.includes(folder.id) && (
                    <div className="border-t border-border bg-background/50">
                      {filteredMaterials
                        .filter((m) => m.folderId === folder.id)
                        .map((material) => (
                          <div
                            key={material.id}
                            className="p-4 border-b border-border last:border-0 flex items-center justify-between hover:bg-muted/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {getFileIcon(material.type)}
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate">{material.name}</p>
                                {material.description && (
                                  <p className="text-sm text-muted-foreground truncate">{material.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  Subido por {material.uploadedBy} el{" "}
                                  {new Date(material.uploadedAt).toLocaleDateString("es-CO")} • {material.size} MB
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                              <div className="text-right">
                                <p className="text-sm font-semibold text-foreground">{material.downloads}</p>
                                <p className="text-xs text-muted-foreground">descargas</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      {filteredMaterials.filter((m) => m.folderId === folder.id).length === 0 && (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground">No hay materiales en esta carpeta</p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredMaterials.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No se encontraron materiales</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "colaboradores" && (
          <div>
            <div className="space-y-3">
              {mockRepositoryDetail.collaborators.map((collaborator) => (
                <Card key={collaborator.id} className="bg-card border-border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {collaborator.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{collaborator.name}</p>
                      <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={collaborator.role === "owner" ? "default" : "secondary"}
                      className={
                        collaborator.role === "owner"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-secondary-foreground"
                      }
                    >
                      {collaborator.role === "owner" ? "Propietario" : "Colaborador"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resenas" && (
          <div>
            {deleteConfirm && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-500 mb-3">¿Eliminar esta reseña?</p>
                  <div className="flex gap-2">
                    <Button onClick={confirmDelete} size="sm" className="bg-red-500 text-white hover:bg-red-600">
                      Eliminar
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      size="sm"
                      variant="outline"
                      className="border-border"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <ReviewsList
              reviews={contextReviews.map((r) => ({
                id: r.id,
                author: r.author,
                authorId: r.author,
                rating: r.rating,
                comment: r.comment,
                date: r.createdAt,
                helpful: 0,
                isOwn: true,
                clarity: r.clarity,
                methodology: r.methodology,
                difficulty: r.difficulty,
                punctuality: r.punctuality,
              }))}
              onEdit={(review) => {
                setEditingReviewId(review.id.toString())
                setShowReviewModal(true)
              }}
              onDelete={handleDeleteReview}
              onAddReview={() => setShowReviewModal(true)}
            />

            <ReviewModal
              isOpen={showReviewModal}
              onClose={() => {
                setShowReviewModal(false)
                setEditingReviewId(null)
              }}
              onSubmit={handleReviewSubmit}
              title={mockRepositoryDetail.name}
              type="repository"
              initialData={
                editingReviewId
                  ? {
                      id: Number.parseInt(editingReviewId),
                      ...contextReviews.find((r) => r.id === editingReviewId)!,
                    }
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
