"use client"
import { use } from "react"
import PlayerCard3D from "@/components/3dCards"

export default function CardPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params)
  const playerName = decodeURIComponent(name)

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <PlayerCard3D name={playerName} />
    </main>
  )
}