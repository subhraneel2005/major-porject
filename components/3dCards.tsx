'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface CardTransform {
  rotateX: number
  rotateY: number
  scale: number
}

interface PlayerStats {
  matches: number
  totalRuns: number
  highestScore: number
  battingAverage: number
  fours: number
  sixes: number
  fifties: number
  hundreds: number
  wickets: number
  economy: number
  strikeRate: number
}

interface PlayerCardProps {
  name?: string
  role?: string
  image?: string
  stats?: PlayerStats
}

const defaultStats: PlayerStats = {
  matches: 124,
  totalRuns: 5320,
  highestScore: 183,
  battingAverage: 48.3,
  fours: 412,
  sixes: 198,
  fifties: 32,
  hundreds: 14,
  wickets: 18,
  economy: 7.4,
  strikeRate: 138.5,
}

const PlayerCard3D = ({
  name = "Virat Kohli",
  role = "Batsman",
  image = "/virat.jpg",
  stats = defaultStats,
}: PlayerCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current

    if (!card || !image) return

    let rect: DOMRect
    let centerX: number
    let centerY: number

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect()
        centerX = rect.left + rect.width / 2
        centerY = rect.top + rect.height / 2
      }

      const relativeX = mouseX - centerX
      const relativeY = mouseY - centerY

      const cardTransform: CardTransform = {
        rotateX: -relativeY * 0.035,
        rotateY: relativeX * 0.035,
        scale: 1.025,
      }

      const imageTransform: CardTransform = {
        rotateX: -relativeY * 0.025,
        rotateY: relativeX * 0.025,
        scale: 1.05,
      }

      return { cardTransform, imageTransform }
    }

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      )

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.3)'

      image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
      image.style.transition = 'transform 0.2s ease'
      animate()
    }

    const handleMouseLeave = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      card.style.boxShadow = 'none'
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      image.style.transition = 'transform 0.5s ease'
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const battingStats = [
    { label: "Matches", value: stats.matches },
    { label: "Total Runs", value: stats.totalRuns.toLocaleString() },
    { label: "Highest", value: stats.highestScore },
    { label: "Average", value: stats.battingAverage },
    { label: "4s", value: stats.fours },
    { label: "6s", value: stats.sixes },
    { label: "50s", value: stats.fifties },
    { label: "100s", value: stats.hundreds },
  ]

  const bowlingStats = [
    { label: "Wickets", value: stats.wickets },
    { label: "Economy", value: stats.economy },
    { label: "Strike Rate", value: stats.strikeRate },
  ]

  return (
    <Card ref={cardRef} className="w-full max-w-sm bg-card border-border overflow-hidden">

      {/* Player Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          ref={imageRef}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Name + Role over image */}
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-foreground">{name}</h2>
          <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-accent/80 text-accent-foreground font-semibold">
            {role}
          </span>
        </div>
      </div>

      <CardContent className="pt-5 pb-6 space-y-5">

        {/* Batting Stats */}
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Batting
          </p>
          <div className="grid grid-cols-4 gap-3">
            {battingStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary/50 border border-border rounded-xl p-2 text-center hover:border-accent/50 transition-colors duration-200"
              >
                <div className="text-base font-bold text-accent">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bowling Stats */}
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
            Bowling
          </p>
          <div className="grid grid-cols-3 gap-3">
            {bowlingStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary/50 border border-border rounded-xl p-2 text-center hover:border-accent/50 transition-colors duration-200"
              >
                <div className="text-base font-bold text-accent">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default PlayerCard3D