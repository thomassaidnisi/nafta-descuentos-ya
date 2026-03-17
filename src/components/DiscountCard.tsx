import type { BankDiscount } from "@/types/data";
import { isPremiumFuel } from "@/lib/days";
import { cn } from "@/lib/utils";

interface DiscountCardProps {
  discount: BankDiscount;
  stationColor?: string;
}

const nivelColor: Record<string, string> = {
  alto: "bg-nivel-alto text-white",
  medio: "bg-nivel-medio text-white",
  bajo: "bg-nivel-bajo text-white",
};

export function DiscountCard({ discount, stationColor }: DiscountCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
      {stationColor && (
        <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: stationColor }} />
      )}
      <div className={cn(stationColor && "pl-3")}>
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold leading-tight">{discount.banco}</p>
          <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 font-mono text-sm font-bold", nivelColor[discount.nivel])}>
            {discount.pct}%
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{discount.detalle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {discount.dia}
          </span>
          {discount.combustibles.map((f) => (
            <span
              key={f}
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                f === "Todos"
                  ? "bg-secondary text-secondary-foreground"
                  : isPremiumFuel(f)
                    ? "bg-amber/15 text-amber"
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
