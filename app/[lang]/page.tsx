import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeSearch } from "./HomeSearch";
import { homeCopy, sections, type Locale } from "@/lib/home-content";

type PageProps = { readonly params: Promise<{ readonly lang: string }> };

function SectionIcon({ name }: { readonly name: string }) {
  const paths: Record<string, string> = {
    start: "M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM4 21v-2a8 8 0 0 1 16 0v2",
    discover: "M3 8h18l-2-5H5L3 8Zm1 0v13h16V8M9 21v-8h6v8",
    products: "M3 5h18v16H3V5Zm0 4h18M8 2v6m8-6v6",
    checkout: "M3 4h2l2 12h12l2-9H6m3 14h.01M18 21h.01",
    orders: "M5 3h14v18H5V3Zm4 5h6m-6 4h6m-6 4h4",
    addresses:
      "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-3-12a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01",
    manage: "M4 21V7l8-4 8 4v14H4Zm4-10h2m4 0h2M8 15h2m4 0h2",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function StoryLink({
  href,
  children,
}: {
  readonly href: string;
  readonly children: React.ReactNode;
}) {
  return (
    <Link className="sw-story-link" href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default async function HomePage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang: Locale = rawLang;
  const copy = homeCopy[lang];
  const ar = lang === "ar";
  const journey = ar
    ? ["تصفح المتاجر", "اختر منتجًا", "راجع السلة", "تابع الطلب"]
    : [
        "Browse stores",
        "Choose a product",
        "Review your cart",
        "Follow the order",
      ];
  const journeySlugs = [
    "shopping/shops",
    "shopping/product",
    "shopping/cart",
    "account/orders",
  ];

  return (
    <main className="sw-home">
      <section className="sw-hero" aria-labelledby="home-title">
        <div className="sw-container sw-hero-inner">
          <div className="sw-hero-copy">
            <p className="sw-eyebrow">{copy.eyebrow}</p>
            <h1 id="home-title">{copy.title}</h1>
            <p className="sw-intro">{copy.intro}</p>
            <HomeSearch lang={lang} />
            <div className="sw-hero-actions">
              <Link
                className="sw-button sw-button-primary"
                href={`/${lang}/docs`}
              >
                {copy.browse}
                <span aria-hidden="true">↗</span>
              </Link>
              <a className="sw-button sw-button-text" href="#guide-library">
                {copy.journey}
              </a>
            </div>
          </div>
          <div className="sw-hero-art" aria-hidden="true">
            <span className="sw-hero-art-label">Saleswise365</span>
            <span className="sw-hero-art-line sw-hero-art-line-one" />
            <span className="sw-hero-art-line sw-hero-art-line-two" />
            <span className="sw-hero-art-node sw-hero-art-node-one">01</span>
            <span className="sw-hero-art-node sw-hero-art-node-two">02</span>
            <span className="sw-hero-art-node sw-hero-art-node-three">03</span>
            <span className="sw-hero-art-word">
              {ar ? "تسوق · اطلب · تابع" : "Browse · order · follow"}
            </span>
          </div>
        </div>
      </section>

      <section className="sw-band sw-path" aria-labelledby="path-title">
        <div className="sw-container">
          <div className="sw-band-heading">
            <p className="sw-kicker">01 / {ar ? "ابدأ هنا" : "START HERE"}</p>
            <h2 id="path-title">
              {ar
                ? "من أول زيارة إلى طلبك الأول"
                : "From your first visit to your first order"}
            </h2>
            <p>
              {ar
                ? "اتبع هذه الخطوات إذا كنت جديدًا على المتجر."
                : "Follow these guides if you are new to the storefront."}
            </p>
          </div>
          <ol className="sw-path-list">
            {journey.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link href={`/${lang}/docs/${journeySlugs[index]}`}>
                  {step}
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="sw-band sw-library"
        id="guide-library"
        aria-labelledby="library-title"
      >
        <div className="sw-container">
          <div className="sw-band-heading">
            <p className="sw-kicker">02 / {ar ? "الأدلة" : "GUIDE LIBRARY"}</p>
            <h2 id="library-title">{copy.sectionTitle}</h2>
            <p>
              {ar
                ? "أدلة التسوق وإدارة المتجر مرتبة حسب الموضوع. اختر الدليل الذي تحتاجه مباشرة."
                : "Shopping and administration guides, grouped by topic. Open the guide you need."}
            </p>
          </div>
          <div className="sw-topic-grid">
            {sections.map((topic) => (
              <article className="sw-topic" key={topic.key}>
                <div className="sw-topic-icon">
                  <SectionIcon name={topic.key} />
                </div>
                <div className="sw-topic-text">
                  <h3>{topic[lang]}</h3>
                  <p>{ar ? topic.descriptionAr : topic.descriptionEn}</p>
                </div>
                <ul>
                  {topic.guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link href={`/${lang}/docs/${guide.slug}`}>
                        {guide[lang]}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sw-band sw-story" aria-labelledby="browse-title">
        <div className="sw-container sw-story-inner">
          <div className="sw-story-copy">
            <p className="sw-kicker">03 / {ar ? "اكتشف" : "DISCOVER"}</p>
            <h2 id="browse-title">
              {ar
                ? "اعثر على المتجر والمنتج المناسبين"
                : "Find the right shop and product"}
            </h2>
            <p>
              {ar
                ? "تصفح المتاجر والتصنيفات أو ابحث مباشرة. تساعدك أدلة التصفح على فهم ما يظهر في النتائج."
                : "Browse shops and categories, or search directly. These guides explain the storefront and its results."}
            </p>
            <div className="sw-story-links">
              <StoryLink href={`/${lang}/docs/shopping/shops`}>
                {ar ? "استكشاف المتاجر" : "Explore shops"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/shopping/search`}>
                {ar ? "البحث والتصفية" : "Search and filter"}
              </StoryLink>
            </div>
          </div>
          <figure className="sw-story-image">
            <Image
              src={
                ar ? "/images/mart-home-ar.webp" : "/images/mart-home-en.webp"
              }
              alt={
                ar
                  ? "واجهة متجر وتد مارت التجريبي"
                  : "WatadMart test storefront"
              }
              width={1600}
              height={900}
              loading="eager"
              unoptimized
            />
            <figcaption>
              {ar
                ? "واجهة متجر تجريبي؛ تختلف المنتجات بحسب المتجر."
                : "Test storefront; products vary by store."}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="sw-band sw-story sw-story-reverse"
        aria-labelledby="checkout-title"
      >
        <div className="sw-container sw-story-inner">
          <div className="sw-story-copy">
            <p className="sw-kicker">
              04 / {ar ? "أكّد طلبك" : "PLACE AN ORDER"}
            </p>
            <h2 id="checkout-title">
              {ar
                ? "راجع التفاصيل قبل التأكيد"
                : "Review the details before you confirm"}
            </h2>
            <p>
              {ar
                ? "توضح أدلة السلة وإتمام الطلب كيف تختار عنوان التسليم وتراجع الرسوم والمجموع النهائي."
                : "The cart and checkout guides cover your delivery address, charges, and final total."}
            </p>
            <div className="sw-story-links">
              <StoryLink href={`/${lang}/docs/shopping/cart`}>
                {ar ? "مراجعة السلة" : "Review the cart"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/shopping/checkout`}>
                {ar ? "إتمام الطلب" : "Place an order"}
              </StoryLink>
            </div>
          </div>
          <figure className="sw-story-image">
            <Image
              src="/images/mart-checkout-en.webp"
              alt={ar ? "مثال على شاشة إتمام الطلب" : "Example checkout screen"}
              width={1600}
              height={900}
              loading="eager"
              unoptimized
            />
            <figcaption>
              {ar
                ? "مثال من متجر وتد مارت التجريبي."
                : "Example from the WatadMart test store."}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sw-band sw-story" aria-labelledby="orders-title">
        <div className="sw-container sw-story-inner">
          <div className="sw-story-copy">
            <p className="sw-kicker">
              05 / {ar ? "بعد الطلب" : "AFTER CHECKOUT"}
            </p>
            <h2 id="orders-title">
              {ar ? "تابع طلبك من حسابك" : "Keep track of your order"}
            </h2>
            <p>
              {ar
                ? "افتح سجل الطلبات لعرض التأكيد والتفاصيل. تتوفر التقييمات عندما يكون الطلب مؤهلًا لها."
                : "Open your order history for confirmation and details. Reviews appear when an order is eligible."}
            </p>
            <div className="sw-story-links">
              <StoryLink href={`/${lang}/docs/account/orders`}>
                {ar ? "العثور على الطلبات" : "Find your orders"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/account/order-details`}>
                {ar ? "عرض التفاصيل" : "View order details"}
              </StoryLink>
            </div>
          </div>
          <figure className="sw-story-image">
            <Image
              src="/images/mart-orders-en.webp"
              alt={ar ? "مثال على سجل الطلبات" : "Example order history"}
              width={1600}
              height={900}
              loading="eager"
              unoptimized
            />
            <figcaption>
              {ar ? "مثال من حساب تجريبي." : "Example from a test account."}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="sw-band sw-account-help-row"
        aria-labelledby="help-title"
      >
        <div className="sw-container">
          <div className="sw-band-heading">
            <p className="sw-kicker">
              06 / {ar ? "حسابك والمساعدة" : "ACCOUNT & HELP"}
            </p>
            <h2 id="help-title">
              {ar
                ? "جهّز حسابك واعثر على المساعدة"
                : "Keep your account ready. Find help when you need it."}
            </h2>
            <p>
              {ar
                ? "أدر عناوينك ومنتجاتك المحفوظة، واقرأ معلومات الدعم وسياسة المتجر."
                : "Manage addresses and saved products, then find support and store policies."}
            </p>
          </div>
          <div className="sw-support-grid">
            <div className="sw-support-panel">
              <h3>{ar ? "حسابك" : "Your account"}</h3>
              <StoryLink href={`/${lang}/docs/account/account`}>
                {ar ? "إدارة الحساب" : "Manage your account"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/account/addresses`}>
                {ar ? "إدارة العناوين" : "Manage addresses"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/account/wishlist`}>
                {ar ? "قائمة الرغبات" : "Use your wish list"}
              </StoryLink>
            </div>
            <div className="sw-support-panel">
              <h3>{ar ? "المساعدة والسياسات" : "Help and policies"}</h3>
              <StoryLink href={`/${lang}/docs/support/help`}>
                {ar ? "مركز المساعدة" : "Help center"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/support/returns`}>
                {ar ? "الإرجاع والاسترداد" : "Returns and refunds"}
              </StoryLink>
              <StoryLink href={`/${lang}/docs/support/policies`}>
                {ar ? "سياسات المتجر" : "Store policies"}
              </StoryLink>
            </div>
          </div>
        </div>
      </section>

      <section className="sw-band sw-final-row" aria-labelledby="final-title">
        <div className="sw-container sw-final-inner">
          <div>
            <p className="sw-kicker">
              07 / {ar ? "الخطوة التالية" : "NEXT STEP"}
            </p>
            <h2 id="final-title">
              {ar ? "هل ما زلت تحتاج إلى مساعدة؟" : "Still need a hand?"}
            </h2>
            <p>
              {ar
                ? "استخدم دليل التواصل للوصول إلى قنوات الدعم المناسبة، أو اطلع على دليل طلبات الشراء بالجملة."
                : "Find the right support channel, or see how to ask about a larger purchase."}
            </p>
          </div>
          <div className="sw-final-actions">
            <Link
              className="sw-button sw-button-light"
              href={`/${lang}/docs/support/contact`}
            >
              {ar ? "التواصل مع الدعم" : "Contact support"}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="sw-button sw-button-outline"
              href={`/${lang}/docs/support/bulk-purchases`}
            >
              {ar ? "الشراء بالجملة" : "Bulk purchases"}
            </Link>
          </div>
        </div>
      </section>
      <footer className="sw-footer">
        <div className="sw-container">
          <span>© Saleswise365</span>
          <span>{copy.footer}</span>
        </div>
      </footer>
    </main>
  );
}
