export function ListItem({ icon, title, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-[var(--card)] rounded-xl mb-2 active:scale-[0.98] transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[var(--text)]">{title}</span>
      </div>

      <span className="text-[var(--hint)]">›</span>
    </div>
  )
}