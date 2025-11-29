export interface PointsLog {
  id: string
  userId: string
  action: "upload_material" | "comment" | "create_forum" | "write_review" | "help_others"
  pointsEarned: number
  createdAt: Date
}

export interface UserLevel {
  level: number
  minPoints: number
  maxPoints: number
  badge?: string
}
