import { Fuel, Moon, Sun } from "lucide-react";

interface HeaderProps {
  lastUpdate: string;
  dark: boolean;
  onToggle: () => void;
}

export function Header({ lastUpdate, dark, onToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Fuel className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">
            Descuentos en Nafta <span className="hidden text-muted-foreground sm:inline">· Argentina</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Actualizado {lastUpdate}
          </span>
          <button
            onClick={onToggle}
            className="rounded-full p-2 hover:bg-secondary transition-colors"
            aria-label="Cambiar tema"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
