export {}

declare global {
  interface TelegramUser {
    id: number
    first_name: string
    last_name?: string
    username?: string
  }

  interface TelegramWebAppInitDataUnsafe {
    user?: TelegramUser
  }

  interface TelegramWebApp {
    initDataUnsafe: TelegramWebAppInitDataUnsafe
    close: () => void
    ready: () => void
    expand: () => void
  }
}