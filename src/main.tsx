
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './Marketing.tsx'

createRoot(document.getElementById('root')!).render(
      <AppRouter />
)
