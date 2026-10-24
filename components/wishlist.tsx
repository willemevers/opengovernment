import { MessageSquare } from "lucide-react"

const card = "rounded-xl border bg-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"

export function Wishlist() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
      <section className={card}>
        <h2 className="text-[15px] font-semibold tracking-tight">Wat wil je nog meer zien?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ideeën voor nieuwe grafieken zijn welkom.</p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Regeldruk?</li>
          <li>Schone lucht?</li>
          <li>Opgewekte energie?</li>
          <li>m2 natuur?</li>
        </ul>
        <a
          href="https://overheidsdashboard.featurebase.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow transition-all hover:scale-105 hover:shadow-lg"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Feedback</span>
        </a>
      </section>

      <a
        href="https://mijnbelastingcenten.nl/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${card} group flex flex-col transition-colors hover:border-foreground/20`}
      >
        <h2 className="text-[15px] font-semibold tracking-tight">Benieuwd hoe de overheid jouw belastinggeld uitgeeft?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Bekijk het op mijnbelastingcenten.nl</p>
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
          Naar mijnbelastingcenten.nl{" "}
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
  )
}
