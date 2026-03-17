import { useState } from "react";
import { useNaftaData } from "@/hooks/useNaftaData";
import { useTheme } from "@/hooks/useTheme";
import { Header } from "@/components/Header";
import { TodayDeals } from "@/components/TodayDeals";
import { StationFilters } from "@/components/StationFilters";
import { StationBlock } from "@/components/StationBlock";
import { GeneralDiscounts } from "@/components/GeneralDiscounts";
import { Calculator } from "@/components/Calculator";
import { Fuel } from "lucide-react";

export default function Index() {
  const { data, loading } = useNaftaData();
  const { dark, toggle } = useTheme();
  const [stationFilter, setStationFilter] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState<string | null>(null);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Fuel className="h-8 w-8 animate-pulse text-primary" />
      </div>
    );
  }

  const filteredStations = stationFilter
    ? data.estaciones.filter((s) => s.id === stationFilter)
    : data.estaciones;

  return (
    <div className="min-h-screen">
      <Header lastUpdate={data.ultima_actualizacion} dark={dark} onToggle={toggle} />
      <TodayDeals data={data} />

      <StationFilters
        stations={data.estaciones}
        activeStation={stationFilter}
        onStation={setStationFilter}
        activeDay={dayFilter}
        onDay={setDayFilter}
      />

      <main className="container mx-auto space-y-8 px-4 py-6">
        {filteredStations.map((s) => (
          <StationBlock key={s.id} station={s} dayFilter={dayFilter} />
        ))}

        {!stationFilter && (
          <GeneralDiscounts discounts={data.descuentos_generales} dayFilter={dayFilter} />
        )}
      </main>

      <Calculator data={data} />

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <p>Descuentos en Nafta · Argentina — {data.mes}</p>
        <p className="mt-1">Los descuentos pueden cambiar sin previo aviso. Verificá condiciones con tu banco.</p>
      </footer>
    </div>
  );
}
