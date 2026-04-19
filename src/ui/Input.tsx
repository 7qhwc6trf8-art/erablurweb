export function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full p-3 rounded-xl bg-[var(--card)] text-[var(--text)] outline-none placeholder:text-[var(--hint)]"
    />
  )
}