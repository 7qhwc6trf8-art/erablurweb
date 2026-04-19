import { motion } from "framer-motion";

export function ListItem({ icon, title, onClick }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="
        relative overflow-hidden
        flex items-center justify-between
        p-4 mb-3 rounded-2xl
        cursor-pointer
        bg-[var(--tg-secondary-bg)]
        border border-white/10
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      "
    >
      {/* Animated glow line */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100"
        animate={{
          x: ["-120%", "120%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(99,102,241,0.25), transparent)",
        }}
      />

      {/* Left content */}
      <div className="flex items-center gap-3 relative z-10">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="
            w-10 h-10 flex items-center justify-center
            rounded-xl
            bg-white/5
            border border-white/10
            shadow-inner
          "
        >
          {icon}
        </motion.div>

        <span className="text-[var(--tg-text)] font-medium tracking-wide">
          {title}
        </span>
      </div>

      {/* Right arrow */}
      <motion.div
        whileHover={{ x: 4 }}
        className="relative z-10 text-[var(--tg-hint)] text-xl"
      >
        ›
      </motion.div>

      {/* Soft corner glow */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full" />
    </motion.div>
  );
}