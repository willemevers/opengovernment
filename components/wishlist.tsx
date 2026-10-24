import { MessageSquare } from "lucide-react"
import { UI, type Lang } from "@/lib/i18n"

const card = "rounded-xl border bg-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"

export function Wishlist({ lang }: { lang: Lang }) {
  const t = UI[lang]
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
      <section className={card}>
        <h2 className="text-[15px] font-semibold tracking-tight">{t.wishTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.wishSub}</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {t.wishes.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <a
          href="https://overheidsdashboard.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow transition-all hover:scale-105 hover:shadow-lg"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{t.feedback}</span>
        </a>
      </section>

      <a
        href="https://mijnbelastingcenten.nl/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${card} group flex flex-col transition-colors hover:border-foreground/20`}
      >
        <h2 className="text-[15px] font-semibold tracking-tight">{t.taxTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.taxSub}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://mijnbelastingcenten.nl/jp.webp"
          alt="Jan Peter Balkenende"
          width={708}
          height={558}
          loading="lazy"
          className="mt-4 h-48 w-full rounded-lg object-cover object-top"
        />
        <span className="mt-4 text-sm font-medium">
          {t.taxCta}{" "}
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
  )
}
