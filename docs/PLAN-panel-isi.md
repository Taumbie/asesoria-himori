# Plan: Panel de Isi — Login + Talleres con fotos

> Documento vivo. Se actualiza a medida que avanzamos las fases.

## Contexto

Hoy la landing de Himori es 100% estática (Next.js 16 export → GitHub Pages). No tiene auth, ni DB, ni uploads. La sección `Galeria` muestra imágenes hardcodeadas en `public/`.

Isi necesita poder **logearse, crear talleres y subir fotos** de cada encuentro, para que la página se sienta un espacio vivo y propio — no un folleto.

## Decisiones tomadas

| Tema | Decisión | Notas |
|---|---|---|
| Hosting | **Vercel** | Reemplaza GitHub Pages. Server actions habilitadas. Mismo correo, proyecto nuevo. |
| Backend | **Supabase** (Auth + Postgres + Storage) | Mismo correo, proyecto nuevo. Aislado de GesThor. |
| ORM | **Cliente Supabase directo** (sin Prisma) | Himori es chico. Menos capas = menos dolor. GesThor es otra escala. |
| Admin | **Solo Isi** | Una cuenta, un rol. |
| Contenido por taller | **Fotos + reflexión/notas** | Texto largo estilo bitácora post-encuentro. |
| Fases | **5 fases, cada una un PR visible** | No big-bang. Cada fase termina con algo que se puede tocar. |

## Arquitectura

```
┌──────────────────────────────────────────────────────────┐
│                    Himori (Vercel)                       │
│                                                          │
│  ┌────────────────────┐    ┌────────────────────────┐    │
│  │  /                 │    │  /admin (protegido)    │    │
│  │  Landing público   │    │  - Login               │    │
│  │  - Galeria dynamic │    │  - CRUD talleres       │    │
│  │  - /galeria/[slug] │    │  - Upload fotos        │    │
│  └─────────┬──────────┘    └────────┬───────────────┘    │
│            │                        │                    │
│            └────────────┬───────────┘                    │
│                         │                                │
│                  Server Actions / RSC                     │
└─────────────────────────┼────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
    ┌───────────────┐           ┌───────────────┐
    │   Supabase    │           │   Supabase    │
    │   Postgres    │           │   Storage     │
    │  (workshops,  │           │ (workshop-    │
    │   photos)     │           │  photos bucket)│
    └───────────────┘           └───────────────┘
```

## Schema (Supabase Postgres)

```sql
-- Tabla de talleres
create table public.workshops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  date date not null,
  description text,           -- corta, 1-2 líneas (para cards)
  reflection text,            -- larga, post-encuentro (markdown opcional)
  cover_photo_id uuid references public.photos(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index workshops_date_idx on public.workshops(date desc);
create index workshops_slug_idx on public.workshops(slug);

-- Tabla de fotos
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid not null references public.workshops(id) on delete cascade,
  storage_path text not null,    -- path dentro del bucket
  alt_text text,
  display_order int not null default 0,
  width int,
  height int,
  created_at timestamptz default now()
);

create index photos_workshop_idx on public.photos(workshop_id, display_order);

-- Trigger para updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger workshops_updated_at
  before update on public.workshops
  for each row execute function public.set_updated_at();

-- RLS: lectura pública, escritura solo admin
alter table public.workshops enable row level security;
alter table public.photos enable row level security;

-- Lectura pública
create policy "workshops_read_public" on public.workshops
  for select using (true);

create policy "photos_read_public" on public.photos
  for select using (true);

-- Escritura: solo usuarios autenticados (Isi)
-- (Ajustar si se quiere un rol "admin" más estricto)
create policy "workshops_write_auth" on public.workshops
  for all using (auth.role() = 'authenticated');

create policy "photos_write_auth" on public.photos
  for all using (auth.role() = 'authenticated');
```

### Storage

- **Bucket:** `workshop-photos` (público para lectura)
- **Path structure:** `workshops/{workshop_id}/{photo_id}.{ext}` o `workshops/{workshop_id}/originals/{filename}`
- **Transformaciones:** usar Supabase Image Transformations (on-the-fly resize/WebP) en el render del landing

## Estructura de carpetas (target)

```
web/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                    ← landing (galeria ahora dynamic)
│   │   │   ├── galeria/
│   │   │   │   ├── page.tsx                ← grid de talleres
│   │   │   │   └── [slug]/page.tsx         ← álbum individual
│   │   │   └── ...
│   │   ├── admin/
│   │   │   ├── layout.tsx                  ← guard de auth
│   │   │   ├── page.tsx                    ← dashboard
│   │   │   ├── login/page.tsx
│   │   │   ├── talleres/
│   │   │   │   ├── page.tsx                ← lista
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx           ← editar
│   │   │   └── logout/route.ts
│   │   └── api/
│   │       └── auth/callback/route.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── server.ts                   ← server client (RSC + actions)
│   │   │   ├── client.ts                   ← browser client
│   │   │   └── admin.ts                    ← service role (solo server)
│   │   ├── auth.ts                         ← helpers de sesión
│   │   ├── storage.ts                      ← helpers de upload/delete
│   │   └── slug.ts                         ← slugify
│   ├── components/
│   │   ├── public/
│   │   │   ├── WorkshopCard.tsx
│   │   │   └── WorkshopGallery.tsx
│   │   └── admin/
│   │       ├── WorkshopForm.tsx
│   │       ├── PhotoUploader.tsx           ← drag & drop con Framer
│   │       └── PhotoGrid.tsx
│   └── types/
│       └── database.ts                     ← tipos inferidos de Supabase
└── ...
```

