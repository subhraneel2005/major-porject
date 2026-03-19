import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <section className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-[400px] flex items-center justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
