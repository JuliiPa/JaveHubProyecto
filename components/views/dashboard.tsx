"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { RepositoriesGrid } from "@/components/repositories/repositories-grid"
import { SearchBar } from "@/components/repositories/search-bar"
import { CreateRepositoryModal } from "@/components/repositories/create-repository-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ForumsSection } from "@/components/forums/forums-section"
import { MyRepositoriesSection } from "@/components/repositories/my-repositories-section"
import { FavoritesSection } from "@/components/favorites/favorites-section"
import { SettingsSection } from "@/components/settings/settings-section"
import { UserProfileSection } from "@/components/user/user-profile-section"
import { NotificationsSection } from "@/components/notifications/notifications-section"
import { RepositoryDetailView } from "@/components/repositories/repository-detail-view"
import { ForumDetailView } from "@/components/forums/forum-detail-view"

interface DashboardProps {
  onLogout?: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<
    "repositories" | "forums" | "my-repositories" | "favorites" | "settings" | "user" | "notifications"
  >("repositories")
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<number | null>(null)
  const [selectedForumId, setSelectedForumId] = useState<number | null>(null)
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: "Cálculo I - Semestre 2024-2",
      description: "Repositorio colaborativo con apuntes, parciales y soluciones",
      subject: "Cálculo I",
      owner: "María García",
      materialCount: 24,
      memberCount: 18,
      createdAt: "2024-09-15",
      tags: ["Matemáticas", "Parciales"],
    },
    {
      id: 2,
      name: "Programación Orientada a Objetos",
      description: "Proyectos, talleres y ejercicios de POO en Java",
      subject: "POO",
      owner: "Carlos López",
      materialCount: 35,
      memberCount: 42,
      createdAt: "2024-08-20",
      tags: ["Programación", "Java"],
    },
    {
      id: 3,
      name: "Termodinámica - 2024",
      description: "Apuntes de clase, problemas resueltos y simulaciones",
      subject: "Física",
      owner: "Juan Rodríguez",
      materialCount: 18,
      memberCount: 12,
      createdAt: "2024-09-05",
      tags: ["Física", "Ciencias"],
    },
  ])

  const handleCreateRepository = (data: {
    name: string
    description: string
    subject: string
  }) => {
    const newRepository = {
      id: repositories.length + 1,
      name: data.name,
      description: data.description,
      subject: data.subject,
      owner: "Tu Nombre",
      materialCount: 0,
      memberCount: 1,
      createdAt: new Date().toISOString().split("T")[0],
      tags: [],
    }
    setRepositories([newRepository, ...repositories])
    setShowCreateModal(false)
  }

  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [forums, setForums] = useState([
    {
      id: 1,
      title: "Dudas sobre derivadas y sus aplicaciones",
      description: "Compartimos dudas y soluciones sobre derivadas, regla de la cadena y problemas de optimización",
      subject: "Cálculo I",
      author: "Ana Martínez",
      messageCount: 24,
      participantCount: 15,
      lastActivity: "Hace 2 horas",
      category: "Duda de Clase",
      tags: ["Derivadas", "Optimización"],
    },
    {
      id: 2,
      title: "Proyecto de Programación - Gestor de Tareas",
      description: "Foro para discutir el desarrollo del proyecto final de programación en Java",
      subject: "Programación",
      author: "Carlos López",
      messageCount: 48,
      participantCount: 28,
      lastActivity: "Hace 1 hora",
      category: "Proyecto",
      tags: ["Java", "Proyecto"],
    },
    {
      id: 3,
      title: "Estudio de Física - Termodinámica",
      description: "Compartimos apuntes, ejercicios resueltos y preguntas sobre termodinámica",
      subject: "Física",
      author: "Juan Rodríguez",
      messageCount: 15,
      participantCount: 10,
      lastActivity: "Hace 4 horas",
      category: "General",
      tags: ["Termodinámica", "Ejercicios"],
    },
  ])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            {activeView === "repositories" && !selectedRepositoryId && (
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenido a JaveHub</h1>
                <p className="text-lg text-muted-foreground">Red académica colaborativa exclusiva para Javerianos</p>
              </div>
            )}

            {/* Repositories View */}
            {activeView === "repositories" && !selectedRepositoryId && (
              <div>
                {/* Search and Create Section */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                  <div className="flex-1 w-full">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Buscar repositorios por nombre, materia o profesor..."
                    />
                  </div>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 whitespace-nowrap"
                  >
                    <Plus className="w-5 h-5" />
                    Crear Repositorio
                  </Button>
                </div>

                {/* Repositories Grid */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Repositorios Disponibles</h2>
                  <RepositoriesGrid repositories={filteredRepositories} onSelectRepository={setSelectedRepositoryId} />
                </div>
              </div>
            )}

            {/* Repository Detail View */}
            {activeView === "repositories" && selectedRepositoryId && (
              <RepositoryDetailView repositoryId={selectedRepositoryId} onBack={() => setSelectedRepositoryId(null)} />
            )}

            {/* My Repositories View */}
            {activeView === "my-repositories" && !selectedRepositoryId && (
              <MyRepositoriesSection onSelectRepository={setSelectedRepositoryId} />
            )}

            {/* My Repository Detail View */}
            {activeView === "my-repositories" && selectedRepositoryId && (
              <RepositoryDetailView repositoryId={selectedRepositoryId} onBack={() => setSelectedRepositoryId(null)} />
            )}

            {/* Forums View */}
            {activeView === "forums" && !selectedForumId && <ForumsSection initialForums={forums} />}

            {/* Forum Detail View */}
            {activeView === "forums" && selectedForumId && (
              <ForumDetailView
                forumId={selectedForumId}
                forum={forums.find((f) => f.id === selectedForumId)!}
                onBack={() => setSelectedForumId(null)}
              />
            )}

            {/* Favorites View */}
            {activeView === "favorites" && <FavoritesSection />}

            {/* Settings View */}
            {activeView === "settings" && <SettingsSection />}

            {/* User Profile View */}
            {activeView === "user" && <UserProfileSection />}

            {/* Notifications View */}
            {activeView === "notifications" && <NotificationsSection />}
          </div>
        </main>
      </div>

      {/* Create Repository Modal */}
      {showCreateModal && (
        <CreateRepositoryModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateRepository} />
      )}
    </div>
  )
}
