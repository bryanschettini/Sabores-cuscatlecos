import Link from "next/link";

const enlaces = [
  { href: "/recetas", label: "Recetas" },
  { href: "/categorias", label: "Categorías" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-tinta/10 bg-masa/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🫓
          </span>
          <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
            Sabores <span className="text-barro">Cuscatlecos</span>
          </span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-humo transition hover:bg-tinta/5 hover:text-tinta"
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
