"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Share2, Lock, Users, FileText, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface MyRepository {
  id: number
  name: string
  description: string
  subject: string
  materialCount: number
  memberCount: number
  isPrivate: boolean
  createdAt: string
  tags: string[]
  lastModified: string
}

interface MyRepositoriesSectionProps {
  onSelectRepository?: (id: number) => void
}

export function MyRepositoriesSection({ onSelectRepository }: MyRepositoriesSectionProps) {
  const [repositories, setRepositories] = useState<MyRepository[]>([
    {
      id: 1,
      name: "Cálculo I - Semestre 2024-2",
      description: "Mis apuntes y soluciones de cálculo",
      subject: "Cálculo I",
      materialCount: 12,
      memberCount: 5,
      isPrivate: false,
      createdAt: "2024-09-15",
      tags: ["Matemáticas", "Parciales"],
      lastModified: "2024-11-28",
    },
    {
      id: 2,
      name: "Física II - Proyecto Final",
      description: "Repositorio para el proyecto final de física",
      subject: "Física",
      materialCount: 8,
      memberCount: 3,
      isPrivate: true,
      createdAt: "2024-10-01",
      tags: ["Física", "Proyecto"],
      lastModified: "2024-11-25",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ name: "", description: "" })

  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (repo: MyRepository) => {
    setEditingId(repo.id)
    setEditData({ name: repo.name, description: repo.description })
  }

  const handleSaveEdit = () => {
    if (editingId) {
      setRepositories(
        repositories.map((repo) =>
          repo.id === editingId ? { ...repo, name: editData.name, description: editData.description } : repo,
        ),
      )
      setEditingId(null)
    }
  }

  const handleDelete = (id: number) => {
    setRepositories(repositories.filter((repo) => repo.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Repositorios</h1>
        <p className="text-muted-foreground">Gestiona tus repositorios académicos personales</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o materia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Repositorios</p>
              <p className="text-2xl font-bold text-foreground">{repositories.length}</p>
            </div>
            <FileText className="w-8 h-8 text-primary/30" />
          </div>
        </Card>

        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Materiales Totales</p>
              <p className="text-2xl font-bold text-foreground">
                {repositories.reduce((sum, r) => sum + r.materialCount, 0)}
              </p>
            </div>
            <FileText className="w-8 h-8 text-accent/30" />
          </div>
        </Card>

        <Card className="p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Colaboradores</p>
              <p className="text-2xl font-bold text-foreground">
                {repositories.reduce((sum, r) => sum + r.memberCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary/30" />
          </div>
        </Card>
      </div>

      {/* Repositories List */}
      {filteredRepositories.length === 0 ? (
        <Card className="p-12 border border-border text-center">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No tienes repositorios que coincidan con tu búsqueda</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Crear tu primer repositorio
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRepositories.map((repo) => (
            <Card key={repo.id} className="p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                {/* Contenido principal */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3
                        className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors"
                        onClick={() => onSelectRepository?.(repo.id)}
                      >
                        {repo.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{repo.materialCount} materiales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{repo.memberCount} miembros</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Modificado: {repo.lastModified}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {repo.isPrivate && (
                      <Badge variant="outline" className="gap-1">
                        <Lock className="w-3 h-3" />
                        Privado
                      </Badge>
                    )}
                    {repo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Compartir"
                    className="hover:bg-primary/10 hover:text-primary bg-transparent"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(repo)}
                    title="Editar"
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDeletingId(repo.id)}
                    title="Eliminar"
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editingId !== null} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Repositorio</DialogTitle>
            <DialogDescription>Actualiza el nombre y descripción de tu repositorio</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nombre del Repositorio</label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Descripción</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full mt-2 p-2 border border-border rounded-md text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditingId(null)}>
              Cancelar
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar repositorio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el repositorio y todo su contenido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
