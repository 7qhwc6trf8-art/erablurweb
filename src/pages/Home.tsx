import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroCard from "../ui/HeroCard";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";

export default function Home() {
  const navigate = useNavigate();
  const heroes = useSelector(
    (state: RootState) => state.heroes.filteredList
  );
  const featuredHeroes = heroes.slice(0, 5);

  return (
    <div className="pb-24 relative">
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-40 -left-20 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full" />

      {/* HERO BANNER */}
      <div className="px-4 pt-4 mb-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/10
            shadow-xl
            bg-gradient-to-br from-indigo-500/20 via-black/30 to-red-500/10
            backdrop-blur-xl
          "
        >
          {/* animated shine */}
          <motion.div
            className="absolute inset-0"
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          <img
            src="/banner.png"
            alt=""
            className="w-full h-auto relative z-10 opacity-90"
          />

          {/* bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>

      {/* SECTION HEADER */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-semibold text-[var(--tg-text)] tracking-tight"
        >
          Featured Heroes
        </motion.h2>

        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/heroes")}
          className="
            text-sm font-medium
            text-indigo-400
            hover:text-indigo-300
            transition
          "
        >
          See all →
        </motion.button>
      </div>

      {/* HERO LIST */}
      <div className="px-4 space-y-4">
        {featuredHeroes.map((hero, index) => (
          <motion.div
            key={hero.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.06,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <HeroCard
              hero={hero}
              index={index}
              onClick={() => navigate(`/hero/${hero.id}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}