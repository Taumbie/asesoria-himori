// src/components/sections/Galeria.tsx
// Galería editorial: masonry/grid de las 4 fotos del taller.
// Las imágenes usan SmartImage (lazy + srcset responsive).
// Cada Reveal usa IntersectionObserver (definido en ui/Reveal).

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

const photos = [
  {
    base: "taller-01",
    alt: "Mesa de scrapbook con flores, stickers y velas — taller de journaling",
    className: "sm:col-span-2 sm:row-span-2 aspect-[4/5]",
  },
  {
    base: "taller-02",
    alt: "Libretas decoradas con stickers vintage de asistentes al taller",
    className: "aspect-square",
  },
  {
    base: "taller-03",
    alt: "Scrapbook abierto con hojas de otoño, fotos y stickers de Sanrio",
    className: "aspect-square",
  },
  {
    base: "taller-04",
    alt: "Materiales de journaling: stickers con letras, flores secas y libretas de Isidora",
    className: "sm:col-span-2 aspect-[16/9]",
  },
];

export function Galeria() {
  return (
    <section id="galeria" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Galería</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Lo que pasa cuando ocho mujeres se sientan a la misma mesa.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal
              key={p.base}
              delay={i * 80}
              className={p.className}
            >
              <SmartImage
                base={p.base}
                alt={p.alt}
                className="rounded-2xl"
                sizes={
                  p.className.includes("col-span-2")
                    ? "(min-width: 1024px) 66vw, 100vw"
                    : "(min-width: 1024px) 33vw, 50vw"
                }
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
