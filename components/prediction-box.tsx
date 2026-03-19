import { Trophy, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PredictionBox({ match }: any) {
  const prediction = match.prediction

  return (
    <Card>
      <CardContent className="pt-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 bg-secondary px-4 py-2 rounded-full">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-semibold">AI PREDICTION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-2">{prediction.winner}</h2>

          <p className="text-xl mb-2">Expected Winner</p>
          <p className="text-muted-foreground">Based on advanced statistical analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-border">
          {[
            {
              label: "Win Probability",
              value: prediction.winProbability,
              icon: <TrendingUp className="w-5 h-5" />,
            },
            {
              label: "Confidence Level",
              value: prediction.confidence,
              icon: <Trophy className="w-5 h-5" />,
            },
            {
              label: "Score Prediction",
              value: prediction.scoreRange,
              icon: <TrendingUp className="w-5 h-5" />,
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center mb-2">{item.icon}</div>
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
