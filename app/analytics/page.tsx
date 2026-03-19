"use client"

import Header from "@/components/header"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { TrendingUp, BarChart3, Target, Users } from "lucide-react"

const topPlayersData = [
  { name: "Virat Kohli", avgScore: 85, runs: 1200 },
  { name: "Rohit Sharma", avgScore: 78, runs: 980 },
  { name: "Babar Azam", avgScore: 82, runs: 1050 },
  { name: "Kane Williamson", avgScore: 80, runs: 920 },
  { name: "Pat Cummins", avgScore: 45, runs: 200 },
]

const headToHeadData = [
  { series: "1", india: 65, pakistan: 35 },
  { series: "2", india: 58, pakistan: 42 },
  { series: "3", india: 72, pakistan: 28 },
  { series: "4", india: 68, pakistan: 32 },
  { series: "5", india: 75, pakistan: 25 },
  { series: "6", india: 70, pakistan: 30 },
  { series: "7", india: 80, pakistan: 20 },
]

const winRateData = [
  { name: "India", value: 65, fill: "#b8ff00" },
  { name: "Pakistan", value: 35, fill: "#a855f7" },
]

const teamStrengthData = [
  { metric: "Batting", india: 85, pakistan: 78 },
  { metric: "Bowling", india: 80, pakistan: 82 },
  { metric: "Fielding", india: 88, pakistan: 75 },
  { metric: "Experience", india: 90, pakistan: 85 },
  { metric: "Recent Form", india: 72, pakistan: 68 },
  { metric: "Home Advantage", india: 80, pakistan: 75 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-secondary rounded-lg">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold">Analytics Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground">Real-time cricket statistics and predictive insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Prediction Accuracy</CardTitle>
                <Target className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-2">68.5%</div>
              <p className="text-xs text-muted-foreground">Based on last 30 matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Matches Analyzed</CardTitle>
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-2">2,847</div>
              <p className="text-xs text-muted-foreground">All time across formats</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Teams Tracked</CardTitle>
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-2">24</div>
              <p className="text-xs text-muted-foreground">Active international teams</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Win Rate</CardTitle>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black mb-2">72.3%</div>
              <p className="text-xs text-muted-foreground">Average across teams</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Win Probability Distribution</CardTitle>
              <CardDescription>Last 100 matches analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  india: { label: "Team A", color: "#b8ff00" },
                  pakistan: { label: "Team B", color: "#a855f7" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={winRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {winRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Team Strengths Comparison</CardTitle>
              <CardDescription>Radar analysis across metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  india: { label: "India", color: "#b8ff00" },
                  pakistan: { label: "Pakistan", color: "#a855f7" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={teamStrengthData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar name="India" dataKey="india" stroke="#b8ff00" fill="#b8ff00" fillOpacity={0.3} />
                    <Radar name="Pakistan" dataKey="pakistan" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Top Players Performance</CardTitle>
              <CardDescription>Average score comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgScore: { label: "Avg Score", color: "#b8ff00" },
                  runs: { label: "Total Runs", color: "#a855f7" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPlayersData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Bar dataKey="avgScore" fill="#b8ff00" name="Avg Score" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Head-to-Head Historical Trend</CardTitle>
              <CardDescription>Win rate over last 7 series</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  india: { label: "India", color: "#b8ff00" },
                  pakistan: { label: "Pakistan", color: "#a855f7" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={headToHeadData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="series" />
                    <YAxis />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="india"
                      stroke="#b8ff00"
                      strokeWidth={2}
                      dot={{ fill: "#b8ff00" }}
                      name="India"
                    />
                    <Line
                      type="monotone"
                      dataKey="pakistan"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={{ fill: "#a855f7" }}
                      name="Pakistan"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
