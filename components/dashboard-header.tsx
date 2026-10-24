import Link from "next/link"
import { UI, type Lang } from "@/lib/i18n"

export function DashboardHeader({ lang }: { lang: Lang }) {
  const t = UI[lang]
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-balance">{t.title} 🇳🇱</h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
          <nav aria-label="Language" className="inline-flex shrink-0 rounded-lg border bg-card p-0.5 text-sm">
            {(["nl", "en"] as const).map((l) => (
              <Link
                key={l}
                href={l === "nl" ? "/" : "/en"}
                hrefLang={l}
                aria-current={l === lang ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 font-medium uppercase transition-colors ${
                  l === lang ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
