import { useState } from "react";
import { useNaftaData } from "@/hooks/useNaftaData";
import { useTheme } from "@/hooks/useTheme";
import { Hero } from "@/components/Hero";
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
      <Hero data={data} dark={dark} onToggle={toggle} />
      <TodayDeals data={data} />

      <StationFilters
        stations={data.estaciones}
        activeStation={stationFilter}
        onStation={setStationFilter}
        activeDay={dayFilter}
        onDay={setDayFilter}
      />

      <main className="container mx-auto space-y-10 px-4 py-8">
        {filteredStations.map((s) => (
          <StationBlock key={s.id} station={s} dayFilter={dayFilter} />
        ))}

        {!stationFilter && (
          <GeneralDiscounts discounts={data.descuentos_generales} dayFilter={dayFilter} />
        )}
      </main>

      <Calculator data={data} />

      <footer className="border-t py-8 text-center">
        <p className="font-display text-sm font-medium text-muted-foreground">Descuentos en Nafta · Argentina</p>
        <p className="mt-1 text-xs text-muted-foreground">{data.mes} · Los descuentos pueden cambiar sin previo aviso.</p>
      </footer>
    </div>
  );
}
