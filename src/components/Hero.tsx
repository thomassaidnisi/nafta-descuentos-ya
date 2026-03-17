import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import type { NaftaData } from "@/types/data";
import { getTodayName } from "@/lib/days";

interface HeroProps {
  data: NaftaData;
  dark: boolean;
  onToggle: () => void;
}

export function Hero({ data, dark, onToggle }: HeroProps) {
  const today = getTodayName();

  // Count today's deals
  let todayCount = 0;
  for (const est of data.estaciones) {
    for (const b of est.bancos) {
      if (b.dia === today) todayCount++;
    }
  }
  for (const g of data.descuentos_generales) {
    if (g.dia === today) todayCount++;
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
      </div>

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">⛽</span>
          </div>
          <span className="font-display text-sm font-semibold text-white">Nafta AR</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="glass rounded-full px-3 py-1 text-xs font-medium text-white/90">
            Actualizado {data.ultima_actualizacion}
          </span>
          <button
            onClick={onToggle}
            className="glass rounded-full p-2 text-white/90 transition-colors hover:text-white"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 px-4 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Descuentos en{" "}
            <span className="text-gradient">Nafta</span>
          </h1>
          <p className="mt-3 text-base text-white/70 sm:text-lg">
            Todos los descuentos vigentes en estaciones de servicio de Argentina.
            <br className="hidden sm:block" />
            {data.mes} · YPF, Shell, Axion y Puma.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <div className="glass rounded-xl px-5 py-3">
            <p className="font-mono text-2xl font-bold text-white">{data.estaciones.length}</p>
            <p className="text-xs text-white/60">Estaciones</p>
          </div>
          <div className="glass rounded-xl px-5 py-3">
            <p className="font-mono text-2xl font-bold text-white">
              {data.estaciones.reduce((a, s) => a + s.bancos.length, 0) + data.descuentos_generales.length}
            </p>
            <p className="text-xs text-white/60">Descuentos</p>
          </div>
          <div className="glass rounded-xl px-5 py-3">
            <p className="font-mono text-2xl font-bold text-primary">{todayCount}</p>
            <p className="text-xs text-white/60">Hoy · {today}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
