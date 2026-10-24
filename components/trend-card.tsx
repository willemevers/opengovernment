"use client"

import { useId } from "react"
import { LOCALE, UI, type Lang } from "@/lib/i18n"
import { Area, AreaChart, CartesianGrid, Line, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// "Max" range always starts here, so every chart shares the same time axis.
const START_YEAR = 1980

export type Row = { year: string; [key: string]: string | number | null }

export type Series = {
  key: string
  label: string
  format: (v: number) => string
  ownScale?: boolean // different unit than the headline series
}

type Props = {
  title: string
  description: string
  data: Row[]
  // First series is the headline (filled area); an optional second one is drawn as a quiet dashed line.
  series: [Series] | [Series, Series]
  unit?: string
  source: { label: string; href: string }
  range: "10" | "max"
  lang: Lang
}

const COLORS = ["var(--chart-1)", "var(--muted-foreground)"]

function lastValue(data: Row[], key: string) {
  const row = data.findLast((r) => r[key] != null)
  return row ? { year: row.year, value: row[key] as number } : null
}

function firstValue(data: Row[], key: string) {
  const row = data.find((r) => r[key] != null)
  return row ? { year: row.year, value: row[key] as number } : null
}

export function TrendCard({ title, description, data: allData, series, unit, source, range, lang }: Props) {
  const t = UI[lang]
  const pct = new Intl.NumberFormat(LOCALE[lang], { style: "percent", maximumFractionDigits: 0, signDisplay: "exceptZero" })
  const gradientId = useId()
  const [main] = series
  // Every year in the range gets a row; years without data stay empty so gaps are visible.
  const hasData = (r: Row) => series.some((s) => r[s.key] != null)
  const dataYears = allData.filter(hasData).map((r) => Number(r.year))
  const lastYear = Math.max(...dataYears)
  const fromYear = range === "10" ? lastYear - 9 : Math.min(START_YEAR, ...dataYears)
  const byYear = new Map(allData.map((r) => [r.year, r]))
  const data: Row[] = Array.from({ length: lastYear - fromYear + 1 }, (_, i) => {
    const year = String(fromYear + i)
    return byYear.get(year) ?? { year }
  })
  const firstDataYear = data.find(hasData)?.year
  const missingTo = firstDataYear && firstDataYear !== data[0].year ? String(Number(firstDataYear) - 1) : null
  const latest = lastValue(data, main.key)
  const first = firstValue(data, main.key)
  const years = [data[0].year, data[data.length - 1].year]

  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {latest && (
        <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">{main.format(latest.value)}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          <span className="text-sm text-muted-foreground">{t.in} {latest.year}</span>
          {first && first.year !== latest.year && (
            <span title={`${first.year}: ${main.format(first.value)}`} className="ml-auto rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground tabular-nums">
              {pct.format(latest.value / first.value - 1)} {t.since} {first.year}
            </span>
          )}
        </div>
      )}

      <div className="mt-4 h-[180px] sm:h-[200px] -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS[0]} stopOpacity={0.22} />
                <stop offset="100%" stopColor={COLORS[0]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 4" />
            {missingTo && (
              <ReferenceArea
                yAxisId={0}
                x1={data[0].year}
                x2={missingTo}
                fill="var(--muted)"
                fillOpacity={0.6}
                stroke="none"
                ifOverflow="extendDomain"
                label={{ value: t.noData, position: "center", fontSize: 12, fill: "var(--muted-foreground)" }}
              />
            )}
            <XAxis
              dataKey="year"
              ticks={years}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickMargin={8}
            />
            <YAxis yAxisId={0} hide domain={[0, "auto"]} />
            <YAxis yAxisId={1} hide domain={[0, "auto"]} />
            <Tooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="rounded-lg border bg-card px-3 py-2 text-xs shadow-md">
                    <div className="mb-1 font-medium">{label}</div>
                    {series.map((s, i) => {
                      const v = payload.find((p) => p.dataKey === s.key)?.value
                      return v == null ? null : (
                        <div key={s.key} className="flex items-center gap-2 text-muted-foreground">
                          <span className="size-2 rounded-full" style={{ background: COLORS[i] }} />
                          {s.label}
                          <span className="ml-auto pl-3 font-medium text-foreground tabular-nums">
                            {s.format(Number(v))}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : null
              }
            />
            <Area
              yAxisId={0}
              type="monotone"
              dataKey={main.key}
              stroke={COLORS[0]}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--card)" }}
            />
            {series[1] && (
              <Line
                yAxisId={series[1].ownScale ? 1 : 0}
                type="monotone"
                dataKey={series[1].key}
                stroke={COLORS[1]}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                activeDot={{ r: 3 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {series.length > 1 &&
          series.map((s, i) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded-full" style={{ background: COLORS[i] }} />
              {s.label}
            </span>
          ))}
        <a href={source.href} target="_blank" rel="noopener noreferrer" className="ml-auto hover:text-foreground hover:underline">
          {t.source}: {source.label}
        </a>
      </div>
    </section>
  )
}
