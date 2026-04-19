export function getTheme(tg: any) {
  return {
    bg: tg.themeParams.bg_color,
    text: tg.themeParams.text_color,
    hint: tg.themeParams.hint_color,
    card: tg.themeParams.secondary_bg_color,
    button: tg.themeParams.button_color,
    buttonText: tg.themeParams.button_text_color,
  }
}