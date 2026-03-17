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
    <div className="container mx-auto space-y-3 px-4">
      {/* Station pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStation(null)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            !activeStation ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Todas
        </button>
        {stations.map((s) => (
          <button
            key={s.id}
            onClick={() => onStation(s.id === activeStation ? null : s.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeStation === s.id ? "text-white" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            style={activeStation === s.id ? { backgroundColor: s.color } : undefined}
          >
            {s.nombre}
          </button>
        ))}
      </div>

      {/* Day pills */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onDay(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            !activeDay ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          Todos
        </button>
        {DAY_NAMES.map((d, i) => (
          <button
            key={d}
            onClick={() => onDay(d === activeDay ? null : d)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeDay === d ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {DAY_SHORT[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
