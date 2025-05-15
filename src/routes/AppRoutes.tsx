import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"
import { ScreenProfile } from "../components/screens/ScreenProfile/ScreenProfile"
import { CartScreen } from "../components/screens/CartScreen/CartScreen"
import { ProductCategoryScreen } from "../components/screens/ProductCategoryScreen/ProductCategoryScreen"
import { DetailScreen } from "../components/screens/DetailScreen/DetailScreen"

export const AppRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={<MainScreen/>}/>
        <Route path="/my-account" element={<ScreenProfile/>}></Route>
        <Route path="/my-cart" element={<CartScreen/>}></Route>
        <Route path="/product-category" element={<ProductCategoryScreen/>}></Route>
        <Route path="/product-detail" element={<DetailScreen/>}></Route>
    </Routes>
    
  )
}
