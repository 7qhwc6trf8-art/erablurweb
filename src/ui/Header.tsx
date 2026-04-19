import { useTelegramWebApp } from '@telegram-web-app/react'

export function Header() {
  const tg = useTelegramWebApp().WebApp
  const user = tg.initDataUnsafe?.user
  const theme = tg.themeParams

  return (
    <div
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-black/20
        border-b border-white/5
      "
      style={{
        background: theme.secondary_bg_color + 'cc',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">

        {/* 🪄 LEFT - Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg" />
            <div className="absolute inset-0 rounded-xl blur-md opacity-40 bg-blue-500" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[var(--tg-theme-text-color)]">
              Premium App
            </span>
            <span className="text-[10px] opacity-60">
              powered by Telegram
            </span>
          </div>
        </div>

        {/* 👤 RIGHT - User */}
        <div className="flex items-center gap-3">

          {/* Name */}
          <div className="text-right leading-tight hidden sm:block">
            <div className="text-sm font-medium text-[var(--tg-theme-text-color)]">
              {user?.first_name}
            </div>
            <div className="text-[10px] opacity-60">
              @{user?.username || 'user'}
            </div>
          </div>

          {/* Avatar */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
                {user?.first_name?.[0] || '?'}
              </div>
            </div>

            {/* online dot */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-black rounded-full" />
          </div>
        </div>

      </div>
    </div>
  )
}