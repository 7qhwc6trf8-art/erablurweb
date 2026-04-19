import ReactDOM from 'react-dom/client'
import App from './App'
import { TelegramWebAppProvider } from '@telegram-web-app/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TelegramWebAppProvider>
    <App />
  </TelegramWebAppProvider>
)