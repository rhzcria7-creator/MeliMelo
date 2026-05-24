/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Personagens from './pages/Personagens';
import Musicas from './pages/Musicas';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';

import AIAssistant from './components/AIAssistant';

import LoadingScreen from './components/LoadingScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoadingScreen />
      <div className="flex flex-col min-h-screen relative selection:bg-meli-pink selection:text-white">
        <Navbar />
        
        <main className="flex-1 flex flex-col relative z-10 w-full pt-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personagens" element={<Personagens />} />
              <Route path="/musicas" element={<Musicas />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <AIAssistant />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
