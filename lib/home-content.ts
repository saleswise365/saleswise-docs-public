export type Locale = "en" | "ar";

type Guide = { slug: string; en: string; ar: string };
type Section = {
  key: string;
  en: string;
  ar: string;
  descriptionEn: string;
  descriptionAr: string;
  guides: Guide[];
};

export const sections: Section[] = [
  {
    key: "start",
    en: "Get started",
    ar: "البدء",
    descriptionEn: "Create an account and get back in when you need to.",
    descriptionAr: "أنشئ حسابًا وادخل إليه عند الحاجة.",
    guides: [
      {
        slug: "account",
        en: "Account and orders overview",
        ar: "نظرة عامة على الحساب والطلبات",
      },
      { slug: "account/sign-up", en: "Create an account", ar: "إنشاء حساب" },
      {
        slug: "account/account",
        en: "Sign in and manage your account",
        ar: "تسجيل الدخول وإدارة الحساب",
      },
      {
        slug: "account/password",
        en: "Reset your password",
        ar: "إعادة تعيين كلمة المرور",
      },
    ],
  },
  {
    key: "discover",
    en: "Browse stores",
    ar: "تصفح المتاجر",
    descriptionEn: "Explore shops, categories, and search results.",
    descriptionAr: "استكشف المتاجر والتصنيفات ونتائج البحث.",
    guides: [
      {
        slug: "shopping",
        en: "Shopping overview",
        ar: "نظرة عامة على التسوق",
      },
      {
        slug: "shopping/browse",
        en: "Browse the storefront",
        ar: "تصفح واجهة المتجر",
      },
      {
        slug: "shopping/categories",
        en: "Explore categories",
        ar: "استكشاف التصنيفات",
      },
      { slug: "shopping/shops", en: "Explore shops", ar: "استكشاف المتاجر" },
      {
        slug: "shopping/search",
        en: "Search and filter products",
        ar: "البحث عن المنتجات وتصفيتها",
      },
    ],
  },
  {
    key: "products",
    en: "Products & saved items",
    ar: "المنتجات والمفضلة",
    descriptionEn: "Read product details and keep a wish list.",
    descriptionAr: "اطلع على تفاصيل المنتجات واحفظ ما يعجبك.",
    guides: [
      { slug: "shopping/product", en: "Choose a product", ar: "اختيار منتج" },
      {
        slug: "account/wishlist",
        en: "Use your wish list",
        ar: "استخدام قائمة الرغبات",
      },
    ],
  },
  {
    key: "checkout",
    en: "Cart & checkout",
    ar: "السلة وإتمام الطلب",
    descriptionEn: "Check your cart, delivery, and total before ordering.",
    descriptionAr: "راجع السلة والتوصيل والمجموع قبل تأكيد الطلب.",
    guides: [
      { slug: "shopping/cart", en: "Review your cart", ar: "مراجعة السلة" },
      { slug: "shopping/checkout", en: "Place an order", ar: "إنشاء طلب" },
    ],
  },
  {
    key: "orders",
    en: "Orders & reviews",
    ar: "الطلبات والتقييمات",
    descriptionEn: "Follow an order and learn when reviews are available.",
    descriptionAr: "تابع طلبك وتعرّف على شروط التقييم.",
    guides: [
      {
        slug: "account/orders",
        en: "Find your orders",
        ar: "العثور على طلباتك",
      },
      {
        slug: "account/order-details",
        en: "View order details",
        ar: "عرض تفاصيل الطلب",
      },
      {
        slug: "account/reviews",
        en: "Review an ordered product",
        ar: "تقييم منتج من طلب",
      },
    ],
  },
  {
    key: "addresses",
    en: "Addresses & profile",
    ar: "العناوين والملف الشخصي",
    descriptionEn: "Keep your delivery details ready for checkout.",
    descriptionAr: "جهّز بيانات التوصيل قبل إتمام الطلب.",
    guides: [
      {
        slug: "account/addresses",
        en: "Manage addresses",
        ar: "إدارة العناوين",
      },
      {
        slug: "account/addresses-wishlist",
        en: "Addresses and wish list overview",
        ar: "نظرة عامة على العناوين والرغبات",
      },
    ],
  },
  {
    key: "help",
    en: "Help & returns",
    ar: "المساعدة والإرجاع",
    descriptionEn: "Find support and understand return information.",
    descriptionAr: "تواصل مع الدعم واطلع على معلومات الإرجاع.",
    guides: [
      {
        slug: "support",
        en: "Help overview",
        ar: "نظرة عامة على المساعدة",
      },
      { slug: "support/help", en: "Help center", ar: "مركز المساعدة" },
      {
        slug: "support/contact",
        en: "Contact support",
        ar: "التواصل مع الدعم",
      },
      {
        slug: "support/returns",
        en: "Returns and refunds",
        ar: "الإرجاع والاسترداد",
      },
      {
        slug: "support/policies",
        en: "Read store policies",
        ar: "قراءة سياسات المتجر",
      },
      {
        slug: "support/bulk-purchases",
        en: "Request a bulk purchase",
        ar: "طلب شراء بالجملة",
      },
    ],
  },
  {
    key: "manage",
    en: "Store & Admin guides",
    ar: "أدلة المتجر والإدارة",
    descriptionEn: "Find guides for tenant workspaces and Saleswise Admin.",
    descriptionAr: "أدلة لمساحات عمل المستأجرين وإدارة سيلزوايز.",
    guides: [
      {
        slug: "tenant",
        en: "Store administration overview",
        ar: "نظرة عامة على إدارة المتجر",
      },
      {
        slug: "tenant/view-shops",
        en: "View shops",
        ar: "عرض المتاجر",
      },
      {
        slug: "platform",
        en: "Saleswise Admin overview",
        ar: "نظرة عامة على إدارة سيلزوايز",
      },
      {
        slug: "platform/find-client",
        en: "Find a client",
        ar: "العثور على عميل",
      },
    ],
  },
];

export const homeCopy = {
  en: {
    navHome: "Help center",
    navGuides: "All guides",
    navSearch: "Search",
    navSupport: "Support",
    navProduct: "Saleswise site",
    eyebrow: "SALESWISE365 HELP CENTER",
    title: "Find the guide for your Saleswise task.",
    intro:
      "Guides for shopping, store administration, and Saleswise Admin. Choose a topic below or follow the shopping journey from start to finish.",
    browse: "Browse all guides",
    journey: "Start with shopping",
    sectionTitle: "Browse by topic",
    footer:
      "Guides for Saleswise shoppers and teams. Available app features depend on your workspace and account.",
  },
  ar: {
    navHome: "مركز المساعدة",
    navGuides: "جميع الأدلة",
    navSearch: "بحث",
    navSupport: "الدعم",
    navProduct: "موقع سيلزوايز",
    eyebrow: "مركز مساعدة SALESWISE365",
    title: "اعثر على دليل لمهمتك في سيلزوايز.",
    intro:
      "أدلة للتسوق وإدارة المتجر وتطبيق إدارة سيلزوايز. اختر موضوعًا أدناه أو تابع رحلة التسوق من البداية إلى النهاية.",
    browse: "تصفح جميع الأدلة",
    journey: "ابدأ بالتسوق",
    sectionTitle: "تصفح حسب الموضوع",
    footer:
      "أدلة للمتسوقين وفرق سيلزوايز. تعتمد ميزات التطبيق المتاحة على مساحة العمل والحساب.",
  },
} as const;
