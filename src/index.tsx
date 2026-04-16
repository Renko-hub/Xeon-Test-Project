import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import './global.css';

import Header from './components/Header/Header';

import CSMConfiguration from './components/CSMConfiguration/CSMConfiguration';
import FanConfiguration from './components/FanConfiguration/FanConfiguration';
import IIOConfiguration from './components/IIOConfiguration/IIOConfiguration';
import PCIConfiguration from './components/PCIConfiguration/PCIConfiguration';
import PowerConfiguration from './components/PowerConfiguration/PowerConfiguration';
import RAMConfiguration from './components/RamConfiguration/RamConfiguration';

const App = () => (
  <HashRouter>
    <Header />
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/ram" replace />} />
    
        <Route path="/ram" element={<RAMConfiguration />} />
        <Route path="/power" element={<PowerConfiguration />} />
        <Route path="/iio" element={<IIOConfiguration />} />
        <Route path="/csm" element={<CSMConfiguration />} />
        <Route path="/fan" element={<FanConfiguration />} />
        <Route path="/pci" element={<PCIConfiguration />} />
        
        <Route path="*" element={<Navigate to="/ram" replace />} />
      </Routes>
    </main>
  </HashRouter>
);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
