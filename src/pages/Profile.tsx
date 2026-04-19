// src/pages/Profile.tsx
// ULTRA PREMIUM PRO MAX 2026 DESIGN - Profile Page with Complete Animations

import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { useTelegram } from '../hooks/useTelegram';
import { setTheme } from '../app/features/theme/themeSlice';
import { 
  Heart, 
  Sun, 
  Moon, 
  Monitor, 
  TrendingUp, 
  Award, 
  LogOut,
  Settings,
  Star,
  Crown,
  Shield,
  Sparkles,
  ChevronRight,
  Bell,
  Lock,
  Globe,
  MessageCircle
} from 'lucide-react';
import HeroCard from '../ui/HeroCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { buttonHover, fadeInUp, pageVariants, slideInLeft } from './HeroDetail';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};


const buttonTap = { scale: 0.97 };

// ==================== STAT CARD COMPONENT ====================

interface StatCardProps {
  icon: React.FC<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}

function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <motion.div
      custom={delay}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 25 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative overflow-hidden bg-[var(--tg-secondary-bg)] rounded-2xl p-4 text-center group"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
      />
      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={22} style={{ color }} />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: delay + 0.1 }}
          className="text-2xl font-bold text-[var(--tg-text)]"
        >
          {value}
        </motion.div>
        <div className="text-xs text-[var(--tg-hint)] mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

// ==================== SETTING ITEM COMPONENT ====================

interface SettingItemProps {
  icon: React.FC<{ size?: number }>;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  isLast?: boolean;
}

// ==================== MAIN PROFILE COMPONENT ====================

