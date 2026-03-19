"use client"

import { Cloud, Droplets, Wind, Trophy, MapPin, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PitchReport({ stadium }: any) {
  // Safe extraction of the stadium label
  const stadiumLabel = typeof stadium === 'string' ? stadium : stadium?.name || "Unknown Venue";

  const report = {
    conditions: "Good",
    weather: "28°C, Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
    pitchFavours: "Balanced (slight advantage to batsmen)",
    tossAdvantage: "Bat First",
    prediction: "Expect 160-180 runs in T20 format",
  }

  return (
    <Card className="bg-background border shadow-none rounded-xl overflow-hidden">
      <CardHeader className="pb-0 pt-4 px-5 bg-background">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Venue Analysis
          </CardTitle>
          <span className="text-[9px] font-mono text-muted-foreground border px-1.5 py-0.5 rounded uppercase">
            {stadiumLabel.substring(0, 8)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-6 bg-background">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Cloud className="w-3.5 h-3.5" />, label: "Weather", value: report.weather },
            { icon: <Droplets className="w-3.5 h-3.5" />, label: "Humidity", value: report.humidity },
            { icon: <Wind className="w-3.5 h-3.5" />, label: "Wind", value: report.windSpeed },
            { icon: <Trophy className="w-3.5 h-3.5" />, label: "Surface", value: report.conditions },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                {item.icon}
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-primary">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-dashed border-border">
          <div className="flex gap-3">
            <Target className="w-3.5 h-3.5 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Strategic Lean</p>
              <p className="text-[11px] font-semibold text-primary leading-tight">{report.pitchFavours}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Trophy className="w-3.5 h-3.5 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Par Score</p>
              <p className="text-[11px] font-semibold text-primary leading-tight">{report.prediction}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}