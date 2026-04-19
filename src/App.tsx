import { useTelegramWebApp } from '@telegram-web-app/react'

function App() {
  const tg = useTelegramWebApp() as unknown as TelegramWebApp

  const user = tg.initDataUnsafe?.user

  return (
    <div>
      <h1>Hello {user?.first_name}</h1>

      <button onClick={() => tg.close()}>
        Close
      </button>
    </div>
  )
}

export default App