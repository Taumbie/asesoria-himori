// src/components/sections/ParaQuien.tsx
// "Para quién es" — lista editorial con bullets. Sin "beneficios"
// de marketing, sino situaciones reales donde la gente se reconoce.

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export function ParaQuien() {
  return (
    <section className="bg-cream-100/50 py-24 sm:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Para quién es</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
                Si te reconocieras en alguna de estas, es para ti.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                No necesitas experiencia. No necesitas saber dibujar ni
                escribir bonito. Solo necesitas ganas de pasar una tarde
                distinta.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-8">
              {SITE.audience.map((item, i) => (
                <Reveal key={item} delay={i * 80} as="li">
                  <div className="flex gap-6 border-b border-rule/70 pb-8 last:border-b-0">
                    <span className="font-serif text-2xl italic text-terracotta">
                      0{i + 1}
                    </span>
                    <p className="font-serif text-xl font-light leading-relaxed text-ink">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
