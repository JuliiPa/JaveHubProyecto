"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: (user: { email: string; name: string }) => void
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const validateEmail = (email: string): boolean => {
    return email.endsWith("@javeriana.edu.co")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validaciones
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    if (!validateEmail(email)) {
      setError("Debes usar un correo institucional (@javeriana.edu.co)")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    // Simular autenticación
    setTimeout(() => {
      console.log("[v0] Inicio de sesión exitoso con:", email)

      // Guardar datos de usuario en localStorage
      const userData = {
        email,
        name: email.split("@")[0],
        authenticated: true,
      }
      localStorage.setItem("javehub_user", JSON.stringify(userData))

      setSuccess(true)
      setLoading(false)

      // Llamar callback después de 1 segundo
      setTimeout(() => {
        onLoginSuccess(userData)
      }, 1000)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">JaveHub</CardTitle>
          <CardDescription className="text-center">Red Académica Colaborativa Javeriana</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">¡Bienvenido! Redirigiendo...</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Institucional</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@javeriana.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                className="border-2"
              />
              <p className="text-xs text-muted-foreground">Usa tu correo @javeriana.edu.co</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
                className="border-2"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || success} size="lg">
              {loading ? "Verificando..." : success ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent" disabled>
            Crear Cuenta
          </Button>

          <div className="text-xs text-center text-muted-foreground space-y-2">
            <p>JaveHub es exclusivo para estudiantes de la Pontificia Universidad Javeriana</p>
            <p className="text-xs">Verifica tu identidad con tu correo @javeriana.edu.co</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
