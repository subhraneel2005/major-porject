"use client"

import Link from "next/link"
import { Activity, Calendar, Zap, Box, LayoutGrid } from "lucide-react"
import { Card } from "@/components/ui/card"
import MatchCard from "@/components/match-card"
import { matchesData } from "@/lib/data"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Hero Section - Clean & High-Impact */}
      <section className="py-12 border-b border-dashed border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border bg-background">
                <Box className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Neural Analysis System
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Match Center
              </h1>
              <p className="text-[13px] font-bold text-muted-foreground max-w-lg leading-relaxed uppercase tracking-tight">
                Predictive simulation and historical trend mapping for current fixtures.
              </p>
            </div>

            {/* Quick System Stats */}
            <div className="flex gap-10 border-l border-dashed border-border pl-10 hidden md:flex">
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Accuracy</p>
                <p className="text-xl font-black tracking-tighter">75%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Latency</p>
                <p className="text-xl font-black tracking-tighter">14ms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation / Ticker Bar */}
      <section className="border-b border-dashed border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Schedule</span>
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Active Feed</span>
            </div>
            <div className="flex-grow" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">System_Status:</span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase underline decoration-emerald-500/30 underline-offset-4 tracking-tighter">
                Online
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Match Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <LayoutGrid className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Upcoming Fixtures
          </h2>
          <div className="h-[1px] flex-grow bg-border border-dashed border-t" />
          <span className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5 rounded uppercase">
            Count: {matchesData.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchesData.map((match) => (
            <Link key={match.id} href={`/match/${match.id}`} className="transition-transform active:scale-[0.97] hover:opacity-90">
              <MatchCard match={match} />
            </Link>
          ))}
        </div>

        {matchesData.length === 0 && (
          <div className="py-32 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center">
            <Zap className="w-10 h-10 text-muted-foreground opacity-10 mb-4" />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              No active match data found
            </p>
          </div>
        )}
      </section>
    </div>
  )
}