"use client";

import type React from "react";
import { memo, useCallback, useEffect, useState } from "react";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

import { cn, startViewTransition } from "@/lib/utils";

import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeSwitcher = memo(() => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const buttons = [
    { label: "light", icon: <Sun width={13} />, active: theme === "light" },
    { label: "dark", icon: <Moon width={13} />, active: theme === "dark" },
    {
      label: "system",
      icon: <Monitor width={13} />,
      active: theme === "system",
    },
  ];

  const handleThemeChange = useCallback(
    (label: string) => {
      startViewTransition(() => {
        setTheme(label);
      });
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span className="flex w-fit items-center gap-0.5 overflow-hidden rounded-[6px] bg-primary/5 p-[2px]">
      {buttons.map(({ label, icon, active }) => (
        <button
          type="button"
          key={label}
          onClick={() => handleThemeChange(label)}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-[4px] text-muted-foreground transition-all hover:opacity-50",
            active ? "bg-primary/10 text-foreground" : "",
          )}
        >
          {icon}
        </button>
      ))}
    </span>
  );
});

ThemeSwitcher.displayName = "ThemeSwitcher";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider
      enableSystem={true}
      attribute="class"
      storageKey="theme"
      defaultTheme="system"
    >
      {children}
    </NextThemeProvider>
  );
};
