import { useEffect } from 'react'
import { useTelegramWebApp } from '@telegram-web-app/react'

export function TelegramButton({
  text,
  onClick,
}: {
  text: string
  onClick: () => void
}) {
  const tg = useTelegramWebApp().WebApp

  useEffect(() => {
    tg.ready()
    tg.expand()

    tg.MainButton.setText(text)
    tg.MainButton.show()
    tg.MainButton.onClick(onClick)

    return () => {
      tg.MainButton.offClick(onClick)
    }
  }, [tg, text, onClick])

  return null
}