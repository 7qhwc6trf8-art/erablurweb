export function AppBar({ title, right }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[var(--card)] border-b border-white/5">
      <h1 className="text-base font-semibold text-[var(--text)]">
        {title}
      </h1>

      <div>{right}</div>
    </div>
  )
}