// src/services/ServicesContext.tsx
// Provider de inyección de dependencias (liviano, estilo React Context).
// Se monta automáticamente con las implementaciones por defecto — el árbol
// no necesita saber qué hay debajo. Si en el futuro se quiere cambiar la
// implementación (ej. en tests, en otro país, en otra marca), se hace
// envolviendo manualmente con <ServicesProvider value={...}>.
//
// En Next.js 16 no se pueden pasar funciones desde Server Components a
// Client Components. Por eso las implementaciones se importan dentro del
// "use client" boundary (este archivo) y se exponen vía el provider.

"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { ContactService, AnalyticsService } from "./interfaces";
import { contactInstagramService } from "./impl/contactInstagram.service";
import { analyticsNoopService } from "./impl/analyticsNoop.service";

interface Services {
  contact: ContactService;
  analytics: AnalyticsService;
}

const ServicesContext = createContext<Services | null>(null);

export function ServicesProvider({
  value,
  children,
}: {
  value: Services;
  children: ReactNode;
}) {
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

/**
 * Registry por defecto: monta el provider con las impls preconfiguradas.
 * Usar este en el layout raíz. Para overrides (tests, multi-tenant, etc.)
 * usar <ServicesProvider value={...}> manualmente.
 */
export function DefaultServicesRegistry({ children }: { children: ReactNode }) {
  const value: Services = {
    contact: contactInstagramService,
    analytics: analyticsNoopService,
  };
  return <ServicesProvider value={value}>{children}</ServicesProvider>;
}

function useServices(): Services {
  const ctx = useContext(ServicesContext);
  if (!ctx) {
    throw new Error(
      "useServices debe usarse dentro de <ServicesProvider>. " +
        "Asegúrate de envolver el árbol en layout.tsx con <DefaultServicesRegistry>."
    );
  }
  return ctx;
}

export function useContactService() {
  return useServices().contact;
}

export function useAnalyticsService() {
  return useServices().analytics;
}
