import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { toggleFavorite } from "../app/features/cart/heroesSlice";
import { Heart, ArrowLeft, Calendar, Award } from "lucide-react";
import { useTelegram } from "../hooks/useTelegram";

export default function HeroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hapticFeedback } = useTelegram();

  const hero = useSelector((state: RootState) =>
    state.heroes.list.find((h) => h.id === Number(id))
  );

  const isFavorite = useSelector((state: RootState) =>
    state.heroes.favorites.includes(Number(id))
  );

  if (!hero) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-[var(--tg-hint)]">Hero not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 rounded-xl bg-white/10"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleFavorite = () => {
    hapticFeedback?.impact("light");
    dispatch(toggleFavorite(hero.id));
  };

  return (
    <div className="pb-24 relative">
      {/* Ambient background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
      <div className="absolute top-40 -right-20 w-[300px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full" />

      {/* HERO IMAGE SECTION */}
      <div className="relative h-[340px] overflow-hidden">
        {/* image */}
        {hero.image && (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={hero.image}
            className="w-full h-full object-cover opacity-80"
          />
        )}

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-yellow-500/10" />

        {/* floating shine */}
        <motion.div
          className="absolute inset-0"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* BACK BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="
            absolute top-4 left-4
            w-10 h-10
            flex items-center justify-center
            rounded-full
            bg-black/30 backdrop-blur-xl
            border border-white/10
          "
        >
          <ArrowLeft size={18} className="text-white" />
        </motion.button>

        {/* FAVORITE BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleFavorite}
          className="
            absolute top-4 right-4
            w-10 h-10
            flex items-center justify-center
            rounded-full
            bg-black/30 backdrop-blur-xl
            border border-white/10
          "
        >
          <Heart
            size={18}
            className={
              isFavorite
                ? "fill-red-500 stroke-red-500"
                : "stroke-white"
            }
          />
        </motion.button>

        {/* HERO TEXT */}
        <div className="absolute bottom-5 left-5 right-5">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            {hero.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-sm mt-1"
          >
            {hero.title}
          </motion.p>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="relative -mt-6 px-4">
        <div
          className="
            rounded-3xl
            bg-[var(--tg-secondary-bg)]
            border border-white/10
            backdrop-blur-xl
            shadow-2xl
            p-5
          "
        >
          {/* DATES */}
          {(hero.birthDate || hero.deathDate) && (
            <div className="flex items-center gap-2 text-sm text-[var(--tg-hint)] mb-4">
              <Calendar size={16} />
              <span>
                {hero.birthDate}
                {hero.birthDate && hero.deathDate && " — "}
                {hero.deathDate}
              </span>
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="text-[var(--tg-text)] leading-relaxed text-sm">
            {hero.description}
          </p>

          {/* ACHIEVEMENTS */}
          {hero.achievements?.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-indigo-400" />
                <h3 className="font-semibold text-[var(--tg-text)]">
                  Achievements
                </h3>
              </div>

              <div className="space-y-3">
                {hero.achievements.map((a: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="
                      flex items-start gap-2
                      text-sm text-[var(--tg-hint)]
                      p-3 rounded-xl
                      bg-white/5
                      border border-white/5
                    "
                  >
                    <span className="text-indigo-400">✦</span>
                    <span>{a}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}