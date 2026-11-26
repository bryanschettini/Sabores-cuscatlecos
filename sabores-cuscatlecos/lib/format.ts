import type { Dificultad } from "./types";

export function formatoTiempo(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function colorDificultad(d: Dificultad): string {
  switch (d) {
    case "Fácil":
      return "bg-emerald-100 text-emerald-800";
    case "Media":
      return "bg-amber-100 text-amber-800";
    case "Difícil":
      return "bg-rose-100 text-rose-800";
  }
}
