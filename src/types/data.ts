export interface AppBenefit {
  nombre: string;
  detalle: string;
}

export interface BankDiscount {
  banco: string;
  descuento: string;
  pct: number;
  tope: number;
  periodo: string;
  dia: string;
  detalle: string;
  nivel: "alto" | "medio" | "bajo";
  combustibles: string[];
}

export interface Station {
  id: string;
  nombre: string;
  color: string;
  combustibles: string[];
  apps: AppBenefit[];
  bancos: BankDiscount[];
}

export interface NaftaData {
  ultima_actualizacion: string;
  mes: string;
  estaciones: Station[];
  descuentos_generales: BankDiscount[];
}
