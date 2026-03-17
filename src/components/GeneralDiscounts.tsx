import type { BankDiscount } from "@/types/data";
import { DiscountCard } from "./DiscountCard";
import { matchesDay } from "@/lib/days";
import { Globe } from "lucide-react";

interface Props {
  discounts: BankDiscount[];
  dayFilter: string | null;
}

export function GeneralDiscounts({ discounts, dayFilter }: Props) {
  const filtered = discounts.filter((d) => matchesDay(d.dia, dayFilter));
  if (filtered.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-bold">Descuentos generales</h3>
        <span className="text-sm text-muted-foreground">— Aplican en todas las estaciones</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <DiscountCard key={i} discount={d} />
        ))}
      </div>
    </section>
  );
}
