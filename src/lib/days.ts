export const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;
export const DAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

export function getTodayName(): string {
  return DAY_NAMES[new Date().getDay()];
}

export function matchesDay(discountDay: string, filterDay: string | null): boolean {
  if (!filterDay) return true; // "Todos"
  return discountDay === filterDay;
}

export const PREMIUM_FUELS = ["Infinia", "V-Power", "Quantium", "Infinia Diesel", "V-Power Diesel", "Quantium Diesel", "Puma Ron 95", "Puma Diesel 50"];

export function isPremiumFuel(fuel: string): boolean {
  return PREMIUM_FUELS.includes(fuel);
}
