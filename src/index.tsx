import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import "./global.css";

import Header from "./components/Header/Header";

import About from "./components/About/AboutConfiguration"; // Изменили путь здесь
import AdvancedConfiguration from "./components/AdvancedConfiguration/AdvancedConfiguration";
import CSMConfiguration from "./components/CSMConfiguration/CSMConfiguration";
import DRAMConfiguration from "./components/DRAMConfiguration/DRAMConfiguration";
import FanConfiguration from "./components/FanConfiguration/FanConfiguration";
import FivrConfiguration from "./components/FivrConfiguration/FivrConfiguration";
import IIOConfiguration from "./components/IIOConfiguration/IIOConfiguration";
import MemoryConfiguration from "./components/MemoryConfiguration/MemoryConfiguration";
import PCIConfiguration from "./components/PCIConfiguration/PCIConfiguration";
import PowerConfiguration from "./components/PowerConfiguration/PowerConfiguration";
import RAMConfiguration from "./components/RamConfiguration/RamConfiguration";
import ThermalConfiguration from "./components/ThermalConfiguration/ThermalConfiguration";
import USBConfiguration from "./components/USBConfiguration/USBConfiguration";

const App = () => (
  <HashRouter>
    <Header />
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/ram" replace />} />
        <Route path="/ram" element={<RAMConfiguration />} />
        <Route path="/memory" element={<MemoryConfiguration />} />
        <Route path="/dram" element={<DRAMConfiguration />} />
        <Route path="/thermal" element={<ThermalConfiguration />} />
        <Route path="/fivr" element={<FivrConfiguration />} />
        <Route path="/power" element={<PowerConfiguration />} />
        <Route path="/advanced" element={<AdvancedConfiguration />} />
        <Route path="/iio" element={<IIOConfiguration />} />
        <Route path="/csm" element={<CSMConfiguration />} />
        <Route path="/usb" element={<USBConfiguration />} />
        <Route path="/fan" element={<FanConfiguration />} />
        <Route path="/pci" element={<PCIConfiguration />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/ram" replace />} />
      </Routes>
    </main>
  </HashRouter>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
