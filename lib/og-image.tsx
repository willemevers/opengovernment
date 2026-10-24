import { ImageResponse } from "next/og"
import data from "@/lib/data.json"
import { LOCALE, UI, type Lang } from "@/lib/i18n"

export const ogSize = { width: 1200, height: 630 }

type Rows = Record<string, string | number | null>[]

function series(rows: Rows, key: string) {
  return rows.filter((r) => r[key] != null).slice(-20).map((r) => ({ year: String(r.year), v: Number(r[key]) }))
}

function sparkline(points: { v: number }[], w = 220, h = 56) {
  const vs = points.map((p) => p.v)
  const min = Math.min(...vs), max = Math.max(...vs)
  return points
    .map((p, i) => `${i ? "L" : "M"}${((i / (points.length - 1)) * w).toFixed(1)},${(h - ((p.v - min) / (max - min || 1)) * h).toFixed(1)}`)
    .join(" ")
}

const TEXT = {
  nl: { tagline: "Hoe goed doen we het eigenlijk? De cijfers, zo ver terug als ze gaan.", labels: ["BBP", "Staatsschuld", "Immigratie", "Huis in jaarsalarissen"], bn: "mld", gdp: "bbp" },
  en: { tagline: "How is the Netherlands really doing? The data, as far back as it goes.", labels: ["GDP", "National debt", "Immigration", "House in annual salaries"], bn: "bn", gdp: "GDP" },
}

export function renderOgImage(lang: Lang) {
  const x = TEXT[lang]
  const nf = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 1 })
  const tiles = [
    { label: x.labels[0], pts: series(data.gdp, "value"), fmt: (v: number) => `€${nf.format(v)} ${x.bn}` },
    { label: x.labels[1], pts: series(data.debt, "debtPercent"), fmt: (v: number) => `${nf.format(v)}% ${x.gdp}` },
    { label: x.labels[2], pts: series(data.migrants, "immigration"), fmt: (v: number) => nf.format(v) },
    { label: x.labels[3], pts: series(data.housing, "ratio"), fmt: (v: number) => `${nf.format(v)}×` },
  ]
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fafafa", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#6b7280" }}>
          <div style={{ display: "flex", width: 36, height: 24, flexDirection: "column", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ flex: 1, background: "#ae1c28" }} />
            <div style={{ flex: 1, background: "#ffffff" }} />
            <div style={{ flex: 1, background: "#21468b" }} />
          </div>
          overheidsdashboard.nl
        </div>
        <div style={{ marginTop: 28, fontSize: 64, fontWeight: 700, letterSpacing: -2, color: "#111827" }}>{UI[lang].title}</div>
        <div style={{ marginTop: 12, fontSize: 30, color: "#6b7280" }}>{x.tagline}</div>
        <div style={{ marginTop: "auto", display: "flex", gap: 20 }}>
          {tiles.map((t) => {
            const last = t.pts[t.pts.length - 1]
            return (
              <div key={t.label} style={{ flex: 1, display: "flex", flexDirection: "column", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 22 }}>
                <div style={{ fontSize: 18, color: "#6b7280" }}>{t.label}</div>
                <div style={{ marginTop: 6, fontSize: 32, fontWeight: 700, color: "#111827" }}>{t.fmt(last.v)}</div>
                <div style={{ fontSize: 16, color: "#9ca3af" }}>{last.year}</div>
                <svg width="220" height="56" viewBox="-2 -2 224 60" style={{ marginTop: 14 }}>
                  <path d={sparkline(t.pts)} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    ),
    ogSize,
  )
}
