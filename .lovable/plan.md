

# Descuentos en Nafta · Argentina

## Overview
Dashboard público de una sola página que muestra descuentos vigentes en nafta de estaciones de servicio argentinas, con datos estáticos desde un archivo JSON.

## Estructura de la página

### 1. Header sticky
- Título "Descuentos en Nafta · Argentina" con ícono de combustible
- Chip "Actualizado YYYY-MM-DD" desde el JSON
- Toggle dark/light mode (persistido en localStorage, light por defecto)

### 2. Sección "Mejores descuentos hoy"
- Detecta día actual automáticamente
- Muestra cards destacadas de nivel "alto" que aplican hoy
- Cada card: banco, porcentaje grande (DM Mono), estación, detalle resumido
- Si no hay descuentos hoy, mensaje informativo

### 3. Barra de filtros
- **Por estación**: pills "Todas / YPF / Shell / Axion / Puma" — el activo toma el color de la marca
- **Por día**: pills compactos "Todos / Lun / Mar / Mié / Jue / Vie / Sáb / Dom"

### 4. Dashboard por estación
- Bloque por cada estación con:
  - Logo desde `/logos/{id}.png` con fallback a iniciales + color de marca
  - Subsección "Beneficios propios / apps" (visible solo con filtro día = "Todos")
  - Grilla de cards bancarias: banco, badge % con color por nivel (alto=verde, medio=azul, bajo=gris), detalle, chip día, chips combustibles (premium en ámbar, normales en gris)

### 5. Sección "Descuentos generales"
- Cards de billeteras/bancos que aplican en todas las estaciones (Mercado Pago, etc.)

### 6. Calculadora flotante
- Botón 🧮 fijo abajo-derecha
- Sheet desde abajo con: selector estación → combustible → banco/descuento → input monto → botón calcular
- Resultado: monto original, descuento en verde, total a pagar
- Aviso ámbar si el monto supera el tope

## Datos
- Archivo `public/data.json` con la estructura proporcionada, poblado con datos de ejemplo representativos
- Fetch al montar la app

## Estilo visual
- DM Sans (texto) + DM Mono (números/porcentajes) desde Google Fonts
- Light mode default, dark mode opcional
- Cards con bordes sutiles, esquinas redondeadas, sin sombras pesadas
- Colores de marca como acento (barra lateral en cards, filtros activos)
- Porcentajes grandes y destacados
- Responsive mobile-first

## Componentes principales
- `Header` — sticky con título, chip actualización, toggle theme
- `TodayDeals` — descuentos destacados del día
- `StationFilters` — pills de estación y día
- `StationBlock` — bloque de una estación con apps y cards bancarias
- `DiscountCard` — card individual de descuento bancario
- `GeneralDiscounts` — descuentos que aplican en todas las estaciones
- `Calculator` — sheet/drawer con la calculadora
- `ThemeProvider` — manejo de dark/light mode

