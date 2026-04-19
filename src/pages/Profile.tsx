<div className="grid grid-cols-3 gap-3 px-4 -mt-6">
  {stats.map((s) => (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="
        rounded-2xl p-4 text-center
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-md
      "
    >
      <s.icon size={20} className="mx-auto mb-2 text-indigo-400" />
      <div className="text-xl font-bold">{s.value}</div>
      <div className="text-xs text-[var(--tg-hint)]">{s.label}</div>
    </motion.div>
  ))}
</div>