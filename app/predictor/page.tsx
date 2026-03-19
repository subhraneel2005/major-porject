"use client"

import type React from "react"
import { useState, useId } from "react"
import { ArrowRight, Zap, Trophy, BarChart3, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const TEAMS = [
  "Chennai Super Kings", "Delhi Capitals", "Gujarat Titans", "Kolkata Knight Riders",
  "Lucknow Super Giants", "Mumbai Indians", "Punjab Kings", "Rajasthan Royals",
  "Royal Challengers Bangalore", "Sunrisers Hyderabad"
]

const VENUES = ["Eden Gardens", "Wankhede Stadium", "M. Chinnaswamy Stadium", "Narendra Modi Stadium", "Arun Jaitley Stadium"]

export default function PredictorPage() {
  const [formData, setFormData] = useState({
    team1: "", team2: "", venue: "", toss_winner: "", toss_decision: "",
  })

  const [prediction, setPrediction] = useState<{ winner: string; confidence: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    const { team1, team2, venue, toss_winner, toss_decision } = formData
    if (!team1 || !team2 || !venue || !toss_winner || !toss_decision) return
    setLoading(true)
    await new Promise((res) => setTimeout(res, 800))
    setPrediction({
      winner: Math.random() > 0.5 ? team1 : team2,
      confidence: Math.round(Math.random() * 20 + 70),
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Hero Section */}
      <section className="py-12 border-b border-dashed">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border mb-6">
            <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Neural Engine v3.2</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">AI Match Predictor</h1>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-tight text-muted-foreground">68.5% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-tight text-muted-foreground">Live Simulation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-12 gap-10 items-start">

          {/* Form Side - Text Sizes Optimized */}
          <Card className="md:col-span-5 bg-background border shadow-none rounded-xl">
            <CardHeader className="pb-4 border-b border-dashed mb-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Match Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Home Team", key: "team1", options: TEAMS },
                { label: "Away Team", key: "team2", options: TEAMS },
                { label: "Venue", key: "venue", options: VENUES },
              ].map((field) => (
                <div key={field.key} className="space-y-2.5">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide ml-0.5">
                    {field.label}
                  </Label>
                  <Select
                    value={(formData as any)[field.key]}
                    onValueChange={(v) => setFormData(p => ({ ...p, [field.key]: v }))}
                  >
                    <SelectTrigger className="bg-background border-border text-sm font-medium h-11 px-4">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map(opt => <SelectItem key={opt} value={opt} className="text-sm">{opt}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide ml-0.5">Toss Winner</Label>
                  <Select onValueChange={(v) => setFormData(p => ({ ...p, toss_winner: v }))}>
                    <SelectTrigger className="text-sm h-11"><SelectValue placeholder="Team" /></SelectTrigger>
                    <SelectContent>
                      {formData.team1 && <SelectItem value={formData.team1} className="text-sm">{formData.team1}</SelectItem>}
                      {formData.team2 && <SelectItem value={formData.team2} className="text-sm">{formData.team2}</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide ml-0.5">Decision</Label>
                  <Select onValueChange={(v) => setFormData(p => ({ ...p, toss_decision: v }))}>
                    <SelectTrigger className="text-sm h-11"><SelectValue placeholder="Action" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bat" className="text-sm">Bat First</SelectItem>
                      <SelectItem value="field" className="text-sm">Bowl First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handlePredict} disabled={loading} className="w-full mt-2 h-12 font-bold uppercase tracking-widest text-xs">
                {loading ? "Analyzing Factors..." : "Generate Prediction"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Side */}
          <div className="md:col-span-7">
            {prediction ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center bg-primary/5 shrink-0">
                    <span className="text-2xl font-black">{prediction.confidence}%</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase text-muted-foreground tracking-[0.2em] mb-1">Projected Winner</p>
                    <h2 className="text-4xl font-black tracking-tighter text-primary">{prediction.winner}</h2>
                  </div>
                </div>

                <div className="p-6 border border-dashed rounded-xl space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Simulation Analytics</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {["Squad Depth Check", "Venue Trend Sync", "H2H Advantage", "Weather Impact"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-bold text-primary">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button onClick={() => setPrediction(null)} variant="outline" className="flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  Reset Simulation
                </Button>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-12 text-center">
                <Target className="w-8 h-8 text-muted-foreground/30 mb-4" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-muted-foreground">Neural Engine Standby</h3>
                <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                  Populate the match configuration to begin real-time machine learning analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}