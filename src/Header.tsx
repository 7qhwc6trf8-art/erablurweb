import { useTelegramWebApp } from '@telegram-web-app/react'

export function Header() {
  const tg = useTelegramWebApp().WebApp
  const user = tg.initDataUnsafe?.user
  const theme = tg.themeParams

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: theme.secondary_bg_color,
        borderBottom: `1px solid ${theme.hint_color}20`,
      }}
    >
      {/* 🪪 Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: theme.button_color,
          }}
        />
        <strong style={{ color: theme.text_color }}>My App</strong>
      </div>

      {/* 👤 User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: theme.button_color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.button_text_color,
            fontWeight: 'bold',
          }}
        >
          {user?.first_name?.[0] || '?'}
        </div>

        <span style={{ color: theme.text_color }}>
          {user?.first_name}
        </span>
      </div>
    </div>
  )
}