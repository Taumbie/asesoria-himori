# Himori — Landing

Landing page de Himori (talleres de journaling y crecimiento personal).
Next.js 16 (App Router) + TypeScript strict + Tailwind v3, exportado a HTML estático y deployado a GitHub Pages.

## Stack

- **Framework**: Next.js 16 con `output: "export"` (HTML estático)
- **Lenguaje**: TypeScript strict
- **Estilos**: Tailwind CSS v3 (paleta Himori en `tailwind.config.ts`)
- **Tipografía**: Fraunces (serif) + Inter (sans) vía `next/font`
- **Animaciones**: IntersectionObserver nativo (sin Framer Motion en producción)
- **Compresión video**: `ffmpeg` estático vía `@ffmpeg-installer/ffmpeg`
- **Optimización imágenes**: `sharp` → WebP responsive (sm/md/lg)

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
└── .github/
    └── workflows/
        └── deploy.yml        # Auto-deploy a GitHub Pages
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

# Build de producción (corre optimize:images + compress:video automáticamente)
npm run build                  # output en web/out/

# Previsualizar el build estático (requiere npx serve)
npx serve out -l 3001          # http://localhost:3001/asesoria-himori/
```

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

## Setup inicial en GitHub

1. **Crear repo `asesoria-himori`** en GitHub
2. **Push del código**:
   ```bash
   git init
   git add .
   git commit -m "feat: landing Himori v1"
   git branch -M main
   git remote add origin git@github.com:<username>/asesoria-himori.git
   git push -u origin main
   ```
3. **Activar Pages**: Settings → Pages → Source: **GitHub Actions**
4. **Esperar el primer deploy** (1-2 min) y obtener la URL:
   `https://<username>.github.io/asesoria-himori/`

### Opcional: variable de entorno para SITE_URL

Si Isidora tiene un dominio custom (`himori.cl`) antes del deploy, en
Settings → Secrets and variables → Actions → Variables, agregar:

- `SITE_URL` = `https://himori.cl`

Si no, el workflow usa `https://<username>.github.io/asesoria-himori/` por
defecto.

## Migración futura a Vercel

Cuando llegue el momento, los cambios son:

1. **`next.config.ts`**: borrar `output: "export"`, `basePath`, `trailingSlash`
   y `images.unoptimized`
2. **`web/.github/workflows/deploy.yml`**: ya no es necesario (Vercel
   auto-detecta Next.js)
3. **Conectar el repo a Vercel** desde la UI

Tiempo estimado: 5 minutos.

## Performance

- **Bundle JS inicial**: < 80KB gzipped (sin librerías pesadas)
- **LCP**: poster image del hero (60KB WebP)
- **CLS**: 0 (todas las imágenes tienen aspect-ratio)
- **Imágenes**: WebP responsive (480w / 768w / 1200w) con `loading="lazy"`
- **Video**: poster + `preload="none"` (no compite con LCP); ~2-3MB en
  MP4 y WebM
- **Fonts**: subsetting automático vía `next/font` + `display: swap`
