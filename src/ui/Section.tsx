export function Section({ title }: any) {
  return (
    <div className="mt-4 mb-2">
      <h2 className="text-xs uppercase text-[var(--hint)] px-2">
        {title}
      </h2>
    </div>
  )
}