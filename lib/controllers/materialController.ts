/*
 * Controllers - Lógica de negocio para materiales
 */

import type { Material } from "../models/material"

export class MaterialController {
  // Validar archivo
  validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024 // 100MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "image/jpeg",
      "image/png",
    ]

    if (file.size > maxSize) {
      return { valid: false, error: "El archivo no puede exceder 100MB" }
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "Tipo de archivo no permitido" }
    }

    return { valid: true }
  }

  // Subir material
  async uploadMaterial(
    repositoryId: string,
    userId: string,
    file: File,
    data: {
      title: string
      description?: string
      category: string
      folder?: string
      tags: string[]
    },
  ): Promise<{ success: boolean; error?: string; material?: Material }> {
    // Validar archivo
    const validation = this.validateFile(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    // Validar título
    if (!data.title || data.title.trim().length === 0) {
      return { success: false, error: "El título es requerido" }
    }

    // TODO: Guardar archivo y crear registro en BD
    return { success: true }
  }
}
