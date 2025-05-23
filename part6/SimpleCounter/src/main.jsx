import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CounterContextProvider } from './CounterContext'

createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)