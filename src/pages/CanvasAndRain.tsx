import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  ChevronRight,
  ArrowRight,
  Mail,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1550761849-a8b30703da91?q=80&w=1974&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "The Kensington Slim",
    price: 185,
    image:
      "https://images.unsplash.com/photo-1616423754865-4586fe32f433?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "The Oxford Classic",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1535447143079-36e360c43103?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "The Highland Tartan",
    price: 265,
    image:
      "https://plus.unsplash.com/premium_photo-1676478747063-1bb845bc994e?q=80&w=1974&auto=format&fit=crop",
    tag: "Limited Edition",
  },
  {
    id: 5,
    name: "The Sterling Crook",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1594046226637-7f3e78981282?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "The Bond Travel",
    price: 155,
    image:
      "https://images.unsplash.com/photo-1466794122171-5485586e96fb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "The Ascot Canopy",
    price: 295,
    image:
      "https://images.unsplash.com/photo-1517886496837-92c6618652fb?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "The Windsor Malacca",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1457530378978-8bac973a2709?q=80&w=2070&auto=format&fit=crop",
    tag: "Rare Wood",
  },
  {
    id: 9,
    name: "The Moderne Folding",
    price: 175,
    image:
      "https://images.unsplash.com/photo-1525960977895-57540e99fc5d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "The Sovereign",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1528825773779-e4e14124177a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "The Fleet Street",
    price: 230,
    image:
      "https://images.unsplash.com/photo-1569571903036-3539f47a1794?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "The Gentleman's Cane",
    price: 310,
    image:
      "https://images.unsplash.com/photo-1504042176449-c17435541552?q=80&w=1974&auto=format&fit=crop",
  },
];

const journalPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to care for waxed cotton.",
    date: "Oct 12",
    image:
      "https://images.unsplash.com/photo-1558886099-c04fb229839a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "A history of the crook handle.",
    date: "Oct 05",
    image:
      "https://images.unsplash.com/photo-1570644117799-81f135373801?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Walking specifically in the rain.",
    date: "Sep 28",
    image:
      "https://images.unsplash.com/photo-1514565922658-6a419da76e0e?q=80&w=1974&auto=format&fit=crop",
  },
];

