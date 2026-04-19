import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { useTelegram } from '../hooks/useTelegram';
import { setTheme } from '../app/features/theme/themeSlice';
import { Heart, Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCard from '../ui/HeroCard';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, hapticFeedback } = useTelegram();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, list } = useSelector((state: RootState) => state.heroes);
  const { mode } = useSelector((state: RootState) => state.theme);
  
  const favoriteHeroes = list.filter(hero => favorites.includes(hero.id));
  
  const themeOptions = [
    { mode: 'light', icon: Sun, label: 'Light' },
    { mode: 'dark', icon: Moon, label: 'Dark' },
    { mode: 'system', icon: Monitor, label: 'System' },
  ];
  
  return (
    <div className="pb-20">
      {/* User Info */}
      <div className="px-4 py-6 text-center border-b border-[var(--tg-secondary-bg)]">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center mb-3">
          <span className="text-3xl font-bold text-white">
            {user?.first_name?.[0] || '👤'}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-[var(--tg-text)]">
          {user?.first_name} {user?.last_name}
        </h2>
        <p className="text-sm text-[var(--tg-hint)]">@{user?.username}</p>
      </div>
      
      {/* Theme Settings */}
      <div className="px-4 py-4 border-b border-[var(--tg-secondary-bg)]">
        <h3 className="text-sm font-semibold text-[var(--tg-text)] mb-3">Theme</h3>
        <div className="flex gap-2">
          {themeOptions.map(({ mode: themeMode, icon: Icon, label }) => (
            <motion.button
              key={themeMode}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                hapticFeedback.impact('light');
                dispatch(setTheme(themeMode as any));
              }}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition ${
                mode === themeMode
                  ? 'bg-[var(--tg-button)] text-[var(--tg-button-text)]'
                  : 'bg-[var(--tg-secondary-bg)] text-[var(--tg-hint)]'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Favorites */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-red-500" />
            <h3 className="font-semibold text-[var(--tg-text)]">Favorites</h3>
          </div>
          <span className="text-xs text-[var(--tg-hint)]">{favorites.length} heroes</span>
        </div>
        
        {favoriteHeroes.length === 0 ? (
          <div className="text-center py-8 bg-[var(--tg-secondary-bg)] rounded-xl">
            <Heart size={32} className="mx-auto text-[var(--tg-hint)] mb-2" />
            <p className="text-sm text-[var(--tg-hint)]">No favorite heroes yet</p>
            <p className="text-xs text-[var(--tg-hint)] mt-1">
              Tap the heart icon on any hero to add them here
            </p>
          </div>
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
      </div>
    </div>
  );
}