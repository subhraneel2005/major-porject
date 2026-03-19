"use client"

import { useState } from "react"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import MatchCard from "@/components/match-card"
import { matchesData } from "@/lib/data"

export default function Home() {
  const [selectedFormat, setSelectedFormat] = useState("All")

  const filteredMatches =
    selectedFormat === "All" ? matchesData : matchesData.filter((match) => match.format === selectedFormat)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Today's Matches</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore upcoming cricket matches and get AI-powered predictions backed by advanced analytics
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
            <Button
              onClick={() => setSelectedFormat("All")}
              variant={selectedFormat === "All" ? "default" : "outline"}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Matches
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMatches.length} {selectedFormat !== "All" ? selectedFormat : ""} match
            {filteredMatches.length !== 1 ? "es" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Link key={match.id} href={`/match/${match.id}`}>
              <MatchCard match={match} />
            </Link>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No matches found for {selectedFormat} format</p>
          </div>
        )}
      </div>

      <div className="bg-muted py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Upcoming Matches", value: matchesData.length },
              { label: "Prediction Accuracy", value: "94.2%" },
              { label: "Teams Analyzed", value: "1,240+" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
