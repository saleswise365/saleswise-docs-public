import Link from "next/link";
import type { Locale } from "@/lib/home-content";

const categories = {
  account: { en: "Account & orders", ar: "الحساب والطلبات" },
  shopping: { en: "Shopping", ar: "التسوق" },
  support: { en: "Help", ar: "المساعدة" },
  tenant: { en: "Store administration", ar: "إدارة المتجر" },
  platform: { en: "Saleswise Admin", ar: "إدارة سيلزوايز" },
} as const;

export function DocsBreadcrumbs({
  lang,
  slug,
  title,
}: {
  readonly lang: Locale;
  readonly slug?: string[];
  readonly title: string;
}) {
  const category = slug?.[0];
  const categoryName =
    category && category in categories
      ? categories[category as keyof typeof categories][lang]
      : undefined;
  return (
    <nav
      className="sw-docs-breadcrumbs"
      aria-label={lang === "en" ? "Breadcrumb" : "مسار التنقل"}
    >
      <ol>
        <li>
          <Link href={`/${lang}`}>
            {lang === "en" ? "Help center" : "مركز المساعدة"}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        {slug?.length ? (
          <>
            <li>
              <Link href={`/${lang}/docs`}>
                {lang === "en" ? "All guides" : "جميع الأدلة"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {categoryName && slug.length > 1 && (
              <>
                <li>
                  <Link href={`/${lang}/docs/${category}`}>{categoryName}</Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li aria-current="page">{title}</li>
          </>
        ) : (
          <li aria-current="page">{title}</li>
        )}
      </ol>
    </nav>
  );
}
