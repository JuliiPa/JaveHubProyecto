// Controller: Lógica de negocio para repositorios
import type { Repository, CreateRepositoryDTO, RepositoryFilters } from "@/components/models/repository"

// Mock data - En producción, esto vendría de una API
const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "Cálculo I - Semestre 2024-2",
    description: "Repositorio colaborativo con apuntes, parciales y soluciones",
    subject: "Cálculo I",
    owner: "Santiago Hernandez",
    ownerId: "user_1",
    materialCount: 24,
    memberCount: 18,
    createdAt: "2024-09-15",
    updatedAt: "2024-09-20",
    tags: ["Matemáticas", "Parciales"],
    isPublic: true,
    accessLevel: "viewer",
  },
]

export class RepositoryController {
  // Obtener todos los repositorios
  static getRepositories(filters?: RepositoryFilters): Repository[] {
    let results = [...mockRepositories]

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchLower) ||
          repo.subject.toLowerCase().includes(searchLower) ||
          repo.owner.toLowerCase().includes(searchLower),
      )
    }

    if (filters?.subject) {
      results = results.filter((repo) => repo.subject === filters.subject)
    }

    if (filters?.sortBy === "popularity") {
      results.sort((a, b) => b.memberCount - a.memberCount)
    } else if (filters?.sortBy === "createdAt") {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return results
  }

  // Crear repositorio
  static createRepository(data: CreateRepositoryDTO): Repository {
    const newRepository: Repository = {
      id: Math.max(...mockRepositories.map((r) => r.id), 0) + 1,
      ...data,
      owner: "Usuario Actual",
      ownerId: "current_user",
      materialCount: 0,
      memberCount: 1,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      isPublic: data.isPublic ?? true,
      accessLevel: "owner",
    }

    mockRepositories.push(newRepository)
    return newRepository
  }

  // Obtener repositorio por ID
  static getRepositoryById(id: number): Repository | undefined {
    return mockRepositories.find((repo) => repo.id === id)
  }

  // Buscar repositorios
  static searchRepositories(query: string): Repository[] {
    return this.getRepositories({ search: query })
  }
}
