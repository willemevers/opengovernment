// Fetch Dutch national debt data from CBS API
const CBS_API_URL = "https://datasets.cbs.nl/odata/v1/CBS/84576NED"

async function fetchDebtData() {
  try {
    console.log("Fetching Dutch national debt data from CBS...")

    // Fetch the observations
    const response = await fetch(`${CBS_API_URL}/Observations?$format=json`)
    const data = await response.json()

    console.log(`Fetched ${data.value.length} observations`)

    // Group by year and extract relevant metrics
    const yearlyData = {}

    data.value.forEach((obs) => {
      const period = obs.Perioden

      // Extract year (format is typically "2024JJ00" for yearly data)
      const year = period.substring(0, 4)

      if (Number.parseInt(year) >= 2014 && Number.parseInt(year) <= 2024) {
        if (!yearlyData[year]) {
          yearlyData[year] = {
            debtAmount: null,
            debtPercent: null,
          }
        }

        // A029415 = Schuld (x mld euro)
        // A029416 = Schuld (% bbp)
        if (obs.Measure === "A029415") {
          yearlyData[year].debtAmount = Math.round(Number.parseFloat(obs.Value))
        } else if (obs.Measure === "A029416") {
          yearlyData[year].debtPercent = Number.parseFloat(obs.Value)
        }
      }
    })

    console.log("Yearly debt data:", yearlyData)

    return yearlyData
  } catch (error) {
    console.error("Error fetching debt data:", error)
    return null
  }
}

// Run the fetch
fetchDebtData()
