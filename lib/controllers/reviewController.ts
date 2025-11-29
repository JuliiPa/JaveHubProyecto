/*
 * Controllers - Lógica de negocio para reseñas
 */

import type { ProfessorReview } from "../models/review"

export class ReviewController {
  // Validar reseña
  validateReview(data: {
    clarity: number
    methodology: number
    difficulty: number
    punctuality: number
    comment: string
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (data.clarity < 1 || data.clarity > 5) {
      errors.push("Claridad debe estar entre 1 y 5")
    }
    if (data.methodology < 1 || data.methodology > 5) {
      errors.push("Metodología debe estar entre 1 y 5")
    }
    if (data.difficulty < 1 || data.difficulty > 5) {
      errors.push("Exigencia debe estar entre 1 y 5")
    }
    if (data.punctuality < 1 || data.punctuality > 5) {
      errors.push("Puntualidad debe estar entre 1 y 5")
    }
    if (!data.comment || data.comment.trim().length < 10) {
      errors.push("El comentario debe tener al menos 10 caracteres")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  // Crear reseña
  async createReview(
    userId: string,
    data: {
      professorId: string
      subject: string
      semester: number
      clarity: number
      methodology: number
      difficulty: number
      punctuality: number
      comment: string
    },
  ): Promise<{ success: boolean; error?: string; review?: ProfessorReview }> {
    const validation = this.validateReview(data)
    if (!validation.valid) {
      return { success: false, error: validation.errors.join(". ") }
    }

    // TODO: Guardar en BD
    return { success: true }
  }

  // Reportar reseña
  async reportReview(
    reviewId: string,
    userId: string,
    category: string,
    message?: string,
  ): Promise<{ success: boolean; error?: string }> {
    // TODO: Crear registro de reporte en BD
    return { success: true }
  }
}
