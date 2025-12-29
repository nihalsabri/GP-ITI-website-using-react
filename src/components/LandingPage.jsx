import { useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ChatBot from './ChatBot'; 
export default function TradesmenLanding() {
  const categoryScrollRef = useRef(null);
  const jobsScrollContainerRef = useRef(null);

  const categories = [
    {
      name: "Landscaper",
      icon: "/home-images/landscaper.png",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Garages",
      icon: "/home-images/garage.png",
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Electrician",
      icon: "/home-images/electrician.png",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Locksmith",
      icon: "/home-images/lock.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Plumber",
      icon: "/home-images/plumber.png",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "Joiner",
      icon: "/home-images/joiner.png",
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Decorator",
      icon: "/home-images/decorator.png",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Building",
      icon: "/home-images/building.png",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Roofing",
      icon: "/home-images/roofing.png",
      color: "from-red-500 to-red-600",
    },
  ];

  const popularJobs = [
    {
      title: "Electrician",
      image: "/public/home-images/Electrician-img.jpeg",
    },
    {
      title: "Windows, doors, conservatory",
      image: "/home-images/conservatory-img.jpeg",
    },
    {
      title: "Gas engineer",
      image: "/home-images/gas-engineer-img.webp",
    },
    { title: "Tiling", image: "/home-images/Tiling.webp" },
    { title: "Building", image: "/home-images/building-img.webp" },
    { title: "Roofing", image: "/home-images/roofing-img.webp" },
  ];

  const partners = [
    "Sky's The Limit Scaffolding",
    "Purple Digital",
    "Hampshire Roofing",
    "Dreams & Monuments",
    "Conservatory",
  ];
  const stats = [
    { value: "4000+", label: "tradespeople" },
    { value: "56", label: "trades covered" },
    { value: "200+", label: "websites built" },
    { value: "124", label: "products covered" },
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

  useEffect(() => {
    const container = jobsScrollContainerRef.current;
    if (!container) return;

    let isPaused = false;
    let animationId = null;
    let scrollSpeed = 0.5; // سرعة السكرول

    const smoothScroll = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(smoothScroll);
        return;
      }

      container.scrollLeft += scrollSpeed;

      // عند الوصول للنصف، نرجع للبداية بدون animation
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const halfWidth = (scrollWidth - clientWidth) / 2;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);

    const stopAutoScroll = () => (isPaused = true);
    const resumeAutoScroll = () => (isPaused = false);

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", resumeAutoScroll);
    container.addEventListener("touchstart", stopAutoScroll);
    container.addEventListener("touchend", resumeAutoScroll);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", resumeAutoScroll);
      container.removeEventListener("touchstart", stopAutoScroll);
      container.removeEventListener("touchend", resumeAutoScroll);
    };
  }, []);

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
                Find a trusted tradesperson online
              </h1>
              <p className="text-purple-100 mb-6 sm:mb-8 text-base sm:text-lg opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
                Thousands of tradespeople are waiting to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
                <input
                  type="text"
                  placeholder="Trade e.g. Plumber, Electrician"
                  className="flex-1 px-4 py-3 rounded-3xl bg-blue-50 border border-blue-200 text-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 w-full"
                />
                {/* <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 px-4 py-3 rounded-3xl bg-blue-50 border border-blue-200 text-gray-900 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-300 w-full"
                /> */}
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
            Search by Category
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
            Popular Jobs
          </h2>
          <div className="relative">
            <div className="absolute right-0 top-0 bottom-4 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10 hidden md:block" />
            <div
              ref={jobsScrollContainerRef}
              className="overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-4 w-max">
                {/* المجموعة الأصلية */}
                <div className="w-[280px] h-[384px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={popularJobs[0].image}
                    alt={popularJobs[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl drop-shadow-lg">
                      {popularJobs[0].title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[3].image}
                      alt={popularJobs[3].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[3].title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[1].image}
                      alt={popularJobs[1].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[1].title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-[280px] h-[384px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={popularJobs[5].image}
                    alt={popularJobs[5].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl drop-shadow-lg">
                      {popularJobs[5].title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[4].image}
                      alt={popularJobs[4].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[4].title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[2].image}
                      alt={popularJobs[2].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[2].title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* نسخة مكررة للـ infinite loop */}
                <div className="w-[280px] h-[384px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={popularJobs[0].image}
                    alt={popularJobs[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl drop-shadow-lg">
                      {popularJobs[0].title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[3].image}
                      alt={popularJobs[3].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[3].title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[1].image}
                      alt={popularJobs[1].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[1].title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-[280px] h-[384px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={popularJobs[5].image}
                    alt={popularJobs[5].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl drop-shadow-lg">
                      {popularJobs[5].title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[4].image}
                      alt={popularJobs[4].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[4].title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-[280px] h-[184px] relative rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={popularJobs[2].image}
                      alt={popularJobs[2].title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-xl drop-shadow-lg">
                        {popularJobs[2].title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-900"></span>
          </div>
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
                Where Peace of Mind Matters
              </h2>
              <p className="text-black">
                Tradesmen Online is the easiest & safest way to find a reliable
                tradesperson. Giving you peace of mind knowing that you will get
                exactly what you expected with a great customer experience.
              </p>
              <p className="text-black">
                We have over four thousand tradespeople across the UK who
                advertise on our platform.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-6">
                Why choose us ?
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
                title: "Submit a Job Enquiry",
                desc: "Tell us what you need doing and we'll put you in touch with our qualified tradespeople",
                btn: "Post an Enquiry",
              },
              {
                img: "/home-images/card2.webp",
                title: "Sign up to become a tradesperson",
                desc: "If you are looking to expand your customer base, there is no better platform than Tradesmen Online.",
                btn: "Join our Tradesperson Directory",
              },
              {
                img: "/home-images/card3.webp",
                title: "Tell us what you think",
                desc: "Happy with the work your tradesperson just completed? Let them know what you think.",
                btn: "Leave a review",
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
            Our Trusted Partners
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
                Bringing you the best in the trade
              </h3>
              <div className="space-y-4 text-gray-700 text-lg">
                <p className="leading-relaxed text-[16px]">
                  Our tradespeople represent the highest standard of quality and
                  professionalism. With exceptional workmanship, outstanding
                  customer service, and consistently top-rated reviews, these
                  experts have earned their place on our website
                </p>
                <p className="leading-relaxed text-[16px]">
                  When you choose a tradesperon through Tradesmen Online, you’re
                  choosing peace of mind, knowing your project is in the hands
                  of someone who delivers excellence every time
                </p>
              </div>
              <button className="bg-[#372b70] text-white px-8 py-4 rounded-lg hover:bg-purple-800 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-lg mt-6">
                Find a Local Tradesperson
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 order-1 lg:order-2 group relative">
              <img
                src="/public/home-images/active-roofing-banner.webp"
                alt="Active Roofing"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-700 text-white py-3 px-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-center font-semibold">
                  Roofing Done Right The First Time, Every Time.
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
            Find Tradespeople
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((col) => (
              <div key={col} className="space-y-3">
                {tradespeople
                  .slice(col * 5, (col + 1) * 5)
                  .map((trade, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block text-[#372b70] hover:underline hover:translate-x-2 transition-all duration-300"
                    >
                      {trade} near me
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
