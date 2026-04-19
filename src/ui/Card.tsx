export function Card({ children }: any) {
  return (
    <div className="bg-[var(--card)] rounded-2xl p-4 shadow-md active:scale-[0.99] transition">
      {children}
    </div>
  )
}