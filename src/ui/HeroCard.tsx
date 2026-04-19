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

export default function HeroCard({
  hero,
  onClick,
  index,
}: HeroCardProps) {
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();
  const favorites = useSelector((s: RootState) => s.heroes.favorites);

  const isFavorite = favorites.includes(hero.id);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback?.impact("light");
    dispatch(toggleFavorite(hero.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        relative group cursor-pointer
        rounded-3xl overflow-hidden
        bg-gradient-to-br from-white/5 to-white/[0.02]
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* ✨ Animated gradient border */}
      <div className="absolute inset-0 p-[1px] rounded-3xl">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/20 via-indigo-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* 🌟 Shine sweep effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        animate={{ x: ["-120%", "120%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4 p-4">
        {/* 🧿 AVATAR (with aura glow) */}
        <div className="relative w-16 h-16 shrink-0">
          {/* outer glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl"
          />

          {/* ring */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* avatar */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="relative w-16 h-16 rounded-full
              bg-gradient-to-br from-red-500 via-pink-500 to-yellow-500
              flex items-center justify-center
              text-white font-bold text-lg
              shadow-lg"
          >
            {hero.name[0]}
          </motion.div>
        </div>

        {/* 📄 CONTENT */}
        <div className="flex-1 min-w-0">
          <motion.h3
            className="font-semibold text-[15px] text-[var(--tg-text)]"
            whileHover={{ x: 2 }}
          >
            {hero.name}
          </motion.h3>

          <p className="text-xs text-[var(--tg-hint)]">
            {hero.title}
          </p>

          <p className="text-xs text-[var(--tg-hint)] mt-2 line-clamp-2 leading-relaxed opacity-80">
            {hero.description}
          </p>
        </div>

        {/* ⚡ ACTIONS */}
        <div className="flex flex-col items-center gap-2">
          {/* favorite */}
          <motion.button
            whileTap={{ scale: 0.7 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleFav}
            className="relative p-2 rounded-full transition"
          >
            <motion.div
              animate={
                isFavorite
                  ? { scale: [1, 1.4, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={18}
                className={
                  isFavorite
                    ? "fill-red-500 stroke-red-500 drop-shadow-lg"
                    : "stroke-[var(--tg-hint)]"
                }
              />
            </motion.div>

            {/* pulse dot */}
            {isFavorite && (
              <motion.span
                className="absolute inset-0 rounded-full bg-red-500/20"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* arrow */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="text-[var(--tg-hint)]"
          >
            <ChevronRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* 🌈 bottom glow line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
}