export function Button({ children, onClick, variant = 'primary' }: any) {
  const base =
    "w-full py-3 rounded-xl font-medium transition active:scale-95"

  const styles =
    variant === 'primary'
      ? "bg-[var(--button)] text-[var(--button-text)]"
      : "bg-white/10 text-[var(--text)]"

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  )
}