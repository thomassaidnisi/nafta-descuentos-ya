import { useState, useMemo } from "react";
import { Calculator as CalcIcon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { NaftaData, BankDiscount } from "@/types/data";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  data: NaftaData;
}

export function Calculator({ data }: Props) {
  const [stationId, setStationId] = useState("");
  const [fuel, setFuel] = useState("");
  const [discountIdx, setDiscountIdx] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<{ original: number; saved: number; final: number; capped: boolean } | null>(null);

  const station = data.estaciones.find((s) => s.id === stationId);
  const fuels = station?.combustibles ?? [];

  const availableDiscounts = useMemo(() => {
    const list: (BankDiscount & { source: string })[] = [];
    if (station && fuel) {
      for (const b of station.bancos) {
        if (b.combustibles.includes(fuel)) list.push({ ...b, source: station.nombre });
      }
    }
    if (fuel) {
      for (const g of data.descuentos_generales) {
        if (g.combustibles.includes("Todos") || g.combustibles.includes(fuel)) {
          list.push({ ...g, source: "General" });
        }
      }
    }
    return list;
  }, [station, fuel, data.descuentos_generales]);

  const selectedDiscount = discountIdx !== null ? availableDiscounts[discountIdx] : null;

  function calculate() {
    if (!selectedDiscount || !amount) return;
    const monto = parseFloat(amount);
    if (isNaN(monto) || monto <= 0) return;
    const maxDiscount = selectedDiscount.tope;
    const rawDiscount = monto * (selectedDiscount.pct / 100);
    const capped = rawDiscount > maxDiscount;
    const saved = capped ? maxDiscount : rawDiscount;
    setResult({ original: monto, saved, final: monto - saved, capped });
  }

  function reset() {
    setStationId(""); setFuel(""); setDiscountIdx(null); setAmount(""); setResult(null);
  }

  const selectClass = "w-full rounded-xl border bg-card px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <Sheet onOpenChange={(open) => { if (!open) reset(); }}>
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
          aria-label="Calculadora"
        >
          <CalcIcon className="h-6 w-6" />
        </motion.button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-3xl">
        <SheetHeader>
          <SheetTitle className="font-display">Calculá tu ahorro</SheetTitle>
        </SheetHeader>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estación</label>
            <select value={stationId} onChange={(e) => { setStationId(e.target.value); setFuel(""); setDiscountIdx(null); setResult(null); }} className={selectClass}>
              <option value="">Elegí una estación</option>
              {data.estaciones.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
          </div>

          <AnimatePresence>
            {stationId && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Combustible</label>
                <select value={fuel} onChange={(e) => { setFuel(e.target.value); setDiscountIdx(null); setResult(null); }} className={selectClass}>
                  <option value="">Elegí combustible</option>
                  {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {fuel && availableDiscounts.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Descuento</label>
                <select value={discountIdx ?? ""} onChange={(e) => { setDiscountIdx(e.target.value !== "" ? Number(e.target.value) : null); setResult(null); }} className={selectClass}>
                  <option value="">Elegí descuento</option>
                  {availableDiscounts.map((d, i) => <option key={i} value={i}>{d.banco} — {d.pct}% ({d.dia})</option>)}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedDiscount && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monto ($)</label>
                <Input type="number" placeholder="Ej: 50000" value={amount} onChange={(e) => { setAmount(e.target.value); setResult(null); }} min={0} className="rounded-xl py-3" />
              </motion.div>
            )}
          </AnimatePresence>

          {selectedDiscount && amount && (
            <Button onClick={calculate} className="w-full rounded-xl py-3 font-display font-semibold">
              Calcular ahorro <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border bg-card p-5 space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monto original</span>
                  <span className="font-mono font-semibold">${result.original.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-nivel-alto">Ahorro</span>
                  <span className="font-mono font-bold text-nivel-alto">-${result.saved.toLocaleString("es-AR")}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-baseline">
                  <span className="font-display font-bold">Total a pagar</span>
                  <span className="font-mono text-2xl font-bold">${result.final.toLocaleString("es-AR")}</span>
                </div>
                {result.capped && (
                  <p className="rounded-xl bg-amber/10 px-4 py-2.5 text-xs font-medium text-amber">
                    ⚠️ Descuento aplicado hasta el tope de ${selectedDiscount!.tope.toLocaleString("es-AR")}/{selectedDiscount!.periodo}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
