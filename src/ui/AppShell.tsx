import { useTelegram } from '../hooks/useTelegram'
import { Header } from './Header'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useTelegram()

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div style={{ flex: 1, padding: 16 }}>{children}</div>
    </div>
  )
}