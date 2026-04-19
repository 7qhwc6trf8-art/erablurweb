import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { useTelegram } from './hooks/useTelegram';
import { RootState } from './app/store';
import { setTheme } from './app/features/theme/themeSlice';

import Header from './ui/Header';
import BottomNav from './ui/BottomNav';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import HeroDetail from './pages/HeroDetail';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  const { tg } = useTelegram();
  const { mode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  
  useEffect(() => {
    tg.ready();
    tg.expand();
    
    // Auto-detect system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [tg, mode]);
  
  useEffect(() => {
    if (mode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode]);
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--tg-bg)]">
        <Header />
        
        <main className="pt-14">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heroes" element={<Heroes />} />
              <Route path="/hero/:id" element={<HeroDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <BottomNav />
      </div>
      
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: 'var(--tg-secondary-bg)',
            color: 'var(--tg-text)',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;