// src/lib/asset.ts
// Helper para prefijar assets con el basePath de GitHub Pages.
// En dev: basePath = "" → URLs normales
// En prod: basePath = "/asesoria-himori" → URLs prefijadas

export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
