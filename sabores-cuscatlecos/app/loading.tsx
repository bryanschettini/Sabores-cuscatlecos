export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4" role="status">
      <span className="animate-bounce text-6xl" aria-hidden>
        🫓
      </span>
      <p className="font-display text-xl text-humo">Calentando el comal…</p>
    </div>
  );
}
