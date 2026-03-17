import { Sparkles } from "lucide-react";
import type { NaftaData } from "@/types/data";
import { getTodayName } from "@/lib/days";

interface TodayDealsProps {
  data: NaftaData;
}

export function TodayDeals({ data }: TodayDealsProps) {
  const today = getTodayName();

  type Deal = { banco: string; pct: number; detalle: string; estacion: string; color: string };
  const deals: Deal[] = [];

  for (const est of data.estaciones) {
    for (const b of est.bancos) {
      if (b.nivel === "alto" && b.dia === today) {
        deals.push({ banco: b.banco, pct: b.pct, detalle: b.detalle, estacion: est.nombre, color: est.color });
      }
    }
  }
  for (const g of data.descuentos_generales) {
    if (g.nivel === "alto" && g.dia === today) {
      deals.push({ banco: g.banco, pct: g.pct, detalle: g.detalle, estacion: "Todas", color: "#6B7280" });
    }
  }

  if (deals.length === 0) {
    return (
      <section className="container mx-auto px-4 py-6">
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">No hay descuentos destacados para hoy ({today}).</p>
          <p className="mt-1 text-sm text-muted-foreground">Revisá los descuentos por día debajo.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber" />
        <h2 className="text-lg font-bold">Mejores descuentos hoy — {today}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((d, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: d.color }} />
            <div className="pl-3">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">{d.banco}</p>
                <span className="font-mono text-2xl font-bold text-nivel-alto">{d.pct}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{d.estacion}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d.detalle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
