"use client"

import { useState } from "react"
import { TrendCard, type Row } from "@/components/trend-card"
import data from "@/lib/data.json"

const nf = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 })
const euro = (v: number) => `€${nf.format(v)}`
const thousands = (v: number) => nf.format(Math.round(v * 1000))

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

const RANGES = [
  { value: "10", label: "Laatste 10 jaar" },
  { value: "max", label: "Maximaal" },
] as const

export function MetricsGrid() {
  const [range, setRange] = useState<"10" | "max">("10")

  return (
    <>
      <div className="mb-4 flex justify-end sm:mb-6">
        <div role="group" aria-label="Periode" className="inline-flex rounded-lg border bg-card p-0.5 text-sm">
          {RANGES.map((r) => (
            <button
              key={r.value}
              type="button"
              aria-pressed={range === r.value}
              onClick={() => setRange(r.value)}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                range === r.value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <TrendCard
          range={range}
          title="Bruto Binnenlands Product"
          description="Wat Nederland in een jaar verdient, in totaal en per inwoner."
          data={data.gdp}
          series={[
            { key: "value", label: "BBP", format: (v) => `${euro(v)} mld` },
            { key: "perCapita", label: "Per inwoner", ownScale: true, format: euro },
          ]}
          source={{ label: "World Bank", href: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CN?locations=NL" }}
        />
        <TrendCard
          range={range}
          title="Staatsschuld"
          description="Hoeveel de overheid geleend heeft, als deel van de economie en in euro's."
          data={data.debt}
          series={[
            { key: "debtPercent", label: "% van BBP", format: (v) => `${nf.format(v)}%` },
            { key: "debtAmount", label: "In euro's", ownScale: true, format: (v) => `${euro(v)} mld` },
          ]}
          source={{ label: "IMF", href: "https://www.imf.org/external/datamapper/GG_DEBT_GDP@HPDD/NLD" }}
        />
        <TrendCard
          range={range}
          title="Hoe groot is de overheid?"
          description="Aantal mensen dat bij de overheid werkt, en hoeveel daarvan bij het Rijk."
          data={civilServants}
          series={[
            { key: "total", label: "Hele overheid", format: thousands },
            { key: "rijk", label: "Rijk", format: thousands },
          ]}
          unit="medewerkers"
          source={{
            label: "Kennis van de Overheid",
            href: "https://www.kennisvandeoverheid.nl/cijfers-overheidspersoneel/omvang-en-samenstelling-personeelsbestand",
          }}
        />
        <TrendCard
          range={range}
          title="Aantal migranten"
          description="Hoeveel mensen per jaar naar Nederland komen, en hoeveel daarvan asiel aanvragen."
          data={data.migrants}
          series={[
            { key: "immigration", label: "Alle immigranten", format: (v) => nf.format(v) },
            { key: "asylum", label: "Asielverzoeken", format: (v) => nf.format(v) },
          ]}
          unit="mensen"
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80059ned/table" }}
        />
        <TrendCard
          range={range}
          title="Veiligheid"
          description="Geregistreerde misdrijven per 1.000 inwoners. Lager is veiliger."
          data={data.crime}
          series={[{ key: "value", label: "Misdrijven", format: (v) => nf.format(v) }]}
          unit="per 1.000 inwoners"
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83723NED/table" }}
        />
        <TrendCard
          range={range}
          title="Betaalbaar wonen"
          description="Hoeveel jaarsalarissen een gemiddeld huis kost."
          data={data.housing}
          series={[
            { key: "ratio", label: "Jaarsalarissen", format: (v) => `${nf.format(v)}×` },
            { key: "price", label: "Gemiddelde huisprijs", ownScale: true, format: euro },
          ]}
          unit="mediaan bruto jaarloon"
          source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83625NED/table" }}
        />
      </div>
    </>
  )
}
