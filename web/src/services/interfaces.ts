// src/services/interfaces.ts
// Interfaces de los servicios. La implementación concreta se inyecta
// desde <ServicesProvider> en el layout. Esto es la "I" de una DI liviana:
// cualquier componente consume los servicios vía hooks tipados, sin saber
// qué hay debajo. Si mañana cambiamos de ManyChat a algo distinto, solo
// tocamos el provider.

export interface ContactService {
  /**
   * Construye la URL de Instagram para que la usuaria envíe un DM
   * con la palabra clave pre-llenada. No abre la URL automáticamente
   * (eso lo hace el componente con un <a>); este método solo la construye.
   */
  buildInstagramDmUrl(keyword: string): string;
  /**
   * Mensaje que se le muestra a la usuaria antes de hacer clic en el CTA.
   * Vive en el servicio para que cambiar el wording sea trivial.
   */
  getCallToActionText(): string;
}

export interface AnalyticsService {
  track(event: string, payload?: Record<string, unknown>): void;
}
