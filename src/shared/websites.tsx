import JapaneseRestaurant from "../pages/JapaneseRestaurant";
import VintageMillenary from "../pages/VintageMillenary";
import ShoeStore from "../pages/ShoeStore";
import FidgetStore from "../pages/FidgetStore";
import CanvasAndRain from "../pages/CanvasAndRain";
import Aureus from "../pages/Aureus";
import TimerApp from "../pages/TimerApp";
import Onyx from "../pages/Onyx";
import Grail from "../pages/Grail";
import type { Website } from "./types";

export const websites: Website[] = [
  {
    name: "Japanese Restaurant",
    path: "/jp-res",
    element: <JapaneseRestaurant />,
  },
  {
    name: "Vintage Millenary",
    path: "/vin-hats",
    element: <VintageMillenary />,
  },
  { name: "Shoe Store", path: "/shoe-store", element: <ShoeStore /> },
  { name: "Fidget Store", path: "/fid-store", element: <FidgetStore /> },
  { name: "Canvas & Rain", path: "/can-rain", element: <CanvasAndRain /> },
  { name: "Aureus", path: "/aureus", element: <Aureus /> },
  { name: "Timer App", path: "/timer", element: <TimerApp /> },
  { name: "Onyx", path: "/onyx", element: <Onyx /> },
  { name: "Grail", path: "/grail", element: <Grail /> },
];
