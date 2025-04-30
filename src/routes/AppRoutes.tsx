import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"

export const AppRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={<MainScreen/>}/>
    </Routes>
  )
}