## Fases

### F1 — Cimientos (½ día)
**Entregable:** Deploy funcionando en Vercel + tablas creadas en Supabase.

- [ ] Crear proyecto en Vercel, conectar repo
- [ ] Crear proyecto en Supabase
- [ ] Correr migración SQL (schema arriba)
- [ ] Crear bucket `workshop-photos` (público)
- [ ] Instalar `@supabase/ssr` y `@supabase/supabase-js`
- [ ] Configurar env vars en Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- [ ] Quitar `output: 'export'` de `next.config.ts`
- [ ] Eliminar `.github/workflows/deploy.yml` (ya no aplica)
- [ ] Verificar que el deploy funciona (landing igual que antes)

### F2 — Auth + shell admin (½ día)
**Entregable:** Isi puede logearse en `/admin/login` y ver un dashboard vacío.

- [ ] Crear clientes Supabase (`server.ts`, `client.ts`, `admin.ts`)
- [ ] Helper `requireUser()` para RSC
- [ ] Página `/admin/login` con botón Google OAuth
- [ ] Callback route handler
- [ ] Layout `/admin` con guard (redirige a login si no hay sesión)
- [ ] Header con avatar + logout
- [ ] Página placeholder `/admin` (dashboard vacío con "0 talleres")

### F3 — CRUD privado (1 día)
**Entregable:** Isi puede crear talleres, subir fotos y reordenarlas.

- [ ] Server actions: `createWorkshop`, `updateWorkshop`, `deleteWorkshop`
- [ ] Server actions: `uploadPhoto`, `deletePhoto`, `reorderPhotos`
- [ ] UI `/admin/talleres` (lista con "Nuevo")
- [ ] UI `/admin/talleres/new` y `/admin/talleres/[id]` (formulario)
- [ ] Componente `PhotoUploader` con drag & drop (usar Framer Motion)
- [ ] Componente `PhotoGrid` con reordenamiento drag & drop
- [ ] Slugify automático del título
- [ ] Preview del cover photo
- [ ] Validaciones (zod o manual)

### F4 — Galería pública (1 día)
**Entregable:** La sección `Galeria` del landing es dinámica, con página por álbum.

- [ ] Reemplazar `Galeria` estática por fetch dinámico desde Supabase
- [ ] Página `/galeria` con grid de talleres (card con cover + título + fecha)
- [ ] Página `/galeria/[slug]` con fotos + reflexión/nota del taller
- [ ] Mantener animaciones Reveal de Framer
- [ ] Open Graph images por álbum
- [ ] Empty state si no hay talleres
- [ ] Loading states

### F5 — Pulido (½ día)
**Entregable:** Detalles que cierran la experiencia.

- [ ] Migrar las fotos de WhatsApp (`WhatsApp Image 2026-07-26...`) como seed inicial de 1-2 talleres
- [ ] "Último taller" destacado en la landing (hero o arriba de galería)
- [ ] Captions en fotos (alt text + tooltip con descripción corta opcional)
- [ ] Optimización de imágenes con Supabase Image Transformations (WebP, srcset)
- [ ] Página 404 bonita
- [ ] Tests mínimos (smoke del flujo público)

## Riesgos conocidos

| Riesgo | Mitigación |
|---|---|
| Quitar `output: 'export'` puede romper imágenes de `/public` | Verificar F1 que la landing sigue funcionando antes de seguir |
| Las variables de entorno en Vercel no estaban antes (GH Pages no las usa) | Configurar todas al inicio de F1, validar en runtime |
| Drag & drop de fotos con Framer Motion puede ser tricky | Usar `@dnd-kit` (que ya conoces de GesThor) en lugar de pelearse con Framer drag |
| Isi necesita Google account o crear uno | Confirmar con Isi antes de F2 |
| Las fotos existentes en `/public` (WhatsApp) se pierden al migrar | Migrarlas como seed en F5, o al inicio de F3 si quieres tener data desde el día 1 |

## Variables de entorno

```bash
# .env.local (no commitear)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # solo server, nunca al cliente
NEXT_PUBLIC_SITE_URL=https://himori-asesoria.vercel.app  # para OG images
```

## Open questions

- [ ] **Método de login de Isi**: Google OAuth (recomendado) vs email+password. Recomiendo Google: menos fricción, sin password reset.
- [ ] **Cover photo por taller**: ¿se setea al crear o se puede elegir después de subir las fotos? Mi recomendación: después, con un click.
- [ ] **Reflexión/nota**: ¿se edita en markdown (con preview) o rich text? Mi recomendación: markdown simple con preview, tipo Notion.
