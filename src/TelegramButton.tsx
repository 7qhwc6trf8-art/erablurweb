import { useEffect } from 'react'
import { useTelegramWebApp } from '@telegram-web-app/react'

type Props = {
  text: string
  onClick: () => void
  visible?: boolean
}

export function TelegramButton({ text, onClick, visible = true }: Props) {
  const tg = useTelegramWebApp().WebApp

  useEffect(() => {
    if (!tg) return

    tg.ready()
    tg.expand()

    tg.MainButton.setText(text)

    // important: avoid duplicate handlers
    tg.MainButton.offClick(onClick)
    tg.MainButton.onClick(onClick)

    visible ? tg.MainButton.show() : tg.MainButton.hide()

    return () => {
      tg.MainButton.offClick(onClick)
    }
  }, [tg, text, onClick, visible])

  return null
}