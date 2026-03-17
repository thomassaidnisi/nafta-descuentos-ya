import { useState, useMemo } from "react";
import { Calculator as CalcIcon } from "lucide-react";
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
    setStationId("");
    setFuel("");
    setDiscountIdx(null);
    setAmount("");
    setResult(null);
  }

  const selectClass = "w-full rounded-lg border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <Sheet onOpenChange={(open) => { if (!open) reset(); }}>
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          aria-label="Calculadora"
        >
          <CalcIcon className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Calculadora de descuento</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {/* Station */}
          <div>
            <label className="mb-1 block text-sm font-medium">Estación</label>
            <select
              value={stationId}
              onChange={(e) => { setStationId(e.target.value); setFuel(""); setDiscountIdx(null); setResult(null); }}
              className={selectClass}
            >
              <option value="">Elegí una estación</option>
              {data.estaciones.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          {stationId && (
            <div>
              <label className="mb-1 block text-sm font-medium">Combustible</label>
              <select
                value={fuel}
                onChange={(e) => { setFuel(e.target.value); setDiscountIdx(null); setResult(null); }}
                className={selectClass}
              >
                <option value="">Elegí combustible</option>
                {fuels.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          )}

          {/* Discount */}
          {fuel && availableDiscounts.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium">Banco / Descuento</label>
              <select
                value={discountIdx ?? ""}
                onChange={(e) => { setDiscountIdx(e.target.value !== "" ? Number(e.target.value) : null); setResult(null); }}
                className={selectClass}
              >
                <option value="">Elegí descuento</option>
                {availableDiscounts.map((d, i) => (
                  <option key={i} value={i}>{d.banco} — {d.pct}% ({d.dia})</option>
                ))}
              </select>
            </div>
          )}

          {/* Amount */}
          {selectedDiscount && (
            <div>
              <label className="mb-1 block text-sm font-medium">Monto en pesos</label>
              <Input
                type="number"
                placeholder="Ej: 50000"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setResult(null); }}
                min={0}
              />
            </div>
          )}

          {selectedDiscount && amount && (
            <Button onClick={calculate} className="w-full">
              Calcular
            </Button>
          )}

          {/* Result */}
          {result && (
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monto original</span>
                <span className="font-mono font-semibold">${result.original.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-nivel-alto font-medium">Descuento</span>
                <span className="font-mono font-bold text-nivel-alto">-${result.saved.toLocaleString("es-AR")}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold">Total a pagar</span>
                <span className="font-mono text-lg font-bold">${result.final.toLocaleString("es-AR")}</span>
              </div>
              {result.capped && (
                <p className="rounded-md bg-amber/10 px-3 py-2 text-xs font-medium text-amber">
                  ⚠️ El descuento se aplica hasta el tope de ${selectedDiscount!.tope.toLocaleString("es-AR")}/{selectedDiscount!.periodo}
                </p>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
