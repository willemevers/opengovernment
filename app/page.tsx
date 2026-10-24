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
        <a
          href="https://mijnbelastingcenten.nl/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex items-center justify-between gap-4 rounded-xl border bg-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:border-foreground/20"
        >
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">Benieuwd hoe de overheid jouw belastinggeld uitgeeft?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Bekijk het op mijnbelastingcenten.nl</p>
          </div>
          <span aria-hidden className="text-xl text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
        </a>
      </main>
    </div>
  )
}
