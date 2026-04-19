import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TelegramWebAppProvider } from '@telegram-web-app/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TelegramWebAppProvider>
    <App />
  </TelegramWebAppProvider>
)