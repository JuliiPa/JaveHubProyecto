/*
 * Models - Definición de tipos y estructuras de datos
 * Siguiendo patrón MVC
 */

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  academicProgram: string
  semester: number
  profilePicture?: string
  bio?: string
  academicInterests?: string[]
  coursesCompleted?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile extends User {
  visibility: "public" | "friends_only" | "private"
  showProfilePicture: boolean
  showAcademicProgram: boolean
  showRepositoryHistory: boolean
  allowDirectMessages: boolean
  points: number
  level: number
}

export interface CreateUserPayload {
  email: string
  firstName: string
  lastName: string
  academicProgram: string
  semester: number
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}
