// src/services/impl/analyticsNoop.service.ts
// Implementación por defecto: no hace nada. Útil para desarrollo
// y para mantener la página ultra-liviana (sin scripts de terceros).
// Si en el futuro Isidora quiere Plausible, Umami, o GA, se cambia
// una sola línea en <ServicesProvider>.

import type { AnalyticsService } from "../interfaces";

export const analyticsNoopService: AnalyticsService = {
  track() {
    // noop
  },
};
