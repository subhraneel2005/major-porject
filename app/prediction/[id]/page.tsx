"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import PredictionBox from "@/components/prediction-box"
import WinProbabilityChart from "@/components/charts/win-probability-chart"
import PlayerPerformanceChart from "@/components/charts/player-performance-chart"
import HeadToHeadChart from "@/components/charts/head-to-head-chart"
import TeamStrengthsChart from "@/components/charts/team-strengths-chart"
import PitchReport from "@/components/pitch-report"
import { matchesData } from "@/lib/data"
import { use } from "react"

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
        <Link href={`/match/${match.id}`}>
          <Button variant="ghost">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Match Details
          </Button>
        </Link>
      </div>

      <div className="bg-secondary py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Match Prediction & Analytics</h1>
          <p className="text-muted-foreground">Powered by AI-driven statistical analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <PredictionBox match={match} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <WinProbabilityChart match={match} />
          <TeamStrengthsChart match={match} />
          <PlayerPerformanceChart match={match} />
          <HeadToHeadChart match={match} />
        </div>

        <PitchReport stadium={match.stadium} />
      </div>
    </main>
  )
}
