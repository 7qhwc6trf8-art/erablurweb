import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import HeroCard from '../ui/HeroCard';
import SearchBar from '../ui/SearchBar';
import { motion } from 'framer-motion';

export default function Heroes() {
  const navigate = useNavigate();
  const { filteredList, searchQuery } = useSelector((state: RootState) => state.heroes);
  
  return (
    <div className="pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-[var(--tg-bg)] px-4 py-3">
        <SearchBar />
      </div>
      
      {/* Results Count */}
      <div className="px-4 mb-3">
        <p className="text-xs text-[var(--tg-hint)]">
          {filteredList.length} heroes found
        </p>
      </div>
      
      {/* Heroes List */}
      <div className="px-4 space-y-3">
        {filteredList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[var(--tg-hint)]">No heroes found</p>
            <p className="text-sm text-[var(--tg-hint)] mt-1">
              Try a different search term
            </p>
          </motion.div>
        ) : (
          filteredList.map((hero, index) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onClick={() => navigate(`/hero/${hero.id}`)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}