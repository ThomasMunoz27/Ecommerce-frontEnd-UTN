
import { useState } from 'react'
import { AccountModal } from './components/ui/Modals/AccountRegisterModal/AccountModal'
import { AppRoutes } from './routes/AppRoutes'


function App() {
  const [logged, setLogged] = useState(false)

  return (
    <>
      <AppRoutes/>
      {logged &&
      <AccountModal/>
      }
      </>
  )
}

export default App
