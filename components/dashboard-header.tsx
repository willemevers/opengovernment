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
          <Link
            href={t.switchHref}
            hrefLang={lang === "nl" ? "en" : "nl"}
            className="shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.switchLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}
