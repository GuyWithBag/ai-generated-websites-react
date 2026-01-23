import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JapaneseRestaurant from "./pages/JapaneseRestaurant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jp-res" element={<JapaneseRestaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
