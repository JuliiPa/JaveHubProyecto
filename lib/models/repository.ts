export interface Repository {
  id: string
  name: string
  description: string
  subject: string
  semester: number
  ownerId: string
  tags: string[]
  isPublic: boolean
  requiresPassword?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface RepositoryAccess {
  id: string
  userId: string
  repositoryId: string
  role: "owner" | "collaborator" | "viewer"
  status: "approved" | "pending" | "rejected"
  requestedAt: Date
  approvedAt?: Date
}

export interface AccessRequest {
  id: string
  userId: string
  repositoryId: string
  reason?: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}
