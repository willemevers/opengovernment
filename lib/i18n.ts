export type Lang = "nl" | "en"

export const LOCALE: Record<Lang, string> = { nl: "nl-NL", en: "en-GB" }

export const UI = {
  nl: {
    title: "Nederlandse Overheid Dashboard",
    subtitle: "Hoe goed doen we het eigenlijk? De belangrijkste indicatoren, zo ver terug als de cijfers gaan",
    metaDescription:
      "Hoe goed doen we het eigenlijk? Economie, staatsschuld, migratie, veiligheid en wonen in Nederland, in heldere grafieken met officiële cijfers.",
    period: "Periode",
    last10: "Laatste 10 jaar",
    max: "Maximaal",
    in: "in",
    since: "sinds",
    source: "Bron",
    noData: "Geen cijfers",
    bn: "mld",
    wishTitle: "Wat wil je nog meer zien?",
    wishSub: "Ideeën voor nieuwe grafieken zijn welkom.",
    wishes: ["Regeldruk?", "Schone lucht?", "Opgewekte energie?", "m2 natuur?"],
    feedback: "Feedback",
    taxTitle: "Benieuwd hoe de overheid jouw belastinggeld uitgeeft?",
    taxSub: "Bekijk het op mijnbelastingcenten.nl",
    taxCta: "Naar mijnbelastingcenten.nl",
  },
  en: {
    title: "Dutch Government Dashboard",
    subtitle: "How is the Netherlands really doing? The key indicators, as far back as the data goes",
    metaDescription:
      "How is the Netherlands really doing? Economy, national debt, migration, safety and housing, in clear charts with official data.",
    period: "Period",
    last10: "Last 10 years",
    max: "Maximum",
    in: "in",
    since: "since",
    source: "Source",
    noData: "No data",
    bn: "bn",
    wishTitle: "What else would you like to see?",
    wishSub: "Ideas for new charts are welcome.",
    wishes: ["Red tape?", "Clean air?", "Renewable energy?", "m² of nature?"],
    feedback: "Feedback",
    taxTitle: "Want to know how the government spends your tax money?",
    taxSub: "Find out on mijnbelastingcenten.nl (Dutch)",
    taxCta: "Go to mijnbelastingcenten.nl",
  },
} satisfies Record<Lang, Record<string, string | string[]>>

type CardText = { title: string; description: string; labels: [string] | [string, string]; unit?: string }
type CardId = "gdp" | "debt" | "civil" | "migrants" | "crime" | "housing"

export const CARDS: Record<Lang, Record<CardId, CardText>> = {
  nl: {
    gdp: { title: "Bruto Binnenlands Product", description: "Wat Nederland in een jaar verdient, in totaal en per inwoner.", labels: ["BBP", "Per inwoner"] },
    debt: { title: "Staatsschuld", description: "Hoeveel de overheid geleend heeft, als deel van de economie en in euro's.", labels: ["% van BBP", "In euro's"] },
    civil: { title: "Hoe groot is de overheid?", description: "Aantal mensen dat bij de overheid werkt, en hoeveel daarvan bij het Rijk.", labels: ["Hele overheid", "Rijk"], unit: "medewerkers" },
    migrants: { title: "Aantal migranten", description: "Hoeveel mensen per jaar naar Nederland komen, en hoeveel daarvan asiel aanvragen.", labels: ["Alle immigranten", "Asielverzoeken"], unit: "mensen" },
    crime: { title: "Veiligheid", description: "Geregistreerde misdrijven per 1.000 inwoners, en het aantal moorden en verkrachtingen. Lager is veiliger.", labels: ["Alle misdrijven", "Moord, doodslag en verkrachting"], unit: "per 1.000 inwoners" },
    housing: { title: "Betaalbaar wonen", description: "Hoeveel jaarsalarissen een gemiddeld huis kost.", labels: ["Jaarsalarissen", "Gemiddelde huisprijs"], unit: "mediaan bruto jaarloon" },
  },
  en: {
    gdp: { title: "Gross Domestic Product", description: "What the Netherlands earns in a year, in total and per person.", labels: ["GDP", "Per person"] },
    debt: { title: "National debt", description: "How much the government has borrowed, as a share of the economy and in euros.", labels: ["% of GDP", "In euros"] },
    civil: { title: "How big is the government?", description: "Number of people working for the government, and how many of them for central government.", labels: ["All government", "Central government"], unit: "employees" },
    migrants: { title: "Migration", description: "How many people move to the Netherlands each year, and how many of them apply for asylum.", labels: ["All immigrants", "Asylum applications"], unit: "people" },
    crime: { title: "Safety", description: "Registered crimes per 1,000 residents, and the number of murders and rapes. Lower is safer.", labels: ["All crimes", "Murder, manslaughter and rape"], unit: "per 1,000 residents" },
    housing: { title: "Housing affordability", description: "How many annual salaries an average house costs.", labels: ["Annual salaries", "Average house price"], unit: "median gross salary" },
  },
}
