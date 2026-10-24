import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function Wishlist() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Wat wil je nog meer zien?</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Regeldruk?</li>
          <li>Schone lucht?</li>
          <li>Opgewekte energie?</li>
          <li>m2 natuur?</li>
        </ul>
        <a
          href="https://overheidsdashboard.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full shadow hover:shadow-lg transition-all hover:scale-105 font-medium text-sm"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Feedback</span>
        </a>
      </CardContent>
    </Card>
  )
}
