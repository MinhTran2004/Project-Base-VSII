import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CreateUserList from './pages/CreateUserList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreateUserList />
  </StrictMode>,
)
