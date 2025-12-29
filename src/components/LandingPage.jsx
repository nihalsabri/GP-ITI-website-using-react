import { useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ChatBot from './ChatBot';
import { useTranslation } from 'react-i18next'; 

export default function TradesmenLanding() {
  const { t } = useTranslation();
  const categoryScrollRef = useRef(null);
  const jobsScrollContainerRef = useRef(null);

  const categories = [
    {
      name: t('landing.categories.landscaper'), 
      icon: "/home-images/landscaper.png",
      color: "from-green-500 to-green-600",
    },
    {
      name: t('landing.categories.garages'), 
      icon: "/home-images/garage.png",
      color: "from-gray-500 to-gray-600",
    },
    {
      name: t('landing.categories.electrician'),
      icon: "/home-images/electrician.png",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: t('landing.categories.locksmith'), 
      icon: "/home-images/lock.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: t('landing.categories.plumber'), 
      icon: "/home-images/plumber.png",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: t('landing.categories.joiner'), 
      icon: "/home-images/joiner.png",
      color: "from-amber-500 to-amber-600",
    },
    {
      name: t('landing.categories.decorator'), 
      icon: "/home-images/decorator.png",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: t('landing.categories.building'), 
      icon: "/home-images/building.png",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: t('landing.categories.roofing'), 
      icon: "/home-images/roofing.png",
      color: "from-red-500 to-red-600",
    },
  ];

  const popularJobs = [
    {
      title: t('landing.popularJobs.electrician'), 
      image: "/home-images/Electrician-img.jpeg",
    },
    {
      title: t('landing.popularJobs.windows'), 
      image: "/home-images/conservatory-img.jpeg",
    },
    {
      title: t('landing.popularJobs.gas'), 
      image: "/home-images/gas-engineer-img.webp",
    },
    { 
      title: t('landing.popularJobs.tiling'), 
      image: "/home-images/Tiling.webp" 
    },
    { 
      title: t('landing.popularJobs.building'), 
      image: "/home-images/building-img.webp" 
    },
    { 
      title: t('landing.popularJobs.roofing'),
      image: "/home-images/roofing-img.webp" 
    },
  ];

  const partners = [
    "Sky's The Limit Scaffolding",
    "Purple Digital",
    "Hampshire Roofing",
    "Dreams & Monuments",
    "Conservatory",
  ];
  
  const stats = [
    { value: "4000+", label: t('landing.stats.tradespeople') },
    { value: "56", label: t('landing.stats.tradesCovered') }, 
    { value: "200+", label: t('landing.stats.websitesBuilt') }, 
    { value: "124", label: t('landing.stats.productsCovered') }, 
  ];

  const tradespeople = [
    "Aerial Installations",
    "Air Conditioning Specialist",
    "Architect/Designer",
    "Asbestos Removal",
    "Asbestos Surveyors",
    "Bathroom Fitter",
    "Driveways",
    "Drylinings",
    "EICR (Electrical)",
    "Electric Gates",
    "Paving",
    "Pest Control",
    "Plumber",
    "Plasterers",
  ];

  // ... useEffect code stays the same

  const scrollCategory = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols lg:grid-cols-3 gap-8 items-stretch">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-full transform hover:scale-[1.02] transition-transform duration-500 order-1 lg:order-2">
              <img
                src="/home-images/main.jpeg"
                alt="Modern interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gradient-to-br lg:col-span-2 bg-[#372B70] rounded-2xl py-12 md:py-24 lg:py-32 px-6 md:px-10 lg:px-12 text-white shadow-2xl flex flex-col justify-center transform transition-transform duration-500 hover:scale-[1.02] order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                {t('landing.hero.title')}
              </h1>
              <p className="text-purple-100 mb-6 sm:mb-8 text-base sm:text-lg opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
                <input
                  type="text"
                  placeholder={t('landing.hero.searchPlaceholder')} 
                  className="flex-1 px-4 py-3 rounded-3xl bg-blue-50 border border-blue-200 text-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 w-full"
                />
                <button className="bg-purple-50 hover:bg-purple-700 w-full sm:w-12 p-3 rounded-full flex justify-center items-center transform hover:scale-110 transition-all duration-300">
                  <Search className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('landing.categories.title')} 
          </h2>
          <div className="relative group">
            <button
              onClick={() => scrollCategory("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div
              ref={categoryScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
            >
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className="flex-shrink-0 flex flex-col items-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-500 min-w-[100px] sm:min-w-[120px] group/item border border-gray-100"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500 shadow-lg`}
                  >
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover/item:text-[#372b70] transition-colors duration-300 text-center">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollCategory("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('landing.popularJobs.title')} 
          </h2>
          {/* ... rest of Popular Jobs section - images stay the same */}
        </div>
      </section>

      {/* Where Peace of Mind Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 aspect-video">
              <iframe
                width="100%"
                height="329"
                src="/home-images/Tradesmen-10sec.mp4"
                title="Peace of mind"
                className="rounded-xl shadow-lg w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#372b70] mb-6">
                {t('landing.peaceMind.title')} 
              </h2>
              <p className="text-black">
                {t('landing.peaceMind.description1')} 
              </p>
              <p className="text-black">
                {t('landing.peaceMind.description2')} 
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-6">
                {t('landing.peaceMind.whyChoose')} 
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center transform hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-3xl font-bold text-[#372b70]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/home-images/roofing-img.webp",
                title: t('landing.actionCards.card1.title'),
                desc: t('landing.actionCards.card1.desc'), 
                btn: t('landing.actionCards.card1.btn'),
              },
              {
                img: "/home-images/card2.webp",
                title: t('landing.actionCards.card2.title'),
                desc: t('landing.actionCards.card2.desc'), 
                btn: t('landing.actionCards.card2.btn'), 
              },
              {
                img: "/home-images/card3.webp",
                title: t('landing.actionCards.card3.title'), 
                desc: t('landing.actionCards.card3.desc'), 
                btn: t('landing.actionCards.card3.btn'), 
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                  <button className="w-full bg-[#372b70] text-white py-3 rounded-md hover:bg-white hover:text-[#372b70] border-1 border-[#372b70] transform hover:scale-105 transition-all duration-300 rounded-xl">
                    {card.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('landing.partners.title')} 
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-16">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animation: `fadeIn 0.8s ease-out ${idx * 0.2}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="text-gray-400 font-semibold text-lg hover:text-[#372b70] transition-all duration-500 transform hover:scale-125 cursor-pointer relative">
                  {partner}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-900 group-hover:w-full transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 blur-xl transition-all duration-500 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Roofing Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                {t('landing.bestTrade.title')} 
              </h3>
              <div className="space-y-4 text-gray-700 text-lg">
                <p className="leading-relaxed text-[16px]">
                  {t('landing.bestTrade.description1')} 
                </p>
                <p className="leading-relaxed text-[16px]">
                  {t('landing.bestTrade.description2')} 
                </p>
              </div>
              <button className="bg-[#372b70] text-white px-8 py-4 rounded-lg hover:bg-purple-800 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-lg mt-6">
                {t('landing.bestTrade.btn')}
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 order-1 lg:order-2 group relative">
              <img
                src="/home-images/active-roofing-banner.webp"
                alt="Active Roofing"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-700 text-white py-3 px-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-center font-semibold">
                  {t('landing.bestTrade.banner')} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Tradespeople */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('landing.findTrades.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((col) => (
              <div key={col} className="space-y-3">
                {tradespeople
                  .slice(col * 5, (col + 1) * 5)
                  .map((trade, idx) => (
                    
                      key={idx}
                      href="#"
                      className="block text-[#372b70] hover:underline hover:translate-x-2 transition-all duration-300"
                    >
                      {trade} {t('landing.findTrades.nearMe')}
                    </a>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ChatBot />
    </div>
  );
}
