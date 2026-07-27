// src/components/sections/Manifiesto.tsx
// Manifiesto editorial: tipografía grande, respiro, sin ornamentos.

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export function Manifiesto() {
  return (
    <section className="bg-cream py-24 sm:py-32 lg:py-40">
      <Container size="narrow">
        <Reveal>
          <span className="eyebrow">El manifiesto</span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Himori existe porque a veces necesitas{" "}
            <em className="font-normal italic text-terracotta">
              sentarte a escribir
            </em>{" "}
            en compañía.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-10 font-serif text-xl font-light leading-relaxed text-ink-soft sm:text-2xl">
            No es un taller de productividad. No es un curso de creatividad.
            Es un espacio para ti — con una libreta abierta, unas tijeras,
            stickers de más, y otras personas que entienden por qué vinieron.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 rule-mark" />
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 max-w-prose font-serif text-lg leading-relaxed text-ink-soft">
            {SITE.description}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
