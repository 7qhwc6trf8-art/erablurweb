import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { toggleFavorite } from '../app/features/cart/heroesSlice';
import { Heart, ArrowLeft, Calendar, Award } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';

export default function HeroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();
  
  const hero = useSelector((state: RootState) =>
    state.heroes.list.find(h => h.id === Number(id))
  );
  
  const isFavorite = useSelector((state: RootState) =>
    state.heroes.favorites.includes(Number(id))
  );
  
  if (!hero) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--tg-hint)]">Hero not found</p>
        <button onClick={() => navigate('/')} className="tg-button mt-4">
          Go Home
        </button>
      </div>
    );
  }
  
  const handleFavorite = () => {
    hapticFeedback.impact('light');
    dispatch(toggleFavorite(hero.id));
  };
  
  return (
    <div className="pb-20">
      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-br from-red-600 to-yellow-600">
        {hero.image && (
          <img src={hero.image} alt={hero.name} className="w-full h-full object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-md"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-md"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-white'}
          />
        </button>
        
        {/* Hero Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">{hero.name}</h1>
          <p className="text-white/80 text-sm mt-1">{hero.title}</p>
        </div>
      </div>
      
      {/* Hero Info */}
      <div className="px-4 py-4 space-y-4">
        {/* Dates */}
        {(hero.birthDate || hero.deathDate) && (
          <div className="flex items-center gap-2 text-sm text-[var(--tg-hint)]">
            <Calendar size={16} />
            <span>
              {hero.birthDate && `${hero.birthDate}`}
              {hero.birthDate && hero.deathDate && ' — '}
              {hero.deathDate && `${hero.deathDate}`}
            </span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-[var(--tg-text)] leading-relaxed">
          {hero.description}
        </p>
        
        {/* Achievements */}
        {hero.achievements && hero.achievements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-[var(--tg-button)]" />
              <h3 className="font-semibold text-[var(--tg-text)]">Achievements</h3>
            </div>
            
            <ul className="space-y-2">
              {hero.achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-[var(--tg-hint)]"
                >
                  <span className="text-[var(--tg-button)]">•</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}