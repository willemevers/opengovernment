// Fetches all chart data and writes lib/data.json. Run: node scripts/fetch-data.mjs
import { writeFileSync } from "node:fs"

const FROM = 1980
const get = async (url) => {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.json()
}
const cbs = async (table, select, filter) => {
  const q = new URLSearchParams({ $format: "json", $select: `Perioden,${select}`, $filter: `substringof('JJ',Perioden) and Perioden ge '${FROM}JJ00'${filter ? ` and ${filter}` : ""}` })
  const { value } = await get(`https://opendata.cbs.nl/ODataApi/odata/${table}/TypedDataSet?${q}`)
  return Object.fromEntries(value.filter((r) => r[select] != null).map((r) => [r.Perioden.slice(0, 4), r[select]]))
}
const worldBank = async (indicator) => {
  const [, rows] = await get(`https://api.worldbank.org/v2/country/NLD/indicator/${indicator}?format=json&date=${FROM}:2100&per_page=200`)
  return Object.fromEntries(rows.filter((r) => r.value != null).map((r) => [r.date, r.value]))
}
const imf = async (indicator) => {
  const { values } = await get(`https://www.imf.org/external/datamapper/api/v1/${indicator}/NLD`)
  return Object.fromEntries(Object.entries(values[indicator].NLD).filter(([y]) => +y >= FROM))
}
const round = (v, d = 0) => (v == null ? null : Math.round(v * 10 ** d) / 10 ** d)
// One row per year from FROM to the last year any column has data.
const rows = (cols) => {
  const last = Math.max(...Object.values(cols).flatMap((c) => Object.keys(c).map(Number)))
  return Array.from({ length: last - FROM + 1 }, (_, i) => {
    const year = String(FROM + i)
    return { year, ...Object.fromEntries(Object.entries(cols).map(([k, c]) => [k, c[year] ?? null])) }
  })
}
const map = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v, k)]))

const crimeType = (key) => cbs("83648NED", "TotaalGeregistreerdeMisdrijven_1", `RegioS eq 'NL01  ' and SoortMisdrijf eq '${key}'`)

const [gdp, gdpPerCapita, debtPct, immigration, population, asylum, crime, homicide, rape, housePrice, wage] = await Promise.all([
  worldBank("NY.GDP.MKTP.CN"), // € (pre-2002 converted from guilders)
  worldBank("NY.GDP.PCAP.CN"),
  imf("GG_DEBT_GDP"), // IMF historical public debt, % of GDP
  cbs("85496NED", "Immigratie_71"),
  cbs("85496NED", "TotaleBevolking_1"), // population on 1 January
  cbs("80059ned", "TotaalAsielverzoekenEnNareizigers_1", "Nationaliteit eq 'T001059  '"),
  cbs("83723NED", "MisdrijvenTotaal_1"),
  crimeType("CRI3400"), // levensmisdrijf: moord en doodslag, incl. pogingen (registered from 2010)
  crimeType("CRI3320"), // verkrachting
  cbs("83625NED", "GemiddeldeVerkoopprijs_1", "RegioS eq 'NL01  '"),
  // Median gross wage of people whose main income is employment ("SEC: werknemer"), x1000 €
  cbs("84494NED", "MediaanInkomen_5", "Geslacht eq 'T001038' and KenmerkenVanPersonen eq '2017551' and Inkomensbestanddelen eq 'A047878'"),
])

const gdpBn = map(gdp, (v) => v / 1e9)
const data = {
  gdp: rows({ value: map(gdpBn, (v) => round(v)), perCapita: map(gdpPerCapita, (v) => round(v)) }),
  debt: rows({
    debtPercent: map(debtPct, (v) => round(v, 1)),
    debtAmount: Object.fromEntries(Object.entries(debtPct).filter(([y]) => gdpBn[y]).map(([y, p]) => [y, round((p / 100) * gdpBn[y])])),
  }),
  migrants: rows({ immigration, asylum }),
  // Both per 100,000 residents
  crime: rows({
    value: Object.fromEntries(Object.entries(crime).filter(([y]) => population[y]).map(([y, v]) => [y, round((v / population[y]) * 1e5)])),
    murderRape: Object.fromEntries(
      Object.entries(homicide)
        .filter(([y]) => rape[y] != null && population[y])
        .map(([y, v]) => [y, round(((v + rape[y]) / population[y]) * 1e5, 1)]),
    ),
  }),
  housing: rows({
    ratio: Object.fromEntries(Object.entries(wage).filter(([y]) => housePrice[y]).map(([y, w]) => [y, round(housePrice[y] / (w * 1000), 2)])),
    price: housePrice,
  }),
}
writeFileSync(new URL("../lib/data.json", import.meta.url), JSON.stringify(data, null, 1) + "\n")
console.log(Object.entries(data).map(([k, v]) => `${k}: ${v[0].year}-${v.at(-1).year}`).join("\n"))
