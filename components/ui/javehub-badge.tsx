import type React from "react"
/*
 * Componente reutilizable: Badge con estilo JaveHub
 */

interface JaveHubBadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info"
  size?: "sm" | "md" | "lg"
}

export function JaveHubBadge({ children, variant = "default", size = "md" }: JaveHubBadgeProps) {
  const variantStyles = {
    default: "bg-secondary text-foreground",
    success: "bg-accent text-accent-foreground",
    warning: "bg-orange-100 text-orange-800",
    error: "bg-destructive text-destructive-foreground",
    info: "bg-blue-100 text-blue-800",
  }

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <span className={`inline-block rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  )
}
