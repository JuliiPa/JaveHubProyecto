export interface Notification {
  id: string
  userId: string
  type: "repository_access" | "new_material" | "forum_reply" | "review_mention" | "points_earned"
  title: string
  message: string
  relatedId?: string
  isRead: boolean
  createdAt: Date
}
