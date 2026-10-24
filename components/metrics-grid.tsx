import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GDPChart } from "@/components/charts/gdp-chart"
import { DebtChart } from "@/components/charts/debt-chart"
import { CivilServantsChart } from "@/components/charts/civil-servants-chart"
import { MurderRateChart } from "@/components/charts/murder-rate-chart"
import { MigrantsChart } from "@/components/charts/migrants-chart"
import { HousingPriceChart } from "@/components/charts/housing-price-chart"

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Bruto Binnenlands Product</CardTitle>
          <CardDescription className="hidden sm:block">Bruto Binnenlands Product in miljarden €</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <GDPChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Staatsschuld</CardTitle>
          <CardDescription className="hidden sm:block">Staatsschuld als % van BNP</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <DebtChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Hoe groot is de overheid?</CardTitle>
          <CardDescription className="hidden sm:block">Totaal aantal ambtenaren (x1000)</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <CivilServantsChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Aantal migranten</CardTitle>
          <CardDescription className="hidden sm:block">Netto migratie (x1000)</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <MigrantsChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Veiligheid</CardTitle>
          <CardDescription className="hidden sm:block">Misdrijven per 1000 inwoners</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <MurderRateChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-3 py-1 sm:px-6 sm:py-1">
          <CardTitle className="text-base sm:text-xl">Betaalbaar wonen</CardTitle>
          <CardDescription className="hidden sm:block">Gemiddelde woningprijs / gemiddeld jaarloon</CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-0 sm:px-6 sm:pb-0">
          <HousingPriceChart />
        </CardContent>
      </Card>
    </div>
  )
}
