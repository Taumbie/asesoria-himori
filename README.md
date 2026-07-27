# asesoria-himori

Landing page para Himori (talleres de journaling y crecimiento personal) +
plan de negocio estratégico en PDF.

## Estructura

```
.
├── web/                  → Next.js 16 landing (ver web/README.md)
│   ├── src/
│   ├── public/
│   ├── scripts/
│   └── .github/          (vacío — workflows viven en la raíz)
│
├── .github/workflows/    → Deploy automático a GitHub Pages
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

Push a `main` → GitHub Actions compila y publica en Pages.

URL final: `https://<owner>.github.io/asesoria-himori/`

## Plan de negocio

`index.html` es el PDF del plan de negocio (11 páginas, formato A4). Para regenerarlo:

```bash
node build-pdf.js
```

Output: `Himori-Plan-de-Negocio.pdf`.
