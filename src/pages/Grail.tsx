import React, { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingBag, Menu, ArrowRight, Check } from "lucide-react";

// --- Theme & Constants ---
const THEME = {
  bg: "bg-[#080808]", // Void Black
  text: "text-white",
  accent: "bg-[#CCFF00]", // Acid Green
  accentText: "text-[#CCFF00]",
  border: "border-[#222222]",
};

// --- Tailwind v4 Config Injection ---
// Adds custom animations for the pulsing dot and the success state
const tailwindConfig = `
@theme {
  --animate-pulse-fast: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-pop-in: pop-in 0.3s ease-out forwards;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes pop-in {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
`;

// =========================================
// Main Grail Component
// =========================================
const Grail: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212] font-sans p-4 sm:p-8 select-none overflow-hidden">
      <style>{tailwindConfig}</style>

      {/* Phone Frame */}
      <div
        className={`relative w-full max-w-[390px] h-[844px] ${THEME.bg} rounded-[50px] border-[10px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10`}
      >
        {/* Status Bar Placeholder */}
        <div className="absolute top-0 w-full h-12 flex items-end justify-between px-8 pb-2 z-50 pointer-events-none text-white mix-blend-difference opacity-80">
          <span className="text-xs font-bold tracking-tighter">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2.5 bg-white rounded-sm"></div>
            <div className="w-6 h-2.5 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Main Content */}
        <HomeScreen />

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};

