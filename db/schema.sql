-- ============================================================================
-- Himori — Schema inicial (F1)
-- Tablas: workshops, photos
-- Storage bucket: workshop-photos
-- ============================================================================

-- 1. Tabla de talleres
create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  date date not null,
  description text,                        -- corta, 1-2 líneas (para cards)
  reflection text,                         -- larga, post-encuentro (markdown opcional)
  cover_photo_id uuid,                     -- FK agregada después (evita orden de creación)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workshops_date_idx on public.workshops (date desc);
create index if not exists workshops_slug_idx on public.workshops (slug);

-- 2. Tabla de fotos
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid not null references public.workshops(id) on delete cascade,
  storage_path text not null,              -- path dentro del bucket workshop-photos
  alt_text text,
  display_order int not null default 0,
  width int,
  height int,
  created_at timestamptz not null default now()
);

create index if not exists photos_workshop_idx on public.photos (workshop_id, display_order);

-- 3. FK cover_photo_id (ahora que photos existe)
alter table public.workshops
  add constraint workshops_cover_photo_fk
  foreign key (cover_photo_id) references public.photos(id) on delete set null;

-- 4. Trigger para updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists workshops_updated_at on public.workshops;
create trigger workshops_updated_at
  before update on public.workshops
  for each row execute function public.set_updated_at();

-- 5. RLS: lectura pública, escritura solo autenticados
alter table public.workshops enable row level security;
alter table public.photos enable row level security;

-- Lectura pública
drop policy if exists "workshops_read_public" on public.workshops;
create policy "workshops_read_public" on public.workshops
  for select using (true);

drop policy if exists "photos_read_public" on public.photos;
create policy "photos_read_public" on public.photos
  for select using (true);

-- Escritura solo para usuarios autenticados (Isi)
drop policy if exists "workshops_write_auth" on public.workshops;
create policy "workshops_write_auth" on public.workshops
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "photos_write_auth" on public.photos;
create policy "photos_write_auth" on public.photos
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================================
-- Storage bucket: workshop-photos
-- (Crear desde la UI de Supabase: Storage → New bucket → nombre "workshop-photos"
--  → marcar como "Public bucket")
-- ============================================================================

-- Política de storage (correr después de crear el bucket):
-- Permitir lectura pública
-- (insertar en SQL editor de Supabase)

-- create policy "workshop_photos_read_public"
-- on storage.objects for select
-- using ( bucket_id = 'workshop-photos' );
--
-- create policy "workshop_photos_write_auth"
-- on storage.objects for insert
-- with check ( bucket_id = 'workshop-photos' and auth.role() = 'authenticated' );
--
-- create policy "workshop_photos_update_auth"
-- on storage.objects for update
-- using ( bucket_id = 'workshop-photos' and auth.role() = 'authenticated' );
--
-- create policy "workshop_photos_delete_auth"
-- on storage.objects for delete
-- using ( bucket_id = 'workshop-photos' and auth.role() = 'authenticated' );
