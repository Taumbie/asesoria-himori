// src/components/ui/Button.tsx
// Botón con la marca Himori: terracota lleno, hover sutil.
// Variantes: primary (terracota), dark (terracota oscuro), ghost (outline).
// Soporta render como <button> o como <Link> si se pasa `href`.

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-cream hover:bg-terracotta-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/20",
  dark:
    "bg-terracotta-dark text-cream hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta-dark/30",
  ghost:
    "border border-terracotta text-terracotta hover:bg-terracotta hover:text-cream",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: never };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const {
      href,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      ...linkProps
    } = props as ButtonAsLink;
    return (
      <Link
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...btnProps
  } = props as ButtonAsButton;
  return (
    <button className={classes} {...btnProps}>
      {children}
    </button>
  );
}
