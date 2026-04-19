import { useTelegramWebApp } from '@telegram-web-app/react';

export function useTelegram() {
  const tg = useTelegramWebApp().WebApp;
  
  return {
    tg,
    user: tg.initDataUnsafe?.user,
    theme: tg.themeParams,
    isExpanded: tg.isExpanded,
    platform: tg.platform,
    close: () => tg.close(),
    expand: () => tg.expand(),
    hapticFeedback: {
      impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
        tg.HapticFeedback?.impactOccurred(style);
      },
      notification: (type: 'error' | 'success' | 'warning') => {
        tg.HapticFeedback?.notificationOccurred(type);
      },
    },
  };
}