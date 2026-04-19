import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import HeroCard from '../ui/HeroCard';
import SearchBar from '../ui/SearchBar';
import { Users } from 'lucide-react';

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Heroes() {
  const navigate = useNavigate();
  const { filteredList, searchQuery } = useSelector((state: RootState) => state.heroes);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[var(--tg-bg)]/95 backdrop-blur-lg px-4 pt-4 pb-3 border-b border-[var(--tg-secondary-bg)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
        
        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Users size={14} className="text-[var(--tg-hint)]" />
          <span className="text-xs text-[var(--tg-hint)]">
            {filteredList.length} hero{filteredList.length !== 1 ? 'es' : ''} found
          </span>
          {searchQuery && (
            <span className="text-xs text-[var(--tg-button)]">
              for "{searchQuery}"
            </span>
          )}
        </motion.div>
      </div>
      
      {/* Heroes List */}
      <div className="px-4 pt-4">
        <AnimatePresence mode="wait">
          {filteredList.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🕯️
              </motion.div>
              <p className="text-[var(--tg-hint)]">No heroes found</p>
              <p className="text-sm text-[var(--tg-hint)] mt-1">
                Try a different search term
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {filteredList.map((hero, index) => (
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  onClick={() => navigate(`/hero/${hero.id}`)}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}