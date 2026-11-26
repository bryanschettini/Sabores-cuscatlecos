import "server-only";
import { connection } from "next/server";
import { getSupabase } from "./supabase";
import type { Categoria, CategoriaConConteo, RecetaConCategoria } from "./types";

const RECETA_CAMPOS = "*, categoria:categorias(slug, nombre, emoji)";

/** Lanza un error legible si Supabase devuelve error (lo captura error.tsx). */
function check<T>(data: T | null, error: { message: string } | null, contexto: string): T {
  if (error) throw new Error(`No se pudo cargar ${contexto}: ${error.message}`);
  return data as T;
}

/**
 * `connection()` indica a Next.js que estos datos se leen en cada petición
 * (renderizado dinámico), así los cambios en Supabase se ven al instante
 * y el loading.tsx se muestra mientras llega la respuesta.
 */
export async function getCategorias(): Promise<CategoriaConConteo[]> {
  await connection();
  const { data, error } = await getSupabase()
    .from("categorias")
    .select("*, recetas(count)")
    .order("nombre");

  const filas = check(data, error, "las categorías") as (Categoria & {
    recetas: { count: number }[];
  })[];

  return filas.map(({ recetas, ...c }) => ({ ...c, total_recetas: recetas?.[0]?.count ?? 0 }));
}

export async function getCategoriaPorSlug(slug: string): Promise<Categoria | null> {
  await connection();
  const { data, error } = await getSupabase()
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return check(data, error, "la categoría") as Categoria | null;
}

export async function getRecetas(opciones: { busqueda?: string; categoriaId?: number } = {}) {
  await connection();
  let query = getSupabase().from("recetas").select(RECETA_CAMPOS).order("titulo");

  if (opciones.categoriaId) query = query.eq("categoria_id", opciones.categoriaId);
  if (opciones.busqueda) query = query.ilike("titulo", `%${opciones.busqueda}%`);

  const { data, error } = await query;
  return check(data, error, "las recetas") as RecetaConCategoria[];
}

export async function getRecetasDestacadas(limite = 4) {
  await connection();
  const { data, error } = await getSupabase()
    .from("recetas")
    .select(RECETA_CAMPOS)
    .eq("destacada", true)
    .order("created_at", { ascending: false })
    .limit(limite);
  return check(data, error, "las recetas destacadas") as RecetaConCategoria[];
}

export async function getRecetaPorSlug(slug: string) {
  await connection();
  const { data, error } = await getSupabase()
    .from("recetas")
    .select(RECETA_CAMPOS)
    .eq("slug", slug)
    .maybeSingle();
  return check(data, error, "la receta") as RecetaConCategoria | null;
}

export async function getRecetasRelacionadas(categoriaId: number, excluirId: number, limite = 3) {
  const { data, error } = await getSupabase()
    .from("recetas")
    .select(RECETA_CAMPOS)
    .eq("categoria_id", categoriaId)
    .neq("id", excluirId)
    .limit(limite);
  return check(data, error, "las recetas relacionadas") as RecetaConCategoria[];
}
