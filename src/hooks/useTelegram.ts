import { useTelegramWebApp } from '@telegram-web-app/react'

export function useTelegram(): any {
  const tg = useTelegramWebApp().WebApp

  return {
    tg,
    user: tg.initDataUnsafe?.user,
    theme: tg.themeParams,
    isDark: tg.colorScheme === 'dark',
  }
}