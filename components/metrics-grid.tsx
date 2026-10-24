"use client"

import { TrendCard, type Row } from "@/components/trend-card"

const nf = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 })
const euro = (v: number) => `€${nf.format(v)}`

// BBP in € mld; perCapita in € duizend (BBP / inwoners)
const gdp: Row[] = [
  { year: "2014", value: 676, perCapita: 40.0 },
  { year: "2015", value: 698, perCapita: 41.1 },
  { year: "2016", value: 717, perCapita: 42.0 },
  { year: "2017", value: 721, perCapita: 41.9 },
  { year: "2018", value: 790, perCapita: 45.7 },
  { year: "2019", value: 827, perCapita: 47.6 },
  { year: "2020", value: 821, perCapita: 47.0 },
  { year: "2021", value: 896, perCapita: 51.1 },
  { year: "2022", value: 994, perCapita: 56.5 },
  { year: "2023", value: 1062, perCapita: 60.1 },
  { year: "2024", value: 1129, perCapita: 63.7 },
]

const debt: Row[] = [
  { year: "2014", debtAmount: 456, debtPercent: 67.9 },
  { year: "2015", debtAmount: 446, debtPercent: 64.6 },
  { year: "2016", debtAmount: 438, debtPercent: 61.9 },
  { year: "2017", debtAmount: 420, debtPercent: 56.9 },
  { year: "2018", debtAmount: 406, debtPercent: 52.4 },
  { year: "2019", debtAmount: 395, debtPercent: 48.6 },
  { year: "2020", debtAmount: 436, debtPercent: 54.4 },
  { year: "2021", debtAmount: 450, debtPercent: 51.7 },
  { year: "2022", debtAmount: 481, debtPercent: 49.4 },
  { year: "2023", debtAmount: 481, debtPercent: 46.1 },
  { year: "2024", debtAmount: 491, debtPercent: 43.3 },
]

// x1000. Totaal = Rijk + Gemeenten + Provincies + Waterschappen + Gem. Regelingen + Rechterlijke Macht + Defensie + Politie
// (kennisvandeoverheid.nl). 2024: alleen Rijk bekend.
const civilServants: Row[] = [
  { year: "2014", rijk: null, total: null },
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

// x1000
const migrants: Row[] = [
  { year: "2014", value: 24.5 },
  { year: "2015", value: 43.1 },
  { year: "2016", value: 31.6 },
  { year: "2017", value: 31.5 },
  { year: "2018", value: 24.2 },
  { year: "2019", value: 23.6 },
  { year: "2020", value: 15.2 },
  { year: "2021", value: 28.8 },
  { year: "2022", value: 46.4 },
  { year: "2023", value: 56.0 },
  { year: "2024", value: 54.0 },
]

const crime: Row[] = [
  { year: "2014", value: 48 },
  { year: "2015", value: 47 },
  { year: "2016", value: 47 },
  { year: "2017", value: 48 },
  { year: "2018", value: 47 },
  { year: "2019", value: 45 },
  { year: "2020", value: 39 },
  { year: "2021", value: 39 },
  { year: "2022", value: 41 },
  { year: "2023", value: 42 },
  { year: "2024", value: null },
]

// Gemiddelde verkoopprijs bestaande koopwoning (CBS 83625NED) en mediaan bruto jaarloon
// van werknemers (CBS 84494NED, "loon uit dienstverband", SEC werknemer). CBS publiceert geen mediane woningprijs.
const housing: Row[] = [
  { year: "2014", price: 222218, wage: 32000 },
  { year: "2015", price: 230194, wage: 32500 },
  { year: "2016", price: 243837, wage: 32800 },
  { year: "2017", price: 263295, wage: 33200 },
  { year: "2018", price: 287267, wage: 33800 },
  { year: "2019", price: 307978, wage: 34700 },
  { year: "2020", price: 334488, wage: 36200 },
  { year: "2021", price: 386714, wage: 37000 },
  { year: "2022", price: 428591, wage: 39000 },
  { year: "2023", price: 416153, wage: 41500 },
  { year: "2024", price: 450985, wage: 44100 },
].map((r) => ({ ...r, ratio: r.price / r.wage }))

const thousands = (v: number) => nf.format(Math.round(v * 1000))

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      <TrendCard
        title="Bruto Binnenlands Product"
        description="Wat Nederland in een jaar verdient, in totaal en per inwoner."
        data={gdp}
        series={[
          { key: "value", label: "BBP", format: (v) => `${euro(v)} mld` },
          { key: "perCapita", label: "Per inwoner", ownScale: true, format: (v) => euro(v * 1000) },
        ]}
        source={{ label: "World Bank", href: "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=NL" }}
      />
      <TrendCard
        title="Staatsschuld"
        description="Hoeveel de overheid geleend heeft, als deel van de economie en in euro's."
        data={debt}
        series={[
          { key: "debtPercent", label: "% van BBP", format: (v) => `${nf.format(v)}%` },
          { key: "debtAmount", label: "In euro's", ownScale: true, format: (v) => `${euro(v)} mld` },
        ]}
        source={{ label: "CBS", href: "https://datasets.cbs.nl/odata/v1/CBS/84576NED" }}
      />
      <TrendCard
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
        title="Aantal migranten"
        description="Aantal asielmigranten dat per jaar naar Nederland komt."
        data={migrants}
        series={[{ key: "value", label: "Asielmigranten", format: thousands }]}
        unit="mensen"
        source={{ label: "CBS", href: "https://datasets.cbs.nl/odata/v1/CBS/85496NED" }}
      />
      <TrendCard
        title="Veiligheid"
        description="Geregistreerde misdrijven per 1.000 inwoners. Lager is veiliger."
        data={crime}
        series={[{ key: "value", label: "Misdrijven", format: (v) => nf.format(v) }]}
        unit="per 1.000 inwoners"
        source={{ label: "CBS", href: "https://datasets.cbs.nl/odata/v1/CBS/83648NED" }}
      />
      <TrendCard
        title="Betaalbaar wonen"
        description="Hoeveel jaarsalarissen een gemiddeld huis kost."
        data={housing}
        series={[{ key: "ratio", label: "Jaarsalarissen", format: (v) => `${nf.format(v)}×` }]}
        unit="mediaan bruto jaarloon"
        source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83625NED/table" }}
      />
    </div>
  )
}
