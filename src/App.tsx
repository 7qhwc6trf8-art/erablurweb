import { useTelegramWebApp } from '@telegram-web-app/react'

function App() {
  const tg = useTelegramWebApp()

  const user = tg.initDataUnsafe?.user

  return (
    <div style={{ padding: 20 }}>
      <h1>Telegram Mini App 🚀</h1>

      {user ? (
        <>
          <p>👤 {user.first_name}</p>
          <p>🆔 {user.id}</p>
        </>
      ) : (
        <p>Open inside Telegram</p>
      )}

      <button onClick={() => tg.close()}>
        Close
      </button>
    </div>
  )
}

export default App