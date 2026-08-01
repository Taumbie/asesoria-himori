# asesoria-himori

Landing page para Himori (talleres de journaling y crecimiento personal) +
plan de negocio estratégico en PDF + panel admin para Isi.

## Estructura

```
.
├── web/                  → Next.js 16 (App Router, Vercel)
│   ├── src/
│   ├── public/
│   ├── scripts/
│   ├── db/               → Schema y migraciones (F1+)
│   └── .env.example      → Template de variables de entorno
│
├── db/                   → Schema de Supabase (versionado)
├── docs/                 → Plan del panel Isi + checklists
├── index.html            → Plan de negocio en PDF (A4)
├── build-pdf.js          → Renderiza index.html → PDF
├── pdf-to-png.js         → Convierte PDF → PNG para preview
├── preview.js            → Captura HTML → PNG por página
├── preview/              → Screenshots del PDF (no se commitea)
│
└── WhatsApp *.{jpeg,mp4} → Material original de Isidora (no se commitea)
```

## Quick start

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

Para más detalles del landing, ver [`web/README.md`](./web/README.md).

## Deploy

Push a `main` → **Vercel** compila y publica automáticamente.

URL final: `https://asesoria-himori.vercel.app` (o dominio custom).

Variables de entorno requeridas: ver `web/.env.example`.

## Backend

**Supabase** (mismo correo que GesThor, proyecto separado):
- Auth: Google OAuth (solo Isi)
- DB: Postgres con `workshops` y `photos` (schema en `db/schema.sql`)
- Storage: bucket `workshop-photos` (público)

## Plan de negocio

`index.html` es el PDF del plan de negocio (11 páginas, formato A4). Para regenerarlo:

```bash
node build-pdf.js
```

Output: `Himori-Plan-de-Negocio.pdf`.

## Roadmap

Ver [`docs/PLAN-panel-isi.md`](./docs/PLAN-panel-isi.md) para el plan completo del panel de Isi.

- [x] **F1** — Cimientos: Vercel + Supabase conectados, schema migrado
- [ ] **F2** — Auth + shell `/admin`
- [ ] **F3** — CRUD privado (talleres + fotos)
- [ ] **F4** — Galería pública dinámica
- [ ] **F5** — Pulido (seed, OG images, último taller destacado)
