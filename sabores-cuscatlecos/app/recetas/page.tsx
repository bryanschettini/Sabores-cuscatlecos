import type { Metadata } from "next";
import Form from "next/form";
import { Suspense } from "react";
import RecetaCard from "@/components/RecetaCard";
import EstadoVacio from "@/components/EstadoVacio";
import { GridSkeleton } from "@/components/Skeletons";
import { getRecetas } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recetas",
  description: "Todas las recetas tradicionales salvadoreñas.",
};

async function ListaRecetas({ busqueda }: { busqueda?: string }) {
  const recetas = await getRecetas({ busqueda });

  if (recetas.length === 0) {
    return (
      <EstadoVacio
        titulo="No encontramos esa receta"
        mensaje={busqueda ? `No hay resultados para "${busqueda}". Prueba con otra palabra.` : "Todavía no hay recetas."}
      />
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-humo">
        {recetas.length} {recetas.length === 1 ? "receta" : "recetas"}
        {busqueda && <> para “{busqueda}”</>}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.map((r) => (
          <RecetaCard key={r.id} receta={r} />
        ))}
      </div>
    </>
  );
}

export default async function RecetasPage({ searchParams }: PageProps<"/recetas">) {
  const { q } = await searchParams;
  const busqueda = typeof q === "string" ? q.trim().slice(0, 60) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Todas las recetas</h1>
          <p className="mt-2 text-humo">Busca tu plato favorito o descubre uno nuevo.</p>
        </div>
        <Form action="/recetas" className="flex w-full gap-2 md:w-auto">
          <label htmlFor="q" className="sr-only">
            Buscar receta
          </label>
          <input
            id="q"
            name="q"
            defaultValue={busqueda}
            placeholder="Ej. pupusas"
            className="w-full rounded-full border border-tinta/15 bg-white px-5 py-3 outline-none focus:border-barro focus:ring-2 focus:ring-barro/20 md:w-72"
          />
          <button className="rounded-full bg-tinta px-5 py-3 font-semibold text-masa hover:bg-barro">Buscar</button>
        </Form>
      </header>

      <Suspense key={busqueda ?? ""} fallback={<GridSkeleton />}>
        <ListaRecetas busqueda={busqueda} />
      </Suspense>
    </div>
  );
}
