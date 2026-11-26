import { GridSkeleton } from "@/components/Skeletons";

export default function LoadingCategorias() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6" role="status">
      <div className="h-12 w-64 animate-pulse rounded bg-tinta/10" />
      <div className="mt-4 h-4 w-80 animate-pulse rounded bg-tinta/10" />
      <div className="mt-10">
        <GridSkeleton total={6} />
      </div>
    </div>
  );
}
