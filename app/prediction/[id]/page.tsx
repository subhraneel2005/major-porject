"use client"

import { use } from "react"
import Link from "next/link"
import { ChevronLeft, BarChart3, BrainCircuit, Activity, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PredictionBox from "@/components/prediction-box"
import WinProbabilityChart from "@/components/charts/win-probability-chart"
import PlayerPerformanceChart from "@/components/charts/player-performance-chart"
import HeadToHeadChart from "@/components/charts/head-to-head-chart"
import TeamStrengthsChart from "@/components/charts/team-strengths-chart"
import PitchReport from "@/components/pitch-report"
import { matchesData } from "@/lib/data"

export default function PredictionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const match = matchesData.find((m) => m.id === id)

  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-xl font-semibold">Analytics Unavailable</h1>
          <p className="text-sm text-muted-foreground">The data for this match is currently processing or unavailable.</p>
          <Link href="/">
            <Button variant="outline" className="w-full">Return to Schedule</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Top Utility Bar */}
      <nav className="sticky top-0 z-30 w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/match/${match.id}`}>
            <Button variant="outline" size={"sm"}>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Match</span>
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="rounded-md px-2 py-0 h-6 text-[10px] font-bold tracking-widest uppercase">
              <Activity className="w-3 h-3 mr-1.5 text-green-500" />
              Live Data
            </Badge>
          </div>
        </div>
      </nav>

      {/* Simplified Page Header */}
      <header className="bg-background pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-2 border rounded-lg">
              <BrainCircuit className="w-5 h-5 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Match Analytics
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Statistical modeling based on venue conditions, player form, and historical head-to-head data.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Primary Insight Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <LayoutGrid className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Primary Prediction</h2>
          </div>
          <PredictionBox match={match} />
        </section>

        {/* Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Visualization */}
          <section className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                Win Probability Evolution
              </h3>
            </div>
            <div className="border rounded-xl p-6 bg-background min-h-[400px]">
              <WinProbabilityChart match={match} />
            </div>
          </section>

          {/* Sidebar Stats */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Team Comparisons</h3>
              <div className="border rounded-xl p-5 space-y-6">
                <div className="pb-6 border-b">
                  <TeamStrengthsChart match={match} />
                </div>
                <div>
                  <HeadToHeadChart match={match} />
                </div>
              </div>
            </div>
          </aside>

          {/* Full Width Player Analysis */}
          <section className="lg:col-span-12 space-y-4">
            <div className="flex flex-col space-y-1">
              <h3 className="text-sm font-bold">Player Performance Projection</h3>
              <p className="text-xs text-muted-foreground">Estimated impact based on recent 5-match rolling average.</p>
            </div>
            <div className="border rounded-xl p-6 bg-background">
              <PlayerPerformanceChart match={match} />
            </div>
          </section>
        </div>

        {/* Footer Analysis */}
        <section className="pt-10 border-t">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Venue Analysis</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Impact of local conditions including humidity, pitch wear, and stadium history.
              </p>
            </div>
            <div className="border rounded-xl overflow-hidden">
              <PitchReport stadium={match.stadium} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}