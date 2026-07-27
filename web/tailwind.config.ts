import type { Config } from "tailwindcss";

/**
 * Paleta Himori — extraída del PDF del plan de negocio
 * (mismas variables CSS del index.html del informe).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Cremas y fondos
        cream: {
          DEFAULT: "#FAF6F1", // papel base
          50: "#FFFBF7",
          100: "#F5EBE6", // fondo callouts / "accent-bg"
          200: "#EFE2D9",
        },
        // Terracotas — el alma de la marca
        terracotta: {
          DEFAULT: "#8B4A3F", // accent principal
          dark: "#5C2E25", // portada / profundidad
          soft: "#B07A6F", // versiones claras, acentos suaves
          deep: "#3E1D17",
        },
        // Tinta — texto
        ink: {
          DEFAULT: "#2A1F1B",
          soft: "#5A4A43",
          mute: "#8A7A72",
        },
        // Reglas / bordes sutiles
        rule: "#D9C9BE",
      },
      fontFamily: {
        // Las variables --font-* las inyecta next/font en layout.tsx
        serif: ["var(--font-fraunces)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        "eyebrow-wide": "0.32em",
      },
      maxWidth: {
        prose: "62ch",
        editorial: "78ch",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1.2s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite alternate",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
