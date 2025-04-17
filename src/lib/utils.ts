import { type ClassValue, clsx } from "clsx";
import { startTransition } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Start a view transition using the Browser API (Client-side only) for smooth animations.
 * @param callback - The callback to start the view transition.
 */
export function startViewTransition(callback: () => void) {
  if ("startViewTransition" in document) {
    startTransition(() => {
      document.startViewTransition(callback);
    });
  } else {
    callback();
  }
}
