"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: "2014", value: 676, perCapita: 40.0 }, // 676B / 16.9M
  { year: "2015", value: 698, perCapita: 41.1 }, // 698B / 17.0M
  { year: "2016", value: 717, perCapita: 42.0 }, // 717B / 17.1M
  { year: "2017", value: 721, perCapita: 41.9 }, // 721B / 17.2M
  { year: "2018", value: 790, perCapita: 45.7 }, // 790B / 17.3M
  { year: "2019", value: 827, perCapita: 47.6 }, // 827B / 17.4M
  { year: "2020", value: 821, perCapita: 47.0 }, // 821B / 17.5M
  { year: "2021", value: 896, perCapita: 51.1 }, // 896B / 17.5M
  { year: "2022", value: 994, perCapita: 56.5 }, // 994B / 17.6M
  { year: "2023", value: 1062, perCapita: 60.1 }, // 1062B / 17.7M
  { year: "2024", value: 1129, perCapita: 63.7 }, // 1129B / 17.7M
]

export function GDPChart() {
  return (
    <div>
      <ChartContainer
        config={{
          value: {
            label: "BNP",
            color: "hsl(var(--chart-1))",
          },
          perCapita: {
            label: "BNP per capita",
            color: "#3b82f6",
          },
        }}
        className="h-[250px] sm:h-[300px] w-full mb-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              ticks={["2014", "2016", "2018", "2020", "2022", "2024"]}
            />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              stroke="#000000"
              strokeWidth={2}
              dot={false}
              name="BNP (€ mld)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="perCapita"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="BNP per capita (€ duizend)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <a
        href="https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=NL"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        bron: World Bank
      </a>
    </div>
  )
}
