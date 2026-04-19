import { motion } from "framer-motion";

export function Section({ title }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative mt-6 mb-3 px-2"
    >
      {/* Soft glow line */}
      <div className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Floating label */}
      <motion.div
        whileHover={{ x: 2 }}
        className="relative inline-flex items-center gap-2"
      >
        {/* Small accent dot */}
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
        />

        <h2
          className="
            text-[10px]
            uppercase
            tracking-[0.25em]
            font-semibold
            text-[var(--tg-hint)]
          "
        >
          {title}
        </h2>
      </motion.div>

      {/* Ambient blur */}
      <div className="absolute -top-4 left-6 w-20 h-20 bg-indigo-500/10 blur-3xl rounded-full" />
    </motion.div>
  );
}