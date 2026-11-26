export default function Footer() {
  return (
    <footer className="mt-20 border-t border-tinta/10 bg-tinta text-masa/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-display text-masa">Sabores Cuscatlecos</span> · Recetas de El Salvador
        </p>
        <p>Hecho con Next.js App Router + Supabase</p>
      </div>
    </footer>
  );
}
