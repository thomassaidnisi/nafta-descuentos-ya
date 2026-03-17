import type { Station } from "@/types/data";
import { DAY_NAMES, DAY_SHORT } from "@/lib/days";
import { cn } from "@/lib/utils";

interface StationFiltersProps {
  stations: Station[];
  activeStation: string | null;
  onStation: (id: string | null) => void;
  activeDay: string | null;
  onDay: (day: string | null) => void;
}

export function StationFilters({ stations, activeStation, onStation, activeDay, onDay }: StationFiltersProps) {
  return (
    <div className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto space-y-2.5 px-4 py-3">
        {/* Station pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="shrink-0 text-xs font-medium text-muted-foreground">Estación</span>
          <button
            onClick={() => onStation(null)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              !activeStation
                ? "bg-foreground text-background shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            )}
          >
            Todas
          </button>
          {stations.map((s) => (
            <button
              key={s.id}
              onClick={() => onStation(s.id === activeStation ? null : s.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                activeStation === s.id
                  ? "text-white shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              )}
              style={activeStation === s.id ? { backgroundColor: s.color } : undefined}
            >
              {s.nombre}
            </button>
          ))}
        </div>

        {/* Day pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="shrink-0 text-xs font-medium text-muted-foreground mr-0.5">Día</span>
          <button
            onClick={() => onDay(null)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
              !activeDay
                ? "bg-foreground text-background shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            )}
          >
            Todos
          </button>
          {DAY_NAMES.map((d, i) => (
            <button
              key={d}
              onClick={() => onDay(d === activeDay ? null : d)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                activeDay === d
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              )}
            >
              {DAY_SHORT[i]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
