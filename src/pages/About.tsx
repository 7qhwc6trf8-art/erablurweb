import { motion } from 'framer-motion';
import { Heart, Globe, Mail } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export default function About() {
  const { hapticFeedback } = useTelegram();
  
  return (
    <div className="pb-20">
      <div className="px-4 py-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center mb-4"
        >
          <span className="text-4xl">🏛️</span>
        </motion.div>
        
        <h1 className="text-2xl font-bold text-[var(--tg-text)]">Heroes Museum</h1>
        <p className="text-sm text-[var(--tg-hint)] mt-1">Version 2.0.0</p>
        
        <p className="text-[var(--tg-text)] mt-6 leading-relaxed">
          Heroes Museum is dedicated to preserving the memory of Armenian national heroes 
          who sacrificed their lives for the homeland.
        </p>
      </div>
      
      <div className="px-4 space-y-4">
        <div className="tg-card">
          <h3 className="font-semibold text-[var(--tg-text)] mb-2">Features</h3>
          <ul className="space-y-2 text-sm text-[var(--tg-hint)]">
            <li>• Browse heroes by name</li>
            <li>• Save favorites</li>
            <li>• Detailed biographies</li>
            <li>• Dark/Light/System theme</li>
            <li>• Telegram native integration</li>
          </ul>
        </div>
        
        <div className="tg-card">
          <h3 className="font-semibold text-[var(--tg-text)] mb-2">Technology</h3>
          <ul className="space-y-2 text-sm text-[var(--tg-hint)]">
            <li>• React 18 + TypeScript</li>
            <li>• Redux Toolkit</li>
            <li>• Framer Motion</li>
            <li>• Telegram WebApp SDK</li>
            <li>• Tailwind CSS</li>
          </ul>
        </div>
        
        <div className="tg-card">
          <h3 className="font-semibold text-[var(--tg-text)] mb-2">Contact</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[var(--tg-button)]"
              onClick={() => hapticFeedback.impact('light')}
            >
              <Mail size={16} />
              support@heroesmuseum.com
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[var(--tg-button)]"
              onClick={() => hapticFeedback.impact('light')}
            >
              <Globe size={16} />
              heroesmuseum.am
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center py-6">
        <p className="text-xs text-[var(--tg-hint)]">
          Made with <Heart size={10} className="inline text-red-500" /> for Armenian heroes
        </p>
      </div>
    </div>
  );
}