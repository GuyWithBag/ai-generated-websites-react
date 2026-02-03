import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Settings,
  Play,
  Pause,
  RotateCcw,
  History,
  User,
  Timer,
} from "lucide-react";

// --- Constants & Configuration ---
const MAX_TIME_MINUTES = 60;
const DEFAULT_FOCUS_TIME = 25 * 60;
const DEFAULT_BREAK_TIME = 5 * 60;

// Colors
const COLORS = {
  bg: "bg-[#F7F5F2]",
  text: "text-[#4A5568]",
  focus: {
    hex: "#8EB8A6", // Sage Green
    class: "text-[#8EB8A6]",
    bg: "bg-[#8EB8A6]",
  },
  break: {
    hex: "#FFB38E", // Soft Orange
    class: "text-[#FFB38E]",
    bg: "bg-[#FFB38E]",
  },
  navActive: "text-[#8EB8A6]", // Color for active nav item
  navInactive: "text-stone-400", // Color for inactive nav item
};

// --- Helper: Format seconds to MM:SS ---
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// --- Tailwind v4 Config (Injected for Wave Animation) ---
const tailwindConfig = `
@theme {
  --animate-wave: wave 8s linear infinite;
  --animate-fade-in: fade-in 0.5s ease-out forwards;
}
@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

// =========================================
// Main TimerApp Component
// =========================================
const TimerApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"timer" | "history" | "account">(
    "timer",
  );

  // Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-200 font-sans p-8">
      <style>{tailwindConfig}</style>

      {/* Phone Frame */}
      <div
        className={`relative w-[375px] h-[812px] ${COLORS.bg} rounded-[50px] border-[12px] border-white shadow-2xl overflow-hidden`}
      >
        {/* Status Bar */}
        <div className="absolute top-0 w-full h-12 flex items-end justify-between px-8 pb-2 z-50 pointer-events-none">
          <span className="text-xs font-medium text-stone-400">9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2.5 bg-stone-300 rounded-sm"></div>
            <div className="w-6 h-2.5 bg-stone-300 rounded-sm"></div>
          </div>
        </div>

        {/* Conditional Render: Loading vs Home */}
        {loading ? (
          <LoadingScreen />
        ) : (
          <HomeScreen activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-stone-300 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};

// =========================================
// 1. Loading Screen Component
// =========================================
const LoadingScreen: React.FC = () => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${COLORS.bg} animate-fade-in`}
    >
      <div className="relative flex items-center justify-center mb-8">
        <div
          className={`absolute w-32 h-32 rounded-full ${COLORS.focus.bg} opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`}
        ></div>
        <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.focus.hex}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      </div>
      <h1
        className={`text-2xl font-medium ${COLORS.text} tracking-wider animate-pulse`}
      >
        Flow
      </h1>
    </div>
  );
};

