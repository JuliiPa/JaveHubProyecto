"use client"

import { RepositoryCard } from "./repository-card"

interface Repository {
  id: number
  name: string
  description: string
  subject: string
  owner: string
  materialCount: number
  memberCount: number
  createdAt: string
  tags: string[]
}

interface RepositoriesGridProps {
  repositories: Repository[]
  onSelectRepository?: (id: number) => void
}

export function RepositoriesGrid({ repositories, onSelectRepository }: RepositoriesGridProps) {
  if (repositories.length === 0) {
    return (
      <div className="grid place-items-center min-h-96 text-center">
        <div>
          <p className="text-xl font-semibold text-foreground mb-2">No se encontraron repositorios</p>
          <p className="text-muted-foreground">Intenta con otros términos de búsqueda o crea uno nuevo</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} {...repo} onViewRepository={onSelectRepository} />
      ))}
    </div>
  )
}
