# 🫓 Sabores Cuscatlecos

Landing page de **recetas tradicionales salvadoreñas** construida con **Next.js 16 (App Router)** y **Supabase** como base de datos serverless. Desplegada en **Vercel**.

🔗 **Demo en producción:** https://sabores-cuscatlecos-m3aq-re79ezq79-schettini.vercel.app/

---

## ✨ Funcionalidades

- **Página de inicio** con hero, recetas destacadas y categorías (datos desde Supabase).
- **Listado de recetas** (`/recetas`) con buscador por nombre (`?q=`).
- **2 rutas dinámicas**:
  - `/recetas/[slug]` → detalle de la receta: ingredientes, pasos y recetas relacionadas.
  - `/categorias/[slug]` → recetas filtradas por categoría.
- **Server Components** para todas las lecturas a la base de datos (la key nunca llega al navegador).
- **Loading states**: `loading.tsx` por ruta + `<Suspense>` con skeletons para streaming.
- **Manejo de errores**: `error.tsx`, `global-error.tsx` y `not-found.tsx` (404 personalizado cuando el slug no existe).
- **Metadatos dinámicos** con `generateMetadata` en cada ruta dinámica.
- **Diseño responsive** con Tailwind CSS v4.

## 🧱 Tecnologías

| Tecnología | Uso |
|---|---|
| Next.js 16 (App Router, Turbopack) | Framework y enrutamiento |
| React 19 | UI con Server Components |
| Supabase (PostgreSQL + PostgREST) | Base de datos serverless con RLS |
| `@supabase/supabase-js` | Cliente de datos |
| Tailwind CSS 4 | Estilos |
| TypeScript | Tipado |
| Vercel | Despliegue |

## 📁 Estructura

```
app/
├── layout.tsx                 # Layout raíz (header, footer, fuentes)
├── page.tsx                   # Landing (hero, destacadas, categorías)
├── loading.tsx | error.tsx | not-found.tsx | global-error.tsx
├── recetas/
│   ├── page.tsx               # Listado + buscador
│   └── [slug]/
│       ├── page.tsx           # 🔀 Ruta dinámica: detalle de receta
│       └── loading.tsx
└── categorias/
    ├── page.tsx               # Listado de categorías
    ├── loading.tsx
    └── [slug]/page.tsx        # 🔀 Ruta dinámica: recetas por categoría
components/                    # Header, Footer, RecetaCard, Skeletons, EstadoVacio
lib/
├── supabase.ts                # Cliente de Supabase (solo servidor)
├── data.ts                    # Consultas a la base de datos
├── types.ts                   # Tipos TypeScript
└── format.ts                  # Utilidades de formato
supabase/
└── schema.sql                 # Tablas, políticas RLS y datos de ejemplo
```

## 🗄️ Base de datos (Supabase)

Dos tablas relacionadas:

- **`categorias`**: `id`, `slug`, `nombre`, `descripcion`, `emoji` — 4 registros.
- **`recetas`**: `id`, `slug`, `titulo`, `resumen`, `emoji`, `categoria_id` (FK → categorias), `tiempo_minutos`, `porciones`, `dificultad`, `region`, `ingredientes[]`, `pasos[]`, `destacada` — 8 registros.

**Row Level Security (RLS)** activado en ambas tablas, con una única política `SELECT` para los roles `anon` y `authenticated`. No hay políticas de `INSERT`, `UPDATE` ni `DELETE`, así que con la clave pública **solo se puede leer**; los cambios se hacen desde el dashboard de Supabase.


## 🚀 Instalación local

**Requisitos:** Node.js 20.9 o superior y una cuenta gratuita en [Supabase](https://supabase.com).

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU-USUARIO/sabores-cuscatlecos.git
   cd sabores-cuscatlecos
   npm install
   ```

2. **Crear la base de datos**
   - Crea un proyecto nuevo en Supabase.
   - Ve a **SQL Editor → New query**, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y ejecútalo.
   - Verifica en **Table Editor** que existan las tablas `categorias` y `recetas` con datos.

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Completa `.env.local` con los valores de **Project Settings → API** (ver tabla abajo).

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000).

5. **Build de producción (opcional)**
   ```bash
   npm run build && npm start
   ```

## 🔐 Variables de entorno

| Variable | Descripción | Dónde obtenerla |
|---|---|---|
NEXT_PUBLIC_SUPABASE_URL=https://gksvdjlcggvyvjinxoez.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_HDiHKs-X_yhSQXBWiaeoig_dlf6jSR0

> Las variables **no** llevan el prefijo `NEXT_PUBLIC_` porque solo se usan en Server Components: se leen en el servidor y nunca se envían al navegador.
> ⚠️ Nunca uses ni subas la `service_role` key. El archivo `.env.local` está en `.gitignore`.

## ☁️ Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio (Vercel detecta Next.js automáticamente).
3. En **Environment Variables** agrega `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
4. Haz clic en **Deploy**.

## 📜 Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | Revisa el código con ESLint |
