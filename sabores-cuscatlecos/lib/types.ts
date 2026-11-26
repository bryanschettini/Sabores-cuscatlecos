export type Dificultad = "Fácil" | "Media" | "Difícil";

export interface Categoria {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  emoji: string;
}

export interface Receta {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  emoji: string;
  categoria_id: number;
  tiempo_minutos: number;
  porciones: number;
  dificultad: Dificultad;
  region: string | null;
  ingredientes: string[];
  pasos: string[];
  destacada: boolean;
}

export interface RecetaConCategoria extends Receta {
  categoria: Pick<Categoria, "slug" | "nombre" | "emoji"> | null;
}

export interface CategoriaConConteo extends Categoria {
  total_recetas: number;
}
