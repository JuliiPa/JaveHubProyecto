"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Mail, BookOpen, Users, FileText, MessageSquare, Award, Calendar } from "lucide-react"
import { EditProfileModal } from "./edit-profile-modal"
import { PrivacySettingsModal } from "./privacy-settings-modal"

export interface UserProfile {
  id: string
  name: string
  email: string
  photo?: string
  bio?: string
  academicProgram: string
  semester: number
  interests: string[]
  coursesEnrolled: string[]
  joinDate: string
  points: number
  level: number
  repositoriesCreated: number
  forumsCreated: number
  materialContributions: number
  reviews: number
}

interface UserProfileSectionProps {
  user?: UserProfile
}

export function UserProfileSection({ user }: UserProfileSectionProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>(
    user || {
      id: "user_1",
      name: "Juliana Pacheco Amaya",
      email: "pacheco_j@javeriana.edu.co",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
      bio: "Estudiante apasionada por la matemática y la programación. Siempre dispuesta a compartir conocimiento con la comunidad.",
      academicProgram: "Ingeniería de Sistemas",
      semester: 5,
      interests: ["Programación", "Bases de Datos", "Machine Learning"],
      coursesEnrolled: ["Cálculo III", "Algoritmos", "Estructuras de Datos", "Base de Datos I"],
      joinDate: "2025-10-15",
      points: 2450,
      level: 5,
      repositoriesCreated: 8,
      forumsCreated: 12,
      materialContributions: 45,
      reviews: 23,
    },
  )

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    setUserProfile({ ...userProfile, ...updatedData })
    setIsEditingProfile(false)
  }

  const calculateLevelProgress = () => {
    const pointsPerLevel = 500
    const currentLevelPoints = userProfile.points % pointsPerLevel
    return (currentLevelPoints / pointsPerLevel) * 100
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Profile Header */}
      <Card className="bg-card border-border mb-8 overflow-hidden">
        {/* Background */}
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20" />

        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-8 -mt-16 mb-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 ring-4 ring-background border-4 border-card">
                <img src={userProfile.photo || "/placeholder.svg"} alt={userProfile.name} />
              </Avatar>
            </div>

            {/* User Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{userProfile.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2 mb-4">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {userProfile.academicProgram}
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    Semestre {userProfile.semester}
                  </Badge>
                </div>
                <p className="text-foreground text-sm leading-relaxed max-w-2xl">{userProfile.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  onClick={() => setIsEditingProfile(true)}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar Perfil
                </Button>
                <Button onClick={() => setIsEditingPrivacy(true)} variant="outline" className="gap-2">
                  Privacidad
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userProfile.points}</div>
              <div className="text-xs text-muted-foreground mt-1">Puntos Acumulados</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">Nivel {userProfile.level}</div>
              <div className="text-xs text-muted-foreground mt-1">Nivel Actual</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userProfile.repositoriesCreated}</div>
              <div className="text-xs text-muted-foreground mt-1">Repositorios</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-accent">{userProfile.forumsCreated}</div>
              <div className="text-xs text-muted-foreground mt-1">Foros</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userProfile.materialContributions}</div>
              <div className="text-xs text-muted-foreground mt-1">Aportes</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Level Progress */}
      <Card className="bg-card border-border mb-8 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Progreso de Nivel</h2>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Nivel {userProfile.level}</span>
              <span className="text-sm font-semibold text-foreground">{userProfile.points % 500} / 500 puntos</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${calculateLevelProgress()}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Falta {500 - (userProfile.points % 500)} puntos para alcanzar el próximo nivel
          </p>
        </div>
      </Card>

      {/* Interests and Courses */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Interests */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Intereses Académicos
          </h2>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/30">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Courses */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Materias Cursadas
          </h2>
          <div className="space-y-2">
            {userProfile.coursesEnrolled.map((course, index) => (
              <div key={index} className="text-sm text-foreground bg-secondary/50 rounded px-3 py-2">
                {course}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card className="bg-card border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Resumen de Actividad
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">{userProfile.repositoriesCreated}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Repositorios Creados
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-accent">{userProfile.forumsCreated}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Foros Creados
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">{userProfile.materialContributions}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Materiales Aportados
            </div>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-accent">{userProfile.reviews}</div>
            <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Reseñas Publicadas
            </div>
          </div>
        </div>
      </Card>

      {/* Join Date */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Miembro desde{" "}
        {new Date(userProfile.joinDate).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* Modals */}
      {isEditingProfile && (
        <EditProfileModal user={userProfile} onClose={() => setIsEditingProfile(false)} onSave={handleUpdateProfile} />
      )}

      {isEditingPrivacy && <PrivacySettingsModal onClose={() => setIsEditingPrivacy(false)} />}
    </div>
  )
}
