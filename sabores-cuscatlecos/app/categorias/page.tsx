import type { Metadata } from "next";
import Link from "next/link";
import { getCategorias } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora las recetas salvadoreñas por categoría.",
};

export default async function CategoriasPage() {
  const categorias = await getCategorias();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Categorías</h1>
      <p className="mt-2 text-humo">Del comal a la taza: elige por dónde empezar.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {categorias.map((c) => (
          <Link
            key={c.id}
            href={`/categorias/${c.slug}`}
            className="group flex items-center gap-6 rounded-3xl bg-white p-6 ring-1 ring-tinta/5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-maiz/30 text-5xl transition group-hover:bg-maiz">
              {c.emoji}
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold group-hover:text-barro">{c.nombre}</h2>
              <p className="mt-1 text-sm text-humo">{c.descripcion}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-barro">
                {c.total_recetas} {c.total_recetas === 1 ? "receta" : "recetas"} →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
