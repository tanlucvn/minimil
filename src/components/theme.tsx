"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttons = [
    { label: "light", icon: <Sun width={13} />, active: theme === "light" },
    { label: "dark", icon: <Moon width={13} />, active: theme === "dark" },
    {
      label: "system",
      icon: <Monitor width={13} />,
      active: theme === "system",
    },
  ];

  return (
    <span className="flex w-fit items-center gap-0.5 overflow-hidden rounded-[6px] bg-primary/5 p-[2px]">
      {buttons.map(({ label, icon, active }) => (
        <button
          type="button"
          key={label}
          onClick={() => setTheme(label)}
          className={cn(
            "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-muted-foreground transition-all hover:opacity-50",
            active ? "bg-primary/10 text-foreground" : "",
          )}
        >
          {icon}
        </button>
      ))}
    </span>
  );
};

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
