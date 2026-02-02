import React, { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Star,
  Heart,
  ArrowRight,
  Box,
  Gamepad2,
  Smile,
  Zap,
} from "lucide-react";

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  imageColor: string;
  badge?: string;
}

// --- Mock Data ---
const products: Product[] = [
  {
    id: 1,
    name: "Infinity Cube - Pastel Dream",
    price: 12.99,
    category: "Cubes",
    rating: 5,
    imageColor: "bg-blue-200",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Classic Fidget Cube - Mint",
    price: 14.5,
    category: "Cubes",
    rating: 4,
    imageColor: "bg-teal-200",
  },
  {
    id: 3,
    name: "Silent Spinner - Matte",
    price: 9.99,
    category: "Spinners",
    rating: 5,
    imageColor: "bg-purple-200",
  },
  {
    id: 4,
    name: "Sensory Pop Board",
    price: 8.5,
    category: "Poppers",
    rating: 4,
    imageColor: "bg-pink-200",
    badge: "New",
  },
  {
    id: 5,
    name: "Tactile Marble Mesh",
    price: 4.99,
    category: "Soft",
    rating: 5,
    imageColor: "bg-yellow-200",
  },
  {
    id: 6,
    name: "Magnetic Rings (3pk)",
    price: 18.0,
    category: "Magnetic",
    rating: 4,
    imageColor: "bg-orange-200",
  },
  {
    id: 7,
    name: "Dodecahedron 12-Side Cube",
    price: 22.0,
    category: "Cubes",
    rating: 5,
    imageColor: "bg-indigo-200",
    badge: "Pro Choice",
  },
  {
    id: 8,
    name: "Squishy Mochi Cat",
    price: 3.99,
    category: "Soft",
    rating: 5,
    imageColor: "bg-red-200",
  },
];

const FidgetStore: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-slate-800 selection:bg-teal-200">
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-[#FFFDF9]/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-teal-400 p-2 rounded-xl text-white">
                <Gamepad2 size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-800">
                FidgetWorld
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#shop"
                className="text-slate-600 hover:text-teal-500 font-medium transition"
              >
                Shop All
              </a>
              <a
                href="#cubes"
                className="text-slate-600 hover:text-teal-500 font-medium transition"
              >
                Cubes
              </a>
              <a
                href="#spinners"
                className="text-slate-600 hover:text-teal-500 font-medium transition"
              >
                Spinners
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-teal-500 font-medium transition"
              >
                Our Story
              </a>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-full transition">
                <ShoppingCart size={24} className="text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 hover:bg-slate-100 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4">
            <a href="#shop" className="block text-slate-600 font-medium">
              Shop All
            </a>
            <a href="#cubes" className="block text-slate-600 font-medium">
              Cubes
            </a>
            <a href="#spinners" className="block text-slate-600 font-medium">
              Spinners
            </a>
            <a href="#about" className="block text-slate-600 font-medium">
              Our Story
            </a>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32">
        {/* Abstract Background Shapes (Aesthetic Blobs) */}
        <div className="absolute top-20 left-[-5%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-[-5%] w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6">
            <Star size={16} fill="currentColor" /> #1 Rated Fidget Store for All
            Ages
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
              Focus
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Fun!
            </span>
          </h1>

          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover the most satisfying collection of fidget cubes, spinners,
            and sensory toys. Playful designs engineered for every hand, from
            busy professionals to energetic kids.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2">
              Shop All Fidgets <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition">
              View Best Sellers
            </button>
          </div>

          {/* Floating Fidget Mockups (CSS Representation) */}
          <div className="mt-16 flex justify-center gap-8 relative">
            {/* Floating Cube */}
            <div className="hidden md:flex absolute left-10 lg:left-32 top-0 bg-white p-4 rounded-3xl shadow-2xl transform -rotate-12 hover:rotate-0 transition duration-500">
              <div className="w-24 h-24 bg-teal-100 rounded-xl flex items-center justify-center text-teal-500">
                <Box size={48} />
              </div>
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                New!
              </div>
            </div>

            {/* Floating Pop-it */}
            <div className="hidden md:flex absolute right-10 lg:right-32 top-10 bg-white p-4 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition duration-500">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                <Gamepad2 size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl">
              <div className="bg-teal-100 p-4 rounded-2xl mb-4 text-teal-600">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Focus Booster</h3>
              <p className="text-slate-500">
                Proven to help reduce anxiety and improve concentration during
                work or study.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl">
              <div className="bg-purple-100 p-4 rounded-2xl mb-4 text-purple-600">
                <Box size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Materials</h3>
              <p className="text-slate-500">
                Soft-touch silicone, durable ABS plastic, and smooth steel
                bearings.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl">
              <div className="bg-orange-100 p-4 rounded-2xl mb-4 text-orange-600">
                <Smile size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">For All Ages</h3>
              <p className="text-slate-500">
                Safe, quiet, and satisfying for kids (3+), teens, and adults
                alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Shop Section --- */}
      <section
        id="shop"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">
              Trending Fidgets
            </h2>
            <p className="text-slate-500">
              Our most loved cubes, spinners, and poppers.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center text-teal-600 font-semibold hover:underline"
          >
            See everything <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image Placeholder */}
              <div
                className={`aspect-square w-full ${product.imageColor} flex items-center justify-center relative`}
              >
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition text-slate-600 hover:text-red-500">
                  <Heart size={20} />
                </button>
                {/* Simulated toy icon */}
                <Box
                  size={64}
                  className="text-white opacity-50 transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center mb-2 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">
                    ({Math.floor(Math.random() * 50) + 10})
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {product.category}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={addToCart}
                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-teal-500 transition active:scale-95"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="px-6 py-3 border border-slate-300 rounded-full font-semibold">
            View All Products
          </button>
        </div>
      </section>

      {/* --- Banner / CTA Section --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 px-6 py-20 md:py-32 text-center md:text-left md:px-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-xl">
              The Ultimate 12-Sided Fidget Cube is Here.
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-md">
              Gears, buttons, joystick, switch, soothing stone, and more. The
              all-in-one solution for restless hands.
            </p>
            <button className="px-8 py-4 bg-teal-400 text-slate-900 rounded-full font-bold text-lg hover:bg-teal-300 transition shadow-lg shadow-teal-500/30">
              Shop The Dodecahedron
            </button>
          </div>

          {/* Decorative shapes for Banner */}
          <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2">
            <div className="w-64 h-64 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl rotate-12 opacity-80 blur-sm"></div>
            <div className="absolute inset-0 w-64 h-64 bg-white/10 backdrop-blur-md rounded-3xl rotate-6 border border-white/20"></div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-teal-400 p-2 rounded-xl text-white">
                  <Gamepad2 size={20} />
                </div>
                <span className="text-xl font-bold text-slate-800">
                  FidgetWorld
                </span>
              </div>
              <p className="text-slate-500 mb-6">
                Bringing focus and fun to everyone, one click at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <a href="#" className="hover:text-teal-500">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Cubes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Spinners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <a href="#" className="hover:text-teal-500">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">
                Stay in the loop
              </h4>
              <p className="text-slate-500 text-sm mb-4">
                Subscribe for 10% off your first order.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-slate-800">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 FidgetWorld. All rights reserved.
            </p>
            <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-slate-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-600">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FidgetStore;
