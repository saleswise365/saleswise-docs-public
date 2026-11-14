import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootProvider } from "fumadocs-ui/provider/next";
import "fumadocs-ui/style.css";
import "../saleswise.css";
import { SiteHeader } from "./SiteHeader";
import { homeCopy } from "@/lib/home-content";

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<{ readonly lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  return {
    title: `${homeCopy[lang].navHome} | Saleswise365`,
    description: homeCopy[lang].intro,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const translations =
    lang === "ar"
      ? {
          "Search(search trigger)": "بحث",
          "Search(search dialog)": "بحث",
          "Close Search(search dialog)": "إغلاق البحث",
          "On this page(table of contents)": "في هذه الصفحة",
          "Next Page(pagination)": "الصفحة التالية",
          "Previous Page(pagination)": "الصفحة السابقة",
        }
      : {};
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body data-docs-shell="saleswise">
        <RootProvider
          dir={lang === "ar" ? "rtl" : "ltr"}
          i18n={{ locale: lang, translations }}
          theme={{ forcedTheme: "light" }}
          search={{ enabled: false }}
        >
          <SiteHeader lang={lang} />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
