import Link from "next/link";
import type { RecetaConCategoria } from "@/lib/types";
import { colorDificultad, formatoTiempo } from "@/lib/format";

export default function RecetaCard({ receta }: { receta: RecetaConCategoria }) {
  return (
    <Link
      href={`/recetas/${receta.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-tinta/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-maiz/70 via-maiz/40 to-barro/30">
        <span className="text-7xl transition duration-300 group-hover:scale-110" aria-hidden>
          {receta.emoji}
        </span>
        {receta.categoria && (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-tinta">
            {receta.categoria.emoji} {receta.categoria.nombre}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-barro">
          {receta.titulo}
        </h3>
        <p className="line-clamp-2 text-sm text-humo">{receta.resumen}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs font-medium">
          <span className="rounded-full bg-masa px-2.5 py-1">⏱ {formatoTiempo(receta.tiempo_minutos)}</span>
          <span className="rounded-full bg-masa px-2.5 py-1">👥 {receta.porciones}</span>
          <span className={`rounded-full px-2.5 py-1 ${colorDificultad(receta.dificultad)}`}>
            {receta.dificultad}
          </span>
        </div>
      </div>
    </Link>
  );
}
