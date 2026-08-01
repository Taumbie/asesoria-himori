# Himori — Landing

Landing page de Himori (talleres de journaling y crecimiento personal).
Next.js 16 (App Router) + TypeScript strict + Tailwind v3, deployado a **Vercel**.

## Stack

- **Framework**: Next.js 16 (App Router, server actions, RSC)
- **Lenguaje**: TypeScript strict
- **Estilos**: Tailwind CSS v3 (paleta Himori en `tailwind.config.ts`)
- **Tipografía**: Fraunces (serif) + Inter (sans) vía `next/font`
- **Animaciones**: IntersectionObserver nativo (sin Framer Motion en producción)
- **Compresión video**: `ffmpeg` estático vía `@ffmpeg-installer/ffmpeg`
- **Optimización imágenes**: `sharp` → WebP responsive (sm/md/lg)
- **Auth + DB + Storage**: Supabase (proyecto separado de GesThor)

## Estructura

```
web/
├── src/
│   ├── app/                  # App Router
│   │   ├── layout.tsx        # Root layout: fonts, metadata, ServicesProvider
│   │   ├── page.tsx          # Composición de secciones
│   │   └── globals.css       # Tailwind + base editorial
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Hero, Manifiesto, ParaQuien, etc.
│   │   └── ui/               # Container, Button, Reveal, SmartImage
│   ├── content/
│   │   └── site.ts           # ⭐ Toda la copy del sitio
│   ├── services/             # ⭐ Inyección de dependencias
│   │   ├── interfaces.ts
│   │   ├── ServicesContext.tsx
│   │   └── impl/
│   │       ├── contactInstagram.service.ts
│   │       └── analyticsNoop.service.ts
│   └── lib/
│       └── utils.ts          # cn() helper
├── public/
│   ├── images/               # Generadas por optimize:images
│   └── video/                # Generadas por compress:video
├── scripts/
│   ├── optimize-images.mjs   # sharp → WebP responsive
│   └── compress-video.mjs    # ffmpeg → MP4 + WebM + poster
└── .env.example              # Template de variables de entorno
```

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local (con hot reload)
npm run dev                    # http://localhost:3000

# Optimizar imágenes y comprimir video (corre antes de build)
npm run optimize:images
npm run compress:video

# Build de producción
npm run build

# Iniciar en modo producción local
npm start
```

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo. Las mismas vars se
configuran en Vercel (Project Settings → Environment Variables).

Ver `.env.example` para la lista completa.

## Cómo actualizar contenido

Toda la copy vive en **`src/content/site.ts`**. Cambios en ese archivo +
`git push` → deploy automático.

Campos editables:

- `tagline`, `description` — claim general
- `primaryCTA` — texto del CTA, keyword, link de Instagram
- `upcoming` — array de próximos encuentros (fecha, lugar, cupos)
- `meetingFormat` — bullets de "Cómo es un encuentro"
- `audience` — bullets de "Para quién es"

## Cómo cambiar el flujo de contacto

El servicio de contacto está en `src/services/impl/contactInstagram.service.ts`.
Por defecto abre el perfil de Instagram (`https://www.instagram.com/psicoisi/`)
y se le pide al usuario que mande un DM con la palabra **`HORA`**, que dispara
la automatización de ManyChat.

Si en el futuro Isidora quiere otro flujo (form con backend, ManyChat con
Graph API para abrir DM directo, WhatsApp Business, etc.), se reemplaza el
archivo `contactInstagram.service.ts` y los consumidores no se enteran — la
interfaz está en `src/services/interfaces.ts`.

## Deploy

Push a `main` → Vercel compila y publica automáticamente.

## Performance

- **Bundle JS inicial**: < 80KB gzipped (sin librerías pesadas)
- **LCP**: poster image del hero (60KB WebP)
- **CLS**: 0 (todas las imágenes tienen aspect-ratio)
- **Imágenes**: WebP responsive (480w / 768w / 1200w) con `loading="lazy"`
- **Video**: poster + `preload="none"` (no compite con LCP); ~2-3MB en
  MP4 y WebM
- **Fonts**: subsetting automático vía `next/font` + `display: swap`
