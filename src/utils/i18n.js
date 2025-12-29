import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      /* ================= COMMON ================= */
      Home: "Home",
      About: "About",
      about: "About us",
      Services: "Services",
      Contact: "Contact",
      Loading: "Loading...",
      Save: "Save",
      Cancel: "Cancel",
      Edit: "Edit",
      Close: "Close",
      loading: "Loading...",
      save: "Save",
      "Checkout": "Checkout",
      "Order Summary": "Order Summary",
      "Card Details": "Card Details",
      "Pay": "Pay",
"Processing...": "Processing...",

         label1: "Skilled tradespeople",
      label2: "Direct communication",
      label3: "High quality services",
      label4: "Secure connections",
title:"Tradespeople near you",
      tradeTitle: "Are you a tradesperson? Join our team!",
      tradeHeader:
        "We take pride in crafting a skilled team and offering you a top-notch service, by:",
      trade1: "Providing high quality services",
      trade2: "Connecting you with skilled tradespeople",
      trade3: "Delivering a secure and hassle-free experience",
      /* ================= JOBS ================= */

      jobs: {
        "electrician": "Electrician",
        "windows": "Windows, doors & conservatory",
        "gas": "Gas engineer",
        "tiling": "Tiling",
        "building": "Building",
        "roofing": "Roofing",
        "plumber": "Plumber",
        "carpentry": "Carpentry",
        "painting": "Painting & Decorating",
      },
      
      /* ================= NAVBAR ================= */
      "Login / Register": "Login / Register",
      Login: "Login",
      Register: "Register",
      Logout: "Logout",
      Account: "Account",
      Settings: "Settings",
      Tradespeople: "Tradespeople",

      /* ================= FOOTER ================= */
      footer: {
        companyName: "Tradesmen Online Ltd",
        tel: "Tel",
        email: "Email",
        navigation: "Navigation",
        moreInfo: "More info",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        terms: "Terms and conditions",
        resolving: "Resolving issues",
        follow: "Follow us on social media",
        placeholderImage: "Placeholder image",
        tagline: "Working with the best local tradespeople",
        copyright: "Copyright 2025 by Tradesmen Online Ltd",
      },

      /* ================= HOME ================= */
      header:
        "We make it easy for you to find the best tradespeople and services to work with",
      services: "How does it work?",
      services1: "Browse available services",
      services2: "Select services and add them to your order",
      services3: "Pay electronically or cash on delivery",

      "why us": "Why choose us?",
      why1: "Direct communication with tradespeople",
      why2: "High quality verified professionals",
      why3: "Secure and smooth experience",

      /* ================= TRADES ================= */
      "All Trades": "All Trades",
      Electrician: "Electrician",
      Plumber: "Plumber",
      Carpenter: "Carpenter",
      Experience: "Experience",
      Joined: "Joined",
      "No tradespeople found.": "No tradespeople found.",
  landing: {
      hero: {
        title: "Find a trusted tradesperson online",
        subtitle: "Thousands of tradespeople are waiting to help you.",
        searchPlaceholder: "Trade e.g. Plumber, Electrician",
        searchButton: "Search",
      },
      categories: {
        title: "Search by Category",
        landscaper: "Landscaper",
        garages: "Garages",
        electrician: "Electrician",
        locksmith: "Locksmith",
        plumber: "Plumber",
        joiner: "Joiner",
        decorator: "Decorator",
        building: "Building",
        roofing: "Roofing",
      },
      popularJobs: {
        title: "Popular Jobs",
        electrician: "Electrician",
        windows: "Windows, doors, conservatory",
        gas: "Gas engineer",
        tiling: "Tiling",
        building: "Building",
        roofing: "Roofing",
      },
      peaceMind: {
        title: "Where Peace of Mind Matters",
        description1: "Tradesmen Online is the easiest & safest way to find a reliable tradesperson. Giving you peace of mind knowing that you will get exactly what you expected with a great customer experience.",
        description2: "We have over four thousand tradespeople across the UK who advertise on our platform.",
        whyChoose: "Why choose us ?",
      },
      stats: {
        tradespeople: "tradespeople",
        tradesCovered: "trades covered",
        websitesBuilt: "websites built",
        productsCovered: "products covered",
      },
      actionCards: {
        card1: {
          title: "Submit a Job Enquiry",
          desc: "Tell us what you need doing and we'll put you in touch with our qualified tradespeople",
          btn: "Post an Enquiry",
        },
        card2: {
          title: "Sign up to become a tradesperson",
          desc: "If you are looking to expand your customer base, there is no better platform than Tradesmen Online.",
          btn: "Join our Tradesperson Directory",
        },
        card3: {
          title: "Tell us what you think",
          desc: "Happy with the work your tradesperson just completed? Let them know what you think.",
          btn: "Leave a review",
        },
      },
      partners: {
        title: "Our Trusted Partners",
      },
      bestTrade: {
        title: "Bringing you the best in the trade",
        description1: "Our tradespeople represent the highest standard of quality and professionalism. With exceptional workmanship, outstanding customer service, and consistently top-rated reviews, these experts have earned their place on our website",
        description2: "When you choose a tradesperson through Tradesmen Online, you're choosing peace of mind, knowing your project is in the hands of someone who delivers excellence every time",
        btn: "Find a Local Tradesperson",
        banner: "Roofing Done Right The First Time, Every Time.",
      },
      findTrades: {
        title: "Find Tradespeople",
        nearMe: "near me",
      },
    },
      /* ================= PROFILE ================= */
      profile: {
        edit: "Edit",
        editProfile: "Edit Profile",
        ordersPlaced: "orders placed",
        memberSince: "Member since",
        fullName: "Full name",
        phone: "Phone",
        address: "Address",
        profileImage: "Profile image URL",
        noAddress: "No address provided",
        updated: "Profile updated successfully",
        loadError: "Failed to load profile",
        updateError: "Failed to update profile",
      },

      /* ================= TRADESPERSON ================= */
      "Rate this tradesperson": "Rate this tradesperson",
      "Current rating": "Current rating",
      "No services available for this tradesperson.":
        "No services available for this tradesperson.",
      "Tradesperson not found.": "Tradesperson not found.",
      "Add to Order": "Add to Order",
      rating: "rating",

      years: "years",

      "Exclusive Service": "Exclusive Service",
      "Areas served": "Areas served",

      "area.sohag": "Sohag",
      "area.girga": "Girga",
      "area.tema": "Tema",
      "area.tahta": "Tahta",
      "area.akhmim": "Akhmim",
      "area.sadfa": "Sadfa",
      "area.elMaragha": "El-Maragha",

      /* ================= ORDERS ================= */
      Orders: "Orders",
      "Order Details": "Order Details",
      "View Order": "View Order",
      "Cancel Order": "Cancel Order",
      Reorder: "Reorder",
      Total: "Total",
      Status: "Status",
      Pending: "Pending",
      Completed: "Completed",
      Cancelled: "Cancelled",
      "Order not found": "Order not found",
      Service: "Service",
      Date: "Date",
      "Order canceled successfully": "Order canceled successfully",
      "Failed to cancel order": "Failed to cancel order",
      "Service added to your order": "Service added to your order",
      "My Orders": "My Orders",
      "You have no orders yet.": "You have no orders yet.",

      View: "View",

      "Services added again to order": "Services added again to order",

      /* ================= PROFILE ================= */
      Profile: "Profile",
      "Edit Profile": "Edit Profile",
      "Full Name": "Full Name",
      Phone: "Phone",
      Address: "Address",
      "Profile Image URL": "Profile Image URL",
      "Save Changes": "Save Changes",
      "Your Orders": "Your Orders",

      /* ================= AUTH ================= */
      Email: "Email",
      Password: "Password",
      "Confirm Password": "Confirm Password",
      "Sign Up": "Sign Up",
      "Welcome back": "Welcome back",
      "Create your account": "Create your account",

      "Login to your account": "Login to your account",

      "Logging in...": "Logging in...",
      "Don't have an account?": "Don't have an account?",

      "Please enter a valid email": "Please enter a valid email",
      "Please enter a valid email address":
        "Please enter a valid email address",
      "Password must be at least 8 characters":
        "Password must be at least 8 characters",

      "Logged in successfully": "Logged in successfully",
      "Invalid email address": "Invalid email address",
      "No account found for this email": "No account found for this email",
      "Wrong password": "Wrong password",
      "Login failed": "Login failed",

      "Join our platform": "Join our platform",
      "First name": "First name",
      "Last name": "Last name",

      "Street, City, Area": "Street, City, Area",

      "Repeat password": "Repeat password",

      "Signing up...": "Signing up...",
      "Already have an account?": "Already have an account?",
      "First name too short": "First name too short",
      "Last name too short": "Last name too short",
      "Invalid email": "Invalid email",
      "Password must be 8+ characters": "Password must be 8+ characters",
      "Passwords do not match": "Passwords do not match",
      "Fix form errors first": "Fix form errors first",
      "Registered successfully — please login":
        "Registered successfully — please login",
      "Email already in use": "Email already in use",
      "Registration failed": "Registration failed",
    },
  },

  ar: {
    translation: {
      /* ================= COMMON ================= */
      Home: "الرئيسية",
      About: "من نحن",
      Services: "الخدمات",
      Contact: "اتصل بنا",
      Loading: "جاري التحميل",
      Save: "حفظ",
      Cancel: "إلغاء",
      Edit: "تعديل",
      Close: "إغلاق",
      loading: "جاري التحميل...",
      save: "حفظ",
   "Checkout": "الدفع",
      "Order Summary": "ملخص الطلب",
      "Card Details": "بيانات البطاقة",
      "Pay": "دفع",
"Processing...": "جاري المعالجة...",
      /* ================= JOBS ================= */

      jobs: {
        electrician: "كهربائي",
        windows: "نوافذ وأبواب وصوب زجاجية",
        gas: "فني غاز",
        tiling: "تركيب بلاط",
        building: "أعمال بناء",
        roofing: "أعمال الأسقف",
        plumber: "سباك",
        carpentry: "نجار",
        painting: "دهانات وتشطيبات",
      },

      landing: {
      hero: {
        title: "اعثر على فني موثوق عبر الإنترنت",
        subtitle: "آلاف الفنيين ينتظرون لمساعدتك.",
        searchPlaceholder: "المهنة مثل: سباك، كهربائي",
        searchButton: "بحث",
      },
      categories: {
        title: "ابحث حسب الفئة",
        landscaper: "تنسيق حدائق",
        garages: "جراجات",
        electrician: "كهربائي",
        locksmith: "صانع أقفال",
        plumber: "سباك",
        joiner: "نجار",
        decorator: "دهان",
        building: "بناء",
        roofing: "أعمال الأسقف",
      },
      popularJobs: {
        title: "الأعمال الشائعة",
        electrician: "كهربائي",
        windows: "شبابيك وأبواب وصوب زجاجية",
        gas: "فني غاز",
        tiling: "تركيب بلاط",
        building: "أعمال بناء",
        roofing: "أعمال الأسقف",
      },
      peaceMind: {
        title: "حيث يهم راحة البال",
        description1: "تريدسمان أونلاين هي أسهل وأأمن طريقة للعثور على فني موثوق. نمنحك راحة البال بمعرفة أنك ستحصل على ما تتوقعه بالضبط مع تجربة عملاء رائعة.",
        description2: "لدينا أكثر من أربعة آلاف فني في جميع أنحاء المملكة المتحدة يعلنون على منصتنا.",
        whyChoose: "لماذا تختارنا ؟",
      },
      stats: {
        tradespeople: "فني",
        tradesCovered: "مهنة مغطاة",
        websitesBuilt: "موقع تم بناؤه",
        productsCovered: "منتج مغطى",
      },
      actionCards: {
        card1: {
          title: "قدم طلب عمل",
          desc: "أخبرنا بما تحتاجه وسنوصلك بالفنيين المؤهلين لدينا",
          btn: "انشر استفسارًا",
        },
        card2: {
          title: "سجل لتصبح فنيًا",
          desc: "إذا كنت تتطلع إلى توسيع قاعدة عملائك، فلا توجد منصة أفضل من تريدسمان أونلاين.",
          btn: "انضم إلى دليل الفنيين",
        },
        card3: {
          title: "أخبرنا برأيك",
          desc: "هل أنت راضٍ عن العمل الذي أكمله الفني؟ أخبره برأيك.",
          btn: "اترك تقييمًا",
        },
      },
      partners: {
        title: "شركاؤنا الموثوقون",
      },
      bestTrade: {
        title: "نقدم لك الأفضل في المهنة",
        description1: "يمثل فنيونا أعلى معايير الجودة والاحترافية. بفضل الحرفية الاستثنائية وخدمة العملاء المتميزة والتقييمات الممتازة باستمرار، حصل هؤلاء الخبراء على مكانهم في موقعنا",
        description2: "عندما تختار فنيًا من خلال تريدسمان أونلاين، فأنت تختار راحة البال، مع العلم أن مشروعك في أيدي شخص يقدم التميز في كل مرة",
        btn: "ابحث عن فني محلي",
        banner: "أعمال الأسقف تتم بشكل صحيح من المرة الأولى، في كل مرة.",
      },
      findTrades: {
        title: "ابحث عن الفنيين",
        nearMe: "بالقرب مني",
      },
    },
      nav: {
        home: "الرئيسية",
        directory: "الدليل",
        about: "من نحن",
        awards: "جوائز SME",
        homeowner: "صاحب منزل",
        tradesperson: "فني",
        logout: "تسجيل الخروج",
      },

      /* ================= NAVBAR ================= */
      "Login / Register": "تسجيل الدخول / إنشاء حساب",
      Login: "تسجيل الدخول",
      Register: "إنشاء حساب",
      Logout: "تسجيل الخروج",
      Account: "الحساب",
      Settings: "الإعدادات",
      Tradespeople: "الفنيين",

      /* ================= FOOTER ================= */
      footer: {
        companyName: "تريدسمان أونلاين",
        tel: "هاتف",
        email: "البريد الإلكتروني",
        navigation: "التنقل",
        moreInfo: "معلومات إضافية",
        privacy: "سياسة الخصوصية",
        cookies: "سياسة الكوكيز",
        terms: "الشروط والأحكام",
        resolving: "حل المشكلات",
        follow: "تابعنا على وسائل التواصل",
        placeholderImage: "صورة توضيحية",
        tagline: "نتعاون مع أفضل الفنيين المحليين",
        copyright: "© 2025 تريدسمان أونلاين",
      },

      /* ================= HOME ================= */
      about: "من نحن",
      header: "نُسهّل عليك العثور على أفضل الفنيين والخدمات بسهولة",
      services: "كيف تعمل المنصة؟",
      services1: "تصفح الخدمات المتاحة",
      services2: "اختر الخدمات وأضفها إلى طلبك",
      services3: "ادفع إلكترونيًا أو نقدًا",

      "why us": "لماذا تختارنا؟",
      title: "فنيين بالقرب منك",
      why1: "تواصل مباشر مع الفني",
      why2: "فنيين موثوقين وذوي خبرة",
      why3: "تجربة آمنة وسلسة",
      label1: "فنيون محترفون",
      label2: "تواصل مباشر",
      label3: "خدمة عالية الجودة",
      label4: "اتصالات موثوقة",
      tradeTitle: "هل تعمل كفني؟ لماذا تنضم لفريقنا؟",
      tradeHeader:
        "نحرص على تكوين فريق محترف ونوفر لك بيئة عمل مميزة، من خلال:",
      trade1: "إدارة ممتازة عبر المنصة لمتابعة الطلبات والتواصل مع العملاء.",
      trade2: "التحكم الكامل في مواعيد العمل المناسبة لك.",
      trade3: "التواصل مع العميل مسبقًا لمعرفة تفاصيل المشكلة قبل التنفيذ.",

      /* ================= TRADES ================= */
      "All Trades": "كل الفنيين",
      Electrician: "فني كهرباء",
      Plumber: "فني سباكة",
      Carpenter: "فني نجارة",
      Experience: "الخبرة",
      Joined: "منذ",
      "No tradespeople found.": "لا يوجد فنيين",

      /* ================= PROFILE ================= */
      profile: {
        edit: "تعديل",
        editProfile: "تعديل الملف الشخصي",
        ordersPlaced: "طلبات تم تنفيذها",
        memberSince: "عضو منذ",
        fullName: "الاسم الكامل",
        phone: "رقم الهاتف",
        address: "العنوان",
        profileImage: "رابط صورة الملف الشخصي",
        noAddress: "لم يتم إدخال عنوان",
        updated: "تم تحديث الملف الشخصي بنجاح",
        loadError: "فشل تحميل الملف الشخصي",
        updateError: "فشل تحديث الملف الشخصي",
      },

      /* ================= TRADESPERSON ================= */
      "Rate this tradesperson": "قيّم هذا الفني",
      "Current rating": "التقييم الحالي",
      "No services available for this tradesperson.":
        "لا توجد خدمات متاحة لهذا الفني",
      "Tradesperson not found.": "الفني غير موجود",
      "Add to Order": "إضافة إلى الطلب",
      rating: "تقييم",
      years: "سنوات",

      "Exclusive Service": "خدمة حصرية",
      "Areas served": "المناطق المتاحة",

      "area.sohag": "سوهاج",
      "area.girga": "جرجا",
      "area.tema": "طما",
      "area.tahta": "طهطا",
      "area.akhmim": "أخميم",
      "area.sadfa": "صدفا",
      "area.elMaragha": "المراغة",

      /* ================= ORDERS ================= */
      Orders: "الطلبات",
      "Order Details": "تفاصيل الطلب",
      "View Order": "عرض الطلب",
      "Cancel Order": "إلغاء الطلب",
      Reorder: "إعادة الطلب",
      Total: "الإجمالي",
      Status: "الحالة",
      Pending: "قيد التنفيذ",
      Completed: "مكتمل",
      Cancelled: "ملغي",

      "Order not found": "الطلب غير موجود",
      Service: "الخدمة",
      Date: "التاريخ",

      "Order canceled successfully": "تم إلغاء الطلب بنجاح",
      "Failed to cancel order": "فشل في إلغاء الطلب",
      "Service added to your order": "تمت إضافة الخدمة إلى طلبك",
      "My Orders": "طلباتي",
      "You have no orders yet.": "لا يوجد لديك طلبات بعد",

      View: "عرض",

      "Services added again to order": "تمت إضافة الخدمات مرة أخرى إلى الطلب",

      /* ================= PROFILE ================= */
      Profile: "الملف الشخصي",
      "Edit Profile": "تعديل الملف الشخصي",
      "Full Name": "الاسم بالكامل",
      Phone: "رقم الهاتف",
      Address: "العنوان",
      "Profile Image URL": "رابط صورة الملف الشخصي",
      "Save Changes": "حفظ التعديلات",
      "Your Orders": "طلباتك",

      /* ================= AUTH ================= */
      Email: "البريد الإلكتروني",
      Password: "كلمة المرور",
      "Confirm Password": "تأكيد كلمة المرور",
      "Sign Up": "إنشاء حساب",
      "Welcome back": "مرحبًا بعودتك",
      "Create your account": "إنشاء حساب جديد",

      "Login to your account": "تسجيل الدخول إلى حسابك",

      "Logging in...": "جاري تسجيل الدخول...",
      "Don't have an account?": "ليس لديك حساب؟",

      "Please enter a valid email": "من فضلك أدخل بريدًا إلكترونيًا صحيحًا",
      "Please enter a valid email address":
        "من فضلك أدخل عنوان بريد إلكتروني صحيح",
      "Password must be at least 8 characters":
        "كلمة المرور يجب ألا تقل عن 8 أحرف",

      "Logged in successfully": "تم تسجيل الدخول بنجاح",
      "Invalid email address": "عنوان البريد الإلكتروني غير صحيح",
      "No account found for this email":
        "لا يوجد حساب مرتبط بهذا البريد الإلكتروني",
      "Wrong password": "كلمة المرور غير صحيحة",
      "Login failed": "فشل تسجيل الدخول",

      "Join our platform": "انضم إلى منصتنا",
      "First name": "الاسم الأول",
      "Last name": "اسم العائلة",

      "Street, City, Area": "الشارع، المدينة، المنطقة",

      "Repeat password": "إعادة كلمة المرور",

      "Signing up...": "جاري إنشاء الحساب...",
      "Already have an account?": "لديك حساب بالفعل؟",
      "First name too short": "الاسم الأول قصير جدًا",
      "Last name too short": "اسم العائلة قصير جدًا",
      "Invalid email": "بريد إلكتروني غير صالح",
      "Password must be 8+ characters":
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      "Passwords do not match": "كلمتا المرور غير متطابقتين",
      "Fix form errors first": "يرجى تصحيح أخطاء النموذج أولاً",
      "Registered successfully — please login":
        "تم إنشاء الحساب بنجاح — يرجى تسجيل الدخول",
      "Email already in use": "البريد الإلكتروني مستخدم بالفعل",
      "Registration failed": "فشل إنشاء الحساب",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;
