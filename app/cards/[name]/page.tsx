"use client"
import { use, useEffect, useState } from "react"
import PlayerCard3D, { Player } from "@/components/3dCards"

export default function CardPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params)
  const playerName = decodeURIComponent(name)
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    fetch("/players.json")
      .then((r) => r.json())
      .then((data) => {
        const found = Object.entries(data)
          .flatMap(([teamName, teamData]: any) =>
            teamData.players.map((p: any) => ({
              ...p,
              team: teamName,
              teamShort: teamData.team_short,
            }))
          )
          .find((p) => p.name === playerName)

        setPlayer(found ?? null)
      })
  }, [playerName])

  if (!player) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center text-white">
        Loading...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <PlayerCard3D player={player} />
    </main>
  )
} 