import type { NextConfig } from "next";

/**
 * Configuración para Vercel (Next.js full-stack).
 *
 * Hosting: Vercel. Auth + DB + Storage: Supabase.
 * Variables de entorno: ver `web/.env.example`.
 */
const nextConfig: NextConfig = {
  // Server actions, API routes, ISR, next/image → todos habilitados (Vercel corre Node).
  // Antes era `output: "export"` para GitHub Pages — eso ya no aplica.

  reactStrictMode: true,

  // Reduce bundle de producción.
  poweredByHeader: false,
  compress: true,

  // Production source maps off — el sitio es público, no nos interesa exponer el código.
  productionBrowserSourceMaps: false,

  // next/image usa el loader de Vercel (con Supabase Storage como origen, anda bien
  // con dominios remotos permitidos abajo). Si en algún momento se quiere servir
  // imágenes optimizadas desde Supabase Transformations, dejamos el default.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
