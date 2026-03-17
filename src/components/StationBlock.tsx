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
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
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
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <StationLogo station={station} />
        <h3 className="text-lg font-bold">{station.nombre}</h3>
      </div>

      {/* App benefits — only when no day filter */}
      {!dayFilter && station.apps.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" /> Beneficios propios / apps
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {station.apps.map((app, i) => (
              <div key={i} className="rounded-lg border bg-card p-3">
                <p className="text-sm font-semibold">{app.nombre}</p>
                <p className="mt-1 text-xs text-muted-foreground">{app.detalle}</p>
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
    </section>
  );
}
