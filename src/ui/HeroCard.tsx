import { motion } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { toggleFavorite } from "../app/features/cart/heroesSlice";
import { useTelegram } from "../hooks/useTelegram";

interface HeroCardProps {
  hero: any;
  onClick: () => void;
  index: number;
}

export default function HeroCard({ hero, onClick, index }: HeroCardProps) {
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();
  const favorites = useSelector((state: RootState) => state.heroes.favorites);
  const isFavorite = favorites.includes(hero.id);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback?.impact("light");
    dispatch(toggleFavorite(hero.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring" }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
      className="
        relative overflow-hidden rounded-2xl
        bg-[var(--tg-secondary-bg)]
        border border-white/10
        shadow-lg backdrop-blur-xl
        cursor-pointer
      "
    >
      {/* Glow hover effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      <div className="flex gap-4 p-4 relative z-10">
        {/* Avatar */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold">
            {hero.name[0]}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--tg-text)]">
            {hero.name}
          </h3>
          <p className="text-sm text-[var(--tg-hint)]">{hero.title}</p>

          <p className="text-xs text-[var(--tg-hint)] mt-2 line-clamp-2">
            {hero.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleFav}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Heart
              size={18}
              className={
                isFavorite
                  ? "fill-red-500 stroke-red-500"
                  : "stroke-[var(--tg-hint)]"
              }
            />
          </button>

          <ChevronRight size={18} className="text-[var(--tg-hint)]" />
        </div>
      </div>
    </motion.div>
  );
}