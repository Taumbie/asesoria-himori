import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { DefaultServicesRegistry } from "@/services/ServicesContext";
import { SITE } from "@/content/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://taumbie.github.io/asesoria-himori";
const INSTAGRAM = "https://www.instagram.com/psicoisi/";

// Construye la URL absoluta de un asset respetando el basePath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetUrl = (p: string) =>
  p.startsWith("http") ? p : `${SITE_URL}${basePath}${p.startsWith("/") ? p : `/${p}`}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Himori — Talleres de journaling y crecimiento personal",
    template: "%s · Himori",
  },
  description:
    "Un espacio seguro y accesible para reencontrarte contigo a través del journaling y la escritura, en compañía de otras mujeres. Talleres presenciales en Concepción, Chile.",
  keywords: [
    "taller journaling Chile",
    "taller journaling Concepción",
    "journaling mujeres",
    "scrapbook taller",
    "crecimiento personal mujeres",
    "escritura terapéutica",
    "psicología journaling",
  ],
  authors: [{ name: "Isidora García" }],
  creator: "Isidora García — @psicoisi",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "Himori",
    title: "Himori — Talleres de journaling y crecimiento personal",
    description:
      "Un espacio seguro para reencontrarte a través del journaling y la escritura.",
    images: [
      {
        url: assetUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Himori — Talleres de journaling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himori — Talleres de journaling",
    description: "Encuentros presenciales de journaling y crecimiento personal.",
    images: [assetUrl("/og-image.png")],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#5C2E25",
  width: "device-width",
  initialScale: 1,
};

// Servicios inyectados en el root vía <DefaultServicesRegistry>.
// Para cambiar la implementación (ej. a un endpoint propio o a ManyChat
// con Graph API) se edita el archivo services/impl/contactInstagram.service.ts
// o se sustituye en DefaultServicesRegistry — un solo lugar.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <DefaultServicesRegistry>{children}</DefaultServicesRegistry>

        {/* JSON-LD: negocio local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Himori",
              description:
                "Talleres presenciales de journaling y crecimiento personal para mujeres en Concepción, Chile.",
              url: SITE_URL,
              image: assetUrl("/og-image.png"),
              sameAs: [INSTAGRAM],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Concepción",
                addressRegion: "Biobío",
                addressCountry: "CL",
              },
              priceRange: "$$",
            }),
          }}
        />

        {/* JSON-LD: evento del próximo taller (Google muestra fecha/hora) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: `${SITE.upcoming[0].title} — ${SITE.upcoming[0].subtitle}`,
              startDate: SITE.upcoming[0].isoDate,
              endDate: SITE.upcoming[0].isoDate.replace("15:00", "18:00"),
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Tallercita",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Caupolicán 346",
                  addressLocality: "Concepción",
                  addressRegion: "Biobío",
                  addressCountry: "CL",
                },
              },
              image: assetUrl("/og-image.png"),
              organizer: {
                "@type": "Organization",
                name: "Himori",
                url: SITE_URL,
                sameAs: [INSTAGRAM],
              },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/LimitedAvailability",
                url: INSTAGRAM,
                validFrom: new Date().toISOString().split("T")[0],
              },
              description:
                "Encuentro presencial de journaling y scrapbook en Concepción. Grupo pequeño (6-8 mujeres), materiales incluidos, café de bienvenida.",
            }),
          }}
        />

        {/* JSON-LD: organización Himori */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Himori",
              url: SITE_URL,
              logo: assetUrl("/icon.svg"),
              sameAs: [INSTAGRAM],
              description:
                "Talleres de journaling y crecimiento personal en Concepción, Chile.",
            }),
          }}
        />
      </body>
    </html>
  );
}
