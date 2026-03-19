"use client"
import { use } from "react"
import Link from "next/link"
import { ChevronLeft, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TeamColumn from "@/components/team-column"
import StadiumInfo from "@/components/stadium-info"
import { matchesData } from "@/lib/data"

export default function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const match = matchesData.find((m) => m.id === id)

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Match not found</h1>
          <p className="text-muted-foreground mb-6">The match you are looking for doesn't exist or has been moved.</p>
          <Link href="/">
            <Button className="w-full">Back to Matches</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" />
              Back to Schedule
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        {/* Match Identity Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            {match.format}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Match Details
          </h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{match.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{match.stadium.name}</span>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 items-center mb-16">
          <TeamColumn team={match.teamA} side="left" />

          {/* Visual "VS" Divider */}
          <div className="z-10 flex flex-col items-center justify-center -my-4 md:my-0">
            <div className="w-12 h-12 rounded-full bg-background border-4 border-muted flex items-center justify-center shadow-sm">
              <span className="text-sm font-black italic text-muted-foreground">VS</span>
            </div>
            <div className="hidden md:block w-px h-full bg-border absolute top-0 bottom-0 -z-10" />
          </div>

          <TeamColumn team={match.teamB} side="right" />
        </div>

        {/* Info & Action Grid */}
        <div className="grid grid-cols-1 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Venue Information
            </h2>
            <StadiumInfo stadium={match.stadium} />
          </section>

          <div className="flex flex-col items-center pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Ready to test your knowledge?</p>
            <Link href={`/prediction/${match.id}`} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-80 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                Predict Result
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}