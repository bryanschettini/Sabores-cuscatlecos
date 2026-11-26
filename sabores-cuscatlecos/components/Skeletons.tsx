export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-tinta/5">
      <div className="h-40 animate-pulse bg-tinta/10" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-tinta/10" />
        <div className="h-3 w-full animate-pulse rounded bg-tinta/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-tinta/10" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-tinta/10" />
          <div className="h-6 w-12 animate-pulse rounded-full bg-tinta/10" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ total = 6 }: { total?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Cargando">
      {Array.from({ length: total }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
