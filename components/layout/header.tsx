"use client"

import { Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  activeView: string
  onNavigate: (view: string) => void
  onLogout?: () => void
}

export function Header({ activeView, onNavigate, onLogout }: HeaderProps) {
  const handleLogout = () => {
    console.log("[v0] Cerrando sesión desde Header")
    onLogout?.()
  }

  return (
    <header className="bg-card border-b border-border h-16 flex items-center px-6">
      <div className="flex-1 flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground transition-colors relative"
          onClick={() => onNavigate("notifications")}
          title="Notificaciones"
        >
          <Bell className="w-5 h-5" />
          {/* Badge de notificaciones no leídas */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => onNavigate("user")}
          title="Mi Perfil"
        >
          <User className="w-5 h-5" />
        </Button>

        {/* Botón de logout */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-red-500 transition-colors"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
