import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function TeamColumn({ team, side }: any) {
  return (
    <Card>
      <CardHeader className="bg-muted">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16 bg-secondary">
            <AvatarFallback className="bg-secondary text-xl font-bold">
              {team.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{team.name}</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              {team.stats.wins}W • {team.stats.losses}L • Win Rate: {team.stats.winRate}%
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
          {[
            { label: "Avg Score", value: team.stats.avgScore },
            { label: "Recent Form", value: team.stats.recentForm },
            { label: "Rankings", value: team.stats.ranking },
            { label: "Key Players", value: team.stats.keyPlayersCount },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Squad</h3>
          <div className="grid grid-cols-3 gap-4">
            {team.players.map((player: any, idx: number) => (
              <div key={idx} className="text-center">
                <Link href="/Eachply">
                  <Avatar className="w-12 h-12 mx-auto mb-2 bg-secondary border">
                    <AvatarFallback className="bg-secondary text-lg font-bold">
                      {player.name.split(" ")[0].charAt(0)}
                      {player.name.split(" ")[1]?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <p className="text-xs font-medium truncate">{player.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{player.role}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
