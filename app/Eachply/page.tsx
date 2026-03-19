"use client"

import Card3dDemo from "@/components/3dCards"

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="text-center mb-16 z-10">
        <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-4">
          Interactive UI
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight">
          3D Hover Card
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
          Move your cursor over the card below to experience real-time 3D depth and motion.
        </p>
      </div>

      <div className="z-10">
        <Card3dDemo />
      </div>

      <p className="mt-14 text-muted-foreground text-sm z-10 tracking-wide">
        ↑ Hover to interact
      </p>
    </main>
  )
}
