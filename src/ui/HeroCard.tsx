// src/components/ui/HeroCard.tsx
// ULTRA PREMIUM PRO MAX 2026 DESIGN - Hero Card with Armenian Hero Data Structure

import { motion } from "framer-motion";
import { Heart, ChevronRight, Shield, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { toggleFavorite } from "../app/features/cart/heroesSlice";
import { useTelegram } from "../hooks/useTelegram";

interface HeroCardProps {
  hero: {
    id: number;
    name: { first: string; last: string };
    date: { birth: string; dead: string };
    region: string;
    war: string;
    img_url: string;
    bio_link: string;
    bio: string;
  };
  onClick: () => void;
  index: number;
}

// Helper to get display name
const getDisplayName = (hero: HeroCardProps["hero"]): string => {
  return `${hero.name.first} ${hero.name.last}`;
};

// Helper to get short bio preview
const getShortBio = (bio: string): string => {
  if (!bio) return "Հայոց հերոս";
  // Remove HTML tags
  const cleanText = bio.replace(/<[^>]*>/g, " ");
  // Get first 80 characters
  return cleanText.slice(0, 80).trim() + (cleanText.length > 80 ? "..." : "");
};

// Helper to get war badge color
const getWarBadgeColor = (war: string): string => {
  if (war.includes("44") || war.includes("44-օրյա")) return "from-red-600 to-red-800";
  if (war.includes("Արցախ")) return "from-orange-600 to-orange-800";
  if (war.includes("1990")) return "from-blue-600 to-blue-800";
  return "from-gray-600 to-gray-800";
};

export default function HeroCard({ hero, onClick, index }: HeroCardProps) {
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();
  const favorites = useSelector((s: RootState) => s.heroes.favorites);

  const isFavorite = favorites.includes(hero.id);
  const displayName = getDisplayName(hero);
  const shortBio = getShortBio(hero.bio);
  const warBadgeColor = getWarBadgeColor(hero.war);
  const initial = hero.name.first?.[0] || hero.name.last?.[0] || "Հ";

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    hapticFeedback?.impact("light");
    dispatch(toggleFavorite(hero.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.8,
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        relative group cursor-pointer
        rounded-2xl overflow-hidden
        bg-[var(--tg-secondary-bg)]
        border border-white/10
        shadow-lg
        transition-all duration-300
      "
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-yellow-500 to-red-500" />
      </div>

      {/* Shine sweep effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        animate={{
          x: ["-150%", "150%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.5,
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      <div className="relative z-10 flex items-center gap-4 p-4">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          {/* Outer glow animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-red-500/30 blur-xl"
          />

          {/* Pulsing ring */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
          />

          {/* Avatar image or initial */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative w-16 h-16 rounded-full
              bg-gradient-to-br from-red-500 via-red-600 to-yellow-600
              flex items-center justify-center
              text-white font-bold text-xl
              shadow-xl overflow-hidden
            "
          >
            {hero.img_url ? (
              <img
                src={hero.img_url}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
          </motion.div>

          {/* War badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
            className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white bg-gradient-to-r shadow-lg"
            style={{ backgroundImage: `linear-gradient(to right, ${warBadgeColor})` }}
          >
            ⚔️
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <motion.h3
              className="font-bold text-base text-[var(--tg-text)]"
              whileHover={{ x: 2 }}
            >
              {displayName}
            </motion.h3>
            {hero.war && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-[var(--tg-hint)]">
                {hero.war.length > 15 ? hero.war.slice(0, 12) + "..." : hero.war}
              </span>
            )}
          </div>

          <p className="text-xs text-[var(--tg-hint)] flex items-center gap-1">
            <Shield size={10} className="text-red-400" />
            {hero.region || "Հայաստան"}
          </p>

          <p className="text-xs text-[var(--tg-hint)] mt-2 line-clamp-2 leading-relaxed opacity-80">
            {shortBio}
          </p>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col items-center gap-2">
          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.7 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleFav}
            className="relative p-2 rounded-full transition hover:bg-white/5"
          >
            <motion.div
              animate={
                isFavorite
                  ? { scale: [1, 1.3, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Heart
                size={18}
                className={
                  isFavorite
                    ? "fill-red-500 stroke-red-500 drop-shadow-lg"
                    : "stroke-[var(--tg-hint)] group-hover:stroke-red-400"
                }
              />
            </motion.div>

            {/* Pulse effect for favorites */}
            {isFavorite && (
              <motion.span
                className="absolute inset-0 rounded-full bg-red-500/30"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Arrow indicator */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[var(--tg-hint)] opacity-60 group-hover:opacity-100 transition"
          >
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Star decoration for favorites */}
      {isFavorite && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-2 right-2"
        >
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
        </motion.div>
      )}
    </motion.div>
  );
}