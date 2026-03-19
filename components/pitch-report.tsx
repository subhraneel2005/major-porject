import { Cloud, Droplets, Wind, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PitchReport({ stadium }: any) {
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
    <Card>
      <CardHeader className="bg-muted">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Pitch & Weather Report
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Cloud className="w-6 h-6" />,
              label: "Weather",
              value: report.weather,
            },
            {
              icon: <Droplets className="w-6 h-6" />,
              label: "Humidity",
              value: report.humidity,
            },
            {
              icon: <Wind className="w-6 h-6" />,
              label: "Wind Speed",
              value: report.windSpeed,
            },
            {
              icon: <Trophy className="w-6 h-6" />,
              label: "Pitch Type",
              value: report.conditions,
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
              <p className="text-lg font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Pitch Favours</p>
            <p className="text-lg font-semibold">{report.pitchFavours}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Expected Score Range</p>
            <p className="text-lg font-semibold">{report.prediction}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
