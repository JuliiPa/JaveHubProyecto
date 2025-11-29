"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { UserProfile } from "./user-profile-section"

interface EditProfileModalProps {
  user: UserProfile
  onClose: () => void
  onSave: (data: Partial<UserProfile>) => void
}

export function EditProfileModal({ user, onClose, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    interests: user.interests || [],
    coursesEnrolled: user.coursesEnrolled || [],
    newInterest: "",
    newCourse: "",
  })

  const handleAddInterest = () => {
    if (formData.newInterest.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, formData.newInterest.trim()],
        newInterest: "",
      })
    }
  }

  const handleRemoveInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index),
    })
  }

  const handleAddCourse = () => {
    if (formData.newCourse.trim()) {
      setFormData({
        ...formData,
        coursesEnrolled: [...formData.coursesEnrolled, formData.newCourse.trim()],
        newCourse: "",
      })
    }
  }

  const handleRemoveCourse = (index: number) => {
    setFormData({
      ...formData,
      coursesEnrolled: formData.coursesEnrolled.filter((_, i) => i !== index),
    })
  }

  const handleSave = () => {
    onSave({
      name: formData.name,
      bio: formData.bio,
      interests: formData.interests,
      coursesEnrolled: formData.coursesEnrolled,
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Nombre Completo</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Tu nombre completo"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Biografía</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
              placeholder="Cuéntanos sobre ti..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">{formData.bio.length}/500 caracteres</p>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Intereses Académicos</Label>
            <div className="flex gap-2">
              <Input
                value={formData.newInterest}
                onChange={(e) => setFormData({ ...formData, newInterest: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddInterest()
                  }
                }}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                placeholder="Ej: Programación, Matemáticas..."
              />
              <Button onClick={handleAddInterest} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Agregar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/30 flex items-center gap-1"
                >
                  {interest}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => handleRemoveInterest(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-2">
            <Label className="text-foreground font-semibold">Materias Cursadas</Label>
            <div className="flex gap-2">
              <Input
                value={formData.newCourse}
                onChange={(e) => setFormData({ ...formData, newCourse: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddCourse()
                  }
                }}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                placeholder="Ej: Cálculo III, Algoritmos..."
              />
              <Button onClick={handleAddCourse} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Agregar
              </Button>
            </div>
            <div className="space-y-1 mt-2">
              {formData.coursesEnrolled.map((course, index) => (
                <div key={index} className="flex justify-between items-center bg-secondary/50 rounded px-3 py-2">
                  <span className="text-sm text-foreground">{course}</span>
                  <X
                    className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveCourse(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
