// src/components/layout/Footer.tsx
// Footer editorial: marca grande, redes, créditos.

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Instagram } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule/60 bg-cream-100/40">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="font-serif text-5xl font-medium leading-none tracking-tight text-ink sm:text-6xl">
              Himori<span className="text-terracotta">.</span>
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
              Talleres de journaling y crecimiento personal. Un espacio para
              reencontrarte a través de la escritura.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <span className="eyebrow">Síguenos</span>
            <a
              href="https://www.instagram.com/psicoisi/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-2xl font-serif text-ink transition-colors hover:text-terracotta"
            >
              <Instagram
                className="h-6 w-6 text-terracotta transition-transform group-hover:scale-110"
                strokeWidth={1.5}
              />
              @psicoisi
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-rule/60 pt-8 sm:mt-20 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-eyebrow text-ink-mute">
            © {year} Himori · Isidora García
          </p>
          <p className="text-xs text-ink-mute">
            Hecho con cuidado en Concepción, Chile 🇨🇱
          </p>
        </div>
      </Container>
    </footer>
  );
}
