import { AppShell } from './ui/AppShell'
import { Card } from './ui/Card'
import { ListItem } from './ui/ListItem'
import { TelegramButton } from './ui/TelegramButton'
import { useTelegram } from './hooks/useTelegram'

function App() {
  const { user, tg } = useTelegram()

  return (
    <AppShell>
      <Card>
        Hello {user?.first_name} 🚀
      </Card>

      <ListItem title="Profile" />
      <ListItem title="Settings" />
      <ListItem title="Help" />

      <TelegramButton
        text="Close App"
        onClick={() => tg.close()}
      />
    </AppShell>
  )
}

export default App