// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";

/**
 * cn — combinador de clases tipo shadcn.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
