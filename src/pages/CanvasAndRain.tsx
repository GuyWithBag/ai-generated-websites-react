import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  MousePointer2,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import HeroBG from "../assets/umbrella-hero.png";
import UmBlack from "../assets/um-black.png";
import UmBlack2 from "../assets/um-black-2.png";
import UmBlack3 from "../assets/um-black-3.png";
import UmBlack4 from "../assets/um-black-4.png";
import UmBlue from "../assets/um-blue.png";
import UmBlue2 from "../assets/um-blue-2.png";
import UmBlue3 from "../assets/um-blue-3.png";
import UmBlue4 from "../assets/um-blue-4.png";
import UmGreen from "../assets/um-green.png";
import UmPattern from "../assets/um-pattern.png";

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

// --- Mock Data ---
const products: Product[] = [
  {
    id: 1,
    name: "The Churchill",
    price: 245,
    image: UmBlack,
    tag: "Best Seller",
  },
  { id: 2, name: "The Kensington Slim", price: 185, image: UmBlue },
  { id: 3, name: "The Oxford Classic", price: 210, image: UmBlack2 },
  {
    id: 4,
    name: "The Highland Tartan",
    price: 265,
    image: UmPattern,
    tag: "Limited Edition",
  },
  { id: 5, name: "The Sterling Crook", price: 350, image: UmBlack3 },
  { id: 6, name: "The Bond Travel", price: 155, image: UmBlue2 },
  { id: 7, name: "The Ascot Canopy", price: 295, image: UmBlue3 },
  {
    id: 8,
    name: "The Windsor Malacca",
    price: 420,
    image: UmBlack4,
    tag: "Rare Wood",
  },
  { id: 9, name: "The Moderne Folding", price: 175, image: UmGreen },
  { id: 10, name: "The Sovereign", price: 450, image: UmBlue4 },
  { id: 11, name: "The Fleet Street", price: 230, image: UmBlack },
  { id: 12, name: "The Gentleman's Cane", price: 310, image: UmBlue },
];

const journalPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to care for waxed cotton.",
    date: "Oct 12",
    image:
      "https://wornandwound.com/library/uploads/2013/12/WAXED_COTTON_FEAT1.jpg",
  },
  {
    id: 2,
    title: "A history of the crook handle.",
    date: "Oct 05",
    image:
      "https://artwalkingsticks.com/cdn/shop/files/baD35_4_f27dd823-641f-4049-9592-fc81893dcffe.jpg?v=1687956599",
  },
  {
    id: 3,
    title: "Walking specifically in the rain.",
    date: "Sep 28",
    image:
      "https://i.ytimg.com/vi/sBtYWK817-0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAHKtPTmuiyiugsytlg0wJ8wudqhA",
  },
];

