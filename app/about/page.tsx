"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Zap, Users, Shield, Lightbulb, CheckCircle2, Rocket, Activity, Globe } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Neural Predictions",
      description: "Proprietary machine learning models trained on decade-long IPL datasets to simulate match outcomes.",
    },
    {
      icon: BarChart3,
      title: "Quantitative Analytics",
      description: "Multidimensional data processing of player strike rates, venue par scores, and historical head-to-heads.",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Low-latency data pipelines that update win probabilities based on live match parameters.",
    },
    {
      icon: Globe,
      title: "Dataset Coverage",
      description: "Comprehensive tracking of all active franchises with a robust repository of historical performance data.",
    },
    {
      icon: Shield,
      title: "Data Integrity",
      description: "Rigorous data cleaning and verification processes to ensure high-fidelity model training inputs.",
    },
    {
      icon: Lightbulb,
      title: "XAI Architecture",
      description: "Explainable AI logic that clarifies why the model reached a specific prediction through weighted factors.",
    },
  ]

  const benefits = [
    "High-accuracy prediction engine validated against test sets",
    "Integration of RAG-based AI for natural language queries",
    "Real-time situational match analysis and probability",
    "Normalization of player stats across different venues",
    "Technical UI designed for clear data visualization",
    "Dynamic feature engineering based on live toss results",
  ]

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Header Section */}
      <section className="py-12 border-b border-dashed border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Project Brief
            </h1>
          </div>
          <p className="text-sm font-bold text-muted-foreground max-w-2xl leading-relaxed uppercase tracking-tight">
            An advanced computational framework for predicting match outcomes using ensemble learning and RAG-augmented intelligence.
          </p>
        </div>
      </section>

      {/* Tech Specs Bar */}
      <section className="border-b border-dashed border-border py-4 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,847+", label: "MATCHES_PROCESSED" },
              { value: "1,240+", label: "PLAYERS_INDEXED" },
              { value: "94.2%", label: "ACCURACY_TARGET" },
              { value: "14ms", label: "SYSTEM_LATENCY" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Features Grid */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-4 bg-primary rounded-full" />
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">Core Competencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="p-6 border border-border rounded-xl bg-background hover:border-primary/50 transition-colors group">
                <Icon className="w-5 h-5 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium uppercase tracking-tight">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Mission/Why Section */}
        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-dashed border-border">
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">Research Goal</h2>
            <p className="text-sm font-semibold text-primary leading-loose uppercase tracking-tight">
              To revolutionize predictive sports modeling by bridging the gap between raw statistical data and natural language interaction. We aim to provide a platform where complex neural network outputs are translated into actionable, human-readable insights for advanced game analysis.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">Validation Framework</h2>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}