"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Image from "next/image"

const data = [
  { year: "2015", value: 42.3 },
  { year: "2016", value: 43.8 },
  { year: "2017", value: 45.2 },
  { year: "2018", value: 47.1 },
  { year: "2019", value: 49.5 },
  { year: "2020", value: 52.8 },
  { year: "2021", value: 55.2 },
  { year: "2022", value: 58.1 },
  { year: "2023", value: 61.3 },
  { year: "2024", value: 64.7 },
]

export function RegulationsChart() {
  return (
    <div className="relative">
      <ChartContainer
        config={{
          value: {
            label: "Regels",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image src="/images/coming-soon.png" alt="Coming soon" width={300} height={300} className="object-contain" />
      </div>
    </div>
  )
}
