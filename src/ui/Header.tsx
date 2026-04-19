import { useTelegram } from '../hooks/useTelegram'

export function Header() {
  const { user, theme } = useTelegram()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 12,
        background: theme.card,
        alignItems: 'center',
      }}
    >
      <strong>Mini App</strong>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: theme.button,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.buttonText,
            fontWeight: 'bold',
          }}
        >
          {user?.first_name?.[0] || '?'}
        </div>

        <span>{user?.first_name}</span>
      </div>
    </div>
  )
}