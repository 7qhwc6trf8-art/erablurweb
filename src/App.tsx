import { useTelegramWebApp } from '@telegram-web-app/react'

function App() {
  useTelegramWebApp()
  const user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg = useTelegramWebApp().WebApp;

  return (
    <div style={{ padding: 20 }}>
      <h1>My First Telegram App 🚀</h1>

      {user ? (
        <>
          <p>👤 {user.first_name}</p>
          <p>🆔 {user.id}</p>
        </>
      ) : (
        <p>Open inside Telegram</p>
      )}

      <button onClick={() => tg?.close()}>
        Close App
      </button>
    </div>
  )
}

export default App