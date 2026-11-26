import Link from "next/link";

export default function EstadoVacio({
  titulo,
  mensaje,
  emoji = "🥣",
}: {
  titulo: string;
  mensaje: string;
  emoji?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-tinta/20 bg-white/60 px-6 py-14 text-center">
      <p className="text-5xl" aria-hidden>
        {emoji}
      </p>
      <h3 className="mt-4 font-display text-2xl font-semibold">{titulo}</h3>
      <p className="mx-auto mt-2 max-w-md text-humo">{mensaje}</p>
      <Link
        href="/recetas"
        className="mt-6 inline-block rounded-full bg-barro px-5 py-2.5 text-sm font-semibold text-white hover:bg-barro-oscuro"
      >
        Ver todas las recetas
      </Link>
    </div>
  );
}
