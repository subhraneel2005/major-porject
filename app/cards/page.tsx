"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// ── Types ────────────────────────────────────────────────────────────────────
interface PlayerStats {
  matches: number
  totalRuns: number
  highestScore: number
  battingAverage: number
  wickets: number
  economy: number | null
  strikeRate: number
}

interface Player {
  id: string
  name: string
  role: string
  image: string
  stats: PlayerStats
}

interface Team {
  name: string
  team_short: string
  captain: string
  color: string
  players: Player[]
}

// ── Team accent colours ───────────────────────────────────────────────────────
const TEAM_COLORS: Record<string, string> = {
  CSK: "#F9CD1B",
  MI: "#009bde",
  RCB: "#EC1C24",
  KKR: "#a855f7",
  DC: "#0078bc",
  PBKS: "#e63946",
  RR: "#e91e8c",
  SRH: "#f26522",
  GT: "#1c8b5e",
  LSG: "#00b4d8",
}

// ── IPL titles per team ───────────────────────────────────────────────────────
const TEAM_TITLES: Record<string, number> = {
  CSK: 5, MI: 5, KKR: 3, RR: 1, SRH: 1, GT: 1,
  RCB: 1, DC: 0, PBKS: 0, LSG: 0,
}

// ── Role badge colours ────────────────────────────────────────────────────────
const ROLE_BADGE: Record<string, string> = {
  Batsman: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Wicketkeeper: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "All-Rounder": "bg-green-500/20 text-green-400 border-green-500/30",
  Bowler: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/players.json")
      .then((r) => r.json())
      .then((data: Record<string, any>) => {
        const parsed: Team[] = Object.entries(data).map(([teamName, teamData]) => ({
          name: teamName,
          team_short: teamData.team_short,
          captain: teamData.captain,
          color: TEAM_COLORS[teamData.team_short] ?? "#ffffff",
          players: teamData.players,
        }))
        setTeams(parsed)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading teams…</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Header ── */}
        <div className="text-center mb-14 animate-slide-in-up">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-3">IPL 2025</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground glow-accent mb-4">All Teams</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Click any team card to explore their full squad
          </p>
        </div>

        {/* ── Teams Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teams.map((team, index) => {
            const titles = TEAM_TITLES[team.team_short] ?? 0
            return (
              <div
                key={team.team_short}
                onClick={() => setSelectedTeam(team)}
                className="animate-slide-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                  <div className="h-1.5 w-full" style={{ backgroundColor: team.color }} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg"
                        style={{
                          backgroundColor: `${team.color}22`,
                          color: team.color,
                          border: `2px solid ${team.color}44`,
                        }}
                      >
                        {team.team_short}
                      </div>
                      {titles > 0 ? (
                        <div className="flex items-center gap-1.5 bg-accent/10 border border-accent/30 rounded-full px-3 py-1">
                          <span className="text-xs">🏆</span>
                          <span className="text-accent text-xs font-bold">{titles}x</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-full px-3 py-1">
                          <span className="text-muted-foreground text-xs font-medium">No titles</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-foreground leading-tight mb-1 group-hover:text-accent transition-colors duration-300">
                      {team.name}
                    </h2>

                    <div className="border-t border-border pt-4 mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Captain</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{team.captain}</p>
                      </div>
                      <div
                        className="text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${team.color}22`, color: team.color }}
                      >
                        Squad →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Dark Backdrop ── */}
      <div
        onClick={() => setSelectedTeam(null)}
        className={cn(
          "fixed inset-0 z-40 bg-black/85 backdrop-blur-sm transition-all duration-300",
          selectedTeam ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* ── Squad Side Drawer ── */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[440px] z-50 bg-card border-l border-border flex flex-col transition-transform duration-500 ease-in-out shadow-2xl",
          selectedTeam ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedTeam && (
          <>
            {/* Drawer Header */}
            <div
              className="relative px-6 pt-6 pb-5 flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${selectedTeam.color}18, transparent)` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: selectedTeam.color }} />

              {/* Close */}
              <button
                onClick={() => setSelectedTeam(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Team identity */}
              <div className="flex items-center gap-4 mt-2">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
                  style={{
                    backgroundColor: `${selectedTeam.color}22`,
                    color: selectedTeam.color,
                    border: `2px solid ${selectedTeam.color}55`,
                  }}
                >
                  {selectedTeam.team_short}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">
                    {selectedTeam.name}
                  </h2>

                  <p className="text-sm text-white mt-0.5">
                    {(TEAM_TITLES[selectedTeam.team_short] ?? 0) > 0
                      ? `🏆 ${TEAM_TITLES[selectedTeam.team_short]}x Champion`
                      : "No titles yet"}
                  </p>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex gap-3 mt-5">
                <div className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Captain</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedTeam.captain}</p>
                </div>
                <div className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Squad</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedTeam.players.length} Players</p>
                </div>
              </div>

              {/* Role legend */}
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(ROLE_BADGE).map(([role, cls]) => (
                  <span key={role} className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", cls)}>
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Players List ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Full Squad
              </p>
              <div className="space-y-2">
                {selectedTeam.players.map((player, idx) => (
                  <Link
                    key={player.id}
                    href={`/cards/${encodeURIComponent(player.name)}`}
                  >
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 group">
                      <span className="text-xs text-muted-foreground w-5 text-right flex-shrink-0">
                        {idx + 1}
                      </span>

                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-transform group-hover:scale-110 duration-200"
                        style={{
                          backgroundColor: `${selectedTeam.color}22`,
                          color: selectedTeam.color,
                          border: `1.5px solid ${selectedTeam.color}44`,
                        }}
                      >
                        {player.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{player.name}</p>
                        {/* Mini stats preview */}
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {player.stats.matches} matches · {player.stats.totalRuns} runs
                          {player.stats.wickets > 0 ? ` · ${player.stats.wickets} wkts` : ""}
                        </p>
                      </div>

                      {/* Role badge */}
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0",
                          ROLE_BADGE[player.role] ?? "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        {player.role}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}