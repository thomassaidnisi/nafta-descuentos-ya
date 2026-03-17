import { motion } from "framer-motion";
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
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
          <Globe className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Descuentos generales</h3>
          <p className="text-xs text-muted-foreground">Billeteras y bancos · Todas las estaciones</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => (
          <DiscountCard key={i} discount={d} />
        ))}
      </div>
    </motion.section>
  );
}
