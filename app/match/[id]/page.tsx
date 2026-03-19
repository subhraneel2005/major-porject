"use client"
import { use } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import TeamColumn from "@/components/team-column"
import StadiumInfo from "@/components/stadium-info"
import { matchesData } from "@/lib/data"

export default function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const match = matchesData.find((m) => m.id === id)

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Match not found</h1>
          <Link href="/">
            <Button>Back to Matches</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Matches
          </Button>
        </Link>
      </div>

      <div className="bg-secondary py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{match.format}</h1>
            <p className="text-muted-foreground text-lg">{match.time}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <TeamColumn team={match.teamA} side="left" />
          <TeamColumn team={match.teamB} side="right" />
        </div>

        <div className="mb-12">
          <StadiumInfo stadium={match.stadium} />
        </div>

        <div className="flex justify-center">
          <Link href={`/prediction/${match.id}`}>
            <Button size="lg" className="text-lg px-8">
              Predict Result →
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
