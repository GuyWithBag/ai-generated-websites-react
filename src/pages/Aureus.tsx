import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Home,
  Compass,
  Heart,
  User,
  Calendar,
} from "lucide-react";

// --- Type Definitions ---
interface Hotel {
  id: number;
  name: string;
  location: string;
  distance: string;
  price: string;
  image: string;
}

const Aureus: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate Loading Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 font-sans">
      {/* Mobile Screen Container */}
      <div className="relative w-full max-w-[375px] h-[812px] bg-[#121212] overflow-hidden shadow-2xl rounded-[40px] border-8 border-neutral-800 text-white">
        {/* Status Bar (Simulated) */}
        <div className="absolute top-0 w-full h-12 flex justify-between items-end px-6 pb-2 z-50">
          <span className="text-xs font-semibold">9:41</span>
          <div className="flex gap-1.5">
            <div className="w-4 h-2.5 bg-white rounded-sm"></div>
            <div className="w-4 h-2.5 bg-white rounded-sm"></div>
            <div className="w-6 h-2.5 bg-white rounded-sm"></div>
          </div>
        </div>

        {loading ? <LoadingScreen /> : <HomeScreen />}

        {/* Home Indicator (Simulated) */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50"></div>
      </div>
    </div>
  );
};

// --- 1. Loading Screen Component ---
const LoadingScreen: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] animate-fade-in">
      {/* Logo */}
      <h1 className="text-4xl font-serif text-[#C5A059] tracking-widest mb-10 animate-pulse">
        AUREUS
      </h1>

      {/* Compass Icon Spinning */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#C5A059] blur-xl opacity-20 rounded-full"></div>
        <Compass
          size={64}
          className="text-[#C5A059] animate-[spin_4s_linear_infinite]"
        />
      </div>

      {/* Loading Text */}
      <p className="text-neutral-500 text-sm font-light tracking-wide animate-pulse">
        Loading Experiences...
      </p>
    </div>
  );
};

// --- 2. Home Screen Component ---
const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const hotels: Hotel[] = [
    {
      id: 1,
      name: "The Obsidian Tower",
      location: "Downtown",
      distance: "0.5km",
      price: "$450",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      name: "Azure Cliffside",
      location: "Coastline",
      distance: "2.1km",
      price: "$620",
      image:
        "https://images.unsplash.com/photo-1571896349842-6e53ce416866?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      name: "Velvet Loft",
      location: "Arts District",
      distance: "1.2km",
      price: "$310",
      image:
        "https://images.unsplash.com/photo-1590490360182-f33efe80a713?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#121212] pt-14 pb-20 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <header className="flex justify-between items-center px-6 mb-6">
        <h1 className="text-2xl font-serif text-[#C5A059] tracking-wide">
          AUREUS
        </h1>
        <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 text-[#C5A059] font-bold text-sm">
          J
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-5 mb-8">
        <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-lg group">
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800"
            alt="Hero"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

          <div className="absolute top-6 left-6">
            <h2 className="text-3xl font-bold leading-tight">
              Find your
              <br />
              Sanctuary.
            </h2>
          </div>
        </div>

        {/* Floating Search Widget */}
        <div className="relative -mt-12 mx-2 bg-[#1E1E1E] rounded-2xl p-4 shadow-2xl border border-neutral-800 backdrop-blur-md">
          {/* Location Input */}
          <div className="flex items-center gap-3 border-b border-neutral-700 pb-3 mb-3">
            <MapPin size={18} className="text-[#C5A059]" />
            <input
              type="text"
              placeholder="Where to?"
              className="bg-transparent text-sm w-full outline-none placeholder-neutral-500 text-white"
            />
          </div>

          {/* Date Input */}
          <div className="flex items-center gap-3 border-b border-neutral-700 pb-3 mb-4">
            <Calendar size={18} className="text-[#C5A059]" />
            <input
              type="text"
              placeholder="Add Dates"
              className="bg-transparent text-sm w-full outline-none placeholder-neutral-500 text-white"
            />
          </div>

          {/* Search Button */}
          <button className="w-full bg-[#C5A059] hover:bg-[#b08d4b] text-black font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
            SEARCH
          </button>
        </div>
      </div>

      {/* Near You Section */}
      <div className="px-6 flex-1">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-white">Near You</h3>
          <span className="text-xs text-[#C5A059] cursor-pointer">
            View All
          </span>
        </div>

        <div className="flex flex-col gap-5 pb-24">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#1E1E1E] rounded-2xl p-3 flex gap-4 border border-neutral-800 shadow-md"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-bold text-base text-white">{hotel.name}</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {hotel.location} • {hotel.distance}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[#C5A059] font-bold text-sm">
                    {hotel.price}{" "}
                    <span className="text-neutral-500 font-normal text-xs">
                      / night
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full h-20 bg-black/95 backdrop-blur-lg border-t border-neutral-800 flex justify-around items-center px-2 pb-2">
        <NavIcon
          icon={<Home size={22} />}
          label="Home"
          active={activeTab === "Home"}
          onClick={() => setActiveTab("Home")}
        />
        <NavIcon
          icon={<Compass size={22} />}
          label="Explore"
          active={activeTab === "Explore"}
          onClick={() => setActiveTab("Explore")}
        />
        <NavIcon
          icon={<Heart size={22} />}
          label="Saved"
          active={activeTab === "Saved"}
          onClick={() => setActiveTab("Saved")}
        />
        <NavIcon
          icon={<User size={22} />}
          label="Profile"
          active={activeTab === "Profile"}
          onClick={() => setActiveTab("Profile")}
        />
      </div>
    </div>
  );
};

// --- Helper Component: Nav Icon ---
const NavIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${active ? "text-[#C5A059]" : "text-neutral-500 hover:text-neutral-300"}`}
  >
    {icon}
    <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>
      {label}
    </span>
  </button>
);

export default Aureus;
