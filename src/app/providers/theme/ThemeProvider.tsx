import type { PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
  // Пока минимально. Потом подключишь themeSlice + localStorage.
  return children;
}
