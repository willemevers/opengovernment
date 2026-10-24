"use client"

import { useState } from "react"
import { TrendCard, type Row } from "@/components/trend-card"
import { CARDS, LOCALE, UI, type Lang } from "@/lib/i18n"
import data from "@/lib/data.json"

// x1000. Totaal = Rijk + Gemeenten + Provincies + Waterschappen + Gem. Regelingen + Rechterlijke Macht + Defensie + Politie
// (kennisvandeoverheid.nl, geen API; reeks begint in 2015). 2024: alleen Rijk bekend.
const civilServants: Row[] = [
  { year: "2015", rijk: 109.2, total: 413.9 },
  { year: "2016", rijk: 109.6, total: 415.3 },
  { year: "2017", rijk: 110.6, total: 420.2 },
  { year: "2018", rijk: 113.5, total: 428.5 },
  { year: "2019", rijk: 119.2, total: 442.6 },
  { year: "2020", rijk: 125.4, total: 458.5 },
  { year: "2021", rijk: 131.1, total: 472.0 },
  { year: "2022", rijk: 138.4, total: 488.3 },
  { year: "2023", rijk: 147.8, total: 511.9 },
  { year: "2024", rijk: 157.0, total: null },
]

export function MetricsGrid({ lang }: { lang: Lang }) {
  const [range, setRange] = useState<"10" | "max">("10")
  const t = UI[lang]
  const c = CARDS[lang]
  const nf = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 1 })
  const num = (v: number) => nf.format(v)
  const euro = (v: number) => `€${nf.format(v)}`
  const euroBn = (v: number) => `${euro(v)} ${t.bn}`
  const thousands = (v: number) => nf.format(Math.round(v * 1000))
  const common = { range, lang }

  return (
    <>
      <div className="mb-4 flex justify-end sm:mb-6">
        <div role="group" aria-label={t.period} className="inline-flex rounded-lg border bg-card p-0.5 text-sm">
          {(["10", "max"] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                range === r ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "10" ? t.last10 : t.max}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <TrendCard
          {...common}
          {...c.gdp}
          data={data.gdp}
          series={[
            { key: "value", label: c.gdp.labels[0], format: euroBn },
            { key: "perCapita", label: c.gdp.labels[1]!, ownScale: true, format: euro },
          ]}
          source={{ label: "World Bank", href: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CN?locations=NL" }}
        />
        <TrendCard
          {...common}
          {...c.debt}
          data={data.debt}
          series={[
            { key: "debtPercent", label: c.debt.labels[0], format: (v) => `${num(v)}%` },
            { key: "debtAmount", label: c.debt.labels[1]!, ownScale: true, format: euroBn },
          ]}
          source={{ label: "IMF", href: "https://www.imf.org/external/datamapper/GG_DEBT_GDP@HPDD/NLD" }}
        />
        <TrendCard
          {...common}
          {...c.civil}
          data={civilServants}
          series={[
            { key: "total", label: c.civil.labels[0], format: thousands },
            { key: "rijk", label: c.civil.labels[1]!, format: thousands },
          ]}
          source={{
            label: "Kennis van de Overheid",
            href: "https://www.kennisvandeoverheid.nl/cijfers-overheidspersoneel/omvang-en-samenstelling-personeelsbestand",
          }}
        />
        <TrendCard
          {...common}
          {...c.migrants}
          data={data.migrants}
          series={[
            { key: "immigration", label: c.migrants.labels[0], format: num },
            { key: "asylum", label: c.migrants.labels[1]!, format: num },
          ]}
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80059ned/table" }}
        />
        <TrendCard
          {...common}
          {...c.crime}
          data={data.crime}
          series={[
            { key: "value", label: c.crime.labels[0], format: num },
            // Registered "levensmisdrijven" (incl. attempts) + rapes, CBS 83648NED, from 2010
            { key: "murderRape", label: c.crime.labels[1]!, ownScale: true, format: num },
          ]}
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83648NED/table" }}
        />
        <TrendCard
          {...common}
          {...c.housing}
          data={data.housing}
          series={[
            { key: "ratio", label: c.housing.labels[0], format: (v) => `${num(v)}×` },
            { key: "price", label: c.housing.labels[1]!, ownScale: true, format: euro },
          ]}
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83625NED/table" }}
        />
      </div>
    </>
  )
}
