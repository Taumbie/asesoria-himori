// src/components/layout/Navbar.tsx
// Navbar minimal: logo "Himori." a la izquierda, CTA discreto a la derecha.
// Se vuelve translúcida con backdrop-blur al hacer scroll.

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/80 backdrop-blur-md border-b border-rule/60"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-ink"
        >
          Himori<span className="text-terracotta">.</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#galeria"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-terracotta sm:inline"
          >
            Galería
          </a>
          <a
            href="#contacto"
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-terracotta sm:inline"
          >
            Contacto
          </a>
          <a
            href="https://www.instagram.com/psicoisi/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-terracotta px-4 py-2 text-xs font-medium uppercase tracking-eyebrow text-terracotta transition-all hover:bg-terracotta hover:text-cream sm:px-5 sm:text-sm"
          >
            @psicoisi
          </a>
        </div>
      </nav>
    </header>
  );
}
