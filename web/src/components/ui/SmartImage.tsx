// src/components/ui/SmartImage.tsx
// <img> con srcset responsive y lazy load. Como GitHub Pages no corre
// /_next/image, manejamos las variantes a mano con srcset nativo.
// Mantenemos <img> en vez de next/image para evitar el adapter.

import { cn } from "@/lib/utils";

interface SmartImageProps {
  base: string; // ej: "taller-01" (sin extensión)
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Si es true, marca como above-the-fold (eager) */
}

/**
 * <SmartImage base="taller-01" alt="..." />
 * Genera srcset con los 3 tamaños: -sm (480w) -md (768w) -lg (1200w)
 */
export function SmartImage({
  base,
  alt,
  width,
  height,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: SmartImageProps) {
  return (
    <img
      src={`/images/${base}-md.webp`}
      srcSet={`/images/${base}-sm.webp 480w, /images/${base}-md.webp 768w, /images/${base}-lg.webp 1200w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
