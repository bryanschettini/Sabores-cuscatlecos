import Link from "next/link";
import { Suspense } from "react";
import RecetaCard from "@/components/RecetaCard";
import { GridSkeleton } from "@/components/Skeletons";
import { getCategorias, getRecetasDestacadas } from "@/lib/data";

async function Destacadas() {
  const recetas = await getRecetasDestacadas(4);
  if (recetas.length === 0) {
    return <p className="text-humo">Aún no hay recetas destacadas.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {recetas.map((r) => (
        <RecetaCard key={r.id} receta={r} />
      ))}
    </div>
  );
}

async function Categorias() {
  const categorias = await getCategorias();
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categorias.map((c) => (
        <Link
          key={c.id}
          href={`/categorias/${c.slug}`}
          className="group rounded-3xl bg-white p-6 ring-1 ring-tinta/5 transition hover:bg-tinta hover:text-masa"
        >
          <span className="text-4xl" aria-hidden>
            {c.emoji}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold">{c.nombre}</h3>
          <p className="mt-1 text-sm text-humo group-hover:text-masa/70">
            {c.total_recetas} {c.total_recetas === 1 ? "receta" : "recetas"}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="petate relative overflow-hidden bg-barro text-masa">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-maiz">
              Cocina tradicional de El Salvador
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              El sabor de casa, <span className="italic text-maiz">receta por receta.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-masa/85">
              Pupusas, sopas, atoles y dulces típicos explicados paso a paso, como los prepara la abuela.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/recetas"
                className="rounded-full bg-maiz px-6 py-3 font-semibold text-tinta transition hover:bg-white"
              >
                Explorar recetas
              </Link>
              <Link
                href="/categorias"
                className="rounded-full border border-masa/40 px-6 py-3 font-semibold transition hover:bg-masa/10"
              >
                Ver categorías
              </Link>
            </div>
          </div>
          <div className="relative mx-auto hidden aspect-square w-full max-w-sm md:block" aria-hidden>
            <div className="absolute inset-0 rounded-full bg-maiz/90" />
            <div className="absolute inset-8 flex items-center justify-center rounded-full bg-masa text-[9rem] shadow-2xl">
              🫓
            </div>
            <span className="absolute -left-2 top-6 text-6xl">🌽</span>
            <span className="absolute -right-2 bottom-10 text-6xl">🥥</span>
            <span className="absolute bottom-0 left-10 text-5xl">🌶️</span>
          </div>
        </div>
      </section>

      {/* Destacadas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Recetas destacadas</h2>
            <p className="mt-2 text-humo">Las favoritas de la mesa cuscatleca.</p>
          </div>
          <Link href="/recetas" className="hidden text-sm font-semibold text-barro hover:underline sm:block">
            Ver todas →
          </Link>
        </div>
        <Suspense fallback={<GridSkeleton total={4} />}>
          <Destacadas />
        </Suspense>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-bold sm:text-4xl">¿Qué se te antoja?</h2>
        <Suspense fallback={<GridSkeleton total={4} />}>
          <Categorias />
        </Suspense>
      </section>
    </>
  );
}
