"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ForumsSearchBar } from "@/components/forums/forums-search-bar"
import { ForumsGrid } from "@/components/forums/forums-grid"
import { CreateForumModal } from "@/components/forums/create-forum-modal"
import { ForumDetailView } from "@/components/forums/forum-detail-view"

interface Forum {
  id: number
  title: string
  description: string
  subject: string
  author: string
  messageCount: number
  participantCount: number
  lastActivity: string
  category: string
  tags?: string[]
}

interface ForumsSectionProps {
  initialForums?: Forum[]
}

export function ForumsSection({ initialForums = [] }: ForumsSectionProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedForumId, setSelectedForumId] = useState<number | null>(null)
  const [forums, setForums] = useState<Forum[]>(
    initialForums.length > 0
      ? initialForums
      : [
          {
            id: 1,
            title: "Dudas sobre derivadas y sus aplicaciones",
            description:
              "Compartimos dudas y soluciones sobre derivadas, regla de la cadena y problemas de optimización",
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
        ],
  )

  const [filterSubject, setFilterSubject] = useState<string | null>(null)

  const handleCreateForum = (data: {
    title: string
    description: string
    subject: string
    category: string
  }) => {
    const newForum: Forum = {
      id: forums.length + 1,
      title: data.title,
      description: data.description,
      subject: data.subject,
      author: "Tu Nombre",
      messageCount: 0,
      participantCount: 1,
      lastActivity: "Ahora",
      category: data.category,
      tags: [],
    }
    setForums([newForum, ...forums])
    setShowCreateModal(false)
  }

  const filteredForums = forums.filter((forum) => {
    const matchesSearch =
      forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubjectFilter = !filterSubject || forum.subject === filterSubject

    return matchesSearch && matchesSubjectFilter
  })

  const uniqueSubjects = Array.from(new Set(forums.map((f) => f.subject))).sort()

  const selectedForum = selectedForumId ? forums.find((f) => f.id === selectedForumId) : null

  if (selectedForum) {
    return <ForumDetailView forumId={selectedForumId!} forum={selectedForum} onBack={() => setSelectedForumId(null)} />
  }

  return (
    <div className="w-full">
      {/* Search and Create Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="flex-1 w-full">
          <ForumsSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar foros por título, materia o autor..."
          />
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Crear Foro
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button
          onClick={() => setFilterSubject(null)}
          variant={filterSubject === null ? "default" : "outline"}
          size="sm"
          className={
            filterSubject === null
              ? "bg-primary text-primary-foreground"
              : "border-border text-foreground hover:bg-muted"
          }
        >
          Todos
        </Button>
        {uniqueSubjects.map((subject) => (
          <Button
            key={subject}
            onClick={() => setFilterSubject(subject)}
            variant={filterSubject === subject ? "default" : "outline"}
            size="sm"
            className={
              filterSubject === subject
                ? "bg-primary text-primary-foreground whitespace-nowrap"
                : "border-border text-foreground hover:bg-muted whitespace-nowrap"
            }
          >
            {subject}
          </Button>
        ))}
      </div>

      {/* Foros Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Foros Disponibles ({filteredForums.length})</h2>
        <ForumsGrid forums={filteredForums} onForumClick={setSelectedForumId} />
      </div>

      {/* Create Forum Modal */}
      {showCreateModal && <CreateForumModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateForum} />}
    </div>
  )
}
