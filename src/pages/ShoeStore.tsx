import React from "react";
import {
  Search,
  User,
  ShoppingBag,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// ==========================================
// MOCK DATA & INTERFACES
// ==========================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  imageUrl: string;
}

// Using Unsplash Source API for realistic placeholder product images without needing local files.
const products: Product[] = [
  // New Arrivals
  {
    id: 1,
    name: "Apex Runner Elite",
    category: "Running",
    price: "$145.00",
    imageUrl: "https://source.unsplash.com/random/400x500?running-shoe",
  },
  {
    id: 2,
    name: "Urban Drift Casual",
    category: "Lifestyle",
    price: "$99.00",
    imageUrl: "https://source.unsplash.com/random/400x500?white-sneaker",
  },
  {
    id: 3,
    name: "Summit Hiker Pro",
    category: "Outdoor",
    price: "$180.00",
    imageUrl: "https://source.unsplash.com/random/400x500?hiking-boot",
  },
  {
    id: 4,
    name: "Court Classic Lux",
    category: "Tennis",
    price: "$120.00",
    imageUrl: "https://source.unsplash.com/random/400x500?tennis-shoe",
  },
  // Best Sellers
  {
    id: 5,
    name: "The Minimalist Leather",
    category: "Dress Casual",
    price: "$155.00",
    imageUrl: "https://source.unsplash.com/random/400x500?leather-shoe",
  },
  {
    id: 6,
    name: "Cloud Step Comfort",
    category: "Walking",
    price: "$85.00",
    imageUrl: "https://source.unsplash.com/random/400x500?comfortable-shoe",
  },
  {
    id: 7,
    name: "Retro High-Top '92",
    category: "Basketball Style",
    price: "$135.00",
    imageUrl: "https://source.unsplash.com/random/400x500?high-top-sneaker",
  },
  {
    id: 8,
    name: "Canvas Slip-On",
    category: "Summer",
    price: "$65.00",
    imageUrl: "https://source.unsplash.com/random/400x500?slip-on-shoe",
  },
  // More Products
  {
    id: 9,
    name: "Trail Blazer GTX",
    category: "Outdoor",
    price: "$195.00",
    imageUrl: "https://source.unsplash.com/random/400x500?trail-shoe",
  },
  {
    id: 10,
    name: "Office Derby",
    category: "Formal",
    price: "$210.00",
    imageUrl: "https://source.unsplash.com/random/400x500?oxford-shoe",
  },
  {
    id: 11,
    name: "Sport Knit Trainer",
    category: "Gym",
    price: "$75.00",
    imageUrl: "https://source.unsplash.com/random/400x500?gym-shoe",
  },
  {
    id: 12,
    name: "Weekend Loafer",
    category: "Casual",
    price: "$115.00",
    imageUrl: "https://source.unsplash.com/random/400x500?loafer",
  },
];

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

// Section Title Component
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-500 text-lg max-w-xl mx-auto">{subtitle}</p>
    )}
  </div>
);

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group cursor-pointer flex flex-col h-full">
    <div className="relative overflow-hidden bg-gray-100 rounded-xl mb-4 h-[350px]">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      {/* Quick add button that appears on hover */}
      <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-black text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
        <ShoppingBag size={16} /> Quick Add
      </button>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
        {product.name}
      </h3>
      <p className="text-lg font-semibold text-gray-900 mt-1">
        {product.price}
      </p>
    </div>
  </div>
);

// ==========================================
// MAIN PAGE SECTIONS
// ==========================================

const Navbar: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full px-6 py-6 md:px-12 lg:px-24">
      <nav className="flex items-center justify-between text-white">
        <div className="text-2xl font-black tracking-widest uppercase font-sans">
          SOLEMATES
        </div>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <li>
            <a href="#shoes" className="border-b-2 border-white pb-1">
              Shoes
            </a>
          </li>
          <li>
            <a
              href="#new-arrivals"
              className="hover:text-gray-300 transition-colors pb-1"
            >
              New Arrivals
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-gray-300 transition-colors pb-1"
            >
              Our Story
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-gray-300 transition-colors pb-1"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          <button
            aria-label="Search"
            className="hover:text-gray-300 transition-colors"
          >
            <Search size={22} />
          </button>
          <button
            aria-label="Account"
            className="hover:text-gray-300 transition-colors"
          >
            <User size={22} />
          </button>
          <button
            aria-label="Cart"
            className="relative hover:text-gray-300 transition-colors"
          >
            <ShoppingBag size={22} />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white border border-white">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

const HeroSection: React.FC = () => (
  <section className="relative h-[95vh] min-h-[600px] w-full overflow-hidden font-sans">
    <div className="absolute inset-0">
      <img
        src="/hero-image.png" // Make sure this path is correct for your public folder
        alt="Hero"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
    <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24 pt-20">
      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[1] tracking-tighter mb-8 drop-shadow-lg">
          STEP INTO <br /> YOUR STORY.
        </h1>
        <p className="text-2xl md:text-3xl text-white font-light mb-12 max-w-xl leading-tight drop-shadow-md">
          Shop the new collection for every walk of life.
        </p>
        <button className="bg-white text-black text-lg font-bold py-4 px-12 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out">
          SHOP NOW
        </button>
      </div>
    </div>
  </section>
);

