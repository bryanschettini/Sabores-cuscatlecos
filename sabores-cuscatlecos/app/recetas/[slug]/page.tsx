import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RecetaCard from "@/components/RecetaCard";
import { GridSkeleton } from "@/components/Skeletons";
import { getRecetaPorSlug, getRecetasRelacionadas } from "@/lib/data";
import { colorDificultad, formatoTiempo } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/recetas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const receta = await getRecetaPorSlug(slug);
  if (!receta) return { title: "Receta no encontrada" };
  return { title: receta.titulo, description: receta.resumen };
}

async function Relacionadas({ categoriaId, recetaId }: { categoriaId: number; recetaId: number }) {
  const recetas = await getRecetasRelacionadas(categoriaId, recetaId);
  if (recetas.length === 0) return null;
  return (
    <section className="mt-20">
      <h2 className="mb-6 font-display text-3xl font-bold">También te puede gustar</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recetas.map((r) => (
          <RecetaCard key={r.id} receta={r} />
        ))}
      </div>
    </section>
  );
}

export default async function RecetaPage({ params }: PageProps<"/recetas/[slug]">) {
  const { slug } = await params;
  const receta = await getRecetaPorSlug(slug);

  if (!receta) notFound();

  const datos = [
    { label: "Tiempo", valor: formatoTiempo(receta.tiempo_minutos), icono: "⏱" },
    { label: "Porciones", valor: String(receta.porciones), icono: "👥" },
    { label: "Región", valor: receta.region ?? "—", icono: "📍" },
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="Ruta" className="mb-6 text-sm text-humo">
        <Link href="/recetas" className="hover:text-barro">
          Recetas
        </Link>
        {receta.categoria && (
          <>
            {" / "}
            <Link href={`/categorias/${receta.categoria.slug}`} className="hover:text-barro">
              {receta.categoria.nombre}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-tinta">{receta.titulo}</span>
      </nav>

      <header className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-white ring-1 ring-tinta/5 md:grid-cols-[1fr_1.2fr]">
        <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-maiz to-barro md:h-full md:min-h-80">
          <div className="petate absolute inset-0" aria-hidden />
          <span className="relative text-[8rem] drop-shadow-lg" aria-hidden>
            {receta.emoji}
          </span>
        </div>
        <div className="p-6 md:p-10 md:pl-0">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorDificultad(receta.dificultad)}`}>
            {receta.dificultad}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{receta.titulo}</h1>
          <p className="mt-4 text-lg text-humo">{receta.resumen}</p>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {datos.map((d) => (
              <div key={d.label} className="rounded-2xl bg-masa p-3 text-center sm:p-4">
                <dt className="text-xs uppercase tracking-wider text-humo">
                  <span aria-hidden>{d.icono}</span> {d.label}
                </dt>
                <dd className="mt-1 font-semibold">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <section className="h-fit rounded-3xl bg-white p-6 ring-1 ring-tinta/5 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-bold">Ingredientes</h2>
          <ul className="mt-4 space-y-3">
            {receta.ingredientes.map((ing) => (
              <li key={ing} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-maiz" aria-hidden />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Preparación</h2>
          <ol className="mt-6 space-y-6">
            {receta.pasos.map((paso, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-barro font-display text-lg font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1.5 leading-relaxed">{paso}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Suspense fallback={<div className="mt-20"><GridSkeleton total={3} /></div>}>
        <Relacionadas categoriaId={receta.categoria_id} recetaId={receta.id} />
      </Suspense>
    </article>
  );
}
