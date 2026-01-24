import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JapaneseRestaurant from "./pages/JapaneseRestaurant";
import VintageMillenary from "./pages/VintageMillenary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jp-res" element={<JapaneseRestaurant />} />
        <Route path="/vin-hats" element={<VintageMillenary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
