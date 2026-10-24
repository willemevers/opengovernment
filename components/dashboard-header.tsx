export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-balance">
              Nederlandse Overheid Dashboard 🇳🇱
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Hoe goed doen we het eigenlijk? Hierbij de belangrijkste indicatoren van 2015 t/m 2024</p>
          </div>
        </div>
      </div>
    </header>
  )
}
