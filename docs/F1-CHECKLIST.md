# F1 — Checklist: Vercel + Supabase

> Pasos que tienes que hacer tú (los clicks externos). Yo voy haciendo los cambios de código en paralelo.

## 1. Crear proyecto en Supabase

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**
2. Nombre: `himori-asesoria`
3. Database password: genera una fuerte y **guárdala** (no la necesitas para F1, pero bórrale un screenshot)
4. Region: `South America (São Paulo)` (más cerca de Chile)
5. Plan: **Free** (sobra para Himori)
6. Click **Create new project** → espera 1-2 min

## 2. Obtener credenciales

Una vez creado, en **Project Settings → API**:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca al cliente)

## 3. Correr el schema

En Supabase Dashboard → **SQL Editor → New query**:

1. Abre `db/schema.sql` en el repo
2. Copia todo el contenido y pégalo en el editor
3. Click **Run** (debe decir "Success. No rows returned" o algo así)

## 4. Crear bucket de storage

En **Storage → New bucket**:

- Name: `workshop-photos`
- ✅ **Public bucket** (para que las fotos se vean sin auth en la landing)
- Click **Create bucket**

Después, en **SQL Editor**, corre las políticas de storage (están al final de `db/schema.sql`, comentadas).

## 5. Crear proyecto en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. **Import** el repo `asesoria-himori` de GitHub
3. **Configure project**:
   - Framework preset: **Next.js** (auto-detectado)
   - Root directory: **`web`** ⚠️ importante
   - Build command: `npm run build` (default)
4. **Environment Variables** — agrega las 4 vars con los valores de Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://asesoria-himori.vercel.app` (o tu dominio)
5. Click **Deploy** → espera 1-2 min

## 6. Verificación

Abre la URL que Vercel te dio. Debe verse **exactamente igual** que antes (landing actual con `Galeria` estática).

Si ves errores, avísame y revisamos juntos los logs de Vercel.

---

## Lo que yo hago en paralelo (ya hecho o por hacer)

- [x] Crear `db/schema.sql` con DDL versionado
- [x] Crear `web/.env.example` con todas las variables
- [x] Quitar `output: 'export'` de `next.config.ts` (y la config de GH Pages)
- [x] Eliminar `.github/workflows/deploy.yml` (ya no aplica)
- [x] Instalar `@supabase/ssr` y `@supabase/supabase-js`
- [ ] Verificar que el build local funciona
- [ ] Hacer commit + push de los cambios
