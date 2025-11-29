/*
 * Controllers - Lógica de negocio para puntos y niveles
 */

import type { UserLevel } from "../models/points"

export class PointsController {
  private pointsRules = {
    upload_material: 10,
    comment: 5,
    create_forum: 15,
    write_review: 20,
    help_others: 25,
  }

  private levels: UserLevel[] = [
    { level: 1, minPoints: 0, maxPoints: 99, badge: "🟢 Iniciante" },
    { level: 2, minPoints: 100, maxPoints: 299, badge: "🔵 Colaborador" },
    { level: 3, minPoints: 300, maxPoints: 749, badge: "🟣 Experto" },
    { level: 4, minPoints: 750, maxPoints: 1999, badge: "🏆 Maestro" },
    { level: 5, minPoints: 2000, maxPoints: Number.POSITIVE_INFINITY, badge: "👑 Líder" },
  ]

  // Calcular puntos por acción
  getPointsForAction(action: string): number {
    return this.pointsRules[action as keyof typeof this.pointsRules] || 0
  }

  // Obtener nivel por puntos
  getLevelFromPoints(points: number): UserLevel {
    return this.levels.find((level) => points >= level.minPoints && points <= level.maxPoints) || this.levels[0]
  }

  // Añadir puntos
  async addPoints(
    userId: string,
    action: string,
    metadata?: Record<string, any>,
  ): Promise<{ success: boolean; pointsEarned: number; newLevel?: UserLevel }> {
    const points = this.getPointsForAction(action)

    if (points === 0) {
      return { success: false, pointsEarned: 0 }
    }

    // TODO: Guardar en BD y notificar
    return { success: true, pointsEarned: points }
  }
}
