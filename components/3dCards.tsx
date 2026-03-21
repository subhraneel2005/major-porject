'use client'

import { useEffect, useRef, useState } from 'react'

// ── Team colour map ──────────────────────────────────────────────────────────
const TEAM_COLORS: Record<string, { primary: string; accent: string }> = {
  CSK:  { primary: '#1a1200', accent: '#f5c500' },
  MI:   { primary: '#001d4a', accent: '#009bde' },
  RCB:  { primary: '#1a0000', accent: '#ec1c24' },
  KKR:  { primary: '#160040', accent: '#a855f7' },
  DC:   { primary: '#001540', accent: '#0078bc' },
  PBKS: { primary: '#2a0000', accent: '#e63946' },
  RR:   { primary: '#1a0030', accent: '#e91e8c' },
  SRH:  { primary: '#1a0a00', accent: '#f26522' },
  GT:   { primary: '#001a10', accent: '#1c8b5e' },
  LSG:  { primary: '#001220', accent: '#00b4d8' },
}

const ROLE_ICONS: Record<string, string> = {
  Batsman:       '🏏',
  Bowler:        '⚾',
  'All-Rounder': '⚡',
  Wicketkeeper:  '🧤',
}

// ── Types ────────────────────────────────────────────────────────────────────
interface PlayerStats {
  matches: number
  totalRuns: number
  highestScore: number
  battingAverage: number
  wickets: number
  economy: number | null
  strikeRate: number
}

export interface Player {
  id: string
  name: string
  team: string
  teamShort: string
  role: string
  image: string
  stats: PlayerStats
}

// ── Helper: flatten grouped players.json ─────────────────────────────────────
async function fetchPlayerByName(name: string): Promise<Player | null> {
  const res = await fetch('/players.json')
  const data = await res.json()

  const all: Player[] = Object.entries(data).flatMap(
    ([teamName, teamData]: [string, any]) =>
      teamData.players.map((p: any) => ({
        ...p,
        team: teamName,
        teamShort: teamData.team_short,
      }))
  )

  return all.find((p) => p.name === name) ?? null
}

// ── Props: accept either a full player object OR just a name string ──────────
interface PlayerCard3DProps {
  player?: Player
  name?: string
}