export default function Profile() {
  const { user, hapticFeedback, tg } = useTelegram();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, list } = useSelector((state: RootState) => state.heroes);
  const { mode } = useSelector((state: RootState) => state.theme);
  const [currentTime, setCurrentTime] = useState('');
  
  const favoriteHeroes = list.filter(hero => favorites.includes(hero.id));
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const greeting = hours < 12 ? 'Morning' : hours < 18 ? 'Afternoon' : 'Evening';
      setCurrentTime(greeting);
    };
    updateTime();
  }, []);
  
  const themeOptions = [
    { mode: 'light', icon: Sun, label: 'Light', color: '#f59e0b' },
    { mode: 'dark', icon: Moon, label: 'Dark', color: '#6366f1' },
    { mode: 'system', icon: Monitor, label: 'System', color: '#10b981' },
  ];
  
  const stats = [
    { icon: Heart, label: 'Favorites', value: favorites.length, color: '#ef4444' },
    { icon: Award, label: 'Heroes', value: list.length, color: '#8b5cf6' },
    { icon: TrendingUp, label: 'Streak', value: '7 days', color: '#10b981' },
  ];
  
  const settingsItems = [
    { icon: Bell, title: 'Notifications', subtitle: 'Daily hero reminders' },
    { icon: Globe, title: 'Language', subtitle: 'English / Հայերեն' },
    { icon: Lock, title: 'Privacy', subtitle: 'Manage your data' },
    { icon: MessageCircle, title: 'Support', subtitle: 'Get help' },
  ];
  
  const handleLogout = () => {
    hapticFeedback?.impact('heavy');
    toast.success('See you soon!', { icon: '👋', duration: 2000 });
    setTimeout(() => tg.close(), 500);
  };
  
  const handleThemeChange = (themeMode: 'light' | 'dark' | 'system') => {
    hapticFeedback?.impact('light');
    dispatch(setTheme(themeMode));
    toast.success(`${themeMode.charAt(0).toUpperCase() + themeMode.slice(1)} mode activated`, {
      icon: themeMode === 'light' ? '☀️' : themeMode === 'dark' ? '🌙' : '🖥️',
      duration: 1500,
    });
  };
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pb-24 overflow-x-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 0%, rgba(239, 68, 68, 0.1), transparent 60%)',
              'radial-gradient(ellipse at 70% 10%, rgba(245, 158, 11, 0.1), transparent 60%)',
              'radial-gradient(ellipse at 50% 20%, rgba(168, 85, 247, 0.1), transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />
      </div>
      
      {/* Header Profile Section */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative bg-gradient-to-br from-red-600/40 via-red-500/20 to-yellow-600/30 pt-12 pb-16 overflow-hidden"
      >
        {/* Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        
        <div className="relative text-center px-4">
          {/* Avatar with Ring Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-28 h-28 mx-auto mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500"
              style={{ padding: '3px' }}
            >
              <div className="w-full h-full rounded-full bg-[var(--tg-bg)]" />
            </motion.div>
            <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold text-white"
              >
                {user?.first_name?.[0]?.toUpperCase() || '👤'}
              </motion.span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-3 border-[var(--tg-bg)]"
            />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[var(--tg-text)]"
          >
            {user?.first_name} {user?.last_name || ''}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[var(--tg-hint)] mt-1"
          >
            @{user?.username || 'heroes_museum_user'}
          </motion.p>
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mt-4"
          >
            <Sparkles size={12} className="text-yellow-400" />
            <span className="text-xs text-[var(--tg-text)]">Heroes Museum Member</span>
            <Crown size={12} className="text-yellow-400" />
          </motion.div>
          
          {/* Welcome Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-xs text-[var(--tg-hint)]"
          >
            Good {currentTime}, Hero Guardian
          </motion.div>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-3 gap-3 px-4 -mt-8 mb-6 relative z-10"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </motion.div>
      
      {/* Theme Settings Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mx-4 mb-6"
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <motion.div
            whileHover={{ rotate: 90 }}
            className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center"
          >
            <Settings size={12} className="text-purple-400" />
          </motion.div>
          <h3 className="text-sm font-semibold text-[var(--tg-text)]">Appearance</h3>
        </div>
        
        <div className="bg-[var(--tg-secondary-bg)] rounded-2xl p-2">
          <div className="flex gap-2">
            {themeOptions.map(({ mode: themeMode, icon: Icon, label, color }) => (
              <motion.button
                key={themeMode}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleThemeChange(themeMode as any)}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  mode === themeMode
                    ? 'bg-[var(--tg-button)] text-[var(--tg-button-text)] shadow-lg'
                    : 'bg-white/5 text-[var(--tg-hint)] hover:bg-white/10'
                }`}
                style={
                  mode === themeMode
                    ? { boxShadow: `0 4px 12px ${color}40` }
                    : {}
                }
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Favorites Section */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="px-4 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center"
            >
              <Heart size={14} className="text-red-400" />
            </motion.div>
            <h3 className="font-semibold text-[var(--tg-text)]">Favorite Heroes</h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xs text-[var(--tg-hint)] bg-white/5 px-2 py-1 rounded-full"
          >
            {favorites.length} hero{favorites.length !== 1 ? 'es' : ''}
          </motion.div>
        </div>
        
        <AnimatePresence mode="wait">
          {favoriteHeroes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16 bg-[var(--tg-secondary-bg)] rounded-2xl"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💔
              </motion.div>
              <p className="text-sm text-[var(--tg-hint)]">No favorite heroes yet</p>
              <p className="text-xs text-[var(--tg-hint)] mt-2">
                Tap the heart icon on any hero to add them here
              </p>
              <motion.button
                whileTap={buttonTap}
                whileHover={buttonHover}
                onClick={() => navigate('/heroes')}
                className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 text-white text-sm font-medium"
              >
                Explore Heroes
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <AnimatePresence mode="popLayout">
                {favoriteHeroes.map((hero: any, index) => (
                  <motion.div
                    key={hero.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <HeroCard
                      hero={hero}
                      onClick={() => navigate(`/hero/${hero.id}`)}
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Actions */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mx-4"
      >
        <motion.button
          whileTap={buttonTap}
          whileHover={buttonHover}
          onClick={handleLogout}
          className="w-full py-4 rounded-2xl bg-red-500/20 text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-500/30 transition-all duration-300"
        >
          <LogOut size={18} />
          Close App
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-6"
        >
          <p className="text-xs text-[var(--tg-hint)]">
            Version 2.0.0 • Made with <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block"
            >
              ❤️
            </motion.span> for Armenian Heroes
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Shield size={10} className="text-[var(--tg-hint)]" />
            <span className="text-[10px] text-[var(--tg-hint)]">Eternal Glory</span>
            <Star size={10} className="text-yellow-500" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}