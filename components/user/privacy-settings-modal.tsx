"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PrivacySettingsModalProps {
  onClose: () => void
}

export function PrivacySettingsModal({ onClose }: PrivacySettingsModalProps) {
  const [settings, setSettings] = useState({
    showPhoto: true,
    showProgram: true,
    showRepositoryHistory: true,
    allowDirectMessages: true,
    showActivity: true,
    showReviews: true,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const handleSave = () => {
    console.log("[v0] Configuración de privacidad guardada:", settings)
    onClose()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Configuración de Privacidad</DialogTitle>
        </DialogHeader>

        <Alert className="bg-accent/10 border-accent/30 mb-6">
          <AlertCircle className="h-4 w-4 text-accent" />
          <AlertDescription className="text-accent">
            Controla quién puede ver tu información y actividad en JaveHub
          </AlertDescription>
        </Alert>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
          {/* Perfil */}
          <Card className="bg-secondary/50 border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Información de Perfil</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Mostrar Foto de Perfil</Label>
                  <p className="text-xs text-muted-foreground mt-1">Permite que otros usuarios vean tu foto</p>
                </div>
                <Switch
                  checked={settings.showPhoto}
                  onCheckedChange={() => handleToggle("showPhoto")}
                  className="ml-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Mostrar Programa Académico</Label>
                  <p className="text-xs text-muted-foreground mt-1">Permite que otros vean tu carrera y semestre</p>
                </div>
                <Switch
                  checked={settings.showProgram}
                  onCheckedChange={() => handleToggle("showProgram")}
                  className="ml-4"
                />
              </div>
            </div>
          </Card>

          {/* Actividad */}
          <Card className="bg-secondary/50 border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Actividad</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Mostrar Historial de Repositorios</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Permite que otros vean los repositorios que has creado
                  </p>
                </div>
                <Switch
                  checked={settings.showRepositoryHistory}
                  onCheckedChange={() => handleToggle("showRepositoryHistory")}
                  className="ml-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Mostrar Actividad General</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Permite que otros vean tu actividad en foros y comentarios
                  </p>
                </div>
                <Switch
                  checked={settings.showActivity}
                  onCheckedChange={() => handleToggle("showActivity")}
                  className="ml-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Mostrar Reseñas Publicadas</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Permite que otros vean las reseñas de profesores que has escrito
                  </p>
                </div>
                <Switch
                  checked={settings.showReviews}
                  onCheckedChange={() => handleToggle("showReviews")}
                  className="ml-4"
                />
              </div>
            </div>
          </Card>

          {/* Mensajería */}
          <Card className="bg-secondary/50 border-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Mensajería</h3>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Permitir Mensajes Directos</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Permite que otros usuarios te envíen mensajes privados
                </p>
              </div>
              <Switch
                checked={settings.allowDirectMessages}
                onCheckedChange={() => handleToggle("allowDirectMessages")}
                className="ml-4"
              />
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Guardar Configuración
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
