import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsGrid } from "@/components/metrics-grid"
import { Wishlist } from "@/components/wishlist"
import { UI, type Lang } from "@/lib/i18n"

export function pageMetadata(lang: Lang): Metadata {
  const t = UI[lang]
  return {
    title: t.title,
    description: t.metaDescription,
    alternates: { canonical: lang === "nl" ? "/" : "/en", languages: { nl: "/", en: "/en" } },
    openGraph: {
      title: t.title,
      description: t.metaDescription,
      url: lang === "nl" ? "/" : "/en",
      siteName: "Overheidsdashboard",
      locale: lang === "nl" ? "nl_NL" : "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.metaDescription },
  }
}

export function Dashboard({ lang }: { lang: Lang }) {
  return (
    <div lang={lang} className="min-h-screen bg-background">
      <DashboardHeader lang={lang} />
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <MetricsGrid lang={lang} />
        <Wishlist lang={lang} />
      </main>
    </div>
  )
}
