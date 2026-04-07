"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { TrendingUp, BarChart3, Target, Users, Globe } from "lucide-react"

// 1. Data from Top Player of the Match Awards (Top 5)
const topPlayersData = [
  { name: "AB de Villiers", awards: 22 },
  { name: "CH Gayle", awards: 21 },
  { name: "RG Sharma", awards: 19 },
  { name: "DA Warner", awards: 18 },
  { name: "MS Dhoni", awards: 17 },
]

// 2. Data from Average Target Runs by Season (Recent Trend)
const seasonTrendData = [
  { season: "2019", avgTarget: 170 },
  { season: "2020/21", avgTarget: 164 },
  { season: "2021", avgTarget: 161 },
  { season: "2022", avgTarget: 173 },
  { season: "2023", avgTarget: 184 },
  { season: "2024", avgTarget: 191 },
]

// 3. Data from Toss Decision Distribution
const tossDecisionData = [
  { name: "Field First", value: 64.5, fill: "#b8ff00" },
  { name: "Bat First", value: 35.5, fill: "#a855f7" },
]

// 4. Data from Model Feature Importance
const featureImportanceData = [
  { feature: "Venue Strength", importance: 26 },
  { feature: "Team 2 ID", importance: 19 },
  { feature: "Venue ID", importance: 18 },
  { feature: "Team 1 ID", importance: 16 },
  { feature: "Current Form", importance: 8 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-secondary border border-dashed rounded-xl">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">Neural Analytics</h1>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Systematic breakdown of {1074} historical match vectors
          </p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-dashed shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Model Accuracy</CardTitle>
                <Target className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">78.0%</div>
              <p className="text-[10px] font-bold uppercase opacity-50">Validation Score</p>
            </CardContent>
          </Card>

          <Card className="border-dashed shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dataset Size</CardTitle>
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">1,074</div>
              <p className="text-[10px] font-bold uppercase opacity-50">Total Matches</p>
            </CardContent>
          </Card>

          <Card className="border-dashed shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Venue</CardTitle>
                <Globe className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">172</div>
              <p className="text-[10px] font-bold uppercase opacity-50">Games in Mumbai</p>
            </CardContent>
          </Card>

          <Card className="border-dashed shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Toss Advantage</CardTitle>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-1">52.8%</div>
              <p className="text-[10px] font-bold uppercase opacity-50">Win rate on toss win</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Toss Decision Pie Chart */}
          <Card className="border-dashed shadow-none bg-muted/5">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Toss Decision Preference</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-tight">Strategy distribution across all seasons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tossDecisionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tossDecisionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Feature Importance Bar Chart */}
          <Card className="border-dashed shadow-none bg-muted/5">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Neural Weight Factors</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-tight">Impact ranking of prediction variables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={featureImportanceData} margin={{ left: 40, right: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                    <Bar dataKey="importance" fill="#b8ff00" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Players Performance */}
          <Card className="border-dashed shadow-none bg-muted/5">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Historical MVP Leaders</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-tight">Cumulative Player of the Match awards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPlayersData} margin={{ bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                    <YAxis style={{ fontSize: '10px' }} />
                    <Bar dataKey="awards" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Scoring Trends */}
          <Card className="border-dashed shadow-none bg-muted/5">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Scoring Evolution</CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold tracking-tight">Average target runs by season (2019-2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="season" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                    <YAxis domain={[150, 200]} style={{ fontSize: '10px' }} />
                    <Line
                      type="monotone"
                      dataKey="avgTarget"
                      stroke="#b8ff00"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#b8ff00" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}