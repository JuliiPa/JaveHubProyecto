"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Trash2, CheckCircle2, MessageSquare, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Notification {
  id: number
  type: "repository_access" | "forum_reply" | "new_material" | "member_joined"
  title: string
  description: string
  timestamp: string
  read: boolean
  icon: React.ReactNode
}

export function NotificationsSection() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "repository_access",
      title: "Acceso aprobado",
      description: "Tu solicitud de acceso al repositorio 'Cálculo I - 2024' ha sido aprobada",
      timestamp: "Hace 2 horas",
      read: false,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    },
    {
      id: 2,
      type: "forum_reply",
      title: "Respuesta en foro",
      description: "Alguien respondió tu pregunta en 'Dudas sobre POO - Herencia'",
      timestamp: "Hace 4 horas",
      read: false,
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    },
    {
      id: 3,
      type: "new_material",
      title: "Nuevo material",
      description: "Se agregó material nuevo en 'Termodinámica - 2024': Resumen capítulo 5",
      timestamp: "Hace 6 horas",
      read: false,
      icon: <FileText className="w-5 h-5 text-purple-500" />,
    },
    {
      id: 4,
      type: "member_joined",
      title: "Nuevo miembro",
      description: "Carlos Mendez se unió al repositorio 'Física Moderna'",
      timestamp: "Hace 1 día",
      read: true,
      icon: <Users className="w-5 h-5 text-orange-500" />,
    },
  ])

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-8 h-8" />
            Notificaciones
          </h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
              : "Todas tus notificaciones están leídas"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Marcar todo como leído
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteAll} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Limpiar todo
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <Card className="p-12 text-center">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Sin notificaciones</h2>
          <p className="text-muted-foreground">
            No tienes notificaciones en este momento. Volveremos cuando haya novedades.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 flex items-start gap-4 transition-colors ${
                !notification.read ? "bg-primary/5 border-primary/20" : "bg-card hover:bg-card/50"
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">{notification.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex gap-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Marcar leído
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(notification.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
