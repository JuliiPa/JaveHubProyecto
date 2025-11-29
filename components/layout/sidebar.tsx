"use client"
import { Home, FolderOpen, MessageSquare, Star, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeView?: "repositories" | "forums" | "my-repositories" | "favorites" | "settings"
  onNavigate?: (view: "repositories" | "forums" | "my-repositories" | "favorites" | "settings") => void
}

export function Sidebar({ activeView = "repositories", onNavigate }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Inicio", id: "repositories" as const },
    { icon: FolderOpen, label: "Mis Repositorios", id: "my-repositories" as const },
    { icon: MessageSquare, label: "Foros", id: "forums" as const },
    { icon: Star, label: "Favoritos", id: "favorites" as const },
    { icon: Settings, label: "Configuración", id: "settings" as const },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-primary">JaveHub</h1>
        <p className="text-xs text-sidebar-foreground/60">Red Académica</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            variant={activeView === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              activeView === item.id
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/60">© 2025 JaveHub - Javeriana</p>
      </div>
    </aside>
  )
}
