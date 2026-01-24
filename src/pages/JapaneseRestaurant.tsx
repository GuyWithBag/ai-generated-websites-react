import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  ChevronRight,
  Star,
  Quote,
  Utensils,
  ChefHat,
  Clock,
} from "lucide-react";

const JapaneseRestaurant = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DATA & CONTENT ---

  const images = {
    background:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop",
    mainRamen:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop",
    sushiPlate1:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop",
    sushiPlate2:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=400&auto=format&fit=crop",
    gyoza:
      "https://images.unsplash.com/photo-1703080173985-936514c7c8bd?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tempura:
      "https://plus.unsplash.com/premium_photo-1666920344211-88611229ce09?w=500&auto=format&fit=crop&q=60",
    chef: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop",
    catering:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop",
  };

  const menuItems = [
    {
      id: 1,
      name: "Shrimp Ramen",
      price: "16.00",
      category: "Ramen",
      desc: "Rich pork broth, chashu, soft egg, menma, scallions.",
      img: images.mainRamen,
    },
    {
      id: 2,
      name: "Spicy Miso Ramen",
      price: "17.00",
      category: "Ramen",
      desc: "Spicy miso paste, minced pork, corn, butter, bean sprouts.",
      img: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Dragon Roll",
      price: "14.50",
      category: "Sushi",
      desc: "Eel, cucumber, topped with avocado and eel sauce.",
      img: images.sushiPlate1,
    },
    {
      id: 4,
      name: "Sashimi Deluxe",
      price: "24.00",
      category: "Sushi",
      desc: "12 pieces of chef's choice fresh fish.",
      img: images.sushiPlate2,
    },
    {
      id: 5,
      name: "Gyoza (6pcs)",
      price: "8.00",
      category: "Appetizers",
      desc: "Pan-fried pork and vegetable dumplings.",
      img: images.gyoza,
    },
    {
      id: 6,
      name: "Shrimp Tempura",
      price: "12.00",
      category: "Appetizers",
      desc: "Lightly battered crispy shrimp and vegetables.",
      img: images.tempura,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      text: "The most authentic Ramen I've had outside of Tokyo. The broth is incredibly rich!",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Beautiful atmosphere and the sushi is incredibly fresh. Highly recommend the Dragon Roll.",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Jessica Doe",
      rating: 4,
      text: "Great service and lovely presentation. A bit busy on Friday nights, but worth the wait.",
      date: "3 weeks ago",
    },
  ];

  const filteredMenu =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-sans overflow-x-hidden relative scroll-smooth">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
          .font-marker { font-family: 'Permanent Marker', cursive; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}
      </style>

      {/* Background Texture (Global) */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${images.background})`,
          backgroundSize: "cover",
        }}
      ></div>

      {/* --- NAVBAR --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/95 backdrop-blur-md py-2 shadow-lg border-b border-zinc-800" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col items-center leading-tight cursor-pointer group"
          >
            <div className="relative">
              <span className="text-2xl font-bold tracking-widest text-white group-hover:text-red-500 transition-colors">
                KURO
              </span>
              {/*<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-red-500">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center bg-zinc-800">
                  <ChefHat size={16} />
                </div>
              </div>*/}
            </div>
            <span className="text-xs tracking-[0.3em] text-red-500 font-bold uppercase">
              KITCHEN
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 bg-zinc-800/80 px-8 py-3 rounded-full border border-zinc-700 backdrop-blur-md shadow-2xl">
            {["Home", "Catering", "About Us", "Menu", "Review", "Careers"].map(
              (item, index) => (
                <a
                  key={index}
                  href={`#${item.replace(" ", "").toLowerCase()}`}
                  className={`text-sm font-medium tracking-wide hover:text-red-400 transition-colors ${index === 0 ? "text-red-500" : "text-zinc-300"}`}
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <button className="hidden md:flex bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg items-center gap-2 transition-transform active:scale-95">
            Contact Us <Phone size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex flex-col space-y-4 shadow-xl">
            {["Home", "Catering", "About Us", "Menu", "Review", "Careers"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.replace(" ", "").toLowerCase()}`}
                  className="text-white hover:text-red-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative w-full min-h-screen pt-24 pb-12 flex flex-col items-center justify-center z-10 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rotate-45 transform translate-x-32 -translate-y-32 z-0 opacity-80 border-4 border-black"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-12 bg-red-600 -skew-x-12 transform -translate-x-1/2 translate-y-6 z-0 border-t-4 border-black"></div>

        <h1 className="font-marker text-4xl md:text-6xl lg:text-7xl text-white text-center mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] z-20">
          RAMEN <span className="text-red-500">&</span> SUSHI BOWLS
        </h1>

        <div className="relative w-full max-w-7xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center scale-90 md:scale-100">
          {/* Connecting Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40">
            <path
              d="M 40% 50% Q 30% 40%, 25% 30%"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="25%" cy="30%" r="4" fill="red" />
            <path
              d="M 40% 50% Q 35% 60%, 25% 70%"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="25%" cy="70%" r="4" fill="red" />
            <path
              d="M 60% 50% Q 70% 40%, 75% 30%"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="75%" cy="30%" r="4" fill="white" />
            <path
              d="M 60% 50% Q 65% 60%, 75% 70%"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            />
            <circle cx="75%" cy="70%" r="4" fill="white" />
          </svg>

          {/* Main Bowl */}
          <div className="absolute z-20 w-64 h-64 md:w-[600px] md:h-[600px] rounded-full overflow-hidden border-4 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black group hover:scale-105 transition-transform duration-500">
            <img
              src={images.mainRamen}
              alt="Main"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
            />
            <span className="absolute top-[15%] left-[20%] text-sm text-white font-bold bg-black/50 px-2 rounded -rotate-12">
              Tonkotsu
            </span>
          </div>

          {/* Satellites */}
          <img
            src={images.sushiPlate1}
            alt="Sushi"
            className="absolute top-0 left-4 md:left-24 w-28 h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-zinc-700 shadow-xl -rotate-12 z-20"
          />
          <img
            src={images.sushiPlate2}
            alt="Sashimi"
            className="absolute top-0 right-4 md:right-24 w-28 h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-zinc-700 shadow-xl z-20 -rotate-12"
          />
          <img
            src={images.gyoza}
            alt="Gyoza"
            className="absolute bottom-0 left-4 md:left-24 w-28 h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-zinc-700 shadow-xl rotate-12 z-20"
          />
          <img
            src={images.tempura}
            alt="Tempura"
            className="absolute bottom-0 right-4 md:right-24 w-28 h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-zinc-700 shadow-xl -rotate-12 z-20"
          />
        </div>
      </section>

      {/* --- CATERING SECTION --- */}
      <section
        id="catering"
        className="relative py-20 bg-zinc-950/80 border-t border-zinc-800"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-4 left-4 w-full h-full border-2 border-red-600 z-0"></div>
              <img
                src={images.catering}
                alt="Catering"
                className="relative z-10 w-full h-[400px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6">
              <h2 className="font-marker text-4xl md:text-5xl text-red-500">
                Event Catering
              </h2>
              <h3 className="text-2xl font-bold text-white">
                Bring the Taste of Japan to Your Guests
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                From corporate luncheons to intimate weddings, our master chefs
                create an unforgettable culinary experience. We offer
                customizable sushi boats, live ramen stations, and traditional
                bento boxes tailored to your event's needs.
              </p>
              <ul className="space-y-3 text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div> Live
                  Ramen & Sushi Stations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>{" "}
                  Customizable Menus
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>{" "}
                  Professional Service Staff
                </li>
              </ul>
              <button className="mt-4 px-8 py-3 bg-white text-black font-bold hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest text-sm">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section
        id="aboutus"
        className="relative py-20 bg-zinc-900 overflow-hidden"
      >
        {/* Decorative background kanji or texture could go here */}
        <div className="absolute right-0 top-0 text-[20rem] font-black text-white opacity-[0.03] pointer-events-none select-none leading-none">
          和食
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-marker text-5xl text-white mb-4">
              Our <span className="text-red-500">Legacy</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <p className="text-xl text-red-400 italic font-serif">
                "Cooking is not just about ingredients, it's about the soul."
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Founded in 2010 by Master Chef Kenjiro, our restaurant began as
                a humble 10-seat noodle bar in the backstreets of Kyoto. Driven
                by a passion for authentic flavors and a refusal to compromise
                on quality, we have brought those same time-honored recipes to
                New York.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Our broth simmers for 48 hours. Our noodles are hand-pulled
                daily. Every slice of fish is selected at the peak of freshness.
                This is not just food; it is an honor to serve you.
              </p>
              <div className="pt-4 flex gap-8">
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-white">15+</h4>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">
                    Years Experience
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-white">3</h4>
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">
                    Master Chefs
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative group">
              <div className="absolute inset-0 border-2 border-zinc-700 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
              <img
                src={images.chef}
                alt="Chef"
                className="relative z-10 w-full shadow-2xl filter sepia-[.2] hover:sepia-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <section id="menu" className="py-20 bg-zinc-950 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-marker text-5xl text-white mb-2">
              Explore <span className="text-red-500">Menu</span>
            </h2>
            <p className="text-zinc-400">
              Authentic flavors crafted with passion
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["All", "Ramen", "Sushi", "Appetizers"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border ${activeCategory === cat ? "bg-red-600 border-red-600 text-white" : "bg-transparent border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-white"} transition-all uppercase text-sm tracking-widest font-bold`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-red-900 hover:bg-zinc-900 transition-all group"
              >
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ${item.price}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                  {item.desc}
                </p>
                <button className="w-full py-2 border border-zinc-700 text-zinc-300 text-sm font-bold uppercase hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors rounded">
                  Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section
        id="review"
        className="py-20 bg-zinc-900 border-t border-zinc-800"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="font-marker text-5xl text-white">
                Customer <span className="text-red-500">Love</span>
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-500">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                </div>
                <span className="text-zinc-400 text-sm">
                  (4.9/5 from 1,200+ reviews)
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <button className="text-red-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-red-500 pb-1">
                Read All Reviews
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-zinc-950 p-8 rounded-2xl relative border border-zinc-800"
              >
                <Quote
                  size={40}
                  className="absolute top-6 right-6 text-zinc-800"
                />
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">
                      {review.name}
                    </h4>
                    <span className="text-zinc-500 text-xs">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-12 border-t border-zinc-800 z-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-bold tracking-widest text-white">
                JAPANESE
              </span>
              <p className="text-zinc-500 text-sm mt-4">
                Authentic flavors, traditional techniques, and a modern dining
                experience.
              </p>
            </div>

            <div>
              <h3 className="text-red-500 font-bold mb-4 uppercase text-sm tracking-widest">
                Location
              </h3>
              <p className="text-zinc-400 text-sm">
                123 Sakura Street
                <br />
                Kyoto District, NY 10012
              </p>
              <p className="text-zinc-400 text-sm mt-2">+1 (555) 123-4567</p>
            </div>

            <div>
              <h3 className="text-red-500 font-bold mb-4 uppercase text-sm tracking-widest">
                Hours
              </h3>
              <p className="text-zinc-400 text-sm">
                Mon-Sun: 11:00 AM - 10:00 PM
              </p>
              <p className="text-zinc-400 text-sm mt-1">
                Happy Hour: 4:00 PM - 7:00 PM
              </p>
            </div>

            <div>
              <h3 className="text-red-500 font-bold mb-4 uppercase text-sm tracking-widest">
                Newsletter
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 text-sm w-full focus:outline-none focus:border-red-600"
                />
                <button className="bg-red-600 px-4 py-2 hover:bg-red-700 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
            <p>&copy; 2024 Kuro Kitchen. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JapaneseRestaurant;
