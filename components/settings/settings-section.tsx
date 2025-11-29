"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Bell, Eye, Trash2, LogOut } from "lucide-react"
import { UserProfileSection } from "@/components/user/user-profile-section"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { UserProfile } from "@/components/user/user-profile-section"

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user_1",
    name: "Juliana Pacheco Amaya",
    email: "pacheco_j@javeriana.edu.co",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    bio: "Estudiante apasionado por la matemática y la programación.",
    academicProgram: "Ingeniería de Sistemas",
    semester: 5,
    interests: ["Programación", "Bases de Datos"],
    coursesEnrolled: ["Cálculo III", "Algoritmos"],
    joinDate: "2024-01-15",
    points: 2450,
    level: 5,
    repositoriesCreated: 8,
    forumsCreated: 12,
    materialContributions: 45,
    reviews: 23,
  })

  const handleLogout = () => {
    console.log("[v0] Cerrando sesión")
  }

  const handleDeleteAccount = () => {
    console.log("[v0] Cuenta eliminada")
    setShowDeleteConfirm(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configuración de Cuenta</h1>
        <p className="text-muted-foreground">Personaliza tu perfil, privacidad y preferencias de notificación</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 bg-secondary border-b border-border rounded-none mb-8">
          <TabsTrigger
            value="profile"
            className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Privacidad</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notif.</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Seguridad</span>
          </TabsTrigger>
        </TabsList>

        {/* Perfil Tab */}
        <TabsContent value="profile" className="space-y-6">
          <UserProfileSection user={userProfile} />
        </TabsContent>

        {/* Privacidad Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Configuración de Privacidad
            </h2>
            <p className="text-muted-foreground mb-6">
              Controla quién puede ver tu información y actividad en JaveHub. Estos ajustes se aplican a todo el sitio.
            </p>
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Mostrar Foto de Perfil</h3>
                  <p className="text-sm text-muted-foreground">Otros usuarios pueden ver tu foto</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Mostrar Programa Académico</h3>
                  <p className="text-sm text-muted-foreground">Otros pueden ver tu carrera y semestre</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Historial de Repositorios</h3>
                  <p className="text-sm text-muted-foreground">Otros pueden ver tus repositorios</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Permitir Mensajes Directos</h3>
                  <p className="text-sm text-muted-foreground">Otros pueden enviarte mensajes privados</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                Guardar Cambios de Privacidad
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notificaciones Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Preferencias de Notificación
            </h2>
            <p className="text-muted-foreground mb-6">Elige cómo y cuándo quieres recibir notificaciones de JaveHub</p>
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Nuevos Materiales en mis Repositorios</h3>
                  <p className="text-sm text-muted-foreground">Recibe alerta cuando alguien sube material</p>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Respuestas en Foros</h3>
                  <p className="text-sm text-muted-foreground">Notificación cuando alguien responde tus temas</p>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Solicitudes de Acceso Aprobadas</h3>
                  <p className="text-sm text-muted-foreground">Confirma cuando apruebes solicitudes de acceso</p>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Menciones en Comentarios</h3>
                  <p className="text-sm text-muted-foreground">Alerta cuando alguien te menciona</p>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-6">
                Guardar Preferencias
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Seguridad Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Seguridad de Cuenta
            </h2>
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Cambiar Contraseña</h3>
                  <p className="text-sm text-muted-foreground">Actualiza tu contraseña regularmente</p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Autenticación de Dos Factores</h3>
                  <p className="text-sm text-muted-foreground">Agrega una capa extra de seguridad</p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Dispositivos Activos</h3>
                  <p className="text-sm text-muted-foreground">Gestiona tus sesiones activas</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Peligrosas</h3>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-foreground bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión en Todos los Dispositivos
                  </Button>

                  <Button variant="destructive" className="w-full gap-2" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="w-4 h-4" />
                    Eliminar Cuenta
                  </Button>

                  <p className="text-xs text-muted-foreground mt-4">
                    Advertencia: Eliminar tu cuenta es permanente. Se eliminarán todos tus datos, repositorios y
                    contenido.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Account Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Eliminar Cuenta</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible. Se eliminarán:
              <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                <li>Tu perfil y toda la información personal</li>
                <li>Todos tus repositorios y materiales</li>
                <li>Tus publicaciones en foros</li>
                <li>Tus reseñas de profesores</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Eliminar Permanentemente
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
