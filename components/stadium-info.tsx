"use client"
import { MapPin, Users, Trees, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StadiumInfo({ stadium }: any) {
  return (
    <Card className="overflow-hidden border-none shadow-sm bg-card/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <MapPin className="w-5 h-5 text-primary" />
            Venue Details
          </CardTitle>
          <Badge variant="outline" className="font-medium">
            Match Day Ready
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Info Column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Location</span>
              </div>
              <p className="text-sm font-semibold leading-tight">{stadium.location}</p>
              <p className="text-xs text-muted-foreground mt-1">{stadium.name}</p>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Capacity</span>
              </div>
              <p className="text-lg font-bold">{stadium.capacity.toLocaleString()}</p>
              <p className="text-[10px] text-green-600 font-medium">Expected Full House</p>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Trees className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Pitch Type</span>
              </div>
              <p className="text-lg font-bold">{stadium.pitchType}</p>
              <p className="text-[10px] text-muted-foreground">Standard ICC Specs</p>
            </div>
          </div>

          {/* Visual/Map Placeholder */}
          <div className="relative group overflow-hidden rounded-xl bg-muted border border-dashed border-border flex flex-col items-center justify-center p-6 transition-colors hover:bg-muted/80">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm mb-3">
              <Info className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Venue Layout</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1 italic">Interactive map coming soon</p>

            {/* Subtle decorative background element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          </div>

        </div>
      </CardContent>
    </Card>
  )
}