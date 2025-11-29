"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ForumsSection } from "@/components/forums/forums-section"

export function ForumsPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2">Foros Académicos</h1>
              <p className="text-lg text-muted-foreground">
                Participa en conversaciones académicas, comparte dudas y aprende con otros estudiantes Javerianos
              </p>
            </div>

            {/* Forums Section */}
            <ForumsSection />
          </div>
        </main>
      </div>
    </div>
  )
}
