import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-barro">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">Esta receta no está en el recetario</h1>
      <p className="mt-3 text-humo">Puede que el enlace esté mal escrito o que la receta haya sido retirada.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/recetas" className="rounded-full bg-barro px-5 py-2.5 font-semibold text-white hover:bg-barro-oscuro">
          Ver recetas
        </Link>
        <Link href="/" className="rounded-full border border-tinta/20 px-5 py-2.5 font-semibold hover:bg-tinta/5">
          Inicio
        </Link>
      </div>
    </div>
  );
}
