// src/components/sections/Contacto.tsx
// Sección final: cierre editorial + CTA explícito al DM.
// El "form" no envía datos — en su lugar guía al usuario a ManyChat.
// Esto se ve más honesto que un form que recibe un POST sin respuesta.

"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/content/site";
import { useContactService } from "@/services/ServicesContext";

export function Contacto() {
  const contact = useContactService();
  const url = contact.buildInstagramDmUrl(SITE.primaryCTA.keyword);

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <Container size="narrow">
        <Reveal>
          <span className="eyebrow">¿Te sumás?</span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Escribime.{" "}
            <em className="font-normal italic text-terracotta">
              Con esa palabra basta.
            </em>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 font-serif text-xl font-light leading-relaxed text-ink-soft sm:text-2xl">
            Mándame un DM a{" "}
            <span className="text-ink">@psicoisi</span> con la palabra{" "}
            <span className="rounded-md bg-terracotta/10 px-2 py-1 font-mono text-base text-terracotta sm:text-lg">
              {SITE.primaryCTA.keyword}
            </span>
            . Te contesto al toque con los detalles del próximo encuentro y
            cómo reservar tu cupo.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href={url} size="lg" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
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
            La palabra <span className="font-medium text-ink-soft">HORA</span>{" "}
            activa una respuesta automática con toda la info. Si tenés
            preguntas más personales, podés escribirme directo en el DM —
            {SITE.owner.name.toLowerCase()} te lee personalmente.
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
