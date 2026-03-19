"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadToHeadChart({ match }: any) {
  const data = [
    { year: "2021", teamA: 2, teamB: 1 },
    { year: "2022", teamA: 1, teamB: 2 },
    { year: "2023", teamA: 3, teamB: 1 },
    { year: "2024", teamA: 2, teamB: 2 },
    { year: "2025", teamA: 1, teamB: 0 },
  ]

  const COLORS = ["#ff6b6b", "#4ecdc4"]

  return (
    <Card className="bg-background border shadow-none rounded-xl overflow-hidden">
      <CardHeader className="pb-0 pt-4 px-5 bg-background">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            H2H History
          </CardTitle>
          <span className="text-[9px] font-mono text-muted-foreground border px-1.5 py-0.5 rounded">
            5Y TREND
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 bg-background">
        {/* Compact height 200px to match the dashboard flow */}
        <div className="h-[200px] w-full text-primary">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border p-2 shadow-sm rounded-md border-border">
                        <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">Season {payload[0].payload.year}</p>
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
              <Line
                type="monotone"
                dataKey="teamA"
                stroke={COLORS[0]}
                strokeWidth={2}
                dot={{ fill: COLORS[0], r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="teamB"
                stroke={COLORS[1]}
                strokeWidth={2}
                dot={{ fill: COLORS[1], r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Minimal Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-dashed border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[0] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate max-w-[80px]">
              {match.teamA.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[1] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground truncate max-w-[80px]">
              {match.teamB.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}