"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { cn } from "@/lib/utils"

interface TeamProps {
  team: any
  side?: "left" | "right"
}

export default function TeamColumn({ team, side = "left" }: TeamProps) {
  const isRight = side === "right"
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null)

  const battingStats = selectedPlayer
    ? [
        { label: "Matches",    value: selectedPlayer.stats?.matches ?? "-" },
        { label: "Total Runs", value: selectedPlayer.stats?.totalRuns ?? "-" },
        { label: "Highest",    value: selectedPlayer.stats?.highestScore ?? "-" },
        { label: "Average",    value: selectedPlayer.stats?.battingAverage ?? "-" },
        { label: "4s",         value: selectedPlayer.stats?.fours ?? "-" },
        { label: "6s",         value: selectedPlayer.stats?.sixes ?? "-" },
        { label: "50s",        value: selectedPlayer.stats?.fifties ?? "-" },
        { label: "100s",       value: selectedPlayer.stats?.hundreds ?? "-" },
      ]
    : []

  const bowlingStats = selectedPlayer
    ? [
        { label: "Wickets",     value: selectedPlayer.stats?.wickets ?? "-" },
        { label: "Economy",     value: selectedPlayer.stats?.economy ?? "-" },
        { label: "Strike Rate", value: selectedPlayer.stats?.strikeRate ?? "-" },
      ]
    : []

  return (
    <>
      <Card className="border-none shadow-none bg-transparent">

        {/* Team Header */}
        <CardHeader
          className={cn(
            "flex flex-col gap-4 pb-6",
            isRight ? "md:items-end text-right" : "md:items-start text-left"
          )}
        >
          <div className={cn("flex items-center gap-4 w-full", isRight ? "md:flex-row-reverse" : "flex-row")}>
            <Avatar className="w-20 h-20 ring-4 ring-muted">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">
                {team.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold tracking-tight">{team.name}</CardTitle>
              <div className={cn("flex flex-wrap gap-2 mt-2", isRight ? "md:justify-end" : "justify-start")}>
                <Badge variant="secondary" className="font-mono">
                  {team.stats.wins}W - {team.stats.losses}L
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {team.stats.winRate}% WR
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* Core Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/50 border">
            {[
              { label: "Avg Score", value: team.stats.avgScore },
              { label: "Form",      value: team.stats.recentForm },
              { label: "Rank",      value: `#${team.stats.ranking}` },
              { label: "Stars",     value: team.stats.keyPlayersCount },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Squad */}
          <div>
            <div className={cn("flex items-center gap-2 mb-6", isRight ? "md:flex-row-reverse" : "flex-row")}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Starting Squad
              </h3>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {team.players.map((player: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPlayer(player)}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="w-12 h-12 mb-2 rounded-full overflow-hidden border-2 border-background ring-2 ring-muted group-hover:ring-accent transition-all duration-300 group-hover:scale-110">
                    {player.image ? (
                      <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <Avatar className="w-full h-full">
                        <AvatarFallback className="bg-secondary text-xs font-bold">
                          {player.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="w-full px-1">
                    <p className="text-[11px] font-bold leading-tight truncate w-full">{player.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{player.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Player Detail Dialog */}
      <Dialog open={!!selectedPlayer} onOpenChange={(open) => !open && setSelectedPlayer(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden z-50 [&>button]:hidden">

          {/* ✅ Fixes the accessibility console error — visually hidden but read by screen readers */}
          <VisuallyHidden>
            <DialogTitle>{selectedPlayer?.name ?? "Player Details"}</DialogTitle>
          </VisuallyHidden>

          {selectedPlayer && (
            <>
              {/* Player Image */}
              <div className="relative w-full h-52 overflow-hidden">
                {selectedPlayer.image ? (
                  <img
                    src={selectedPlayer.image}
                    alt={selectedPlayer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                    <span className="text-6xl font-bold text-accent">
                      {selectedPlayer.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <h2 className="text-2xl font-bold text-foreground">{selectedPlayer.name}</h2>
                  <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-accent/80 text-accent-foreground font-semibold">
                    {selectedPlayer.role}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="px-5 py-5 space-y-5">

                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Batting</p>
                  <div className="grid grid-cols-4 gap-2">
                    {battingStats.map((stat) => (
                      <div key={stat.label} className="bg-muted/50 border border-border rounded-xl p-2 text-center">
                        <div className="text-sm font-bold text-accent">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border" />

                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Bowling</p>
                  <div className="grid grid-cols-3 gap-2">
                    {bowlingStats.map((stat) => (
                      <div key={stat.label} className="bg-muted/50 border border-border rounded-xl p-2 text-center">
                        <div className="text-sm font-bold text-accent">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogClose asChild>
                  <Button variant="outline" className="w-full border-accent/40 text-accent hover:bg-accent/10 mt-2">
                    Close
                  </Button>
                </DialogClose>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Heavier backdrop */}
      <style jsx global>{`
        [data-radix-dialog-overlay] {
          background-color: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(4px) !important;
        }
      `}</style>
    </>
  )
}