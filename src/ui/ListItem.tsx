import { useTelegram } from '../hooks/useTelegram'

export function ListItem({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) {
  const { theme } = useTelegram()

  return (
    <div
      onClick={onClick}
      style={{
        padding: 12,
        background: theme.card,
        borderRadius: 10,
        marginBottom: 8,
        cursor: 'pointer',
      }}
    >
      {title}
    </div>
  )
}