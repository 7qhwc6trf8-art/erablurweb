import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { setSearchQuery, resetFilters } from '../app/features/cart/heroesSlice';
import { useMemo, useState } from 'react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.heroes.searchQuery);

  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // demo suggestions (replace with real data later)
  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return [
      'Armenian Heroes',
      'War Legends',
      'National Leaders',
      'Freedom Fighters',
      'Historical Figures',
    ].filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'war', label: 'War Heroes' },
    { id: 'leaders', label: 'Leaders' },
    { id: 'culture', label: 'Cultural' },
  ];

  return (
    <div className="relative">
      {/* SEARCH BOX */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative transition-all duration-300 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}
      >
        <motion.div
          animate={{
            boxShadow: isFocused ? '0 0 0 2px var(--tg-button)' : 'none',
          }}
          className="relative rounded-xl overflow-hidden"
        >
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--tg-hint)]"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search heroes..."
            className="w-full py-3.5 pl-11 pr-20 bg-[var(--tg-secondary-bg)] text-[var(--tg-text)] placeholder:text-[var(--tg-hint)] outline-none text-base"
          />

          {/* RIGHT ACTIONS */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters((p) => !p)}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <Filter size={16} className="text-[var(--tg-hint)]" />
            </motion.button>

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(resetFilters())}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X size={16} className="text-[var(--tg-hint)]" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* 🔮 SUGGESTIONS DROPDOWN */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute z-50 mt-2 w-full
              bg-[var(--tg-secondary-bg)]
              border border-white/10
              rounded-xl overflow-hidden
              backdrop-blur-xl
              shadow-xl
            "
          >
            {suggestions.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                onMouseDown={() => dispatch(setSearchQuery(item))}
                className="
                  px-4 py-3 text-sm
                  text-[var(--tg-text)]
                  hover:bg-white/10
                  cursor-pointer
                "
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎛 MINI FILTER DROPDOWN */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="
              absolute right-0 mt-2 z-50
              w-44
              bg-[var(--tg-secondary-bg)]
              border border-white/10
              rounded-xl overflow-hidden
              backdrop-blur-xl
              shadow-xl
            "
          >
            {filters.map((f) => (
              <motion.div
                key={f.id}
                whileHover={{ x: 4 }}
                onClick={() => {
                  console.log('filter:', f.id);
                  setShowFilters(false);
                }}
                className="
                  px-4 py-3 text-sm
                  text-[var(--tg-text)]
                  hover:bg-white/10
                  cursor-pointer
                "
              >
                {f.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}