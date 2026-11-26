import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecetaCard from "@/components/RecetaCard";
import EstadoVacio from "@/components/EstadoVacio";
import { getCategoriaPorSlug, getRecetas } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/categorias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoriaPorSlug(slug);
  if (!categoria) return { title: "Categoría no encontrada" };
  return { title: categoria.nombre, description: categoria.descripcion };
}

export default async function CategoriaPage({ params }: PageProps<"/categorias/[slug]">) {
  const { slug } = await params;
  const categoria = await getCategoriaPorSlug(slug);

  if (!categoria) notFound();

  const recetas = await getRecetas({ categoriaId: categoria.id });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link href="/categorias" className="text-sm text-humo hover:text-barro">
        ← Todas las categorías
      </Link>

      <header className="petate mt-4 flex flex-col gap-4 rounded-[2rem] bg-tinta p-8 text-masa sm:flex-row sm:items-center sm:p-10">
        <span className="text-7xl" aria-hidden>
          {categoria.emoji}
        </span>
        <div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{categoria.nombre}</h1>
          <p className="mt-2 max-w-xl text-masa/80">{categoria.descripcion}</p>
        </div>
      </header>

      <div className="mt-10">
        {recetas.length === 0 ? (
          <EstadoVacio titulo="Sin recetas por ahora" mensaje="Esta categoría todavía no tiene recetas publicadas." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recetas.map((r) => (
              <RecetaCard key={r.id} receta={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
