import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { setSearchQuery, resetFilters } from '../app/features/cart/heroesSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.heroes.searchQuery);
  
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tg-hint)]"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search heroes..."
        className="w-full py-3 pl-10 pr-10 rounded-xl bg-[var(--tg-secondary-bg)] text-[var(--tg-text)] placeholder:text-[var(--tg-hint)] outline-none"
      />
      {searchQuery && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(resetFilters())}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X size={16} className="text-[var(--tg-hint)]" />
        </motion.button>
      )}
    </div>
  );
}