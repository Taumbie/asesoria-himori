import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { DefaultServicesRegistry } from "@/services/ServicesContext";

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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yessi.github.io/asesoria-himori";
const INSTAGRAM = "https://www.instagram.com/psicoisi/";

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
                "Talleres presenciales de journaling y crecimiento personal para mujeres.",
              url: SITE_URL,
              image: `${SITE_URL}/og-image.png`,
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
      </body>
    </html>
  );
}
