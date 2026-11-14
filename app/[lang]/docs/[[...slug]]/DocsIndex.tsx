import Link from "next/link";
import { homeCopy, sections, type Locale } from "@/lib/home-content";
import { DocsCategoryIcon } from "../SidebarNavigation";

const orderSteps = [
  { slug: "shopping/browse", en: "Browse the store", ar: "تصفح المتجر" },
  { slug: "shopping/product", en: "Choose a product", ar: "اختر منتجًا" },
  { slug: "shopping/cart", en: "Review your cart", ar: "راجع السلة" },
  { slug: "shopping/checkout", en: "Place your order", ar: "أكّد الطلب" },
  { slug: "account/orders", en: "Track your order", ar: "تابع طلبك" },
] as const;

export function DocsIndex({ lang }: { readonly lang: Locale }) {
  const copy = homeCopy[lang];
  return (
    <div className="sw-docs-index">
      <section
        className="sw-docs-index-hero"
        aria-labelledby="docs-index-title"
      >
        <p className="sw-kicker">{copy.eyebrow}</p>
        <h1 id="docs-index-title">
          {lang === "en" ? "All Saleswise guides" : "جميع أدلة سيلزوايز"}
        </h1>
        <p>
          {lang === "en"
            ? "Find steps for shopping, managing a store workspace, and using Saleswise Admin."
            : "خطوات للتسوق وإدارة مساحة عمل المتجر واستخدام إدارة سيلزوايز."}
        </p>
        <Link
          className="sw-docs-index-primary"
          href={`/${lang}/docs/shopping/browse`}
        >
          {lang === "en" ? "Start with browsing" : "ابدأ بالتصفح"}
          <span aria-hidden="true">{lang === "en" ? "↗" : "↖"}</span>
        </Link>
      </section>

      <section
        className="sw-docs-index-section"
        aria-labelledby="docs-order-title"
      >
        <div className="sw-docs-index-heading">
          <span className="sw-docs-index-label">01</span>
          <div>
            <h2 id="docs-order-title">
              {lang === "en" ? "Place an order" : "أنشئ طلبًا"}
            </h2>
            <p>
              {lang === "en"
                ? "Follow the shopping journey from your first browse to the order details."
                : "اتبع خطوات التسوق من التصفح الأول حتى تفاصيل الطلب."}
            </p>
          </div>
        </div>
        <ol className="sw-docs-index-steps">
          {orderSteps.map((step, index) => (
            <li key={step.slug}>
              <Link href={`/${lang}/docs/${step.slug}`}>
                <span className="sw-docs-index-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step[lang]}</span>
                <span className="sw-docs-index-arrow" aria-hidden="true">
                  {lang === "en" ? "↗" : "↖"}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="sw-docs-index-section"
        aria-labelledby="docs-topics-title"
      >
        <div className="sw-docs-index-heading">
          <span className="sw-docs-index-label">02</span>
          <div>
            <h2 id="docs-topics-title">{copy.sectionTitle}</h2>
            <p>
              {lang === "en"
                ? "Guides are grouped here by the task you want to complete."
                : "الأدلة مرتبة هنا بحسب المهمة التي تريد إنجازها."}
            </p>
          </div>
        </div>
        <div className="sw-docs-index-grid">
          {sections.map((section, index) => (
            <div className="sw-docs-index-card" key={section.key}>
              <div className="sw-docs-index-card-top">
                <span className="sw-docs-index-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <DocsCategoryIcon category={section.key} />
              </div>
              <h3>{section[lang]}</h3>
              <p>
                {lang === "en" ? section.descriptionEn : section.descriptionAr}
              </p>
              <ul>
                {section.guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/${lang}/docs/${guide.slug}`}>
                      {guide[lang]}
                      <span aria-hidden="true">
                        {lang === "en" ? "↗" : "↖"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <aside className="sw-docs-index-note">
        <strong>
          {lang === "en"
            ? "Access and store differences"
            : "اختلاف المتاجر وصلاحية الوصول"}
        </strong>
        <p>
          {lang === "en"
            ? "Store settings and available administration actions vary by workspace and account. Check your store’s final order total before confirming."
            : "تختلف إعدادات المتجر وإجراءات الإدارة المتاحة بحسب مساحة العمل والحساب. راجع المجموع النهائي قبل تأكيد الطلب."}
        </p>
        <p>
          <Link href={`/${lang}/docs/markdown-reference`}>
            {lang === "en"
              ? "Markdown and MDX authoring reference"
              : "مرجع كتابة Markdown وMDX"}
          </Link>
        </p>
      </aside>
    </div>
  );
}
