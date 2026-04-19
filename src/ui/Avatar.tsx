export function Avatar({ name }: any) {
  return (
    <div className="w-9 h-9 rounded-full bg-[var(--button)] flex items-center justify-center text-white font-bold">
      {name?.[0] || "?"}
    </div>
  )
}