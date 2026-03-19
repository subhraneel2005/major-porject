"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TeamProps {
  team: any;
  side?: "left" | "right";
}

export default function TeamColumn({ team, side = "left" }: TeamProps) {
  const isRight = side === "right"

  return (
    <Card className="border-none shadow-none bg-transparent">
      {/* Team Header */}
      <CardHeader className={cn(
        "flex flex-col gap-4 pb-6",
        isRight ? "md:items-end text-right" : "md:items-start text-left"
      )}>
        <div className={cn(
          "flex items-center gap-4 w-full",
          isRight ? "md:flex-row-reverse" : "flex-row"
        )}>
          <Avatar className="w-20 h-20 ring-4 ring-muted">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">
              {team.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold tracking-tight">{team.name}</CardTitle>
            <div className={cn(
              "flex flex-wrap gap-2 mt-2",
              isRight ? "md:justify-end" : "justify-start"
            )}>
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
        {/* Core Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/50 border">
          {[
            { label: "Avg Score", value: team.stats.avgScore },
            { label: "Form", value: team.stats.recentForm },
            { label: "Rank", value: `#${team.stats.ranking}` },
            { label: "Stars", value: team.stats.keyPlayersCount },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Squad Grid */}
        <div>
          <div className={cn(
            "flex items-center gap-2 mb-6",
            isRight ? "md:flex-row-reverse" : "flex-row"
          )}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Starting Squad
            </h3>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            {team.players.map((player: any, idx: number) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                <Avatar className="w-12 h-12 mb-2 transition-transform group-hover:scale-110">
                  <AvatarFallback className="bg-secondary text-xs font-bold border-2 border-background">
                    {player.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full px-1">
                  <p className="text-[11px] font-bold leading-tight truncate w-full">
                    {player.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {player.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}