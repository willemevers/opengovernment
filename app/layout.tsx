import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

const description = "Hoe goed doen we het eigenlijk? Economie, staatsschuld, migratie, veiligheid en wonen in Nederland, in heldere grafieken met officiële cijfers."

export const metadata: Metadata = {
  metadataBase: new URL("https://overheidsdashboard.nl"),
  title: "Nederlandse Overheid Dashboard",
  description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Nederlandse Overheid Dashboard",
    description,
    url: "/",
    siteName: "Overheidsdashboard",
    locale: "nl_NL",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Nederlandse Overheid Dashboard", description },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className={`font-sans antialiased ${_inter.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
