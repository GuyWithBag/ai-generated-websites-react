import React, { useState, useEffect } from "react";
import {
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// --- Types ---
interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface HatProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

// --- Data ---
const slides: SlideData[] = [
  {
    id: 1,
    title: "TIMELESS ELEGANCE",
    subtitle: "OUR COLLECTIONS",
    description:
      "Discover a unique selection of hats from different decades, each with its own story and charm, perfect for the modern collector.",
    // Points to your local asset
    image: "src/assets/vin-hats.png",
  },
  {
    id: 2,
    title: "CLASSIC FEDORAS",
    subtitle: "THE GENTLEMAN'S CHOICE",
    description:
      "Explore our rugged yet sophisticated range of 1940s fedoras. Crafted from premium felt, these pieces define the golden age of cinema.",
    image:
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "ROYAL ASCOT",
    subtitle: "LADIES MILLINERY",
    description:
      "Delicate fascinators and wide-brimmed masterpieces. Perfect for garden parties and high tea, restoring mid-century grace.",
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "VICTORIAN ERA",
    subtitle: "ANTIQUE FINDS",
    description:
      "Rare finds from the late 19th century. Silk top hats and bonnets that have survived the test of time.",
    image:
      "https://images.unsplash.com/photo-1582719202047-76d3432ee386?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "BESPOKE RESTORATION",
    subtitle: "REVIVING HISTORY",
    description:
      "We don't just sell; we preserve. Learn about our artisan process of cleaning and restoring vintage headwear.",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop",
  },
];

const products: HatProduct[] = [
  {
    id: 1,
    name: "The Capone Fedora",
    price: "$245.00",
    category: "1940s",
    image:
      "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Duchess Silk Fascinator",
    price: "$180.00",
    category: "Formal",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSulXxrA_nwjIti7WfhLFRKHNtkCq8qcjZCcw&s",
  },
  {
    id: 3,
    name: "Victorian Top Hat",
    price: "$850.00",
    category: "Antique",
    image:
      "https://i.pinimg.com/474x/aa/b5/d5/aab5d52cc300680ea6214fe0d59a7a3c.jpg",
  },
  {
    id: 4,
    name: "The Baker Boy",
    price: "$120.00",
    category: "Casual",
    image:
      "https://rainhatcollection.com/cdn/shop/articles/proppa-toppa-pt18-grace-black-baker-boy-rain-cap-on-woman_800x.jpg?v=1612284403",
  },
  {
    id: 5,
    name: "Wide Brim Sun Hat",
    price: "$155.00",
    category: "Summer",
    image:
      "https://www.sandiegohat.com/cdn/shop/files/WSH1219OSCML-wide-brim-sun-hat-angle-2000x2000_1080x.jpg?v=1708464633",
  },
  {
    id: 6,
    name: "The Stetson Original",
    price: "$320.00",
    category: "Western",
    image:
      "https://stetson.com/cdn/shop/products/XWRPTR-2044-07_DSC04187_alt1_grande.jpg?v=1647971833",
  },
];

const VintageMillinery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Navbar Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slider Logic
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="w-full bg-stone-50 text-stone-900 font-sans overflow-x-hidden">
      {/* --- Fonts Import (Pinyon Script, Playfair Display, Lato) --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Lato:wght@300;400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      {/* --- Sticky Navbar --- */}
      <nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 md:px-12 transition-all duration-300 ${scrolled ? "bg-stone-900 shadow-xl py-3" : "bg-transparent py-6"}`}
      >
        {/* LOGO with Cursive Font */}
        <div
          className={`text-4xl md:text-5xl font-['Pinyon_Script'] tracking-wide transition-colors ${scrolled ? "text-amber-100" : "text-stone-100"}`}
        >
          Vintage Millinery
        </div>

        <div className="hidden md:flex space-x-8 font-['Lato'] text-sm tracking-widest uppercase">
          <a
            href="#home"
            className={`hover:text-amber-200 transition-colors ${scrolled ? "text-stone-300" : "text-stone-200"}`}
          >
            Home
          </a>
          <a
            href="#story"
            className={`hover:text-amber-200 transition-colors ${scrolled ? "text-stone-300" : "text-stone-200"}`}
          >
            Our Story
          </a>
          <a
            href="#hats"
            className={`hover:text-amber-200 transition-colors ${scrolled ? "text-stone-300" : "text-white font-semibold"}`}
          >
            Hats
          </a>
          <a
            href="#contact"
            className={`hover:text-amber-200 transition-colors ${scrolled ? "text-stone-300" : "text-stone-200"}`}
          >
            Contact Us
          </a>
        </div>

        <button
          className={`hover:text-amber-200 transition-colors ${scrolled ? "text-stone-300" : "text-white"}`}
        >
          <Menu size={28} strokeWidth={1} />
        </button>
      </nav>

      {/* --- SECTION 1: HERO (Slider) --- */}
      <section
        id="home"
        className="relative w-full h-screen overflow-hidden bg-stone-900"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
        </div>

        <div className="relative z-40 flex flex-col justify-center h-full px-8 md:px-12 pb-20 pt-20">
          <div className="w-full text-center md:text-left md:ml-12 lg:ml-24">
            <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-9xl text-white tracking-tight drop-shadow-2xl">
              {slide.title.split(" ").map((word, i) => (
                <span key={i} className="block md:inline mr-6">
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <div className="absolute right-8 md:right-24 bottom-1/2 md:bottom-[25%] transform  max-w-sm md:max-w-md text-right md:text-left hidden md:block">
            <p className="font-['Lato'] text-stone-200 text-lg leading-relaxed drop-shadow-md">
              A Vintage Hat Is More Than An Accessory; It's A Piece Of History,
              A Statement Of Style, And A Connection To A Bygone Era.
            </p>
          </div>
        </div>

        {/* Sidebar Socials */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-6 hidden md:flex">
          <SocialIcon icon={<Twitter size={18} />} />
          <SocialIcon icon={<Youtube size={18} />} />
          <SocialIcon icon={<Facebook size={18} />} />
          <SocialIcon icon={<Instagram size={18} />} />
        </div>

        {/* Bottom Left Info */}
        <div className="absolute bottom-10 left-8 md:left-12 z-40 max-w-2xl">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-amber-200 mb-2 uppercase tracking-wide">
            {slide.subtitle}
          </h3>
          <p className="font-['Lato'] text-stone-300 text-sm md:text-base leading-relaxed pr-10">
            {slide.description}
          </p>
        </div>

        {/* Bottom Right Controls */}
        <div className="absolute bottom-10 right-8 md:right-12 z-50 flex items-end gap-6">
          <div className="text-4xl md:text-5xl font-['Playfair_Display'] text-white">
            <span className="text-emerald-400">0{slide.id}</span>
            <span className="text-stone-500 text-2xl mx-2">/</span>
            <span className="text-xl">0{slides.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={prevSlide}
              className="w-12 h-12 border border-stone-600 bg-black/40 hover:bg-emerald-900/80 hover:border-emerald-500 text-white flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-300"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: OUR STORY --- */}
      <section id="story" className="py-24 px-8 md:px-24 bg-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-6">
            <h4 className="text-amber-700 font-['Lato'] uppercase tracking-widest text-sm font-semibold">
              Since 1920
            </h4>
            <h2 className="text-5xl md:text-6xl font-['Playfair_Display'] text-stone-900 leading-tight">
              Preserving the <br />{" "}
              <span className="italic text-stone-500">Art of Millinery</span>
            </h2>
            <p className="text-stone-600 font-['Lato'] leading-relaxed text-lg">
              What began as a small haberdashery in London has evolved into a
              curated archive of fashion history. At Vintage Millinery, we
              believe that every hat carries the soul of its era.
            </p>
            <p className="text-stone-600 font-['Lato'] leading-relaxed text-lg">
              Our team of expert restorers works tirelessly to clean, reshape,
              and preserve these artifacts, ensuring that the craftsmanship of
              the past can be enjoyed by the stylish generations of today.
            </p>
            <button className="mt-8 px-8 py-3 bg-stone-900 text-white font-['Lato'] uppercase tracking-widest text-sm hover:bg-emerald-700 transition-colors duration-300">
              Read Our Full History
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 border-2 border-amber-700 translate-x-4 translate-y-4 z-0 hidden md:block"></div>
            <img
              src="src/assets/vin-interior.png"
              alt="Vintage shop interior"
              className="relative z-10 w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: HATS COLLECTION --- */}
      <section id="hats" className="py-24 px-8 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] text-stone-900 mb-4">
              Curated Collections
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((hat) => (
              <div key={hat.id} className="group cursor-pointer">
                <div className="relative overflow-hidden h-[400px] bg-stone-100 mb-4">
                  <img
                    src={hat.image}
                    alt={hat.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-['Lato'] uppercase tracking-widest">
                    {hat.category}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-['Playfair_Display'] text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {hat.name}
                    </h3>
                    <p className="text-amber-700 font-['Lato'] mt-1">
                      {hat.price}
                    </p>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 border border-stone-900 text-stone-900 font-['Lato'] uppercase tracking-widest text-sm hover:bg-stone-900 hover:text-white transition-all duration-300">
              View All 142 Items
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CONTACT US --- */}
      <section
        id="contact"
        className="py-24 px-8 md:px-24 bg-stone-900 text-white"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] mb-8">
              Get In Touch
            </h2>
            <p className="text-stone-400 font-['Lato'] text-lg mb-12 leading-relaxed">
              Have a vintage piece you'd like appraised? Or looking for a
              specific style? Our specialists are here to help you find the
              perfect fit.
            </p>

            <div className="space-y-8 font-['Lato']">
              <div className="flex items-start space-x-4">
                <MapPin className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="text-white uppercase tracking-widest text-sm mb-1">
                    Visit Us
                  </h4>
                  <p className="text-stone-400">
                    12 Savile Row, Mayfair
                    <br />
                    London, W1S 3PQ
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="text-white uppercase tracking-widest text-sm mb-1">
                    Email
                  </h4>
                  <p className="text-stone-400">
                    inquiries@vintagemillinery.co.uk
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="text-white uppercase tracking-widest text-sm mb-1">
                    Call
                  </h4>
                  <p className="text-stone-400">+44 (0) 20 7946 0123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-stone-800 p-8 md:p-12 border border-stone-700">
            <form className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-stone-900 border-b border-stone-600 p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-stone-900 border-b border-stone-600 p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-stone-900 border-b border-stone-600 p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-emerald-700 text-white font-['Lato'] uppercase tracking-widest text-sm hover:bg-emerald-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-black py-12 text-center border-t border-stone-800">
        <div className="text-2xl font-['Pinyon_Script'] text-stone-500 mb-4">
          Vintage Millinery
        </div>
        <p className="text-stone-600 text-xs font-['Lato'] uppercase tracking-widest">
          © 2024 Vintage Millinery. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

// Helper Component for Social Icons
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-stone-800/50 hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-stone-700 hover:border-emerald-500"
  >
    {icon}
  </a>
);

export default VintageMillinery;
