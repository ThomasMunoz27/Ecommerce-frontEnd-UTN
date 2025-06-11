import { Route, Routes } from "react-router"
import { MainScreen } from "../components/screens/MainScreen/MainScreen"
import { ScreenProfile } from "../components/screens/ScreenProfile/ScreenProfile"
import { CartScreen } from "../components/screens/CartScreen/CartScreen"
import { ProductCategoryScreen } from "../components/screens/ProductCategoryScreen/ProductCategoryScreen"
import { DetailScreen } from "../components/screens/DetailScreen/DetailScreen"
import { PayScreen } from "../components/screens/PayScreen/PayScreen"
import { AdminScreen } from "../components/screens/AdminScreen/AdminScreen"
import { SuccessPay } from "../components/ui/BackUrls/SuccessPay/SuccessPay"
import { FailurePay } from "../components/ui/BackUrls/FailurePay/FailurePay"
import { RequireAdmin } from "../components/ui/Auth/RequireAdmin"
import { Unauthorized } from "../components/ui/Auth/Unauthorized"
import { ScreenFooterData } from "../components/screens/ScreenFooterData/ScreenFooterData"
export const AppRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={<MainScreen/>}/>
        <Route path="/my-account" element={<ScreenProfile/>}></Route>
        <Route path="/my-cart" element={<CartScreen/>}></Route>
        <Route path="/product-category" element={<ProductCategoryScreen/>}></Route>
        <Route path="/product-detail" element={<DetailScreen/>}></Route>
        <Route path="/checkout" element={<PayScreen></PayScreen>}></Route>
        <Route path="/unauthorized" element={<Unauthorized></Unauthorized>}></Route>
       <Route element={<RequireAdmin/>}>
       <Route path="/admin" element={<AdminScreen/>}></Route>
       <Route path = "/footer-data" element={<ScreenFooterData/>}></Route>
       </Route>
        <Route path="/success" element={<SuccessPay/>}></Route>
        <Route path="/failure" element={<FailurePay/>}></Route>
    </Routes>
    
  )
}
