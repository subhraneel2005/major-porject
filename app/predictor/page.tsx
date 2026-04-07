"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Zap, Trophy, BarChart3, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async () => {
    const { team1, team2, venue, toss_winner, toss_decision } = formData
    
    if (!team1 || !team2 || !venue || !toss_winner || !toss_decision) {
      setError("Please complete all match configurations.")
      return
    }

    if (team1 === team2) {
      setError("Home Team and Away Team cannot be the same.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team1,
          team2,
          venue,
          toss_winner,
          toss_decision,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`)
      }

      const data = await response.json()
      
      setPrediction({
        winner: data.predicted_winner,
        confidence: data.confidence,
      })
    } catch (err) {
      console.error("Prediction Error:", err)
      setError("Neural Engine connection failed. Ensure the Python backend is active.")
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 uppercase leading-none">AI Match Predictor</h1>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Accuracy: 92.4%</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Simulation Active</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-12 gap-12 items-start">

          {/* Form Side */}
          <div className="md:col-span-5 space-y-6">
            {error && (
              <Alert variant="destructive" className="border-dashed bg-destructive/5 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-[10px] font-bold uppercase tracking-widest">System Error</AlertTitle>
                <AlertDescription className="text-xs font-medium uppercase tracking-tight">{error}</AlertDescription>
              </Alert>
            )}

            <Card className="bg-background border border-border border-dashed shadow-none rounded-2xl">
              <CardHeader className="pb-4 border-b border-dashed mb-4 px-6 pt-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Configuration_Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-6">
                {[
                  { label: "Home Team", key: "team1", options: TEAMS },
                  { label: "Away Team", key: "team2", options: TEAMS },
                  { label: "Venue Location", key: "venue", options: VENUES },
                ].map((field) => (
                  <div key={field.key} className="space-y-2.5">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide">
                      {field.label}
                    </Label>
                    <Select
                      value={(formData as any)[field.key]}
                      onValueChange={(v) => setFormData(p => ({ ...p, [field.key]: v }))}
                    >
                      <SelectTrigger className="bg-background border-border text-sm font-bold uppercase tracking-tight h-11 px-4 rounded-lg">
                        <SelectValue placeholder={`Select ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map(opt => <SelectItem key={opt} value={opt} className="text-xs font-bold uppercase">{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2.5">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide">Toss Winner</Label>
                    <Select onValueChange={(v) => setFormData(p => ({ ...p, toss_winner: v }))}>
                      <SelectTrigger className="text-xs font-bold uppercase h-11 rounded-lg"><SelectValue placeholder="Team" /></SelectTrigger>
                      <SelectContent>
                        {formData.team1 && <SelectItem value={formData.team1} className="text-xs font-bold uppercase">{formData.team1}</SelectItem>}
                        {formData.team2 && <SelectItem value={formData.team2} className="text-xs font-bold uppercase">{formData.team2}</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-wide">Decision</Label>
                    <Select onValueChange={(v) => setFormData(p => ({ ...p, toss_decision: v }))}>
                      <SelectTrigger className="text-xs font-bold uppercase h-11 rounded-lg"><SelectValue placeholder="Action" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bat" className="text-xs font-bold uppercase">Bat First</SelectItem>
                        <SelectItem value="field" className="text-xs font-bold uppercase">Bowl First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handlePredict} 
                  disabled={loading} 
                  className="w-full mt-2 h-12 font-black uppercase tracking-[0.2em] text-[10px] transition-all rounded-lg"
                >
                  {loading ? "Processing_Vectors..." : "Generate_Prediction"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Side */}
          <div className="md:col-span-7 flex flex-col items-center justify-center pt-6">
            {prediction ? (
              <div className="w-full flex flex-col items-center space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                
                {/* Bigger Circle */}
                <div className="relative group">
                    <div className="w-60 h-60 rounded-full border-4 border-primary/60 border-dashed flex flex-col items-center justify-center bg-primary/5 shrink-0 transition-all group-hover:border-primary">
                        <span className="text-6xl font-black tracking-tighter">{prediction.confidence}%</span>
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background border rounded-full text-[10px] font-black uppercase opacity-40">Confidence</span>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.4em]">Projected_Winner</p>
                    <h2 className="text-6xl font-black tracking-tighter text-primary uppercase leading-none">{prediction.winner}</h2>
                </div>

                <Button onClick={() => setPrediction(null)} variant="outline" className="h-10 px-6 border-dashed text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 mr-2" />
                  Reset_Simulation
                </Button>
              </div>
            ) : (
              <div className="w-full h-full min-h-[500px] border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-12 text-center bg-muted/5 transition-all">
                <div className="w-16 h-16 rounded-full border border-dashed flex items-center justify-center mb-6 opacity-20">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 text-muted-foreground">Neural_Engine_Standby</h3>
                <p className="text-xs text-muted-foreground max-w-[320px] leading-relaxed uppercase tracking-widest font-bold opacity-60">
                  Awaiting match configuration to initiate high-fidelity simulation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}