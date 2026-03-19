"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WinProbabilityChart({ match }: any) {
  const data = [
    { name: match.teamA.name, value: 55 },
    { name: match.teamB.name, value: 45 },
  ]

  // Using hardcoded Hex for SVG compatibility 
  // Primary (Black/Dark) and Muted (Light Gray)
  const COLORS = ["#ff6b6b", "#4ecdc4"]

  return (
    <Card className="bg-background border shadow-none flex flex-col h-full rounded-xl">
      <CardHeader className="pb-0 pt-6 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Win Probability
          </CardTitle>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-6">
        {/* Chart Wrapper */}
        <div className="relative w-full aspect-square max-h-[240px] mx-auto">

          {/* THE CENTERED STAT: Absolute positioning with flex centering */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-bold tracking-tighter tabular-nums">
              {data[0].value}%
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              {data[0].name}
            </span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="95%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="outline-none"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border px-3 py-2 shadow-sm rounded-md border-border">
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                          {payload[0].name}
                        </p>
                        <p className="text-sm font-bold">{payload[0].value}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend - Clean & Simple */}
        <div className="mt-8 space-y-3">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full border border-black/5"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm font-medium text-foreground">
                  {entry.name}
                </span>
              </div>
              <span className="text-sm font-bold tabular-nums">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}