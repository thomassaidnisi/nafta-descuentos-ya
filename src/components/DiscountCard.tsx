import type { BankDiscount } from "@/types/data";
import { isPremiumFuel } from "@/lib/days";
import { cn } from "@/lib/utils";

interface DiscountCardProps {
  discount: BankDiscount;
  stationColor?: string;
}

const nivelStyles: Record<string, string> = {
  alto: "bg-nivel-alto/10 text-nivel-alto",
  medio: "bg-nivel-medio/10 text-nivel-medio",
  bajo: "bg-nivel-bajo/10 text-nivel-bajo",
};

export function DiscountCard({ discount, stationColor }: DiscountCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
      {stationColor && (
        <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: stationColor }} />
      )}
      <div className={cn(stationColor && "pl-3")}>
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-sm font-semibold leading-tight">{discount.banco}</p>
          <span className={cn("shrink-0 rounded-lg px-2.5 py-1 font-mono text-sm font-bold", nivelStyles[discount.nivel])}>
            {discount.pct}%
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{discount.detalle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {discount.dia}
          </span>
          {discount.combustibles.map((f) => (
            <span
              key={f}
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                f === "Todos"
                  ? "bg-secondary text-secondary-foreground"
                  : isPremiumFuel(f)
                    ? "bg-amber/10 text-amber"
                    : "bg-secondary text-secondary-foreground"
              )}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
