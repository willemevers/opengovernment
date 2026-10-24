import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsGrid } from "@/components/metrics-grid"
import { Wishlist } from "@/components/wishlist"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <MetricsGrid />
        <Wishlist />
      </main>
    </div>
  )
}
