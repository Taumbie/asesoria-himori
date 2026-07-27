// src/services/impl/contactInstagram.service.ts
// Implementación concreta: la conversión vive en Instagram.
// La landing NO abre WhatsApp (decisión del cliente: su número personal
// no debe quedar expuesto). El usuario es redirigido al perfil @psicoisi
// y se le indica que mande un DM con la palabra "HORA" — la cual dispara
// la automatización de ManyChat con la info del próximo encuentro.

import type { ContactService } from "../interfaces";

const INSTAGRAM_HANDLE = "psicoisi";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const contactInstagramService: ContactService = {
  buildInstagramDmUrl(_keyword: string) {
    // Instagram web no soporta pre-llenar mensajes vía URL pública sin
    // permisos de Instagram Graph API. Por eso el flujo es:
    //  1) Landing muestra "Manda DM con la palabra HORA"
    //  2) CTA abre el perfil de Instagram
    //  3) La usuaria hace el DM manualmente
    //  4) ManyChat detecta "HORA" y responde automáticamente
    //
    // Si más adelante Isidora autoriza Instagram Graph API,
    // este método puede cambiar para abrir un DM directo.
    void _keyword; // keyword documentada para futura implementación Graph API
    return INSTAGRAM_URL;
  },

  getCallToActionText() {
    return "Seguir a @psicoisi";
  },
};
