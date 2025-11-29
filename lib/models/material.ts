export interface Material {
  id: string
  repositoryId: string
  name: string
  description?: string
  category: "notes" | "midterms" | "workshops" | "projects" | "other"
  fileType: string
  fileSize: number
  uploadedBy: string
  folder?: string
  tags: string[]
  downloads: number
  createdAt: Date
}

export interface Folder {
  id: string
  repositoryId: string
  name: string
  parentFolderId?: string
  createdAt: Date
}
