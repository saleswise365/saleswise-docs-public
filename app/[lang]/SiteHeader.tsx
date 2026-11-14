"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeCopy, type Locale } from "@/lib/home-content";

export function SiteHeader({ lang }: { readonly lang: Locale }) {
  const pathname = usePathname();
  const otherLocale = lang === "en" ? "ar" : "en";
  const otherPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${otherLocale}`);
  const copy = homeCopy[lang];
  const announcements =
    lang === "en"
      ? [
          {
            label: "Browse shops and categories",
            href: "/en/docs/shopping/browse",
          },
          {
            label: "Place an order step by step",
            href: "/en/docs/shopping/checkout",
          },
          { label: "Follow your orders", href: "/en/docs/account/orders" },
        ]
      : [
          {
            label: "تصفح المتاجر والتصنيفات",
            href: "/ar/docs/shopping/browse",
          },
          { label: "أنشئ طلبك خطوة بخطوة", href: "/ar/docs/shopping/checkout" },
          { label: "تابع طلباتك", href: "/ar/docs/account/orders" },
        ];

  return (
    <>
      <div className="sw-topbar">
        <div className="sw-topbar-inner">
          <span className="sw-topbar-badge">
            {lang === "en" ? "GUIDES" : "أدلة"}
          </span>
          <div
            className="sw-topbar-marquee"
            aria-label={lang === "en" ? "Featured guides" : "أدلة مميزة"}
          >
            <div className="sw-topbar-track">
              {[0, 1].map((copyIndex) => (
                <div
                  className="sw-topbar-group"
                  key={copyIndex}
                  aria-hidden={copyIndex === 1 ? "true" : undefined}
                >
                  {announcements.map((item) => (
                    <Link
                      href={item.href}
                      key={item.href}
                      tabIndex={copyIndex === 1 ? -1 : undefined}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <details className="sw-topbar-language">
            <summary
              aria-label={lang === "en" ? "Choose language" : "اختر اللغة"}
            >
              {lang.toUpperCase()} <span aria-hidden="true">⌄</span>
            </summary>
            <div className="sw-topbar-language-menu">
              <a
                href={lang === "en" ? pathname : otherPath}
                lang="en"
                hrefLang="en"
              >
                EN
              </a>
              <a
                href={lang === "ar" ? pathname : otherPath}
                lang="ar"
                hrefLang="ar"
              >
                AR
              </a>
            </div>
          </details>
        </div>
      </div>
      <header className="sw-header">
        <div className="sw-header-inner">
          <Link
            className="sw-brand"
            href={`/${lang}`}
            aria-label={`${copy.navHome} — Saleswise365`}
            dir="ltr"
          >
            <Image src="/logo.svg" alt="" width={38} height={38} priority />
            <span>
              Saleswise<span className="sw-brand-accent">365</span>
            </span>
            <span className="sw-brand-divider" aria-hidden="true" />
            <span className="sw-brand-help">{copy.navHome}</span>
          </Link>
          <nav
            className="sw-nav"
            aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main navigation"}
          >
            <Link href={`/${lang}#home-search`}>{copy.navSearch}</Link>
            <Link href={`/${lang}/docs`}>{copy.navGuides}</Link>
            <Link href={`/${lang}/docs/support/help`}>{copy.navSupport}</Link>
            <a
              href={
                process.env.NODE_ENV === "development"
                  ? "http://saleswise.me/"
                  : "https://saleswise.com/"
              }
            >
              {copy.navProduct}
            </a>
          </nav>
          <a
            className="sw-locale sw-mobile-locale"
            href={otherPath}
            lang={otherLocale}
            hrefLang={otherLocale}
            aria-label={
              lang === "en" ? "Switch to Arabic" : "Switch to English"
            }
          >
            {lang === "en" ? "العربية" : "English"}
          </a>
        </div>
      </header>
    </>
  );
}
