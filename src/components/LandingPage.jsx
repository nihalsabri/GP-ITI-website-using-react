// src/pages/LandingPage.jsx
import { useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import JobCard from "../components/JobCard-LandingPage";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  const categoryRef = useRef(null);
  const jobsRef = useRef(null);

  /* ================= CATEGORIES ================= */
  const categories = [
    {
      key: "electrician",
      icon: "/home-images/electrician.png",
      color: "bg-yellow-500",
    },
    { key: "plumber", icon: "/home-images/plumber.png", color: "bg-cyan-500" },
    {
      key: "carpenter",
      icon: "/home-images/joiner.png",
      color: "bg-amber-500",
    },
    { key: "locksmith", icon: "/home-images/lock.png", color: "bg-blue-500" },
    {
      key: "decorator",
      icon: "/home-images/decorator.png",
      color: "bg-pink-500",
    },
    { key: "roofing", icon: "/home-images/roofing.png", color: "bg-red-500" },
    {
      key: "building",
      icon: "/home-images/building.png",
      color: "bg-orange-500",
    },
    { key: "garages", icon: "/home-images/garage.png", color: "bg-gray-500" },
    {
      key: "landscaper",
      icon: "/home-images/landscaper.png",
      color: "bg-green-500",
    },
  ];

  /* ================= POPULAR JOBS ================= */
  const jobs = [
    { key: "electrician", image: "/home-images/Electrician-img.jpeg" },
    { key: "windows", image: "/home-images/conservatory-img.jpeg" },
    { key: "gas", image: "/home-images/gas-engineer-img.webp" },
    { key: "tiling", image: "/home-images/Tiling.webp" },
    { key: "building", image: "/home-images/building-img.webp" },
    { key: "roofing", image: "/home-images/roofing-img.webp" },
  ];

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const el = jobsRef.current;
    if (!el) return;

    let raf;
    const scroll = () => {
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      raf = requestAnimationFrame(scroll);
    };

    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className="bg-white">
      {/* ================= HERO ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/home-images/main.jpeg"
            className="rounded-2xl shadow-xl w-full h-[320px] object-cover"
            alt="hero"
          />

          <div className="bg-[#372b70] rounded-2xl p-10 text-white">
            <h1 className="text-4xl font-bold mb-4">
              {t("landing.hero.title")}
            </h1>
            <p className="text-purple-200 mb-6">{t("landing.hero.subtitle")}</p>

            <div className="flex gap-3">
              <input
                placeholder={t("landing.hero.searchPlaceholder")}
                className="flex-1 px-4 py-3 rounded-full text-black"
              />
              <button className="bg-white p-3 rounded-full">
                <Search className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("landing.categories.title")}
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={() =>
              categoryRef.current.scrollBy({ left: -300, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft />
          </button>

          <div ref={categoryRef} className="flex gap-6 overflow-x-auto px-12">
            {categories.map((c) => (
              <div
                key={c.key}
                className="min-w-[110px] text-center flex-shrink-0"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-full ${c.color} flex items-center justify-center`}
                >
                  <img src={c.icon} className="w-8 h-8" />
                </div>
                <p className="mt-2 font-semibold">
                  {t(`landing.categories.${c.key}`)}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              categoryRef.current.scrollBy({ left: 300, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* ================= POPULAR JOBS ================= */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("landing.popular.title")}
        </h2>

        <div ref={jobsRef} className="flex gap-6 overflow-x-auto px-10">
          {[...jobs, ...jobs].map((job, i) => (
            <JobCard
              key={i}
              job={{ ...job, title: t(`landing.jobs.${job.key}`) }}
              className="w-[260px] h-[360px] flex-shrink-0"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
