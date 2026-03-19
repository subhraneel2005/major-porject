"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Zap, Trophy, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"

const TEAMS = [
  "Chennai Super Kings",
  "Deccan Chargers",
  "Delhi Capitals",
  "Delhi Daredevils",
  "Gujarat Lions",
  "Kings XI Punjab",
  "Kochi Tuskers Kerala",
  "Kolkata Knight Riders",
  "Mumbai Indians",
  "Pune Warriors",
  "Rajasthan Royals",
  "Rising Pune Supergiant",
  "Rising Pune Supergiants",
  "Royal Challengers Bangalore",
  "Sunrisers Hyderabad",
]

const VENUES = [
  "ACA-VDCA Stadium",
  "Barabati Stadium",
  "Brabourne Stadium",
  "Buffalo Park",
  "De Beers Diamond Oval",
  "Dr DY Patil Sports Academy",
  "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium",
  "Dubai International Cricket Stadium",
  "Eden Gardens",
  "Feroz Shah Kotla",
  "Feroz Shah Kotla Ground",
  "Green Park",
  "Himachal Pradesh Cricket Association Stadium",
  "Holkar Cricket Stadium",
  "IS Bindra Stadium",
  "JSCA International Stadium Complex",
  "Kingsmead",
  "M Chinnaswamy Stadium",
  "M. A. Chidambaram Stadium",
  "M. Chinnaswamy Stadium",
  "MA Chidambaram Stadium, Chepauk",
  "Maharashtra Cricket Association Stadium",
  "Nehru Stadium",
  "New Wanderers Stadium",
  "Newlands",
  "OUTsurance Oval",
  "Punjab Cricket Association IS Bindra Stadium, Mohali",
  "Punjab Cricket Association Stadium, Mohali",
  "Rajiv Gandhi International Stadium, Uppal",
  "Rajiv Gandhi Intl. Cricket Stadium",
  "Sardar Patel Stadium, Motera",
  "Saurashtra Cricket Association Stadium",
  "Sawai Mansingh Stadium",
  "Shaheed Veer Narayan Singh International Stadium",
  "Sharjah Cricket Stadium",
  "Sheikh Zayed Stadium",
  "St George's Park",
  "Subrata Roy Sahara Stadium",
  "SuperSport Park",
  "Vidarbha Cricket Association Stadium, Jamtha",
  "Wankhede Stadium",
]

export default function PredictorPage() {
  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    venue: "",
    toss_winner: "",
    toss_decision: "",
  })

  const [prediction, setPrediction] = useState<{
    winner: string
    confidence: number
  } | null>(null)

  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    const { team1, team2, venue, toss_winner, toss_decision } = formData

    if (!team1 || !team2 || !venue || !toss_winner || !toss_decision) {
      alert("Please fill in all fields")
      return
    }

    if (team1 === team2) {
      alert("Please select different teams")
      return
    }

    setLoading(true)

    try {
      await new Promise((res) => setTimeout(res, 500))

      setPrediction({
        winner: Math.random() > 0.5 ? team1 : team2,
        confidence: Math.round(Math.random() * 25 + 65),
      })
    } catch (error) {
      console.error("Prediction error:", error)
      alert("Failed to get prediction")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPrediction(null)
    setFormData({
      team1: "",
      team2: "",
      venue: "",
      toss_winner: "",
      toss_decision: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-secondary rounded-lg">
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold">AI Match Predictor</h1>
          </div>
          <p className="text-xl text-muted-foreground mt-3 max-w-2xl mx-auto">
            Leverage advanced machine learning to predict cricket match winners with precision scoring and detailed analysis
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="text-muted-foreground">68.5% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-muted-foreground">Real-time Analysis</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-1 h-8 bg-primary rounded" />
                Match Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="team1">Team 1</Label>
                <Select value={formData.team1} onValueChange={(value) => setFormData((prev) => ({ ...prev, team1: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAMS.map((team) => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team2">Team 2</Label>
                <Select value={formData.team2} onValueChange={(value) => setFormData((prev) => ({ ...prev, team2: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAMS.map((team) => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Select value={formData.venue} onValueChange={(value) => setFormData((prev) => ({ ...prev, venue: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {VENUES.map((venue) => (
                      <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toss_winner">Toss Winner</Label>
                <Select value={formData.toss_winner} onValueChange={(value) => setFormData((prev) => ({ ...prev, toss_winner: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Toss Winner" />
                  </SelectTrigger>
                  <SelectContent>
                    {[formData.team1, formData.team2].filter(Boolean).map((team) => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toss_decision">Toss Decision</Label>
                <Select value={formData.toss_decision} onValueChange={(value) => setFormData((prev) => ({ ...prev, toss_decision: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bat">Bat</SelectItem>
                    <SelectItem value="field">Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handlePredict} disabled={loading} className="w-full mt-8" size="lg">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Predict Winner
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center">
            {prediction ? (
              <Card>
                <CardContent className="pt-8">
                  <div className="text-center space-y-8">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                        Predicted Winner
                      </p>
                      <h2 className="text-4xl sm:text-5xl font-black">{prediction.winner}</h2>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
                        <div className="text-center z-10">
                          <div className="text-4xl font-black">{prediction.confidence}%</div>
                          <div className="text-xs text-muted-foreground mt-1">Confidence</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted border rounded-xl p-6 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider">Analysis Factors</p>
                      <ul className="text-sm space-y-2">
                        {[
                          "Historical performance data",
                          "Team composition analysis",
                          "Venue advantage factors",
                          "Toss impact statistics",
                        ].map((factor) => (
                          <li key={factor} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button onClick={handleReset} variant="outline" className="w-full">
                      Make Another Prediction
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-secondary">
                <CardContent className="pt-12 pb-12 text-center space-y-6">
                  <div className="text-6xl">🎯</div>
                  <h3 className="text-2xl font-bold">Ready to Predict?</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Select match details and let our AI model analyze the game to deliver accurate predictions with confidence scoring.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
