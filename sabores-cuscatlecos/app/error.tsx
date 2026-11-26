"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl" aria-hidden>
        🔥
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold">¡Se nos quemó la pupusa!</h1>
      <p className="mt-3 text-humo">
        No pudimos cargar la información en este momento. Puede ser un problema de conexión con la base de datos.
      </p>
      {error.digest && <p className="mt-2 text-xs text-humo/70">Código: {error.digest}</p>}
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-barro px-5 py-2.5 font-semibold text-white hover:bg-barro-oscuro"
        >
          Intentar de nuevo
        </button>
        <Link href="/" className="rounded-full border border-tinta/20 px-5 py-2.5 font-semibold hover:bg-tinta/5">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
