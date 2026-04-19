import { motion } from 'framer-motion';
import { useTelegram } from '../hooks/useTelegram';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({ title, showBack }: HeaderProps) {
  const { user, hapticFeedback } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    hapticFeedback.impact('light');
    navigate(-1);
  };
  
  const isHome = location.pathname === '/';
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-[var(--tg-bg)]/80 backdrop-blur-lg border-b border-[var(--tg-secondary-bg)]"
    >
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {showBack && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-1 -ml-1"
            >
              <ChevronLeft size={24} className="text-[var(--tg-text)]" />
            </motion.button>
          )}
          
          {isHome && !showBack && (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏛️</span>
            </div>
          )}
          
          <h1 className="text-lg font-semibold text-[var(--tg-text)]">
            {title || 'Heroes Museum'}
          </h1>
        </div>
        
        {/* Right - User Avatar */}
        {user && (
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--tg-secondary-bg)] flex items-center justify-center">
              <span className="text-sm font-medium text-[var(--tg-text)]">
                {user.first_name?.[0] || 'U'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}