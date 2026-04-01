"use client";

import type { ReactNode } from "react";
import { SitePreferencesProvider } from "@/components/portfolio/site-preferences-context";

export function Providers({ children }: { children: ReactNode }) {
  return <SitePreferencesProvider>{children}</SitePreferencesProvider>;
}
