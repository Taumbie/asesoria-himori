// src/components/sections/ProximosEncuentros.tsx
// "Próximos encuentros" — card destacada con la info del próximo taller.
// Si no hay fecha confirmada, mostramos "lista de espera" + CTA a ManyChat.

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Calendar, MapPin, Users } from "lucide-react";
import { SITE } from "@/content/site";

export function ProximosEncuentros() {
  const next = SITE.upcoming[0];

  return (
    <section className="bg-terracotta-dark py-24 text-cream sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-cream/80">Próximo encuentro</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
                {next.title}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 font-serif text-xl italic text-cream/85">
                {next.subtitle}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={300}>
              <div className="space-y-6">
                <div className="flex items-start gap-4 border-b border-cream/20 pb-5">
                  <Calendar
                    className="mt-1 h-5 w-5 flex-shrink-0 text-cream/80"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-cream/70">
                      Cuándo
                    </p>
                    <p className="mt-1 font-serif text-xl">{next.fullDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-b border-cream/20 pb-5">
                  <MapPin
                    className="mt-1 h-5 w-5 flex-shrink-0 text-cream/80"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-cream/70">
                      Dónde
                    </p>
                    <p className="mt-1 font-serif text-xl">{next.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-2">
                  <Users
                    className="mt-1 h-5 w-5 flex-shrink-0 text-cream/80"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-xs uppercase tracking-eyebrow text-cream/70">
                      Cupos
                    </p>
                    <p className="mt-1 font-serif text-xl">{next.spots}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 rounded-2xl bg-cream/10 p-6 backdrop-blur-sm sm:p-8">
                <p className="text-base leading-relaxed text-cream/95 sm:text-lg">
                  {SITE.primaryCTA.instruction}
                </p>
                <div className="mt-6">
                  <Button
                    href={SITE.primaryCTA.instagramUrl}
                    size="lg"
                    variant="ghost"
                    className="border-cream text-cream hover:bg-cream hover:text-terracotta-dark"
                  >
                    Seguir a @psicoisi
                    <ArrowUpRight
                      className="h-5 w-5"
                      strokeWidth={1.5}
                    />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
