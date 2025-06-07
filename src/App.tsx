
import { useEffect, useState } from 'react'
import { AccountModal } from './components/ui/Modals/AccountRegisterModal/AccountModal'
import { AppRoutes } from './routes/AppRoutes'
import { useStoreLogin } from './store/useStoreLogin'


function App() {
  const {token} = useStoreLogin()

  const logged = token.length > 1
  return (
    <>
      <AppRoutes/>
      {!logged &&
      <AccountModal/>
      }
      </>
  )
}

export default App
