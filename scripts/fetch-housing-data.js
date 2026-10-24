const apiUrl =
  "https://datasets.cbs.nl/odata/v1/CBS/83625NED/Observations?$filter=Measure eq 'A046096_2' and Perioden ge '2014JJ00' and Perioden le '2024JJ00'"

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log("[v0] CBS Housing Data:", JSON.stringify(data, null, 2))

    // Process the data
    const yearlyData = {}
    data.value.forEach((item) => {
      const year = item.Perioden.substring(0, 4)
      const value = item.Value

      if (!yearlyData[year]) {
        yearlyData[year] = []
      }
      yearlyData[year].push(value)
    })

    // Calculate averages
    const averages = Object.keys(yearlyData)
      .map((year) => {
        const avg = yearlyData[year].reduce((a, b) => a + b, 0) / yearlyData[year].length
        return { year, avgPrice: Math.round(avg * 1000) } // Convert to euros
      })
      .sort((a, b) => a.year - b.year)

    console.log("[v0] Yearly Averages:", JSON.stringify(averages, null, 2))
  })
  .catch((error) => console.error("[v0] Error fetching CBS data:", error))
