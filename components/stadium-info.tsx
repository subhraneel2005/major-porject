import { MapPin, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StadiumInfo({ stadium }: any) {
  return (
    <Card>
      <CardHeader className="bg-muted">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <MapPin className="w-6 h-6" />
          {stadium.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="text-lg font-semibold">{stadium.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Capacity</p>
              <p className="text-lg font-semibold">{stadium.capacity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pitch Type</p>
              <p className="text-lg font-semibold">{stadium.pitchType}</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-border">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8" />
              </div>
              <p className="text-sm text-muted-foreground">Stadium Visualization</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
