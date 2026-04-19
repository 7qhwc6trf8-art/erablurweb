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
      className="pb-24"
    >
      {/* Header Profile Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gradient-to-br from-red-600/30 to-yellow-600/30 pt-8 pb-12"
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
        
        <div className="relative text-center px-4">
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
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-[var(--tg-text)]"
          >
            {user?.first_name} {user?.last_name}
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mt-3"
          >
            <span className="text-xs text-yellow-500">🏆</span>
            <span className="text-xs text-[var(--tg-text)]">Heroes Museum Member</span>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 px-4 my-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[var(--tg-secondary-bg)] rounded-2xl p-4 text-center"
          >
            <stat.icon size={22} style={{ color: stat.color, margin: '0 auto 8px' }} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: index * 0.1 + 0.2 }}
              className="text-2xl font-bold text-[var(--tg-text)]"
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-[var(--tg-hint)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      
      {/* Theme Settings */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mx-4 mb-6 p-5 rounded-2xl bg-[var(--tg-secondary-bg)]"
      >
        <h3 className="text-sm font-semibold text-[var(--tg-text)] mb-3">Appearance</h3>
        <div className="flex gap-2">
          {themeOptions.map(({ mode: themeMode, icon: Icon, label, color }) => (
            <motion.button
              key={themeMode}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                hapticFeedback?.impact('light');
                dispatch(setTheme(themeMode as any));
              }}
              className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                mode === themeMode
                  ? 'bg-[var(--tg-button)] text-[var(--tg-button-text)] shadow-lg'
                  : 'bg-white/5 text-[var(--tg-hint)]'
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
            >
              <Heart size={20} className="text-red-500 fill-red-500" />
            </motion.div>
            <h3 className="font-semibold text-[var(--tg-text)]">Favorite Heroes</h3>
          </div>
          <span className="text-xs text-[var(--tg-hint)]">{favorites.length} heroes</span>
        </div>
        
        {favoriteHeroes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-[var(--tg-secondary-bg)] rounded-2xl"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-3"
            >
              💔
            </motion.div>
            <p className="text-sm text-[var(--tg-hint)]">No favorite heroes yet</p>
            <p className="text-xs text-[var(--tg-hint)] mt-1">
              Tap the heart icon on any hero to add them here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {favoriteHeroes.map((hero, index) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                onClick={() => navigate(`/hero/${hero.id}`)}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Actions */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mx-4"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-4 rounded-xl bg-red-500/20 text-red-500 font-medium flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Close App
        </motion.button>
        
        <p className="text-center text-xs text-[var(--tg-hint)] mt-4 pb-4">
          Version 2.0.0 • Made with ❤️ for Armenian Heroes
        </p>
      </motion.div>
    </motion.div>
  );
}