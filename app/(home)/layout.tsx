import type { ReactNode } from "react";
import "fumadocs-ui/style.css";
import "../saleswise.css";

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
