import { AppBar } from './ui/AppBar'
import { Card } from './ui/Card'
import { ListItem } from './ui/ListItem'
import { Button } from './ui/TelegramButton'
import { Avatar } from './ui/Avatar'
import { Section } from './ui/Section'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <AppBar
        title="Telegram UI"
        right={<Avatar name="John" />}
      />

      <div className="p-4 space-y-3">

        <Card>
          Welcome to Mini App 🚀
        </Card>

        <Section title="Menu" />

        <ListItem title="Profile" />
        <ListItem title="Settings" />
        <ListItem title="Help" />

        <Button onClick={() => alert('clicked')}>
          Continue
        </Button>

        <Button variant="secondary">
          Secondary
        </Button>

      </div>
    </div>
  )
}

export default App