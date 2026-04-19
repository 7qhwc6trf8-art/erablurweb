import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import HeroCard from '../ui/HeroCard';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const heroes = useSelector((state: RootState) => state.heroes.filteredList);
  const featuredHeroes = heroes.slice(0, 5);

  return (
    <div className="pb-28"> {/* Increased padding for nav clearance */}
      {/* Welcome Section */}
      <div className="px-6 py-10"> {/* Enhanced paddings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-extrabold text-[var(--tg-text)]">
            🇦🇲 Heroes Museum
          </h1>
          <p className="text-base text-[var(--tg-hint)] mt-2">
            Honoring our national heroes
          </p>
          {user && (
            <p className="text-sm text-[var(--tg-hint)] mt-3">
              Welcome, <span className="text-[var(--tg-button)] font-medium">{user.first_name}</span>! 🕊️
            </p>
          )}
        </motion.div>
      </div>
      
      {/* Featured Heroes Section */}
      <div className="px-6"> {/* Unified px-6 padding */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[var(--tg-text)]">
            Featured Heroes
          </h2>
          <button
            onClick={() => navigate('/heroes')}
            className="text-sm font-semibold text-[var(--tg-button)] bg-[var(--tg-button)]/10 px-3 py-1 rounded-full"
          >
            See all →
          </button>
        </div>
        
        <div className="space-y-4"> {/* Increased card spacing */}
          {featuredHeroes.map((hero, index) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onClick={() => navigate(`/hero/${hero.id}`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}