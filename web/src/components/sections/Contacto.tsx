// src/components/sections/Contacto.tsx
// Sección final: cierre editorial + CTA explícito al Instagram de @psicoisi.
// Sin ManyChat ni palabras clave. La conversión es: landing → seguir en IG → DM.

"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Instagram } from "lucide-react";
import { SITE } from "@/content/site";
import { useContactService } from "@/services/ServicesContext";

export function Contacto() {
  const contact = useContactService();
  const url = contact.buildInstagramDmUrl("");

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <Container size="narrow">
        <Reveal>
          <span className="eyebrow">¿Te sumas?</span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Encuéntranos en{" "}
            <em className="font-normal italic text-terracotta">@psicoisi</em>.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 font-serif text-xl font-light leading-relaxed text-ink-soft sm:text-2xl">
            Toda la info del próximo encuentro, fotos de los talleres, fechas
            y cómo sumarte — la subimos a Instagram.{" "}
            <span className="text-ink">Síguenos</span> y escríbenos por DM
            cuando quieras.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href={url} size="lg" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
              {contact.getCallToActionText()}
              <ArrowUpRight
                className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-12 max-w-prose text-sm leading-relaxed text-ink-mute">
            {SITE.owner.name} lee los mensajes personalmente. Si tienes
            preguntas sobre el próximo taller, ubicación, o quieres proponer
            un encuentro, escríbele directo al DM de{" "}
            <span className="text-ink-soft">@psicoisi</span>.
          </p>
        </Reveal>
      </Container>

      {/* Decoración: regla corta al fondo */}
      <div className="mt-20 flex justify-center">
        <div className="rule-mark-vertical" />
      </div>
    </section>
  );
}
