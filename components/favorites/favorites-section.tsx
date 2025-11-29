"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, FileText, MessageSquare, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FavoriteRepository {
  id: number
  name: string
  subject: string
  owner: string
  materialCount: number
  memberCount: number
  tags: string[]
  addedToFavorites: string
}

interface FavoriteForum {
  id: number
  title: string
  subject: string
  author: string
  messageCount: number
  participantCount: number
  lastActivity: string
  tags: string[]
  addedToFavorites: string
}

export function FavoritesSection() {
  const [favoriteRepositories, setFavoriteRepositories] = useState<FavoriteRepository[]>([
    {
      id: 1,
      name: "Cálculo I - Semestre 2024-2",
      subject: "Cálculo I",
      owner: "Santiago Hernandez",
      materialCount: 24,
      memberCount: 18,
      tags: ["Matemáticas", "Parciales"],
      addedToFavorites: "2024-11-20",
    },
    {
      id: 2,
      name: "Programación Orientada a Objetos",
      subject: "POO",
      owner: "Andres Meneses",
      materialCount: 35,
      memberCount: 42,
      tags: ["Programación", "Java"],
      addedToFavorites: "2024-11-15",
    },
  ])

  const [favoriteForums, setFavoriteForums] = useState<FavoriteForum[]>([
    {
      id: 1,
      title: "Dudas sobre derivadas y sus aplicaciones",
      subject: "Cálculo I",
      author: "Santiago Hernandez",
      messageCount: 24,
      participantCount: 15,
      lastActivity: "Hace 2 horas",
      tags: ["Derivadas", "Optimización"],
      addedToFavorites: "2024-11-22",
    },
    {
      id: 2,
      title: "Proyecto de Programación - Gestor de Tareas",
      subject: "Programación",
      author: "Andres Meneses",
      messageCount: 48,
      participantCount: 28,
      lastActivity: "Hace 1 hora",
      tags: ["Java", "Proyecto"],
      addedToFavorites: "2024-11-18",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const filteredRepositories = favoriteRepositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredForums = favoriteForums.filter(
    (forum) =>
      forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRemoveRepository = (id: number) => {
    setFavoriteRepositories(favoriteRepositories.filter((repo) => repo.id !== id))
  }

  const handleRemoveForum = (id: number) => {
    setFavoriteForums(favoriteForums.filter((forum) => forum.id !== id))
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          Mis Favoritos
        </h1>
        <p className="text-muted-foreground">Tus repositorios y foros favoritos en un solo lugar</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar en favoritos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="repositories" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="repositories" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Repositorios ({filteredRepositories.length})
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Foros ({filteredForums.length})
          </TabsTrigger>
        </TabsList>

        {/* Repositorios Tab */}
        <TabsContent value="repositories">
          {filteredRepositories.length === 0 ? (
            <Card className="p-12 border border-border text-center">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No tienes repositorios favoritos aún</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explorar Repositorios</Button>
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
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                            {repo.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Por <span className="font-medium">{repo.owner}</span>
                          </p>
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
                          <Badge variant="outline" className="text-xs">
                            {repo.subject}
                          </Badge>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {repo.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/50 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                      >
                        Ver Repositorio
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveRepository(repo.id)}
                        title="Remover de favoritos"
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
        </TabsContent>

        {/* Foros Tab */}
        <TabsContent value="forums">
          {filteredForums.length === 0 ? (
            <Card className="p-12 border border-border text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No tienes foros favoritos aún</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explorar Foros</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredForums.map((forum) => (
                <Card key={forum.id} className="p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    {/* Contenido principal */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <MessageSquare className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                            {forum.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Por <span className="font-medium">{forum.author}</span>
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{forum.messageCount} mensajes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{forum.participantCount} participantes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs">Actividad: {forum.lastActivity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {forum.subject}
                          </Badge>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {forum.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/50 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                      >
                        Ver Foro
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveForum(forum.id)}
                        title="Remover de favoritos"
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
