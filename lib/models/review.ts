export interface ProfessorReview {
  id: string
  professorId: string
  subject: string
  semester: number
  clarity: number
  methodology: number
  difficulty: number
  punctuality: number
  comment: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
