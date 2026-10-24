// Script to fetch and process migration data from CBS
const url =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/table_c7d37796-cc1e-4e89-a5ec-e67e07b6cc6a-3shOTTxU2k2I0wwPpHsNuEm5sBKwi0.csv"

async function fetchMigrationData() {
  try {
    const response = await fetch(url)
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",")

    console.log("[v0] Headers:", headers)
    console.log("[v0] Total rows:", lines.length - 1)

    // Process data rows
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      const year = Number.parseInt(values[0])

      // Parse migration balance (remove quotes and convert to number)
      const migrationBalance = Number.parseFloat(values[3].replace(/"/g, "").replace(",", "."))

      // Only include years 2014-2024
      if (year >= 2014 && year <= 2024) {
        data.push({
          year: year.toString(),
          value: Math.round(migrationBalance), // Round to nearest thousand
        })
      }
    }

    console.log("[v0] Processed migration data:")
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("[v0] Error fetching migration data:", error)
  }
}

fetchMigrationData()
