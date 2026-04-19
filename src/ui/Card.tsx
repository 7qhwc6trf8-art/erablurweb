import { useTelegram } from '../hooks/useTelegram'

export function Card({ children }: { children: React.ReactNode }) {
  const { theme } = useTelegram()

  return (
    <div
      style={{
        background: theme.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}