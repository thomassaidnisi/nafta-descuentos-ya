import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { NaftaData } from "@/types/data";
import { getTodayName, matchesToday } from "@/lib/days";
interface TodayDealsProps {
  data: NaftaData;
}

export function TodayDeals({ data }: TodayDealsProps) {
  const today = getTodayName();

  type Deal = { banco: string; pct: number; detalle: string; estacion: string; color: string };
  const deals: Deal[] = [];

  for (const est of data.estaciones) {
    for (const b of est.bancos) {
      if (b.nivel === "alto" && matchesToday(b.dia))
        deals.push({ banco: b.banco, pct: b.pct, detalle: b.detalle, estacion: est.nombre, color: est.color });
      }
    }
  }
  for (const g of data.descuentos_generales) {
    if (g.nivel === "alto" && matchesToday(g.dia))
      deals.push({ banco: g.banco, pct: g.pct, detalle: g.detalle, estacion: "Todas", color: "#6B7280" });
    }
  }

  if (deals.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber/10">
          <Sparkles className="h-4 w-4 text-amber" />
        </div>
        <h2 className="font-display text-xl font-bold">Mejores descuentos hoy</h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{today}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl" style={{ backgroundColor: d.color }} />
            <div className="pl-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-semibold">{d.banco}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d.estacion}</p>
                </div>
                <span className="font-mono text-3xl font-bold text-nivel-alto">{d.pct}%</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.detalle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
