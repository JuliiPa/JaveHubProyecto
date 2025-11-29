"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Review {
  id: string
  type: "repository" | "forum"
  targetId: number | string
  targetName: string
  rating: number
  comment: string
  clarity?: number
  methodology?: number
  difficulty?: number
  punctuality?: number
  author: string
  createdAt: string
  updatedAt?: string
}

interface ReviewsContextType {
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "createdAt">) => string
  updateReview: (id: string, review: Partial<Omit<Review, "id" | "createdAt">>) => void
  deleteReview: (id: string) => void
  getReviewsByTarget: (targetId: number | string, type: "repository" | "forum") => Review[]
  getReviewById: (id: string) => Review | undefined
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      type: "repository",
      targetId: 1,
      targetName: "Cálculo I - Semestre 2024-2",
      rating: 5,
      comment: "Excelente repositorio con materiales muy bien organizados. Las soluciones de parciales son muy útiles.",
      author: "Juan Perez",
      createdAt: "2024-11-20",
    },
    {
      id: "2",
      type: "repository",
      targetId: 2,
      targetName: "Programación Orientada a Objetos",
      rating: 4,
      comment: "Buenos proyectos pero faltarían más ejercicios básicos.",
      author: "María García",
      createdAt: "2024-11-18",
    },
  ])

  const addReview = (review: Omit<Review, "id" | "createdAt">) => {
    const newId = Date.now().toString()
    const newReview: Review = {
      ...review,
      id: newId,
      createdAt: new Date().toISOString().split("T")[0],
    }
    console.log("[v0] Guardando nueva reseña:", newReview)
    setReviews((prev) => [newReview, ...prev])
    return newId
  }

  const updateReview = (id: string, updatedData: Partial<Omit<Review, "id" | "createdAt">>) => {
    console.log("[v0] Actualizando reseña:", id, updatedData)
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              ...updatedData,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : review,
      ),
    )
  }

  const deleteReview = (id: string) => {
    console.log("[v0] Eliminando reseña:", id)
    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  const getReviewsByTarget = (targetId: number | string, type: "repository" | "forum") => {
    return reviews.filter((review) => review.targetId === targetId && review.type === type)
  }

  const getReviewById = (id: string) => {
    return reviews.find((review) => review.id === id)
  }

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        updateReview,
        deleteReview,
        getReviewsByTarget,
        getReviewById,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (!context) {
    throw new Error("useReviews must be used within ReviewsProvider")
  }
  return context
}
