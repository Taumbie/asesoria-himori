// src/components/sections/Hero.tsx
// Hero: 2 columnas en desktop (texto izq + video vertical der, sticky).
// En mobile: video full-width arriba, texto debajo.
// El video está muted, loop, autoplay (sin controles) — la política
// de los browsers permite autoplay muted sin interacción del usuario.
// El video tiene `preload="none"` y se carga solo cuando el componente
// está montado, evitando penalizar el LCP con 8MB de video.

"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Play } from "lucide-react";
import { SITE } from "@/content/site";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Diferimos la carga del video unos ms para no competir con el LCP.
  useEffect(() => {
    const t = window.setTimeout(() => setShowVideo(true), 200);
    return () => window.clearTimeout(t);
  }, []);

  // Si el video entra en viewport, intentamos reproducir (algunos
  // móviles bloquean autoplay hasta primer touch; esto es harmless).
  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.play().catch(() => {
              /* silencioso: el usuario podrá darle play */
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <section className="relative overflow-hidden bg-cream pt-28 sm:pt-32 lg:pt-24">
      <Container className="lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── Columna texto ─────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:pr-8">
            <span className="eyebrow mb-6 inline-block">
              Próximo encuentro · Concepción
            </span>

            <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Un espacio para{" "}
              <em className="font-normal italic text-terracotta">
                reencontrarte
              </em>{" "}
              contigo, página a página.
            </h1>

            <p className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-ink-soft sm:text-2xl">
              Talleres pequeños de journaling y scrapbook para mujeres que
              quieren una tarde para sí mismas — sin prisa, sin consejos no
              pedidos, sin roles.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href={SITE.primaryCTA.instagramUrl}
                size="lg"
                className="group"
              >
                {SITE.primaryCTA.label}
                <ArrowUpRight
                  className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Button>
              <a
                href="#como-es"
                className="text-sm font-medium text-ink-soft underline-offset-4 transition-colors hover:text-terracotta hover:underline"
              >
                ¿Cómo es un encuentro?
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-eyebrow text-ink-mute">
              <Play className="h-3 w-3" strokeWidth={2} />
              <span>Video del último taller</span>
            </div>
          </div>

          {/* ── Columna video ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-terracotta-dark/5 shadow-2xl shadow-terracotta-dark/10 sm:max-w-md lg:sticky lg:top-28 lg:max-w-none">
              {showVideo ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/video/hero-poster.jpg"
                  aria-label="Video del último taller de journaling Himori"
                >
                  <source src="/video/hero.webm" type="video/webm" />
                  <source src="/video/hero.mp4" type="video/mp4" />
                </video>
              ) : (
                <img
                  src="/video/hero-poster.jpg"
                  alt="Frame del último taller de journaling"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              )}

              {/* Overlay sutil con marca */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-terracotta-dark/40 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
                <div>
                  <p className="font-serif text-lg italic">Mi jardín de invierno</p>
                  <p className="text-[10px] uppercase tracking-eyebrow opacity-90">
                    Encuentro de journaling
                  </p>
                </div>
                <span className="rounded-full border border-cream/40 bg-cream/10 px-3 py-1 text-[10px] uppercase tracking-eyebrow backdrop-blur-sm">
                  Himori
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Decoración: una línea editorial abajo */}
      <div className="mt-16 hidden h-px w-full bg-gradient-to-r from-transparent via-rule to-transparent lg:block" />
    </section>
  );
}
