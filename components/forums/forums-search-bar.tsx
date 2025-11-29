"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ForumsSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function ForumsSearchBar({
  value,
  onChange,
  placeholder = "Buscar foros por título, materia o autor...",
}: ForumsSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-input border border-border rounded-lg"
      />
    </div>
  )
}