// --- Shared Components ---
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-16 animate-fade-in-up px-4">
    <h2 className="text-3xl md:text-5xl font-serif text-[#f2f0e9] mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm md:text-base">
        {subtitle}
      </p>
    )}
    <div className="w-24 h-px bg-amber-800/50 mx-auto mt-6"></div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group cursor-pointer animate-fade-in-up">
    <div className="relative mb-6 bg-[#1a1c20] aspect-[3/4] overflow-hidden">
      {product.tag && (
        <span className="absolute top-4 left-4 z-10 bg-amber-900/80 backdrop-blur-sm text-amber-100 text-[10px] md:text-xs uppercase tracking-widest px-3 py-1">
          {product.tag}
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100 object-contain rotate-45"
      />
      {/* Quick Add Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
        <button className="bg-[#f2f0e9] text-[#0f1115] px-6 py-3 font-serif text-sm hover:bg-amber-100 transition-colors">
          Quick Add to Bag
        </button>
      </div>
    </div>
    <div className="text-center px-2">
      <h3 className="font-serif text-lg md:text-xl text-[#f2f0e9] mb-2 group-hover:text-amber-200 transition-colors">
        {product.name}
      </h3>
      <p className="text-gray-400 font-light text-sm md:text-base">
        ${product.price.toFixed(2)}
      </p>
    </div>
  </div>
);

// --- Main Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl py-4 border-b border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-[#f2f0e9] cursor-pointer z-[60] hover:text-amber-200 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </div>

        {/* Desktop Links Left */}
        <div className="hidden md:flex space-x-10">
          {["Shop", "Heritage"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-amber-200 transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Logo */}
        <div className="text-xl md:text-3xl font-serif text-[#f2f0e9] tracking-tight md:absolute md:left-1/2 md:transform md:-translate-x-1/2 cursor-pointer transition-all duration-500 hover:text-white hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
          Canvas & Rain
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6 md:space-x-8 text-[#f2f0e9] z-50">
          <a
            href="#"
            className="hidden md:block text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-amber-200 transition-all duration-300 relative group"
          >
            Journal
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <div className="flex items-center space-x-5 md:ml-6 md:pl-6 md:border-l border-white/10">
            <Search
              size={20}
              strokeWidth={1.5}
              className="cursor-pointer text-gray-300 hover:text-amber-200 hover:scale-110 transition-all duration-300"
            />
            <div className="relative cursor-pointer group">
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-gray-300 group-hover:text-amber-200 group-hover:scale-110 transition-all duration-300"
              />
              <span className="absolute -top-1.5 -right-2 bg-amber-800/90 backdrop-blur-sm text-[#f2f0e9] text-[9px] font-medium w-4 h-4 flex items-center justify-center rounded-full border border-amber-700/50 shadow-lg">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen Menu */}
        <div
          className={`fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] flex flex-col items-center justify-center space-y-10 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } md:hidden`}
        >
          {["Shop", "Heritage", "Journal"].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`text-4xl font-serif text-[#f2f0e9] hover:text-amber-200 transition-all duration-500 transform ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100 + 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div
            className={`flex space-x-8 pt-12 border-t border-white/10 w-48 justify-center transition-all duration-700 delay-500 transform ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Instagram
              size={24}
              className="text-gray-400 hover:text-amber-200 transition-colors"
            />
            <Twitter
              size={24}
              className="text-gray-400 hover:text-amber-200 transition-colors"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Image with Slow Pan */}
      <div className="absolute inset-0 animate-slow-zoom scale-105">
        <img
          src={HeroBG}
          className="w-full h-full object-cover opacity-50 md:opacity-70 blur-[2px]"
          alt="Hero Background"
        />
      </div>

      {/* Cinematic Lighting Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/20 to-[#0f1115]" />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 20%, #050505 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full mt-16 md:mt-0">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-[1px] bg-amber-700/70"></div>
              <p className="text-amber-400/80 uppercase tracking-[0.3em] text-[10px] md:text-xs font-medium">
                Est. London 1888
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#f2f0e9] leading-[1.1] md:leading-[0.95] mb-8 drop-shadow-2xl">
              The Art of <br className="hidden md:block" />
              <span className="italic text-gray-400 font-light">
                Weathering.
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-300 font-light mb-12 max-w-lg leading-relaxed border-l-2 border-amber-800/40 pl-6 drop-shadow-md">
              Bespoke rainwear crafted from waxed cotton and heritage woods.
              Designed for the storm, tailored for the gentleman.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="group relative px-8 py-4 bg-transparent border border-white/20 text-[#f2f0e9] font-serif tracking-wide overflow-hidden transition-all duration-500 flex items-center justify-center gap-3 hover:border-amber-200/50">
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10">Explore Heritage</span>
                <ChevronRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 group-hover:text-amber-200 transition-all duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">
            Scroll
          </span>
          <MousePointer2 size={16} className="text-amber-200/80" />
        </div>
      </div>
    </div>
  );
};

const EthosSection = () => (
  <section className="py-16 md:py-24 bg-[#0f1115] text-center px-6">
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <h3 className="text-xl md:text-3xl font-serif text-[#f2f0e9] mb-8 leading-relaxed">
        "We do not merely endure the rain; we embrace it as a backdrop for
        elegance. An umbrella is not an accessory, it is architecture for the
        individual."
      </h3>
      <div className="w-12 h-1 bg-amber-800 mx-auto"></div>
    </div>
  </section>
);

const ProductGridSection = () => (
  <section className="py-16 md:py-24 bg-[#14161a] px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        title="The Heritage Collection"
        subtitle="Meticulously handcrafted for longevity and distinguished style."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-16 md:mt-20">
        <button className="px-8 py-4 border border-white/20 text-[#f2f0e9] font-serif tracking-wide hover:bg-white/5 transition-all inline-flex items-center gap-2 text-sm md:text-base">
          View All Designs <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </section>
);

const CraftsmanshipSection = () => (
  <section className="py-16 md:py-24 bg-[#0f1115]">
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto px-4 md:px-6 gap-8 md:gap-0">
      <div className="h-[400px] md:h-[600px] relative overflow-hidden order-2 md:order-1">
        <img
          src="https://down-ph.img.susercontent.com/file/ee2f1e20881ff6905a230260c92e7589.webp"
          alt="Craftsmanship"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="flex items-center p-8 md:p-12 lg:p-24 bg-[#1a1c20] text-[#f2f0e9] order-1 md:order-2">
        <div>
          <p className="text-amber-200/80 uppercase tracking-[0.2em] text-xs md:text-sm mb-4 font-medium">
            The Atelier
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8">
            Engineered for <br />
            Legacy.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 font-light text-sm md:text-base">
            Every Canvas & Rain umbrella is a culmination of 130 individual
            steps. We use only the finest Italian Chestnut woods, hardy waxed
            cambric cottons that improve with age, and robust steel frames
            designed to withstand gale-force inversions.
          </p>
          <a
            href="#"
            className="underline underline-offset-8 decoration-amber-700 hover:text-amber-200 transition-colors font-serif text-sm md:text-base"
          >
            Discover Our Process
          </a>
        </div>
      </div>
    </div>
  </section>
);

const JournalSection = () => (
  <section className="py-16 md:py-24 bg-[#14161a] px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        title="The Journal"
        subtitle="Notes on weather, style, and longevity."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {journalPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden aspect-[4/3] mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
            </div>
            <p className="text-amber-700 text-xs md:text-sm mb-2 uppercase tracking-widest">
              {post.date}
            </p>
            <h4 className="text-lg md:text-xl font-serif text-[#f2f0e9] group-hover:text-amber-200 transition-colors">
              {post.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0a0a0a] pt-16 md:pt-24 pb-8 md:pb-12 px-6 border-t border-white/5 text-gray-400 font-light">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 md:mb-24">
      <div className="col-span-1 sm:col-span-2 md:col-span-2">
        <h3 className="text-2xl md:text-3xl font-serif text-[#f2f0e9] mb-6 md:mb-8">
          Canvas & Rain
        </h3>
        <p className="mb-6 md:mb-8 max-w-md text-sm md:text-base">
          Crafting the world's finest rainwear since 1888. Designed in London,
          built to endure.
        </p>
        <div className="flex space-x-6 text-[#f2f0e9]">
          <Instagram
            size={20}
            className="hover:text-amber-200 cursor-pointer transition-colors"
          />
          <Twitter
            size={20}
            className="hover:text-amber-200 cursor-pointer transition-colors"
          />
          <Facebook
            size={20}
            className="hover:text-amber-200 cursor-pointer transition-colors"
          />
        </div>
      </div>
      <div>
        <h4 className="text-[#f2f0e9] font-serif text-base md:text-lg mb-4 md:mb-6">
          Navigation
        </h4>
        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Shop All
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Heritage
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              The Journal
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              About Us
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-[#f2f0e9] font-serif text-base md:text-lg mb-4 md:mb-6">
          Client Care
        </h4>
        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Shipping & Returns
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Repairs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-amber-200 transition-colors">
              FAQs
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-center md:text-left">
      <p className="mb-4 md:mb-0">© 2024 Canvas & Rain. All rights reserved.</p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-white transition-colors">
          Terms
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Privacy
        </a>
      </div>
    </div>
  </footer>
);

// --- Main CanvasAndRain ---
const CanvasAndRain: React.FC = () => {
  return (
    <div className="font-sans antialiased bg-[#0f1115] min-h-screen selection:bg-amber-900/50 selection:text-white">
      <Navbar />
      <Hero />
      <EthosSection />
      <ProductGridSection />
      <CraftsmanshipSection />
      <JournalSection />
      <Footer />
    </div>
  );
};

export default CanvasAndRain;
