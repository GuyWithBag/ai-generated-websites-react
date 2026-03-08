import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { websites } from "./shared/websites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {websites.map((site) => (
          <Route key={site.path} path={site.path} element={site.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
