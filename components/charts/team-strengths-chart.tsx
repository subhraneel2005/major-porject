"use client"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamStrengthsChart({ match }: any) {
  const data = [
    { category: "Batting", teamA: 85, teamB: 78 },
    { category: "Bowling", teamA: 72, teamB: 88 },
    { category: "Fielding", teamA: 80, teamB: 82 },
    { category: "Consistency", teamA: 75, teamB: 70 },
    { category: "Experience", teamA: 88, teamB: 85 },
    { category: "Form", teamA: 82, teamB: 79 },
  ]

  const COLORS = ["#ff6b6b", "#4ecdc4"]

  return (
    <Card className="bg-background border shadow-none rounded-xl overflow-hidden">
      <CardHeader className="pb-0 pt-4 px-5 bg-background">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Team Strengths
          </CardTitle>
          <span className="text-[9px] font-mono text-muted-foreground border px-1.5 py-0.5 rounded">
            RADAR
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 bg-background">
        {/* Adjusted height to 240px to balance the radar's circular shape */}
        <div className="h-[240px] w-full text-primary">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              {/* PolarGrid uses 'hsl(var(--border))' to stay subtle on bg-background */}
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border p-2 shadow-sm rounded-md border-border">
                        <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">
                          {payload[0].payload.category}
                        </p>
                        <div className="space-y-0.5 text-[11px] font-bold">
                          <p style={{ color: COLORS[0] }}>{match.teamA.name}: {payload[0].value}</p>
                          <p style={{ color: COLORS[1] }}>{match.teamB.name}: {payload[1].value}</p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Radar
                name={match.teamA.name}
                dataKey="teamA"
                stroke={COLORS[0]}
                fill={COLORS[0]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name={match.teamB.name}
                dataKey="teamB"
                stroke={COLORS[1]}
                fill={COLORS[1]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Minimal Legend */}
        <div className="flex items-center gap-4 mt-2 pt-3 border-t border-dashed border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[0] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate max-w-[80px]">
              {match.teamA.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[1] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate max-w-[80px]">
              {match.teamB.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}