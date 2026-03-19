"use client"

import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BarChart3, TrendingUp, Zap, Users, Shield, Lightbulb, CheckCircle2, Rocket } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Predictions",
      description:
        "Advanced machine learning algorithms analyze team performance, player stats, and historical data to deliver accurate match predictions.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Analytics",
      description:
        "Deep dive into detailed statistics including head-to-head records, pitch reports, and player performance comparisons.",
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description:
        "Get live match updates, instant predictions, and up-to-date player statistics for all international cricket matches.",
    },
    {
      icon: Users,
      title: "Team Coverage",
      description:
        "Track all international teams across T20, ODI, and Test formats with comprehensive team rosters and historical performance data.",
    },
    {
      icon: Shield,
      title: "Verified Data",
      description:
        "All data sourced from official cricket bodies ensuring accuracy and reliability for your predictions.",
    },
    {
      icon: Lightbulb,
      title: "Expert Insights",
      description:
        "Professional cricket analysis combined with data science to provide actionable insights for match predictions.",
    },
  ]

  const benefits = [
    "68.5% prediction accuracy based on historical data",
    "Coverage of all international cricket formats and teams",
    "Real-time match analysis and live probability updates",
    "Detailed player and team statistics",
    "User-friendly interface designed for all experience levels",
    "Continuous algorithm improvements with new data",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-secondary rounded-lg">
              <Rocket className="w-8 h-8" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold">About CrickPredict Pro</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            CrickPredict Pro is a cutting-edge cricket match prediction platform that combines advanced AI algorithms
            with comprehensive sports analytics. We help cricket enthusiasts and analysts make informed predictions with
            data-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 p-3 bg-secondary rounded-lg w-fit">
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Separator orientation="vertical" className="w-1 h-10" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our mission is to revolutionize cricket match predictions by leveraging the power of artificial
                intelligence and data analytics. We believe in democratizing cricket intelligence, making accurate
                predictions accessible to everyone from casual fans to professional analysts. Through our platform, we
                aim to enhance the cricket viewing experience and provide valuable insights that help users understand
                the game at a deeper level.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <Separator orientation="vertical" className="w-1 h-10" />
                <CardTitle className="text-2xl">Why Choose Us?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <Separator orientation="vertical" className="w-1 h-10" />
              <CardTitle className="text-2xl">Platform Statistics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl sm:text-4xl font-black mb-2">2,847+</div>
                <p className="text-sm text-muted-foreground">Matches Analyzed</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl sm:text-4xl font-black mb-2">24</div>
                <p className="text-sm text-muted-foreground">Teams Tracked</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl sm:text-4xl font-black mb-2">68.5%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl sm:text-4xl font-black mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Verified Data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
