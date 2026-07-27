// src/components/sections/ComoEsEncuentro.tsx
// "Cómo es un encuentro" — grid de 6 cards con la mecánica del taller.

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/content/site";

export function ComoEsEncuentro() {
  return (
    <section id="como-es" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Cómo es un encuentro</span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Una tarde que se siente como un recreo largo.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Cada encuentro sigue un ritmo parecido, pero lo que sale en la
              página siempre es distinto. Aquí va lo que podés esperar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-rule sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {SITE.meetingFormat.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 60}
              className="bg-cream p-8 transition-colors hover:bg-cream-100/60 sm:p-10"
            >
              <span className="font-serif text-3xl italic text-terracotta">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-medium leading-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
