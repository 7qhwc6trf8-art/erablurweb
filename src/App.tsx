// src/App.tsx - COMPLETE WITH 60% FRAMER MOTION + PAGE TRANSITIONS

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { useTelegram } from './hooks/useTelegram';
import { type RootState } from './app/store';

import Header from './ui//Header';
import BottomNav from './ui/BottomNav';
import Home from './pages/Home';
import Heroes from './pages/Heroes';
import HeroDetail from './pages/HeroDetail';
import Profile from './pages/Profile';
import About from './pages/About';
import { type Variants } from 'framer-motion'

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -80,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    x: 80,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

// Floating particles animation
const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-indigo-500/30"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: 0,
        }}
        animate={{
          y: [null, -100, -200],
          x: [null, Math.random() * 100 - 50, Math.random() * 200 - 100],
          opacity: [0, 1, 0],
          scale: [0, Math.random() * 2 + 1, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/heroes"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10"
            >
              <Heroes />
            </motion.div>
          }
        />
        <Route
          path="/hero/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10"
            >
              <HeroDetail />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10"
            >
              <Profile />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10"
            >
              <About />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { tg } = useTelegram();
  const { mode } = useSelector((state: RootState) => state.theme);
  
  useEffect(() => {
    tg.ready();
    tg.expand();
    
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
    <div className="min-h-screen bg-[var(--tg-bg)] relative">
      <FloatingParticles />
      <Header />
      <main className="pb-20 relative z-10">
        <AnimatedRoutes />
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: 'var(--tg-secondary-bg)',
            color: 'var(--tg-text)',
            borderRadius: '14px',
            padding: '12px 16px',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;