// --- Shared Components ---
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-16 animate-fade-in-up">
    <h2 className="text-4xl md:text-5xl font-serif text-[#f2f0e9] mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 max-w-2xl mx-auto font-light">{subtitle}</p>
    )}
    <div className="w-24 h-px bg-amber-800/50 mx-auto mt-6"></div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group cursor-pointer animate-fade-in-up">
    <div className="relative overflow-hidden mb-6 bg-[#1a1c20] aspect-[3/4]">
      {product.tag && (
        <span className="absolute top-4 left-4 z-10 bg-amber-900/80 text-amber-100 text-xs uppercase tracking-widest px-3 py-1">
          {product.tag}
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
      />
      {/* Quick Add Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
        <button className="bg-[#f2f0e9] text-[#0f1115] px-6 py-3 font-serif text-sm hover:bg-amber-100 transition-colors">
          Quick Add to Bag
        </button>
      </div>
    </div>
    <div className="text-center">
      <h3 className="font-serif text-xl text-[#f2f0e9] mb-2 group-hover:text-amber-200 transition-colors">
        {product.name}
      </h3>
      <p className="text-gray-400 font-light">${product.price.toFixed(2)}</p>
    </div>
  </div>
);

// --- Main Sections ---

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b border-white/10 ${scrolled ? "bg-[#0f1115]/95 backdrop-blur-md py-4 shadow-2xl shadow-black/20" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="md:hidden text-white cursor-pointer">
          <Menu size={24} />
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-sm tracking-widest uppercase text-gray-300 hover:text-amber-100 transition-colors font-medium"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-sm tracking-widest uppercase text-gray-300 hover:text-amber-100 transition-colors font-medium"
          >
            Heritage
          </a>
        </div>
        <div className="text-2xl md:text-3xl font-serif font-bold text-[#f2f0e9] tracking-tight absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          Canvas & Rain
        </div>
        <div className="flex items-center space-x-6 text-[#f2f0e9]">
          <a
            href="#"
            className="hidden md:block text-sm tracking-widest uppercase text-gray-300 hover:text-amber-100 transition-colors font-medium"
          >
            Journal
          </a>
          <div className="flex space-x-4 ml-4 pl-4 border-l border-white/20">
            <Search
              size={20}
              className="cursor-pointer hover:text-amber-100 transition-colors"
            />
            <div className="relative cursor-pointer hover:text-amber-100 transition-colors">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-amber-700 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* PLEASE REPLACE THIS URL WITH THE IMAGE_6.PNG YOU GENERATED FOR THE BEST RESULT */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2574&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl animate-fade-in-up">
            <p className="text-amber-200/80 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Est. London 1888
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#f2f0e9] leading-[0.9] mb-6">
              The Art of <br />
              <span className="italic text-gray-400">Weathering.</span>
            </h1>
            <p className="text-lg text-gray-300 font-light mb-10 max-w-md leading-relaxed border-l border-amber-700/50 pl-6">
              Bespoke rainwear crafted from waxed cotton and heritage woods.
              Designed for the storm, tailored for the gentleman.
            </p>
            <button className="group relative px-8 py-4 bg-[#f2f0e9] text-[#0f1115] font-serif tracking-wide transition-all hover:bg-amber-100 flex items-center justify-center gap-2">
              <span>Shop The Heritage Collection</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EthosSection = () => (
  <section className="py-24 bg-[#0f1115] text-center px-6">
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <h3 className="text-2xl md:text-3xl font-serif text-[#f2f0e9] mb-8 leading-relaxed">
        "We do not merely endure the rain; we embrace it as a backdrop for
        elegance. An umbrella is not an accessory, it is architecture for the
        individual."
      </h3>
      <div className="w-12 h-1 bg-amber-800 mx-auto"></div>
    </div>
  </section>
);

const ProductGridSection = () => (
  <section className="py-24 bg-[#14161a] px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        title="The Heritage Collection"
        subtitle="Meticulously handcrafted for longevity and distinguished style."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-20">
        <button className="px-8 py-4 border border-white/20 text-[#f2f0e9] font-serif tracking-wide hover:bg-white/5 transition-all inline-flex items-center gap-2">
          View All Designs <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </section>
);

const CraftsmanshipSection = () => (
  <section className="py-24 bg-[#0f1115]">
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto">
      <div className="h-[600px] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1620330406850-230e18473312?q=80&w=1974&auto=format&fit=crop"
          alt="Craftsmanship"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="flex items-center p-12 lg:p-24 bg-[#1a1c20] text-[#f2f0e9]">
        <div>
          <p className="text-amber-200/80 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            The Atelier
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Engineered for <br />
            Legacy.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 font-light">
            Every Canvas & Rain umbrella is a culmination of 130 individual
            steps. We use only the finest Italian Chestnut woods, hardy waxed
            cambric cottons that improve with age, and robust steel frames
            designed to withstand gale-force inversions.
          </p>
          <a
            href="#"
            className="underline underline-offset-8 decoration-amber-700 hover:text-amber-200 transition-colors font-serif"
          >
            Discover Our Process
          </a>
        </div>
      </div>
    </div>
  </section>
);

const JournalSection = () => (
  <section className="py-24 bg-[#14161a] px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        title="The Journal"
        subtitle="Notes on weather, style, and longevity."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {journalPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="overflow-hidden aspect-[4/3] mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
            </div>
            <p className="text-amber-700 text-sm mb-2">{post.date}</p>
            <h4 className="text-xl font-serif text-[#f2f0e9] group-hover:text-amber-200 transition-colors">
              {post.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0a0a0a] pt-24 pb-12 px-6 border-t border-white/5 text-gray-400 font-light">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-3xl font-serif text-[#f2f0e9] mb-8">
          Canvas & Rain
        </h3>
        <p className="mb-8 max-w-md">
          Crafting the world's finest rainwear since 1888. Designed in London,
          built to endure.
        </p>
        <div className="flex space-x-6 text-[#f2f0e9]">
          <Instagram
            size={20}
            className="hover:text-amber-200 cursor-pointer"
          />
          <Twitter size={20} className="hover:text-amber-200 cursor-pointer" />
          <Facebook size={20} className="hover:text-amber-200 cursor-pointer" />
        </div>
      </div>
      <div>
        <h4 className="text-[#f2f0e9] font-serif text-lg mb-6">Navigation</h4>
        <ul className="space-y-4">
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
        <h4 className="text-[#f2f0e9] font-serif text-lg mb-6">Client Care</h4>
        <ul className="space-y-4">
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

    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
      <p>© 2024 Canvas & Rain. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
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
