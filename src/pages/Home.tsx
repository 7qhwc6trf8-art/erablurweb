import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import HeroCard from '../ui/HeroCard';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';

export default function Home() {
  const navigate = useNavigate();
  const heroes = useSelector((state: RootState) => state.heroes.filteredList);
  const featuredHeroes = heroes.slice(0, 5);
  
  return (
    <div className="pb-20">
      {/* Welcome Section */}
      <div className="mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <img src="/banner.png" alt="" />
        </motion.div>
      </div>
      
      {/* Featured Heroes */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[var(--tg-text)]">
            Featured Heroes
          </h2>
          <button
            onClick={() => navigate('/heroes')}
            className="text-sm text-[var(--tg-button)]"
          >
            See all →
          </button>
        </div>
        
        <div className="space-y-3">
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