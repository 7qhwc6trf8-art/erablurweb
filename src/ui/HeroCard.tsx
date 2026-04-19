import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
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
  
  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback?.impact('light');
    dispatch(toggleFavorite(hero.id));
  };
  
  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 30 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="tg-card cursor-pointer active:scale-98 transition-all relative overflow-hidden group"
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 opacity-0 group-hover:opacity-100"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
      />
      
      <div className="flex gap-4 p-4">
        {/* Avatar with animation */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center overflow-hidden shrink-0 shadow-lg"
        >
          {hero.image ? (
            <motion.img
              src={hero.image}
              alt={hero.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-xl font-bold"
            >
              {hero.name[0]}
            </motion.span>
          )}
        </motion.div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-semibold text-[17px] text-[var(--tg-text)]"
              >
                {hero.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-[var(--tg-hint)]"
              >
                {hero.title}
              </motion.p>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.7 }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  scale: isFavorite ? [1, 1.2, 1] : 1,
                }}
                onClick={handleFavorite}
                className="p-2 shrink-0 rounded-full hover:bg-white/10 transition"
              >
                <motion.div
                  animate={{
                    scale: isFavorite ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${
                      isFavorite
                        ? 'fill-red-500 stroke-red-500'
                        : 'stroke-[var(--tg-hint)] group-hover:stroke-red-400'
                    }`}
                  />
                </motion.div>
              </motion.button>
              
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="text-[var(--tg-hint)]"
              >
                <ChevronRight size={18} />
              </motion.div>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[var(--tg-hint)] mt-2 line-clamp-2 leading-relaxed"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}