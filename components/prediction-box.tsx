"use client"
import { Trophy, TrendingUp, Target, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PredictionBox({ match }: any) {
  const prediction = match.prediction

  return (
    <Card className="bg-background border shadow-sm overflow-hidden">
      <CardContent className="p-8 sm:p-12">
        {/* Header - Simple & Clean */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" strokeWidth={2} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Match Projection</h2>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono font-medium rounded-full px-3">
            v2.1
          </Badge>
        </div>

        {/* The Big Reveal */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Predicted Winner
          </p>
          <h3 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground">
            {prediction.winner}
          </h3>
          <div className="h-1 w-20 bg-primary mt-6 rounded-full" />
        </div>

        {/* Stats Row - Minimal spacing, no internal borders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            {
              label: "Probability",
              value: prediction.winProbability,
              icon: Percent,
            },
            {
              label: "AI Confidence",
              value: prediction.confidence,
              icon: Target,
            },
            {
              label: "Score Range",
              value: prediction.scoreRange,
              icon: TrendingUp,
            },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <p className="text-3xl font-bold tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}