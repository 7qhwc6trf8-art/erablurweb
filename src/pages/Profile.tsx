import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { useTelegram } from '../hooks/useTelegram';
import { setTheme } from '../app/features/theme/themeSlice';
import { Heart, Sun, Moon, Monitor, TrendingUp, Award, LogOut } from 'lucide-react';
import HeroCard from '../ui/HeroCard';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Fix for TS1192: Added default export
export default function Profile() {
  const { user, hapticFeedback, tg } = useTelegram();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, list } = useSelector((state: RootState) => state.heroes);
  const { mode } = useSelector((state: RootState) => state.theme);
  
  const favoriteHeroes = list.filter(hero => favorites.includes(hero.id));

  const themeOptions = [
    { mode: 'light', icon: Sun, label: 'Light', color: '#f59e0b' },
    { mode: 'dark', icon: Moon, label: 'Dark', color: '#6366f1' },
    { mode: 'system', icon: Monitor, label: 'System', color: '#10b981' },
  ];

  // Fix for TS2552: Declaring the missing 'stats' variable
  const stats = [
    { icon: Heart, label: 'Favorites', value: favorites.length, color: '#ef4444' },
    { icon: Award, label: 'Visited', value: list.length, color: '#8b5cf6' },
    { icon: TrendingUp, label: 'Streak', value: '7', color: '#10b981' },
  ];

  const handleLogout = () => {
    hapticFeedback?.impact('heavy');
    tg.close();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-28" // Added extra bottom padding for navigation clearance
    >
      {/* Header Profile Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gradient-to-br from-red-600/30 to-yellow-600/30 pt-12 pb-16" // Increased padding
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="relative text-center px-6"> {/* Increased side padding */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center mb-4 shadow-xl"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-white"
            >
              {user?.first_name?.[0] || '👤'}
            </motion.span>
          </motion.div>
          
          <motion.h2 className="text-2xl font-bold text-[var(--tg-text)]">
            {user?.first_name} {user?.last_name}
          </motion.h2>
          <motion.p className="text-sm text-[var(--tg-hint)] mt-1">
            @{user?.username || 'heroes_museum_user'}
          </motion.p>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 px-6 -mt-8 mb-8"> {/* Enhanced spacing and padding */}
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[var(--tg-secondary-bg)] rounded-2xl p-5 text-center shadow-sm" // Increased internal padding
          >
            <stat.icon size={22} style={{ color: stat.color, margin: '0 auto 8px' }} />
            <div className="text-2xl font-bold text-[var(--tg-text)]">{stat.value}</div>
            <div className="text-xs text-[var(--tg-hint)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Theme Settings */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mx-6 mb-8 p-6 rounded-2xl bg-[var(--tg-secondary-bg)]" // Increased padding and margins
      >
        <h3 className="text-sm font-semibold text-[var(--tg-text)] mb-4">Appearance</h3>
        <div className="flex gap-3">
          {themeOptions.map(({ mode: themeMode, icon: Icon, label, color }) => (
            <motion.button
              key={themeMode}
              onClick={() => {
                hapticFeedback?.impact('light');
                dispatch(setTheme(themeMode as any)); // Fix for TS7006: Explicit typing
              }}
              className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                mode === themeMode
                  ? 'bg-[var(--tg-button)] text-[var(--tg-button-text)]'
                  : 'bg-white/5 text-[var(--tg-hint)]'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Favorites Section */}
      <div className="px-6 mb-8">
         <h3 className="font-semibold text-[var(--tg-text)] mb-4">Favorite Heroes</h3>
         <div className="space-y-4">
            {favoriteHeroes.map((hero, index) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onClick={() => navigate(`/hero/${hero.id}`)}
                index={index}
              />
            ))}
         </div>
      </div>
      
      <div className="px-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-5 rounded-2xl bg-red-500/10 text-red-500 font-bold flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Close Application
        </motion.button>
      </div>
    </motion.div>
  );
}