// src/content/site.ts
// Toda la copy de la landing vive acá. Si Isidora quiere cambiar algo,
// edita este archivo y redespliega. Sin tocar componentes.

export const SITE = {
  name: "Himori",
  tagline: "Talleres de journaling y crecimiento personal",
  description:
    "Un espacio seguro y accesible para reencontrarte contigo a través del journaling y la escritura, en compañía de otras mujeres.",

  // CTA principal — apunta a ManyChat / Instagram DM
  // ManyChat se activa cuando alguien envía la palabra "HORA" al @psicoisi
  // y devuelve automáticamente la info del próximo encuentro.
  primaryCTA: {
    label: "Reservar mi cupo",
    keyword: "HORA",
    instruction:
      "Mándame un DM a @psicoisi con la palabra HORA y te cuento cómo sumarte al próximo encuentro.",
    instagramUrl: "https://www.instagram.com/psicoisi/",
  },

  // Datos de la dueña (solo lo mínimo que aparece en la página)
  owner: {
    name: "Isidora García",
    handle: "@psicoisi",
    role: "Psicóloga",
  },

  // Próximos encuentros (placeholder — Isidora actualiza este array)
  upcoming: [
    {
      title: "Mi jardín de invierno",
      subtitle: "Encuentro de journaling",
      date: "Sábado por confirmar",
      location: "Tempora Café, Concepción",
      spots: "Cupos limitados",
    },
  ],

  // Cómo es un encuentro — bullets
  meetingFormat: [
    {
      title: "Un espacio íntimo",
      description:
        "Grupos pequeños (6-8 mujeres) para que cada una pueda habitar el momento con calma, sin apuro.",
    },
    {
      title: "Materiales listos",
      description:
        "Llevamos todo: libretas, stickers, washi, recortes, tijeras. Solo vienes tú.",
    },
    {
      title: "Café de bienvenida",
      description:
        "Llegamos, charlamos, y nos instalamos. El ambiente importa tanto como el trabajo.",
    },
    {
      title: "Una hora para crear",
      description:
        "Una consigna, una invitación a escribir, dibujar o pegar. Lo que salga, vale.",
    },
    {
      title: "Compartir sin presión",
      description:
        "Si querés contar, contás. Si no, también está bien. La escucha es la base de todo.",
    },
    {
      title: "Te llevás un recuerdo",
      description:
        "La página que armaste es tuya. Hecha por ti, con tus manos, en una tarde.",
    },
  ],

  // Para quién es — el perfil core del modelo de negocio
  audience: [
    "Mujeres que sienten que llevan mucho tiempo pensando y poco tiempo sintiendo.",
    "Personas que quieren un espacio sin juicios, sin consejos no pedidos, sin prisa.",
    "Curiosas del journaling, el scrapbook, la escritura creativa — incluso si nunca lo intentaron.",
    "Las que necesitan una tarde entera para sí mismas, sin roles, sin tareas.",
  ],
} as const;

export type SiteContent = typeof SITE;
