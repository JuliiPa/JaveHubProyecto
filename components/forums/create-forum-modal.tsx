"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface CreateForumModalProps {
  onClose: () => void
  onCreate: (data: {
    title: string
    description: string
    subject: string
    category: string
  }) => void
}

const SUBJECTS = [
  "Cálculo I",
  "Cálculo II",
  "Álgebra Lineal",
  "Programación",
  "POO",
  "Física",
  "Química",
  "Termodinámica",
  "Base de Datos",
  "Arquitectura de Software",
]

const CATEGORIES = ["General", "Duda de Clase", "Proyecto", "Examen", "Recursos", "Otro"]

export function CreateForumModal({ onClose, onCreate }: CreateForumModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: SUBJECTS[0],
    category: CATEGORIES[0],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio"
    } else if (formData.title.length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria"
    } else if (formData.description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onCreate(formData)
    setFormData({
      title: "",
      description: "",
      subject: SUBJECTS[0],
      category: CATEGORIES[0],
    })
    setErrors({})
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Crear Nuevo Foro</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors" aria-label="Cerrar">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Título del Foro</label>
            <Input
              type="text"
              placeholder="Ej: Dudas sobre derivadas..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Descripción</label>
            <textarea
              placeholder="Describe el tema del foro..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24 ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Materia</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Crear Foro
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
