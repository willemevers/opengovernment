"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { year: "2014", debtAmount: 456, debtPercent: 67.9 },
  { year: "2015", debtAmount: 446, debtPercent: 64.6 },
  { year: "2016", debtAmount: 438, debtPercent: 61.9 },
  { year: "2017", debtAmount: 420, debtPercent: 56.9 },
  { year: "2018", debtAmount: 406, debtPercent: 52.4 },
  { year: "2019", debtAmount: 395, debtPercent: 48.6 },
  { year: "2020", debtAmount: 436, debtPercent: 54.4 },
  { year: "2021", debtAmount: 450, debtPercent: 51.7 },
  { year: "2022", debtAmount: 481, debtPercent: 49.4 },
  { year: "2023", debtAmount: 481, debtPercent: 46.1 },
  { year: "2024", debtAmount: 491, debtPercent: 43.3 },
]

export function DebtChart() {
  return (
    <div>
      <ChartContainer
        config={{
          debtAmount: {
            label: "Staatsschuld (€ mld)",
            color: "#000000",
          },
          debtPercent: {
            label: "Staatsschuld % BBP",
            color: "#3b82f6",
          },
        }}
        className="h-[250px] sm:h-[300px] w-full mb-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 40, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              ticks={["2014", "2016", "2018", "2020", "2022", "2024"]}
            />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="debtAmount"
              stroke="#000000"
              strokeWidth={2}
              dot={false}
              name="Staatsschuld (€ mld)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="debtPercent"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Staatsschuld % BBP"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <a
        href="https://datasets.cbs.nl/odata/v1/CBS/84576NED"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        bron: CBS staatsschuld
      </a>
    </div>
  )
}
