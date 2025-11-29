export interface Forum {
  id: string
  title: string
  category: string
  subject: string
  description: string
  createdBy: string
  semester: number
  participantCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ForumComment {
  id: string
  forumId: string
  content: string
  createdBy: string
  parentCommentId?: string
  createdAt: Date
  updatedAt: Date
}
