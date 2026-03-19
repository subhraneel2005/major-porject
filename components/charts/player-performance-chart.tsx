"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PlayerPerformanceChart({ match }: any) {
  const data = [
    { name: "Player A", avgScore: 45, strikes: 85 },
    { name: "Player B", avgScore: 38, strikes: 78 },
    { name: "Player C", avgScore: 52, strikes: 92 },
    { name: "Player D", avgScore: 35, strikes: 72 },
    { name: "Player E", avgScore: 48, strikes: 88 },
  ]

  const COLORS = ["#ff6b6b", "#4ecdc4"]

  return (
    <Card className="bg-background border shadow-none rounded-xl overflow-hidden max-w-full">
      <CardHeader className="pb-0 pt-4 px-5 bg-background">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Player Impact
          </CardTitle>
          <span className="text-[9px] font-mono text-muted-foreground border px-1.5 py-0.5 rounded">
            LIVE
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 bg-background">
        {/* Adjusted height to 220px for compactness and added bottom margin to prevent cutoff */}
        <div className="h-[220px] w-full text-primary">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -25, bottom: 40 }} // Increased bottom margin
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0} // Forces all names to show
                // Rotated tick prevents names from overlapping or cutting off
                tick={{
                  fill: 'currentColor',
                  fontSize: 10,
                  fontWeight: 500,
                  textAnchor: 'end'
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'currentColor', fontSize: 10 }}
                domain={[0, 100]}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted)/0.15)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border p-2 shadow-sm rounded-md border-border">
                        <p className="text-[9px] font-bold uppercase text-muted-foreground mb-1">
                          {payload[0].payload.name}
                        </p>
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-semibold flex items-center justify-between gap-3 text-primary">
                            Avg: <span style={{ color: COLORS[0] }}>{payload[0].value}</span>
                          </p>
                          <p className="text-[11px] font-semibold flex items-center justify-between gap-3 text-primary">
                            SR: <span style={{ color: COLORS[1] }}>{payload[1].value}</span>
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="avgScore"
                fill={COLORS[0]}
                radius={[2, 2, 0, 0]}
                barSize={24} // Slimmer bars for a more compact look
              />
              <Bar
                dataKey="strikes"
                fill={COLORS[1]}
                radius={[2, 2, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compact Legend */}
        <div className="flex items-center gap-4 mt-2 pt-3 border-t border-dashed border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[0] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Avg Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[1] }} />
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Strike Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}