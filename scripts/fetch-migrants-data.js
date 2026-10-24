const apiUrl = "https://datasets.cbs.nl/odata/v1/CBS/85496NED/Observations"

async function fetchMigrantsData() {
  try {
    console.log("[v0] Fetching asylum migrants data from CBS API...")

    // Fetch the data
    const response = await fetch(apiUrl)
    const data = await response.json()

    console.log("[v0] Sample observations:", data.value.slice(0, 5))

    // Group by year and filter for first asylum requests + family reunification
    const yearlyData = {}

    data.value.forEach((obs) => {
      // Extract year from Perioden (format: "2019MM08" or similar)
      const period = obs.Perioden
      const year = period.substring(0, 4)

      // We want total asylum seekers (eerste asielverzoeken + nareizigers)
      // Look for the measure that represents this
      if (obs.Migratieachtergrond === "T001038" && obs.Measure === "M001208_2") {
        if (!yearlyData[year]) {
          yearlyData[year] = []
        }
        yearlyData[year].push(obs.Value)
      }
    })

    // Calculate yearly totals
    const result = Object.keys(yearlyData)
      .sort()
      .map((year) => ({
        year,
        total: yearlyData[year].reduce((sum, val) => sum + (val || 0), 0),
      }))

    console.log("[v0] Yearly asylum migrants data:", result)
  } catch (error) {
    console.error("[v0] Error fetching migrants data:", error)
  }
}

fetchMigrantsData()
