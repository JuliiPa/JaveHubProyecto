// Model: Estructura de datos para repositorios
export interface Repository {
  id: number
  name: string
  description: string
  subject: string
  owner: string
  ownerId: string
  materialCount: number
  memberCount: number
  createdAt: string
  updatedAt: string
  tags: string[]
  isPublic: boolean
  accessLevel: "owner" | "collaborator" | "viewer" | "none"
}

export interface CreateRepositoryDTO {
  name: string
  description: string
  subject: string
  tags?: string[]
  isPublic?: boolean
}

export interface RepositoryFilters {
  search?: string
  subject?: string
  semester?: string
  sortBy?: "popularity" | "createdAt" | "materials"
}

export interface RepositoryDetail extends Repository {
  materials: Material[]
  folders: Folder[]
  collaborators: Collaborator[]
  reviews: Review[]
}

export interface Material {
  id: number
  name: string
  type: "pdf" | "docx" | "pptx" | "zip" | "other"
  size: number
  uploadedAt: string
  uploadedBy: string
  downloads: number
  folderId: number
  description?: string
}

export interface Folder {
  id: number
  name: string
  parentId?: number
  createdAt: string
  materialCount: number
}

export interface Collaborator {
  id: string
  name: string
  email: string
  role: "owner" | "collaborator" | "viewer"
  joinedAt: string
  avatar?: string
}

export interface Review {
  id: number
  authorName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}
