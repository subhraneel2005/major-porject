import { Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MatchCard({ match }: any) {
  return (
    <Card className="cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{match.format}</Badge>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            {match.time}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                {match.teamA.name.charAt(0)}
              </div>
              <span className="font-semibold group-hover:text-primary transition-colors">
                {match.teamA.name}
              </span>
            </div>
          </div>

          <div className="text-center text-muted-foreground text-xs font-semibold uppercase tracking-wider">vs</div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                {match.teamB.name.charAt(0)}
              </div>
              <span className="font-semibold group-hover:text-primary transition-colors">
                {match.teamB.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm pt-2 border-t border-border">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{match.stadium.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}
