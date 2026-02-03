import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JapaneseRestaurant from "./pages/JapaneseRestaurant";
import VintageMillenary from "./pages/VintageMillenary";
import ShoeStore from "./pages/ShoeStore";
import FidgetStore from "./pages/FidgetStore";
import CanvasAndRain from "./pages/CanvasAndRain";
import Aureus from "./pages/Aureus";
import TimerApp from "./pages/TimerApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jp-res" element={<JapaneseRestaurant />} />
        <Route path="/vin-hats" element={<VintageMillenary />} />
        <Route path="/shoe-store" element={<ShoeStore />} />
        <Route path="/fid-store" element={<FidgetStore />} />
        <Route path="/can-rain" element={<CanvasAndRain />} />
        <Route path="/aureus" element={<Aureus />} />
        <Route path="/timer" element={<TimerApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
