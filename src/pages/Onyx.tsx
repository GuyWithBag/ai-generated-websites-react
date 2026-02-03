import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Home,
  BarChart2,
  Wallet,
  Settings,
  Bell,
  User,
  ArrowDown,
  X,
  Check,
} from "lucide-react";

// --- Configuration ---
const DAILY_BUDGET = 320.0;

// --- Colors & Theme ---
// We use a "Matte Black" base with "Platinum" accents
const THEME = {
  bg: "bg-[#0A0A0A]", // Deep matte black
  cardGlass: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl",
  cardGlassBack: "bg-white/5 backdrop-blur-sm border border-white/5",
  text: "text-[#E0E0E0]", // Platinum
  textDim: "text-[#808080]",
  accent: "text-white",
};

// --- Tailwind v4 Configuration ---
const tailwindConfig = `
@theme {
  --animate-fade-out: fade-out 0.8s ease-out forwards;
  --animate-slide-up: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; pointer-events: none; }
}
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
`;

// =========================================
// Main Onyx Component
// =========================================
const Onyx: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const startY = useRef<number>(0);

  // Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // --- Drag Logic for "Pull to Add" ---
  const handleStart = (clientY: number) => {
    if (showTransactionInput) return;
    setIsDragging(true);
    startY.current = clientY;
  };

  const handleMove = (clientY: number) => {
    if (!isDragging || showTransactionInput) return;
    const delta = clientY - startY.current;

    // Only allow pulling down, with resistance (logarithmic-ish)
    if (delta > 0) {
      const resistance = delta * 0.5;
      setDragY(Math.min(resistance, 200)); // Cap at 200px
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (dragY > 120) {
      // Threshold reached
      setShowTransactionInput(true);
    }
    setDragY(0);
  };

  // Event Listeners for Drag
  const onTouchStart = (e: React.TouchEvent) =>
    handleStart(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientY);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientY);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] font-sans p-8 select-none">
      <style>{tailwindConfig}</style>

      {/* Phone Frame */}
      <div
        className={`relative w-[375px] h-[812px] ${THEME.bg} rounded-[50px] border-[12px] border-[#1f1f1f] shadow-2xl overflow-hidden`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {/* Status Bar */}
        <div className="absolute top-0 w-full h-12 flex items-end justify-between px-8 pb-2 z-50 pointer-events-none text-white">
          <span className="text-xs font-medium opacity-80">9:41</span>
          <div className="flex gap-1 opacity-80">
            <div className="w-4 h-2.5 bg-white rounded-sm"></div>
            <div className="w-6 h-2.5 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && <LoadingScreen />}

        {/* Main Content Area (Moves when dragged) */}
        <div
          className="relative h-full flex flex-col transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${dragY}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {/* Header */}
          <header className="flex justify-between items-center px-8 pt-16 pb-8">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
              <User size={20} className="text-white opacity-80" />
            </div>
            <h1 className="text-2xl font-light tracking-[0.2em] text-white">
              ONYX
            </h1>
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Bell size={20} className="text-white opacity-80" />
            </div>
          </header>

          {/* Home Screen Content */}
          <div className="flex-1 flex flex-col items-center pt-8">
            {/* --- The Glass Card Stack --- */}
            <div className="relative w-full h-[320px] flex items-center justify-center perspective-1000">
              {/* Back Card 2 */}
              <div
                className={`absolute w-[280px] h-[180px] rounded-[30px] ${THEME.cardGlassBack} opacity-40`}
                style={{ transform: `translateY(-30px) scale(0.85)` }}
              ></div>

              {/* Back Card 1 */}
              <div
                className={`absolute w-[290px] h-[190px] rounded-[30px] ${THEME.cardGlassBack} opacity-70`}
                style={{ transform: `translateY(-15px) scale(0.92)` }}
              ></div>

              {/* Main Card (Hero) */}
              <div
                className={`relative w-[300px] h-[200px] rounded-[30px] ${THEME.cardGlass} flex flex-col justify-between p-6 z-10 transition-transform duration-300`}
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-full bg-white/20 blur-[1px]"></div>
                  <div className="text-[10px] font-bold tracking-widest text-white/60 border border-white/20 px-2 py-1 rounded-full uppercase">
                    Debit
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl font-light text-white tracking-tight">
                    ${DAILY_BUDGET.toFixed(2)}
                  </h2>
                  <p className="text-sm text-white/50 mt-1 font-medium tracking-wide">
                    Daily Remaining
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-white w-[60%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                </div>
              </div>
            </div>

            {/* --- Pull Indicator --- */}
            <div className="mt-12 flex flex-col items-center gap-3 opacity-50 animate-pulse">
              <ArrowDown size={20} className="text-white" />
              <p className="text-xs uppercase tracking-[0.2em] text-white font-medium">
                Pull to add transaction
              </p>
            </div>

            {/* Visual Feedback text when pulling */}
            <div
              className="absolute top-[-50px] left-0 w-full flex justify-center items-end pb-4 transition-opacity duration-300"
              style={{ opacity: dragY > 50 ? 1 : 0 }}
            >
              <span className="text-white text-sm font-medium tracking-widest uppercase">
                + New Entry
              </span>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="h-24 w-full flex justify-around items-start pt-6 border-t border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
            <NavIcon icon={<Home size={22} />} label="Home" active />
            <NavIcon icon={<BarChart2 size={22} />} label="Analytics" />
            <NavIcon icon={<Wallet size={22} />} label="Wallet" />
            <NavIcon icon={<Settings size={22} />} label="Settings" />
          </div>
        </div>

        {/* --- Transaction Input Overlay (Slides Up) --- */}
        {showTransactionInput && (
          <div className="absolute inset-0 z-40 flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTransactionInput(false)}
            ></div>

            <div className="relative w-full h-[85%] bg-[#121212] rounded-t-[40px] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] animate-slide-up flex flex-col p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-12">
                <button
                  onClick={() => setShowTransactionInput(false)}
                  className="p-2 bg-white/5 rounded-full text-white/60 hover:bg-white/10 hover:text-white transition"
                >
                  <X size={24} />
                </button>
                <span className="text-sm uppercase tracking-widest text-white/50">
                  New Expense
                </span>
                <div className="w-10"></div>
              </div>

              {/* Amount Input */}
              <div className="flex flex-col items-center mb-12">
                <div className="flex items-start">
                  <span className="text-3xl text-white/40 mt-2">$</span>
                  <input
                    type="text"
                    placeholder="0"
                    autoFocus
                    className="bg-transparent text-7xl font-light text-white text-center w-full outline-none placeholder-white/10 caret-white"
                  />
                </div>
              </div>

              {/* Quick Categories */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <CategoryBtn label="Coffee" />
                <CategoryBtn label="Groceries" />
                <CategoryBtn label="Transport" />
                <CategoryBtn label="Food" />
              </div>

              {/* Submit Button */}
              <button
                className="mt-auto w-full py-5 bg-white rounded-2xl flex items-center justify-center gap-2 text-black font-bold tracking-wider hover:bg-gray-200 transition"
                onClick={() => setShowTransactionInput(false)}
              >
                <Check size={20} strokeWidth={3} />
                ADD TRANSACTION
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================
// Sub-Components
// =========================================

const LoadingScreen: React.FC = () => {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] animate-fade-out"
      style={{ animationDelay: "2s" }}
    >
      <div className="relative w-24 h-24 mb-8">
        {/* Eclipse Effect */}
        <div className="absolute inset-0 rounded-full border-[1px] border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-t-[1px] border-l-[1px] border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-spin duration-[3s]"></div>
      </div>
      <h1 className="text-3xl font-light tracking-[0.3em] text-white animate-pulse">
        ONYX
      </h1>
    </div>
  );
};

const NavIcon: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1.5 transition-colors ${active ? "text-white" : "text-white/30 hover:text-white/60"}`}
  >
    {icon}
    <span
      className={`text-[9px] uppercase tracking-widest ${active ? "opacity-100" : "opacity-0"}`}
    >
      {label}
    </span>
  </button>
);

const CategoryBtn: React.FC<{ label: string }> = ({ label }) => (
  <button className="py-4 bg-white/5 border border-white/5 rounded-2xl text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition active:scale-95">
    {label}
  </button>
);

export default Onyx;
