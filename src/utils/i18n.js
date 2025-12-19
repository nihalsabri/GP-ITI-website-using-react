import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


const resources = {
  en: {
    translation: {
      "Home": "Home",
      "About": "About",
      "Services": "Services",
      "Contact": "Contact",
      "Login": "Login",
      "Register": "Register",
      "Tradespeople": "Tradespeople",
      "Login / Register": "Login / Register",
      "Account": "Account",
      "Settings": "Settings",
      "Logout": "Logout",
      "All Trades" :"All Trades",
      "Electrician" :"Electrician",
      "Plumber" :"Plumber",
      "Carpenter" :"Carpenter",
      "No tradespeople found.": "No tradespeople found.",
      "Joined": "Joined",
"Experience" :"Experience",
"Add to Order":"Add to Order",
"No services available for this tradesperson.": "No services available for this tradesperson.",
"Rate this tradesperson":"Rate this tradesperson",
"Tradesperson not found.": " Tradesperson not found.",
"Loading...": "Loading...",
 "about": "About us",
      "header":"We make it easy for you to find the best tradespeople and services to work with, step by step, we provide you with a smooth and secure experience from the beginning to the end",
      "services":"How does it work?",
      "services1":"Browse available services and find out what is under each service",
      "services2":"Select the services you need and add them to your order",
      "services3":"Pay for the service electronically or cash on delivery",
      "label1":"Professionals",
      "label2":"Direct communication",
      "label3":"High quality service",
      "label4":"Secure connections",
      "title":"Tradespeople near you",
      "why us": "Why choose us ?",
      "why1": "We make it easy for you to choose the tradesperson you want to work with and communicate with them directly.",
      "why2": "We guarantee high quality service and a secure connection between you and the tradesperson.",
      "why3": "We provide you with a smooth and secure experience from the beginning to the end of the service.",
"tradeTitle":"Are you a tradesperson ? Why join our team ?",
"tradeHeader":"We guarantee high quality service and a secure connection between you and the tradesperson.",
"trade1":"We provide you with a smooth and secure experience from the beginning to the end of the service.",
"trade2":"We make it easy for you to choose the tradesperson you want to work with and communicate with them directly.",
"trade3":"We guarantee high quality service and a secure connection between you and the tradesperson.",


     

    }
  },
  ar: {
    translation: {
  "About": "من نحن",
      "Home": "الرئيسية",
      "Services": "خدماتنا",
      "Contact": "اتصل بنا",
      "Login": "تسجيل الدخول",
      "Register": "انشاء حساب",
 "Tradespeople":" الفنيين",
      "Login / Register": " تسجيل الدخول / انشاء حساب",
      "Account": "الحساب",
      "Settings": "الاعدادات",
      "Logout": "تسجيل الخروج",
      "All Trades" :"كل الفنيين",
      "Electrician" :"فنى كهرباء",
      "Plumber" :"فنى سباكة",
      "Carpenter" :"فنى نجارة",
      "No tradespeople found.": "لا يوجد فنيين",
      "Joined": "منذ",
"Experience" :"الخبرة",
"Add to Order":"اضافة الى الطلب",
"No services available for this tradesperson.": "لا يوجد خدمات متاحة لهذا الفني",
"Rate this tradesperson":"تقييم هذا الفني",
"Tradesperson not found.": "لا يوجد فني",
"Loading...": "جاري التحميل ..",
"Current rating": "التقييم الحالي",
"header":"المنصة تسهل عليك العثور على أفضل الحرفيين والمقاولين تصفح الخدمات وأختر الفنى الذى ترغب فى العمل معه          خطوة بخطوة، نضمن لك تجربة سلسة وآمنة من البداية إلى النهاية",
"services":"كيف تستفيد من خدمتنا",
"services1":"تصفح الخدمات المتاحة وما يندرج تحت كل خدمة ",
"services2":"تستطيع تصفح أي حرفي  تريد التعامل معه والتواصل معه مباشرةأو عن طريق الفورم.",
"services3":"تستطيع الدفع مقابل الخدمة إلكتروني او كاش عند مقابلة الفنى" 
,"label1":"فنيين محترفين",
"label2":"تواصل مباشر",
"label3":"خدمة عالية الجودة",
"label4":"اتصالات موثوقة",  
"title":"فني عندك",
"about":"من نحن",
"why us": "لماذا تستخدم منصتنا ؟", 
"why1":"مجانية الاستخدام وتتيح لك اختيار الفنى الذي تريد استخدامه والتواصل معه مباشرة.",
"why2": "لماذا تضيع الوقت في البحث على الإنترنت والبحث عن فنى عندما يحتوي دليلنا عبر الإنترنت على جميع المعلومات التي تحتاجها عند البحث عن الحرفي المناسب؟",
"why3":"يتم التحقق من الحرفيين من قبلنا، ويجب عليهم تقديم عنوان صالح، عنوان بريد إلكتروني، رقم هاتف وتأمين المسؤولية العامة. يُطلب من مهندسي الغاز والكهرباء تقديم دليل على مؤهلاتهم قبل قبول أي وظائف.",
"tradeTitle":"تعمل كفنى ؟ لماذا تنضم لفريقنا؟",
"tradeHeader":" نحرص علي تكوين فريق ماهر ومحترف ونهتم بإحترافية الفريق , نوفر لك :",
"trade1":"1- نوفر إدارة ممتازة من خلال تطبيقنا لمتابعة كافة الطلبات والتواصل مع العملاء",
"trade2":"2- يمكنك اختيار توقيت العمل المانسب لك",
"trade3":"3- يمكنك التواصل مع العميل قبل الذهاب إلية ومعرفة مستوى المشكلة"

}
  }
};

i18n

  .use(initReactI18next) 
  .init({
     resources,
    fallbackLng: 'ar',
    supportedLngs: ["en", "ar"],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    
    interpolation: {
      escapeValue: false
    },
    

    debug: false,
    

    react: {
      useSuspense: true, 
      bindI18n: 'languageChanged',
      bindI18nStore: ''
    }
  });
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});
  export default i18n;