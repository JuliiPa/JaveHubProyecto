/*
 * Controllers - Lógica de negocio para autenticación
 * Maneja registro, login, verificación de email
 */

import type { CreateUserPayload, LoginPayload, User } from "../models/user"

export class AuthController {
  // Validar dominio de email
  validateJaverianaEmail(email: string): boolean {
    return email.endsWith("@javeriana.edu.co")
  }

  // Validar contraseña (mínimo 8 caracteres, mayúscula, número)
  validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (password.length < 8) {
      errors.push("La contraseña debe tener al menos 8 caracteres")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("La contraseña debe contener al menos una mayúscula")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("La contraseña debe contener al menos un número")
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  // Crear usuario
  async createUser(payload: CreateUserPayload): Promise<{ success: boolean; error?: string; user?: User }> {
    // Validar email
    if (!this.validateJaverianaEmail(payload.email)) {
      return { success: false, error: "Debes usar tu correo institucional @javeriana.edu.co" }
    }

    // Validar contraseña
    const passwordValidation = this.validatePassword(payload.password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.errors.join(". ") }
    }

    // TODO: Aquí va la lógica para guardar en base de datos y enviar verificación
    return { success: true }
  }

  // Login
  async login(payload: LoginPayload): Promise<{ success: boolean; error?: string; token?: string }> {
    if (!this.validateJaverianaEmail(payload.email)) {
      return { success: false, error: "Email inválido" }
    }

    // TODO: Validar credenciales contra la BD
    return { success: true, token: "mock-token" }
  }

  // Verificar email
  async verifyEmail(email: string, code: string): Promise<{ success: boolean; error?: string }> {
    // TODO: Validar código contra BD
    return { success: true }
  }
}
