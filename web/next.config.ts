import type { NextConfig } from "next";

/**
 * Configuración para GitHub Pages con Next.js static export.
 *
 * Para deployar en Vercel más adelante, basta con:
 *   1. Quitar `output: "export"`
 *   2. Quitar `basePath` y `trailingSlash`
 *   3. Quitar `images.unoptimized: true`
 *   4. Quitar `NEXT_PUBLIC_BASE_PATH` del workflow
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/asesoria-himori";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export: pre-renderiza todo a HTML/CSS/JS estáticos.
  // Compatible con GitHub Pages, Cloudflare Pages, Netlify, S3, etc.
  output: "export",

  // Subpath del repo en GitHub Pages (username.github.io/<repo>).
  // En desarrollo local queda vacío para trabajar en localhost sin /subpath.
  basePath: isProd ? basePath : "",

  // GitHub Pages no soporta trailingSlash=false consistentemente.
  trailingSlash: true,

  // GitHub Pages no corre servidor, así que no hay /_next/image.
  // Optimizamos las imágenes a mano con sharp antes del build.
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  // Reduce bundle de producción.
  poweredByHeader: false,
  compress: true,

  // Production source maps off — el sitio es público, no nos interesa exponer el código.
  productionBrowserSourceMaps: false,
};

export default nextConfig;
