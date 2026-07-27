// src/app/page.tsx
// Composición de la landing. Cada sección es autónoma, server-rendered
// por defecto (los Reveal, video y CTAs son los únicos client components).

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { ParaQuien } from "@/components/sections/ParaQuien";
import { ComoEsEncuentro } from "@/components/sections/ComoEsEncuentro";
import { ProximosEncuentros } from "@/components/sections/ProximosEncuentros";
import { Galeria } from "@/components/sections/Galeria";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifiesto />
        <ParaQuien />
        <ComoEsEncuentro />
        <ProximosEncuentros />
        <Galeria />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