// =========================================
// 2. Home Screen (Timer) Component
// =========================================
interface HomeScreenProps {
  activeTab: "timer" | "history" | "account";
  setActiveTab: (tab: "timer" | "history" | "account") => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ activeTab, setActiveTab }) => {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(DEFAULT_FOCUS_TIME);

  const dialRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic Theme based on mode
  const currentTheme = mode === "focus" ? COLORS.focus : COLORS.break;

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Handlers
  const handleModeChange = (newMode: "focus" | "break") => {
    setMode(newMode);
    setIsActive(false);
    const newTime =
      newMode === "focus" ? DEFAULT_FOCUS_TIME : DEFAULT_BREAK_TIME;
    setTimeLeft(newTime);
    setTotalTime(newTime);
  };

  const resetTimer = () => {
    setIsActive(false);
    const newTime = mode === "focus" ? DEFAULT_FOCUS_TIME : DEFAULT_BREAK_TIME;
    setTimeLeft(newTime);
    setTotalTime(newTime);
  };

  // --- Interaction Logic ---
  const handleDialInteraction = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dialRef.current) return;

      const dialRect = dialRef.current.getBoundingClientRect();
      const centerX = dialRect.left + dialRect.width / 2;
      const centerY = dialRect.top + dialRect.height / 2;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Calculate angle (0 degrees at top)
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      angle = angle + 90;
      if (angle < 0) angle += 360;

      // Map to minutes
      let newMinutes = Math.round((angle / 360) * MAX_TIME_MINUTES);
      if (newMinutes === 0) newMinutes = 60;

      // Update state
      const newTime = newMinutes * 60;
      setTimeLeft(newTime);
      setTotalTime(newTime); // Update total time to match user selection for progress bar
      setIsActive(false);
    },
    [],
  );

  // Global Drag Listeners
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) handleDialInteraction(e as any);
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, handleDialInteraction]);

  // --- Visual Calcs ---
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  // Invert angle for knob so it moves clockwise as time depletes
  const knobAngle = (timeLeft / MAX_TIME_MINUTES) * 360;

  // SVG Ring Calcs
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (timeLeft / (MAX_TIME_MINUTES * 60)) * circumference;

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      {/* Main Content Container with padding for top and bottom nav */}
      <div className="flex flex-col h-full px-8 pt-12 pb-24">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="w-6"></div>
          <h1 className={`text-xl font-semibold ${COLORS.text}`}>Flow</h1>
          <button className="text-stone-400 hover:text-stone-600 transition">
            <Settings size={24} />
          </button>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-stone-200/50 p-1 rounded-full flex font-medium">
            <button
              onClick={() => handleModeChange("focus")}
              className={`px-8 py-2.5 rounded-full transition-all duration-300 ${mode === "focus" ? "bg-white shadow-sm text-[#4A5568]" : "text-stone-400"}`}
            >
              Focus
            </button>
            <button
              onClick={() => handleModeChange("break")}
              className={`px-8 py-2.5 rounded-full transition-all duration-300 ${mode === "break" ? "bg-white shadow-sm text-[#4A5568]" : "text-stone-400"}`}
            >
              Break
            </button>
          </div>
        </div>

        {/* Main Timer Dial */}
        <div className="flex-1 flex items-center justify-center relative">
          <div
            ref={dialRef}
            className="relative w-[280px] h-[280px] flex items-center justify-center"
          >
            {/* LAYER 1: Fluid Wave (Background) */}
            <div className="absolute w-[240px] h-[240px] rounded-full bg-white shadow-inner overflow-hidden z-0 pointer-events-none">
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out opacity-50`}
                style={{
                  height: `${progress * 100}%`,
                  backgroundColor: currentTheme.hex,
                }}
              >
                <svg
                  className="absolute -top-[18px] left-0 w-[200%] h-5 animate-wave"
                  preserveAspectRatio="none"
                  viewBox="0 0 1200 120"
                >
                  <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill={currentTheme.hex}
                  ></path>
                </svg>
              </div>
            </div>

            {/* LAYER 2: SVG Progress Ring */}
            <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg] z-10 pointer-events-none">
              <circle
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="12"
              />
              <circle
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke={currentTheme.hex}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-linear"
              />
            </svg>

            {/* LAYER 3: Text */}
            <div className="absolute z-20 flex flex-col items-center pointer-events-none select-none">
              <h2 className={`text-5xl font-bold ${COLORS.text}`}>
                {formatTime(timeLeft)}
              </h2>
              <p className="text-stone-400 font-medium mt-1">
                {isActive ? "Remaining" : "Set Time"}
              </p>
            </div>

            {/* LAYER 4: The Knob (Visual only) */}
            <div
              className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none transition-transform duration-75 ease-out"
              style={{ transform: `rotate(${knobAngle}deg)` }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full`}
                  style={{ backgroundColor: currentTheme.hex }}
                ></div>
              </div>
            </div>

            {/* LAYER 5: INTERACTIVE LAYER (Invisible, on top) */}
            <div
              className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing rounded-full"
              onMouseDown={(e) => {
                setIsDragging(true);
                handleDialInteraction(e);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                handleDialInteraction(e);
              }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-around mb-4 px-4">
          <button
            onClick={resetTimer}
            className="flex flex-col items-center gap-2 text-stone-500 hover:text-stone-700 transition"
          >
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
              <RotateCcw size={22} />
            </div>
            <span className="text-sm font-medium">Reset</span>
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300`}
            style={{ backgroundColor: currentTheme.hex }}
          >
            {isActive ? (
              <Pause size={40} fill="white" stroke="white" />
            ) : (
              <Play size={40} fill="white" stroke="white" className="ml-1" />
            )}
          </button>

          <div className="w-14 flex flex-col items-center opacity-0">
            <div className="w-14 h-14"></div>
            <span className="text-sm">Reset</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 w-full h-20 bg-white border-t border-stone-100 flex justify-around items-center px-2 pb-4 rounded-b-[40px] shadow-[0_-5px_15px_rgba(0,0,0,0.03)] z-40">
        <NavIcon
          icon={<History size={22} />}
          label="History"
          active={activeTab === "history"}
          onClick={() => setActiveTab("history")}
        />
        <NavIcon
          icon={<Timer size={22} />}
          label="Timer"
          active={activeTab === "timer"}
          onClick={() => setActiveTab("timer")}
        />
        <NavIcon
          icon={<User size={22} />}
          label="Account"
          active={activeTab === "account"}
          onClick={() => setActiveTab("account")}
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
    className={`flex flex-col items-center gap-1 p-2 w-16 transition-all ${active ? COLORS.navActive : COLORS.navInactive} hover:text-stone-600`}
  >
    {icon}
    <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>
      {label}
    </span>
  </button>
);

export default TimerApp;
