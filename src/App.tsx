

import { AppRoutes } from './routes/AppRoutes'
import { useStoreLogin } from './store/useStoreLogin'

import './App.css'
import { AccountModal } from './components/ui/Modals/AccountRegisterModal/AccountModal'


function App() {
  const {token} = useStoreLogin()

  const logged = token.length > 1
  return (
    <>
      <AppRoutes/>
      {!logged &&
      <>
      <AccountModal/>
      <div className='divBlur'>a</div>
      </>
      }
      </>
  )
}

export default App
