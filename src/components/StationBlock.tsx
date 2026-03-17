import { motion } from "framer-motion";
import type { Station } from "@/types/data";
import { DiscountCard } from "./DiscountCard";
import { matchesDay } from "@/lib/days";
import { Smartphone } from "lucide-react";

interface StationBlockProps {
  station: Station;
  dayFilter: string | null;
}

function StationLogo({ station }: { station: Station }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
      style={{ backgroundColor: station.color }}
    >
      {station.nombre.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function StationBlock({ station, dayFilter }: StationBlockProps) {
  const filteredBancos = station.bancos.filter((b) => matchesDay(b.dia, dayFilter));

  if (filteredBancos.length === 0 && dayFilter) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <StationLogo station={station} />
        <div>
          <h3 className="font-display text-lg font-bold">{station.nombre}</h3>
          <p className="text-xs text-muted-foreground">{station.combustibles.join(" · ")}</p>
        </div>
      </div>

      {/* App benefits — only when no day filter */}
      {!dayFilter && station.apps.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" /> Apps y beneficios propios
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {station.apps.map((app, i) => (
              <div key={i} className="rounded-xl border bg-card/60 p-3.5">
                <p className="text-sm font-semibold">{app.nombre}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{app.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bank discounts */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBancos.map((b, i) => (
          <DiscountCard key={i} discount={b} stationColor={station.color} />
        ))}
      </div>
    </motion.section>
  );
}
