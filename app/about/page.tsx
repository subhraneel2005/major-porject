"use client"

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
    <div className="min-h-screen">
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-8 h-8" />
            <h1 className="text-4xl sm:text-5xl font-bold">About CrickPredict Pro</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            CrickPredict Pro is a cutting-edge cricket match prediction platform that combines advanced AI algorithms
            with comprehensive sports analytics. We help cricket enthusiasts and analysts make informed predictions with
            data-driven insights.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="w-6 h-6 mb-2" />
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to revolutionize cricket match predictions by leveraging the power of artificial
                intelligence and data analytics. We believe in democratizing cricket intelligence, making accurate
                predictions accessible to everyone from casual fans to professional analysts. Through our platform, we
                aim to enhance the cricket viewing experience and provide valuable insights that help users understand
                the game at a deeper level.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Platform Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "2,847+", label: "Matches Analyzed" },
                { value: "24", label: "Teams Tracked" },
                { value: "68.5%", label: "Accuracy Rate" },
                { value: "100%", label: "Verified Data" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
