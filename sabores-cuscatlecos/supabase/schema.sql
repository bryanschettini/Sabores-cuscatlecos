-- =====================================================================
--  Sabores Cuscatlecos — esquema, políticas RLS y datos de ejemplo
--  Ejecuta este archivo completo en: Supabase Dashboard → SQL Editor
-- =====================================================================

-- ---------- Tablas ----------------------------------------------------

create table if not exists public.categorias (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  nombre      text not null,
  descripcion text not null,
  emoji       text not null default '🍽️',
  created_at  timestamptz not null default now()
);

create table if not exists public.recetas (
  id              bigint generated always as identity primary key,
  slug            text not null unique,
  titulo          text not null,
  resumen         text not null,
  emoji           text not null default '🍲',
  categoria_id    bigint not null references public.categorias (id) on delete restrict,
  tiempo_minutos  integer not null check (tiempo_minutos > 0),
  porciones       integer not null check (porciones > 0),
  dificultad      text not null check (dificultad in ('Fácil', 'Media', 'Difícil')),
  region          text,
  ingredientes    text[] not null default '{}',
  pasos           text[] not null default '{}',
  destacada       boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists recetas_categoria_idx on public.recetas (categoria_id);

-- ---------- Row Level Security ---------------------------------------
-- Se activa RLS y solo se permite LECTURA pública (rol anon y authenticated).
-- No existen políticas de INSERT/UPDATE/DELETE, por lo que la anon key
-- no puede modificar datos: solo el service_role (dashboard) puede hacerlo.

alter table public.categorias enable row level security;
alter table public.recetas    enable row level security;

drop policy if exists "Lectura pública de categorías" on public.categorias;
create policy "Lectura pública de categorías"
  on public.categorias for select
  to anon, authenticated
  using (true);

drop policy if exists "Lectura pública de recetas" on public.recetas;
create policy "Lectura pública de recetas"
  on public.recetas for select
  to anon, authenticated
  using (true);

-- ---------- Datos de ejemplo -----------------------------------------

insert into public.categorias (slug, nombre, descripcion, emoji) values
  ('platos-fuertes', 'Platos fuertes', 'Comidas contundentes para el almuerzo, el plato principal de la mesa salvadoreña.', '🍛'),
  ('antojitos',      'Antojitos',      'Lo que se come en la calle, en la feria o a la hora del café.', '🫓'),
  ('bebidas',        'Bebidas',        'Refrescos y bebidas tradicionales, frías o calientes.', '🥤'),
  ('postres',        'Postres',        'Dulces típicos para cerrar con broche de oro.', '🍮')
on conflict (slug) do nothing;

insert into public.recetas
  (slug, titulo, resumen, emoji, categoria_id, tiempo_minutos, porciones, dificultad, region, ingredientes, pasos, destacada)
values
  ('pupusas-revueltas', 'Pupusas revueltas',
   'El plato nacional: tortillas gruesas de maíz rellenas de chicharrón, frijol y queso, con curtido y salsa de tomate.',
   '🫓', (select id from public.categorias where slug = 'antojitos'), 60, 12, 'Media', 'Olocuilta',
   array['4 tazas de masa de maíz','2 tazas de agua tibia','1 taza de chicharrón molido','1 taza de frijoles molidos','2 tazas de quesillo rallado','Sal al gusto','Aceite para las manos'],
   array['Mezcla la masa con el agua y la sal hasta que esté suave y no se pegue.','Combina el chicharrón, los frijoles y el quesillo para el relleno.','Forma bolitas de masa, haz un hueco con el pulgar y coloca una cucharada de relleno.','Cierra la bolita y aplánala con las palmas aceitadas hasta tener un disco de 1 cm.','Cocina en comal caliente 4 minutos por lado, hasta dorar.','Sirve con curtido y salsa de tomate.'],
   true),

  ('sopa-de-pata', 'Sopa de pata',
   'Sopa reconfortante de pata de res con mondongo, yuca, güisquil, elote y plátano.',
   '🍲', (select id from public.categorias where slug = 'platos-fuertes'), 180, 8, 'Difícil', 'San Salvador',
   array['1 pata de res en trozos','1 lb de mondongo limpio','2 yucas','2 güisquiles','2 elotes en rodajas','1 plátano verde','1 manojo de hierbabuena','Cebolla, ajo, chile verde y tomate','Sal y achiote'],
   array['Lava muy bien la pata y el mondongo con limón.','Cocina la pata y el mondongo en abundante agua con cebolla y ajo por 2 horas.','Agrega la yuca, el elote y el plátano; cocina 20 minutos.','Añade el güisquil, el tomate, el chile y el achiote.','Termina con hierbabuena fresca y ajusta la sal.','Sirve caliente con tortillas y limón.'],
   true),

  ('yuca-frita-con-chicharron', 'Yuca frita con chicharrón',
   'Yuca crujiente acompañada de chicharrón, pepesca, curtido y salsa.',
   '🍟', (select id from public.categorias where slug = 'antojitos'), 50, 4, 'Fácil', 'Santa Ana',
   array['2 lb de yuca pelada','1/2 lb de chicharrón de cerdo','Pepescas fritas','Curtido de repollo','Salsa de tomate','Aceite para freír','Sal'],
   array['Cocina la yuca en agua con sal hasta que esté suave, unos 25 minutos.','Escúrrela, retira la vena central y córtala en trozos.','Fríe la yuca en aceite caliente hasta dorar.','Sirve con chicharrón, pepescas, curtido y salsa.'],
   false),

  ('horchata-de-morro', 'Horchata de morro',
   'Bebida fría a base de semilla de morro, arroz, cacao y especias tostadas.',
   '🥛', (select id from public.categorias where slug = 'bebidas'), 40, 10, 'Fácil', 'Todo el país',
   array['1 taza de semilla de morro','1/2 taza de arroz','1/4 taza de ajonjolí','2 cucharadas de cacao','1 raja de canela','Azúcar al gusto','Agua y hielo'],
   array['Tuesta por separado el morro, el arroz, el ajonjolí y el cacao sin quemarlos.','Muele todo junto con la canela hasta obtener un polvo fino.','Mezcla 4 cucharadas del polvo por litro de agua y licúa.','Cuela, endulza al gusto y sirve con hielo.'],
   true),

  ('atol-de-elote', 'Atol de elote',
   'Bebida caliente y espesa de elote tierno, perfecta para las tardes lluviosas.',
   '🌽', (select id from public.categorias where slug = 'bebidas'), 45, 6, 'Fácil', 'Chalatenango',
   array['8 elotes tiernos','6 tazas de agua o leche','1 taza de azúcar','1 raja de canela','Una pizca de sal'],
   array['Desgrana los elotes y licúa los granos con agua.','Cuela la mezcla para quitar el bagazo.','Cocina a fuego medio con la canela, moviendo sin parar.','Agrega el azúcar y la sal; cocina hasta que espese, unos 25 minutos.'],
   false),

  ('quesadilla-salvadorena', 'Quesadilla salvadoreña',
   'Pan dulce de queso y arroz con ajonjolí, ideal con café.',
   '🧀', (select id from public.categorias where slug = 'postres'), 60, 12, 'Media', 'Cojutepeque',
   array['1 taza de harina de arroz','1 taza de queso duro rallado','1 taza de crema','1 taza de azúcar','3 huevos','1/2 taza de mantequilla derretida','1 cucharadita de polvo de hornear','Ajonjolí'],
   array['Precalienta el horno a 180 °C y engrasa un molde.','Bate la mantequilla con el azúcar y agrega los huevos uno a uno.','Incorpora la crema y el queso.','Añade la harina con el polvo de hornear y mezcla.','Vierte en el molde, espolvorea ajonjolí y hornea 40 minutos.'],
   true),

  ('empanadas-de-platano', 'Empanadas de plátano',
   'Masa de plátano maduro rellena de leche poleada, frita y espolvoreada con azúcar.',
   '🍌', (select id from public.categorias where slug = 'postres'), 70, 10, 'Media', 'San Miguel',
   array['4 plátanos maduros','2 tazas de leche','3 cucharadas de fécula de maíz','1/2 taza de azúcar','1 raja de canela','Aceite para freír'],
   array['Cocina los plátanos con cáscara en agua 15 minutos; pélalos y hazlos puré.','Prepara la poleada: cocina la leche, fécula, azúcar y canela hasta espesar.','Forma tortitas de plátano, rellénalas con poleada y ciérralas en media luna.','Fríe hasta dorar y espolvorea con azúcar.'],
   false),

  ('gallina-india-guisada', 'Gallina india guisada',
   'Gallina criolla en recaudo de tomate, chile y especias, para ocasiones especiales.',
   '🍗', (select id from public.categorias where slug = 'platos-fuertes'), 120, 6, 'Media', 'La Libertad',
   array['1 gallina india en piezas','4 tomates','1 chile verde','1 cebolla','3 dientes de ajo','Ajonjolí y pepitoria tostados','Laurel, tomillo y achiote','Sal y pimienta'],
   array['Sazona la gallina y dórala en una olla.','Asa el tomate, el chile, la cebolla, el ajo y las semillas; licúa como recaudo.','Agrega el recaudo a la gallina con las hierbas.','Cocina tapado a fuego bajo hasta que la carne esté suave, cerca de 1 hora y media.','Sirve con arroz y tortillas.'],
   false)
on conflict (slug) do nothing;
