"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Image from "next/image"

const data = [
  { year: "2015", value: 14.2 },
  { year: "2016", value: 13.8 },
  { year: "2017", value: 13.1 },
  { year: "2018", value: 12.5 },
  { year: "2019", value: 11.8 },
  { year: "2020", value: 10.2 },
  { year: "2021", value: 10.8 },
  { year: "2022", value: 10.1 },
  { year: "2023", value: 9.5 },
  { year: "2024", value: 9.0 },
]

export function AirQualityChart() {
  return (
    <div className="relative">
      <ChartContainer
        config={{
          value: {
            label: "PM2.5",
            color: "hsl(var(--chart-2))",
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
