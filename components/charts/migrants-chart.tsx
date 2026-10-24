"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: "2014", value: 24.5 },
  { year: "2015", value: 43.1 },
  { year: "2016", value: 31.6 },
  { year: "2017", value: 31.5 },
  { year: "2018", value: 24.2 },
  { year: "2019", value: 23.6 },
  { year: "2020", value: 15.2 },
  { year: "2021", value: 28.8 },
  { year: "2022", value: 46.4 },
  { year: "2023", value: 56.0 },
  { year: "2024", value: 54.0 },
]

export function MigrantsChart() {
  return (
    <div>
      <ChartContainer
        config={{
          value: {
            label: "Asielmigranten (x 1000)",
            color: "hsl(var(--chart-1))",
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
            <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <a
        href="https://datasets.cbs.nl/odata/v1/CBS/85496NED"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        bron: CBS Migratie
      </a>
    </div>
  )
}
