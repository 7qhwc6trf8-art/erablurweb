import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { setSearchQuery, resetFilters } from '../app/features/cart/heroesSlice';
import { useState } from 'react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.heroes.searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}
    >
      <motion.div
        animate={{
          boxShadow: isFocused ? '0 0 0 2px var(--tg-button)' : 'none',
        }}
        className="relative rounded-xl overflow-hidden"
      >
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--tg-hint)] z-10"
        />
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search heroes..."
          className="w-full py-3.5 pl-11 pr-12 bg-[var(--tg-secondary-bg)] text-[var(--tg-text)] placeholder:text-[var(--tg-hint)] outline-none text-base"
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(resetFilters())}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
            >
              <X size={16} className="text-[var(--tg-hint)]" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Animated search indicator */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-0 text-xs text-[var(--tg-hint)]"
        >
          Type to search heroes by name or title
        </motion.div>
      )}
    </motion.div>
  );
}