// 1. Category Feature Section
const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      name: "Men's Collection",
      img: "https://source.unsplash.com/random/600x400?mens-shoes",
    },
    {
      name: "Women's Collection",
      img: "https://source.unsplash.com/random/600x400?womens-shoes",
    },
    {
      name: "Accessories & Gear",
      img: "https://source.unsplash.com/random/600x400?shoe-accessories",
    },
  ];
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-white text-2xl font-bold mb-2">{cat.name}</h3>
              <span className="text-white flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 2. New Arrivals Grid (First 4 products)
const NewArrivals: React.FC = () => (
  <section
    id="new-arrivals"
    className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50"
  >
    <SectionHeading
      title="New Arrivals"
      subtitle="Check out the latest drops from our design studio."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    <div className="text-center mt-12">
      <button className="border-2 border-black font-bold py-3 px-8 rounded-full hover:bg-black hover:text-white transition-colors">
        View All New
      </button>
    </div>
  </section>
);

// 3. Promotional Banner
const PromoBanner: React.FC = () => (
  <section className="relative py-32 bg-zinc-900 text-white text-center px-6">
    <div className="absolute inset-0 opacity-40">
      <img
        src="https://source.unsplash.com/random/1600x600?running-feet"
        className="w-full h-full object-cover grayscale"
        alt="Promo BG"
      />
    </div>
    <div className="relative z-10 max-w-2xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">
        Mid-Season Sale
      </h2>
      <p className="text-xl mb-8">
        Up to 40% off selected styles. Don't miss out.
      </p>
      <button className="bg-white text-black font-bold py-3 px-10 rounded-full hover:bg-gray-200 transition-colors">
        SHOP SALE
      </button>
    </div>
  </section>
);

// 4. Best Sellers Grid (Next 4 products)
const BestSellers: React.FC = () => (
  <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
    <SectionHeading
      title="Best Sellers"
      subtitle="Our most popular styles, chosen by you."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.slice(4, 8).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

// 5. About Us Section
const AboutUs: React.FC = () => (
  <section id="about" className="py-24 bg-gray-50">
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="rounded-3xl overflow-hidden h-[500px]">
          <img
            src="https://source.unsplash.com/random/800x800?shoemaker,craft"
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">
            Our Story
          </h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Crafting Journeys, One Step at a Time.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Founded in 2020, SoleMates began with a simple mission: to bridge
            the gap between high-performance athletic gear and everyday style.
            We believe that the right pair of shoes can change your entire day.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We source sustainable materials and partner with ethical
            manufacturers to create footwear that looks good, feels incredible,
            and lasts.
          </p>
          <button className="flex items-center gap-2 font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
            Read More About Us <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

// 6. Newsletter Section
const Newsletter: React.FC = () => (
  <section className="py-24 bg-black text-white text-center px-6">
    <div className="max-w-3xl mx-auto">
      <Mail size={48} className="mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Join the SoleMates Community</h2>
      <p className="text-gray-400 mb-8 text-lg">
        Sign up for exclusive offers, early access to new drops, and style
        inspiration.
      </p>
      <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-6 py-3 rounded-full bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-white flex-grow"
        />
        <button className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap">
          Sign Up
        </button>
      </form>
    </div>
  </section>
);

// 7. Footer Section
const Footer: React.FC = () => (
  <footer
    id="contact"
    className="bg-zinc-900 text-gray-400 py-16 px-6 md:px-12 lg:px-24 font-sans"
  >
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      {/* Column 1: Brand */}
      <div className="col-span-1 md:col-span-1">
        <div className="text-white text-2xl font-black tracking-widest uppercase mb-6">
          SOLEMATES
        </div>
        <p className="mb-6 leading-relaxed">
          Premium footwear designed for the modern journey. Quality, comfort,
          and style in every step.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-white hover:text-gray-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* Column 2: Shop */}
      <div>
        <h4 className="text-white font-bold uppercase tracking-wider mb-6">
          Shop
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Men's
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Women's
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              New Arrivals
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Sale
            </a>
          </li>
        </ul>
      </div>

      {/* Column 3: Support */}
      <div>
        <h4 className="text-white font-bold uppercase tracking-wider mb-6">
          Support
        </h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Order Status
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Shipping & Returns
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              Size Guide
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition-colors">
              FAQ
            </a>
          </li>
        </ul>
      </div>

      {/* Column 4: Contact */}
      <div>
        <h4 className="text-white font-bold uppercase tracking-wider mb-6">
          Contact Us
        </h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <MapPin size={20} className="mt-1 flex-shrink-0" />
            <span>123 Shoe Lane, Fashion City, NY 10012</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={20} />
            <span>+1 (555) 123-4567</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={20} />
            <a href="mailto:hello@solemates.com" className="hover:text-white">
              hello@solemates.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-sm">
      <p>© 2024 SoleMates Inc. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function ShoeStore() {
  return (
    <main className="min-h-screen w-full bg-white scroll-smooth">
      <Navbar />
      <HeroSection />
      <FeaturedCategories />
      <NewArrivals />
      <PromoBanner />
      <BestSellers />
      {/* We could add another grid here for the remaining products if needed */}
      <AboutUs />
      <Newsletter />
      <Footer />
    </main>
  );
}

export default ShoeStore;
