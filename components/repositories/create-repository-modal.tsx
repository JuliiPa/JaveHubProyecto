"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateRepositoryModalProps {
  onClose: () => void
  onCreate: (data: {
    name: string
    description: string
    subject: string
  }) => void
}

export function CreateRepositoryModal({ onClose, onCreate }: CreateRepositoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida"
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "La materia es requerida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    // Simular delay de creación
    await new Promise((resolve) => setTimeout(resolve, 500))

    onCreate(formData)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">Crear Repositorio</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name" className="text-foreground">
              Nombre del Repositorio
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="ej: Cálculo I - Semestre 2024-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <Label htmlFor="subject" className="text-foreground">
              Materia
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="ej: Cálculo I, Programación, etc."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`mt-1 ${errors.subject ? "border-destructive" : ""}`}
            />
            {errors.subject && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <Label htmlFor="description" className="text-foreground">
              Descripción
            </Label>
            <textarea
              id="description"
              placeholder="Describe el propósito de este repositorio..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Creando..." : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
