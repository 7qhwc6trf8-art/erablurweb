import { useTelegramWebApp } from '@telegram-web-app/react'
import { useEffect, useState } from 'react'
import { TelegramButton } from './TelegramButton'

function App() {
  const tg = useTelegramWebApp().WebApp

  const user = tg.initDataUnsafe?.user

  const [useCustomTheme, setUseCustomTheme] = useState(false)

  const theme = tg.themeParams

  const background = useCustomTheme ? '#111827' : theme.bg_color
  const textColor = useCustomTheme ? '#ffffff' : theme.text_color

  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [tg])

  return (
    <div
      style={{
        background,
        color: textColor,
        minHeight: '100vh',
        padding: 20,
        transition: '0.3s',
      }}
    >
      <h1>Hello {user?.first_name}</h1>

      <p>Theme mode: {tg.colorScheme}</p>

      <button
        onClick={() => setUseCustomTheme(prev => !prev)}
        style={{
          padding: '10px 15px',
          borderRadius: 10,
          border: 'none',
          marginTop: 10,
          cursor: 'pointer',
        }}
      >
        Switch Theme
      </button>

      <TelegramButton
        text="Continue"
        onClick={() => {
          alert('Clicked!')
        }}
      />
    </div>
  )
}

export default App