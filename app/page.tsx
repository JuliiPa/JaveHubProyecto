"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/views/dashboard"
import { LoginForm } from "@/components/auth/login-form"

interface User {
  email: string
  name: string
  authenticated: boolean
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay usuario guardado en localStorage
    const savedUser = localStorage.getItem("javehub_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        console.log("[v0] Usuario restaurado desde localStorage:", userData.email)
        setUser(userData)
      } catch (e) {
        console.error("[v0] Error al restaurar usuario:", e)
      }
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (userData: User) => {
    console.log("[v0] Usuario autenticado:", userData.email)
    setUser(userData)
  }

  const handleLogout = () => {
    console.log("[v0] Cerrando sesión")
    localStorage.removeItem("javehub_user")
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando JaveHub...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />
  }

  return <Dashboard onLogout={handleLogout} />
}
