"use client"

import { ForumCard } from "@/components/forums/forums-card"

interface Forum {
  id: number
  title: string
  description: string
  subject: string
  author: string
  messageCount: number
  participantCount: number
  lastActivity: string
  tags?: string[]
}

interface ForumsGridProps {
  forums: Forum[]
  onForumClick?: (forumId: number) => void
}

export function ForumsGrid({ forums, onForumClick }: ForumsGridProps) {
  if (forums.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <p className="text-lg font-medium">No se encontraron foros</p>
          <p className="text-sm mt-1">Crea el primer foro o busca por diferentes términos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forums.map((forum) => (
        <div key={forum.id} onClick={() => onForumClick?.(forum.id)}>
          <ForumCard {...forum} />
        </div>
      ))}
    </div>
  )
}
