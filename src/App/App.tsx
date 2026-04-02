import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Компоненты (ПУТИ И НАЗВАНИЯ ИСПРАВЛЕНЫ)
import Header from '../components/Header/Header';
import RamConfiguration from '../components/RamConfiguration/RamConfiguration';
import PowerConfiguration from '../components/PowerConfiguration/PowerConfiguration';
import FanConfiguration from '../components/FanConfiguration/FanConfiguration'; 
import IIOConfiguration from '../components/IIOConfiguration/IIOConfiguration';
import CSMConfiguration from '../components/CSMConfiguration/CSMConfiguration';
import PCIConfiguration from '../components/PCIConfiguration/PCIConfiguration'; 

// Стили
import './styles/global.css';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="main-shell">
        <Header />
        <main className="content">
          <Routes>
            {/* Основные маршруты — ТЕПЕРЬ С КОНФИГУРАЦИЯМИ */}
            <Route path="/ram" element={<RamConfiguration />} />
            <Route path="/power" element={<PowerConfiguration />} />
            <Route path="/fan" element={<FanConfiguration />} />
            <Route path="/iio" element={<IIOConfiguration />} />
            <Route path="/csm" element={<CSMConfiguration />} />
            <Route path="/pci" element={<PCIConfiguration />} />
            
            {/* Редирект по умолчанию на страницу RAM */}
            <Route path="*" element={<Navigate to="/ram" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
