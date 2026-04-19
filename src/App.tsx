import { useTelegramWebApp } from '@telegram-web-app/react'

import { useEffect } from 'react'
import { useTelegramWebApp } from '@telegram-web-app/react'

type Props = {
  text: string
  onClick: () => void
  visible?: boolean
}

function TelegramButton({ text, onClick, visible = true }: Props) {
  const tg = useTelegramWebApp().WebApp

  useEffect(() => {
    if (!tg) return

    tg.ready()
    tg.expand()

    tg.MainButton.setText(text)
    tg.MainButton.onClick(onClick)

    if (visible) {
      tg.MainButton.show()
    } else {
      tg.MainButton.hide()
    }

    return () => {
      tg.MainButton.offClick(onClick)
    }
  }, [tg, text, onClick, visible])

  return null // IMPORTANT: no DOM, it's native Telegram UI
}

function App() {
  const tg = useTelegramWebApp() as unknown as TelegramWebApp

  const user = tg.initDataUnsafe?.user

  return (
    <div>
      <h1>Hello {user?.first_name}</h1>

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