// Fetch crime statistics from CBS API
// Dataset: 83648NED - Geregistreerde criminaliteit; soort misdrijf, regio

const API_URL = "https://datasets.cbs.nl/odata/v1/CBS/83648NED/Observations"

async function fetchCrimeData() {
  try {
    // Fetch all crime types per 1000 inhabitants for the Netherlands (total)
    // Filter for "Totaal misdrijven" (total crimes) per 1000 inhabitants
    const response = await fetch(
      `${API_URL}?$filter=contains(Measure, 'Per1000Inw') and contains(SoortMisdrijf, 'Totaal')&$select=TimePeriod,Value`,
    )

    const data = await response.json()

    // Process the data to get yearly averages
    const yearlyData = {}

    data.value.forEach((item) => {
      const year = Number.parseInt(item.TimePeriod.substring(0, 4))
      const value = Number.parseFloat(item.Value)

      if (year >= 2014 && year <= 2024 && !isNaN(value)) {
        if (!yearlyData[year]) {
          yearlyData[year] = []
        }
        yearlyData[year].push(value)
      }
    })

    // Calculate averages
    const result = Object.keys(yearlyData)
      .sort()
      .map((year) => ({
        year: Number.parseInt(year),
        value: Math.round(yearlyData[year].reduce((a, b) => a + b, 0) / yearlyData[year].length),
      }))

    console.log("Crime data:", result)
    return result
  } catch (error) {
    console.error("Error fetching crime data:", error)
    return []
  }
}

fetchCrimeData()