// =========================================
// Home Screen Component
// =========================================
const HomeScreen: React.FC = () => {
  // Simple countdown timer logic
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 23); // 14m 23s in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const sizes = ["3.5", "9", "9.5", "10", "11.5", "12"];
  const selectedSize = "3.5";

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-14 pb-4 z-20">
        <Menu className="text-white w-6 h-6 opacity-80" />
        <h1 className="text-2xl font-black italic tracking-tighter text-white">
          GRAIL
        </h1>
        <div className="relative">
          <ShoppingBag className="text-white w-6 h-6 opacity-80" />
          <div
            className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 ${THEME.accent} rounded-full border-2 border-[#080808]`}
          ></div>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        {/* --- Hero Section --- */}
        <div className="relative h-[400px] w-full flex flex-col items-center justify-start pt-10 overflow-visible">
          {/* Background Text graphic */}
          <h1 className="absolute top-10 text-[140px] font-black italic text-white/5 leading-none select-none tracking-tighter truncate">
            "AIR"
          </h1>

          {/* Floating Sneaker Image */}
          {/* Using a placeholder that resembles the Off-White style */}
          <img
            src="https://images.unsplash.com/photo-1605348532760-6753d5c43329?auto=format&fit=crop&q=80&w=600"
            alt="Off-White Sneaker"
            className="relative z-10 w-[80%] object-contain -rotate-[15deg] drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)] filter saturate-[0.8] contrast-[1.1]"
          />

          {/* Live Drop Timer Overlay */}
          <div className="absolute bottom-0 left-6 z-20">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-2 h-2 ${THEME.accent} rounded-full animate-pulse-fast shadow-[0_0_10px_#CCFF00]`}
              ></div>
              <span
                className={`text-[10px] font-bold ${THEME.accentText} uppercase tracking-widest`}
              >
                Live Drop
              </span>
            </div>
            <h2 className="text-4xl font-mono font-bold text-white tracking-tight tabular-nums">
              {formatTime(timeLeft)}
            </h2>
          </div>
        </div>

        {/* --- Product Details --- */}
        <div className="px-6 mt-6 flex-1">
          <div>
            <h3 className="text-3xl font-black italic uppercase text-white leading-none tracking-tight">
              Nike Air Max
            </h3>
            <p className="text-neutral-400 text-sm font-medium mt-1 tracking-wide">
              Off-White 'The Ten'
            </p>
            <div className="mt-3 flex items-baseline gap-3">
              <span
                className={`block text-xl font-black italic ${THEME.accentText} tracking-tight`}
              >
                $1,250
              </span>
              <span className="text-xs text-neutral-500 uppercase font-bold tracking-wide line-through decoration-neutral-500/50">
                Retail $190
              </span>
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8 overflow-visible">
            <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {sizes.map((size) => {
                const isSelected = size === selectedSize;
                return (
                  <div
                    key={size}
                    className={`min-w-[52px] h-[52px] flex items-center justify-center font-bold text-sm rounded-[14px] border transition-all duration-200 ${isSelected ? `${THEME.accent} text-black border-transparent shadow-[0_0_15px_#CCFF0040]` : `${THEME.border} text-neutral-500 bg-[#111]`}`}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- Sticky Footer: Slider --- */}
      <div className="w-full px-6 pb-10 pt-4 bg-gradient-to-t from-[#080808] via-[#080808] to-transparent z-30">
        <SliderToCop />
      </div>
    </div>
  );
};

// =========================================
// Custom Interactive Slider Component
// =========================================
const SliderToCop: React.FC = () => {
  const [dragWidth, setDragWidth] = useState(0);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Dimensions (hardcoded based on styling below for simplicity)
  const containerHeight = 64;
  const padding = 4;
  const knobSize = containerHeight - padding * 2; // 56px

  // --- Interaction Logic ---
  const handleStart = useCallback(
    (clientX: number) => {
      if (success) return;
      isDragging.current = true;
      startX.current = clientX - dragWidth; // Account for current position
    },
    [dragWidth, success],
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging.current || success || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      // Max drag distance is container width minus the knob width and padding
      const maxDrag = containerWidth - knobSize - padding * 2;

      let newWidth = clientX - startX.current;
      // Clamp between 0 and maxDrag
      newWidth = Math.max(0, Math.min(newWidth, maxDrag));

      setDragWidth(newWidth);

      // Check for completion (if dragged more than 95% of the way)
      if (newWidth >= maxDrag * 0.95) {
        isDragging.current = false;
        setDragWidth(maxDrag);
        setSuccess(true);
      }
    },
    [success, knobSize],
  );

  const handleEnd = useCallback(() => {
    if (success) return;
    isDragging.current = false;
    // Snap back if not complete
    setDragWidth(0);
  }, [success]);

  // Global event listeners for smooth dragging outside the element
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    if (isDragging.current) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleMove, handleEnd]); // Depend on memoized handlers

  // --- Visual Calculation ---
  // Opacity of the text fades as you drag
  const textOpacity = 1 - dragWidth / 200;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[64px] rounded-[32px] bg-[#1a1a1a] border-2 ${THEME.border} overflow-hidden flex items-center p-[4px] transition-all duration-300 ${success ? "border-[#CCFF00] shadow-[0_0_20px_#CCFF0040]" : ""}`}
    >
      {/* 1. Background Text Label */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-sm font-black italic uppercase tracking-widest text-white transition-opacity duration-200 pointer-events-none`}
        style={{ opacity: success ? 0 : textOpacity }}
      >
        Slide to Cop
      </div>

      {/* 2. Progress Fill Layer (Grows behind knob) */}
      <div
        className={`absolute left-[4px] top-[4px] bottom-[4px] rounded-[28px] ${THEME.accent} transition-all ${isDragging.current ? "duration-0" : "duration-300 ease-out"}`}
        style={{ width: `${dragWidth + knobSize}px` }}
      ></div>

      {/* 3. Draggable Knob */}
      <div
        className={`relative z-10 h-[56px] w-[56px] rounded-full ${THEME.accent} flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform ${isDragging.current ? "duration-0" : "duration-300 ease-out"}`}
        style={{ transform: `translateX(${dragWidth}px)` }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        {success ? (
          <Check
            className="text-black w-6 h-6 animate-pop-in"
            strokeWidth={3}
          />
        ) : (
          <ArrowRight className="text-black w-6 h-6" strokeWidth={3} />
        )}
      </div>

      {/* Success Message Overlay */}
      {success && (
        <div className="absolute inset-0 flex items-center justify-center pl-8 pointer-events-none animate-pop-in">
          <span className="text-black font-black italic uppercase tracking-widest">
            COPPED!
          </span>
        </div>
      )}
    </div>
  );
};

export default Grail;
