const url =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asielzoekers%20en%20nareizigers%20%28x%201%20000%29-gtd1jZlnllsCeYs5OKDQLtOjJLVkr4.csv"

async function fetchAsylumData() {
  try {
    const response = await fetch(url)
    const text = await response.text()

    console.log("CSV Content:")
    console.log(text)

    // Parse CSV
    const lines = text.trim().split("\n")
    const headers = lines[0].split(",")

    console.log("\nHeaders:", headers)

    const data = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      const row = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]?.trim()
      })
      data.push(row)
    }

    console.log("\nParsed Data:")
    console.log(JSON.stringify(data, null, 2))

    // Filter for years 2014-2024
    const filteredData = data.filter((row) => {
      const year = Number.parseInt(row["Jaar"] || row["Year"] || row[headers[0]])
      return year >= 2014 && year <= 2024
    })

    console.log("\nFiltered Data (2014-2024):")
    console.log(JSON.stringify(filteredData, null, 2))
  } catch (error) {
    console.error("Error fetching asylum data:", error)
  }
}

fetchAsylumData()