// ── Component ────────────────────────────────────────────────────────────────
const PlayerCard3D = ({ player: playerProp, name }: PlayerCard3DProps) => {
  const [player, setPlayer] = useState<Player | null>(playerProp ?? null)
  const [loading, setLoading] = useState(!playerProp)

  const cardRef    = useRef<HTMLDivElement>(null)
  const imageRef   = useRef<HTMLImageElement>(null)
  const rafRef     = useRef<number | undefined>(undefined)
  const mouse      = useRef({ x: 0, y: 0 })
  const isHovered  = useRef(false)

  // If only a name was passed, fetch the player data
  useEffect(() => {
    if (playerProp) {
      setPlayer(playerProp)
      setLoading(false)
      return
    }
    if (!name) return

    fetchPlayerByName(name).then((found) => {
      setPlayer(found)
      setLoading(false)
    })
  }, [name, playerProp])

  const colors = TEAM_COLORS[player?.teamShort ?? ''] ?? TEAM_COLORS['MI']

  // ── 3D mouse effect ────────────────────────────────────────────────────────
  useEffect(() => {
    const card = cardRef.current
    const img  = imageRef.current
    if (!card || !img || !player) return

    const animate = () => {
      if (!isHovered.current) return
      const rect = card.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      const rx   = (mouse.current.x - cx) * 0.03
      const ry   = (mouse.current.y - cy) * 0.03

      card.style.transform = `perspective(1000px) rotateY(${rx}deg) rotateX(${-ry}deg) scale3d(1.03,1.03,1.03)`
      img.style.transform  = `perspective(1000px) rotateY(${rx * 0.6}deg) rotateX(${-ry * 0.6}deg) scale3d(1.06,1.06,1.06)`
      rafRef.current = requestAnimationFrame(animate)
    }

    const onMove  = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onEnter = () => {
      isHovered.current = true
      card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease'
      img.style.transition  = 'transform 0.15s ease'
      card.style.boxShadow  = `0 20px 60px ${colors.accent}55, 0 0 0 1px ${colors.accent}33`
      animate()
    }
    const onLeave = () => {
      isHovered.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      card.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'
      card.style.boxShadow  = '0 4px 20px rgba(0,0,0,0.4)'
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
      img.style.transform   = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'
      img.style.transition  = 'transform 0.5s ease'
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mousemove',  onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mousemove',  onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [colors.accent, player])

  // ── Loading / not found states ─────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="w-72 rounded-2xl overflow-hidden animate-pulse"
        style={{ background: '#111', height: '420px', border: '1px solid #222' }}
      />
    )
  }

  if (!player) {
    return (
      <div
        className="w-72 rounded-2xl flex items-center justify-center text-sm"
        style={{ background: '#111', height: '420px', color: '#555', border: '1px solid #222' }}
      >
        Player not found
      </div>
    )
  }

  const { stats } = player

  const battingStats = [
    { label: 'Matches', value: stats.matches },
    { label: 'Runs',    value: stats.totalRuns.toLocaleString() },
    { label: 'Highest', value: stats.highestScore },
    { label: 'Avg',     value: stats.battingAverage },
  ]

  const bowlingStats = [
    { label: 'Wickets',  value: stats.wickets },
    { label: 'SR (bat)', value: stats.strikeRate },
    { label: 'Economy',  value: stats.economy ?? '—' },
  ]

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      ref={cardRef}
      className="w-72 rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background:  `linear-gradient(145deg, ${colors.primary} 0%, #0a0a0a 100%)`,
        border:      `1px solid ${colors.accent}30`,
        boxShadow:   '0 4px 20px rgba(0,0,0,0.4)',
        willChange:  'transform',
      }}
    >
      {/* ── Image ── */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          ref={imageRef}
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top"
          style={{ willChange: 'transform' }}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=280&background=1a1a1a&color=${colors.accent.replace('#', '')}&bold=true&font-size=0.35`
          }}
        />

        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${colors.primary} 0%, ${colors.primary}99 25%, transparent 60%)`,
          }}
        />

        {/* team badge */}
        <div
          className="absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full tracking-widest"
          style={{ background: colors.accent, color: '#000' }}
        >
          {player.teamShort}
        </div>

        {/* name + role */}
        <div className="absolute bottom-3 left-4">
          <h2 className="text-xl font-bold leading-tight" style={{ color: '#fff' }}>
            {player.name}
          </h2>
          <span
            className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${colors.accent}22`,
              color:       colors.accent,
              border:      `1px solid ${colors.accent}44`,
            }}
          >
            {ROLE_ICONS[player.role] ?? '🏏'} {player.role}
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="px-4 pt-4 pb-5 space-y-4">

        {/* Batting */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: colors.accent }}>
            Batting
          </p>
          <div className="grid grid-cols-4 gap-2">
            {battingStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl py-2 text-center"
                style={{ background: `${colors.accent}12`, border: `1px solid ${colors.accent}25` }}
              >
                <div className="text-sm font-bold" style={{ color: colors.accent }}>{s.value}</div>
                <div className="text-[9px] mt-0.5" style={{ color: '#888' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${colors.accent}18` }} />

        {/* Bowling */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: colors.accent }}>
            Bowling / Rate
          </p>
          <div className="grid grid-cols-3 gap-2">
            {bowlingStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl py-2 text-center"
                style={{ background: `${colors.accent}12`, border: `1px solid ${colors.accent}25` }}
              >
                <div className="text-sm font-bold" style={{ color: colors.accent }}>{s.value}</div>
                <div className="text-[9px] mt-0.5" style={{ color: '#888' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PlayerCard3D