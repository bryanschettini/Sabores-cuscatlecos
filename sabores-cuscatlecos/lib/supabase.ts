import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Cliente de Supabase para Server Components.
 * Solo se usa la anon/publishable key: las políticas RLS limitan el acceso a lectura.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan las variables SUPABASE_URL y/o SUPABASE_ANON_KEY. Revisa tu archivo .env.local o la configuración de Vercel.",
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
