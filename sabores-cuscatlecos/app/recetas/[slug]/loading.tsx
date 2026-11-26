export default function LoadingReceta() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6" role="status" aria-label="Cargando receta">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-tinta/10" />
      <div className="grid gap-8 overflow-hidden rounded-[2rem] bg-white ring-1 ring-tinta/5 md:grid-cols-[1fr_1.2fr]">
        <div className="h-56 animate-pulse bg-tinta/10 md:h-80" />
        <div className="space-y-4 p-6 md:p-10 md:pl-0">
          <div className="h-6 w-20 animate-pulse rounded-full bg-tinta/10" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-tinta/10" />
          <div className="h-4 w-full animate-pulse rounded bg-tinta/10" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-tinta/10" />
          <div className="grid grid-cols-3 gap-3 pt-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-tinta/10" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="h-72 animate-pulse rounded-3xl bg-tinta/10" />
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-tinta/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
