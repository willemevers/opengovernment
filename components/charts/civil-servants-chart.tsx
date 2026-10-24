"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: "2014", rijksambtenaren: null, totalGovernment: null },
  // Real data from kennisvandeoverheid.nl (Rijk + Gemeenten + Provincies + Waterschappen + Gem. Regelingen + Rechterlijke Macht + Defensie + Politie)
  { year: "2015", rijksambtenaren: 109.2, totalGovernment: 413.9 }, // 109.2 + 129.6 + 10.0 + 9.4 + 33.8 + 3.2 + 56.7 + 62.0
  { year: "2016", rijksambtenaren: 109.6, totalGovernment: 415.3 }, // 109.6 + 128.8 + 9.6 + 9.4 + 36.7 + 3.1 + 55.9 + 62.2
  { year: "2017", rijksambtenaren: 110.6, totalGovernment: 420.2 }, // 110.6 + 129.9 + 9.6 + 9.3 + 40.1 + 3.3 + 55.9 + 61.5
  { year: "2018", rijksambtenaren: 113.5, totalGovernment: 428.5 }, // 113.5 + 131.9 + 9.8 + 9.6 + 42.2 + 3.3 + 56.6 + 61.6
  { year: "2019", rijksambtenaren: 119.2, totalGovernment: 442.6 }, // 119.2 + 138.4 + 10.1 + 9.9 + 41.7 + 3.3 + 58.0 + 62.0
  { year: "2020", rijksambtenaren: 125.4, totalGovernment: 458.5 }, // 125.4 + 142.8 + 10.6 + 10.3 + 43.8 + 3.4 + 59.7 + 62.5
  { year: "2021", rijksambtenaren: 131.1, totalGovernment: 472.0 }, // 131.1 + 148.0 + 11.0 + 10.5 + 44.2 + 3.4 + 60.7 + 63.1
  { year: "2022", rijksambtenaren: 138.4, totalGovernment: 488.3 }, // 138.4 + 155.9 + 11.4 + 10.9 + 44.1 + 3.5 + 60.9 + 63.2
  { year: "2023", rijksambtenaren: 147.8, totalGovernment: 511.9 }, // 147.8 + 165.6 + 11.9 + 11.4 + 45.3 + 3.6 + 62.9 + 63.4
  { year: "2024", rijksambtenaren: 157.0, totalGovernment: null }, // 2024 Rijk data provided, no total yet
]

export function CivilServantsChart() {
  return (
    <div>
      <ChartContainer
        config={{
          rijksambtenaren: {
            label: "Aantal rijksambtenaren (x1000)",
            color: "hsl(var(--chart-3))",
          },
          totalGovernment: {
            label: "Totaal overheidsmedewerkers (x1000)",
            color: "#3b82f6",
          },
        }}
        className="h-[250px] sm:h-[300px] w-full mb-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              ticks={["2014", "2016", "2018", "2020", "2022", "2024"]}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="rijksambtenaren"
              stroke="#000000"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="totalGovernment"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <a
        href="https://www.kennisvandeoverheid.nl/cijfers-overheidspersoneel/omvang-en-samenstelling-personeelsbestand"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        bron: Kennis van de Overheid
      </a>
    </div>
  )
}
