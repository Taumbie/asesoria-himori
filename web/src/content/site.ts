// src/content/site.ts
// Toda la copy de la landing vive acá. Si Isidora quiere cambiar algo,
// edita este archivo y redespliega. Sin tocar componentes.

export const SITE = {
  name: "Himori",
  tagline: "Talleres de journaling y crecimiento personal",
  description:
    "Un espacio seguro y accesible para reencontrarte a través del journaling y la escritura, en compañía de otras personas.",

  // CTA principal — la conversión vive en Instagram. La landing
  // NO abre WhatsApp ni pide una keyword (sin ManyChat por ahora).
  // El usuario va al perfil de @psicoisi, sigue, y desde ahí ve los
  // próximos talleres y le escribe por DM.
  primaryCTA: {
    label: "Seguir a @psicoisi",
    instruction:
      "Síguenos en @psicoisi para ver los próximos encuentros y escribirle directo a Isi.",
    instagramUrl: "https://www.instagram.com/psicoisi/",
  },

  // Datos de la dueña (solo lo mínimo que aparece en la página)
  owner: {
    name: "Isidora García",
    handle: "@psicoisi",
    role: "Psicóloga",
  },

  // Próximos encuentros. Isidora edita este array.
  // isoDate se usa para el JSON-LD Event (Google muestra fecha/hora reales).
  upcoming: [
    {
      title: "Mi jardín de invierno",
      subtitle: "Encuentro de journaling",
      date: "Domingo 2 de agosto",
      time: "15:00 hrs",
      fullDate: "Domingo 2 de agosto, 15:00 hrs",
      isoDate: "2026-08-02T15:00:00-04:00",
      location: "Tallercita, Caupolicán 346, Concepción",
      spots: "Cupos limitados (6-8 personas)",
    },
  ],

  // Cómo es un encuentro — bullets
  meetingFormat: [
    {
      title: "En comodidad",
      description:
        "Grupos pequeños (6-8 personas) donde puedes estar cómoda y bajar la guardia, sin apuro.",
    },
    {
      title: "Materiales listos",
      description:
        "Tenemos todo listo. Solo tienes que traer tu libreta.",
    },
    {
      title: "Café o té de bienvenida",
      description:
        "Te esperamos con algo caliente. Charlamos, nos instalamos, y el ambiente importa tanto como el trabajo.",
    },
    {
      title: "Una hora para crear",
      description:
        "Una consigna, una invitación a escribir, dibujar o pegar. Lo que salga, vale.",
    },
    {
      title: "Compartir sin presión",
      description:
        "Si querés contar, hay espacio. Si no, está bien quedarse contigo.",
    },
    {
      title: "Te llevás un recuerdo",
      description:
        "La página que armaste es tuya. Hecha por ti, con tus manos, en una tarde.",
    },
  ],

  // Para quién es — el perfil core del modelo de negocio
  audience: [
    "Personas que llevan mucho tiempo pensando y poco sintiendo.",
    "Personas que quieren un espacio sin juicios, sin opiniones no requeridas, sin prisa.",
    "Curiosas del journaling, el scrapbook, la escritura creativa — incluso si nunca lo intentaron.",
    "Aquellos que necesitan un espacio para sí mismos, sin roles, sin tareas.",
  ],
} as const;

export type SiteContent = typeof SITE;
