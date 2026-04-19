import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { toggleFavorite } from '../app/features/cart/heroesSlice';
import { useTelegram } from '../hooks/useTelegram';

interface HeroCardProps {
  hero: {
    id: number;
    name: string;
    title: string;
    image: string;
    description: string;
  };
  onClick: () => void;
  index: number;
}

export default function HeroCard({ hero, onClick, index }: HeroCardProps) {
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();
  const favorites = useSelector((state: RootState) => state.heroes.favorites);
  const isFavorite = favorites.includes(hero.id);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback.impact('light');
    dispatch(toggleFavorite(hero.id));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="tg-card cursor-pointer active:scale-98 transition-all"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center overflow-hidden shrink-0">
          {hero.image ? (
            <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-xl font-bold">{hero.name[0]}</span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-[var(--tg-text)]">{hero.name}</h3>
              <p className="text-sm text-[var(--tg-hint)]">{hero.title}</p>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleFavorite}
              className="p-1 shrink-0"
            >
              <Heart
                size={20}
                className={isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-[var(--tg-hint)]'}
              />
            </motion.button>
          </div>
          
          <p className="text-sm text-[var(--tg-hint)] mt-1 line-clamp-2">
            {hero.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}