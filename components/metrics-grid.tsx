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

// Totale immigratie (CBS 85496NED) en asielverzoeken incl. nareizigers (CBS 80059ned)
const migrants: Row[] = [
  { year: "1980", immigration: 112504, asylum: 1330 },
  { year: "1981", immigration: 80183, asylum: 750 },
  { year: "1982", immigration: 70740, asylum: 1215 },
  { year: "1983", immigration: 66762, asylum: 2015 },
  { year: "1984", immigration: 66907, asylum: 2605 },
  { year: "1985", immigration: 79362, asylum: 5645 },
  { year: "1986", immigration: 87387, asylum: 5865 },
  { year: "1987", immigration: 95935, asylum: 13460 },
  { year: "1988", immigration: 91238, asylum: 7485 },
  { year: "1989", immigration: 98914, asylum: 13900 },
  { year: "1990", immigration: 117350, asylum: 21210 },
  { year: "1991", immigration: 120249, asylum: 21615 },
  { year: "1992", immigration: 116926, asylum: 20345 },
  { year: "1993", immigration: 119154, asylum: 35400 },
  { year: "1994", immigration: 99311, asylum: 52575 },
  { year: "1995", immigration: 96099, asylum: 29260 },
  { year: "1996", immigration: 108749, asylum: 22855 },
  { year: "1997", immigration: 109860, asylum: 34445 },
  { year: "1998", immigration: 122407, asylum: 45215 },
  { year: "1999", immigration: 119151, asylum: 39305 },
  { year: "2000", immigration: 132850, asylum: 43560 },
  { year: "2001", immigration: 133404, asylum: 32580 },
  { year: "2002", immigration: 121250, asylum: 18665 },
  { year: "2003", immigration: 104514, asylum: 13400 },
  { year: "2004", immigration: 94019, asylum: 9780 },
  { year: "2005", immigration: 92297, asylum: 12345 },
  { year: "2006", immigration: 101150, asylum: 14465 },
  { year: "2007", immigration: 116819, asylum: 9730 },
  { year: "2008", immigration: 143516, asylum: 15275 },
  { year: "2009", immigration: 146378, asylum: 16165 },
  { year: "2010", immigration: 154432, asylum: 15155 },
  { year: "2011", immigration: 162962, asylum: 14630 },
  { year: "2012", immigration: 158374, asylum: 13170 },
  { year: "2013", immigration: 164772, asylum: 16725 },
  { year: "2014", immigration: 182949, asylum: 29890 },
  { year: "2015", immigration: 204615, asylum: 58880 },
  { year: "2016", immigration: 230739, asylum: 32840 },
  { year: "2017", immigration: 234957, asylum: 32755 },
  { year: "2018", immigration: 243737, asylum: 30540 },
  { year: "2019", immigration: 269064, asylum: 29445 },
  { year: "2020", immigration: 220853, asylum: 19180 },
  { year: "2021", immigration: 252528, asylum: 36675 },
  { year: "2022", immigration: 403108, asylum: 47990 },
  { year: "2023", immigration: 335668, asylum: 49890 },
  { year: "2024", immigration: 316305, asylum: 45640 },
  { year: "2025", immigration: 308357, asylum: 42360 },
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
        description="Hoeveel mensen per jaar naar Nederland komen, en hoeveel daarvan asiel aanvragen."
        data={migrants}
        series={[
          { key: "immigration", label: "Alle immigranten", format: (v) => nf.format(v) },
          { key: "asylum", label: "Asielverzoeken", format: (v) => nf.format(v) },
        ]}
        unit="mensen"
        source={{ label: "CBS", href: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80059ned/table" }}
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
