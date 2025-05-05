import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"
import { ScreenProfile } from "../components/screens/ScreenProfile/ScreenProfile"

export const AppRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={<MainScreen/>}/>
        <Route path="/my-account" element={<ScreenProfile/>}></Route>
    </Routes>
    
  )
}
