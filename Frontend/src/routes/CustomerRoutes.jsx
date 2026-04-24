import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Customerlayout from '../layouts/Customerlayout'
import Home from '../customer/pages/Home'
import Login from '../customer/pages/Login'
import ProfilePage from '../customer/pages/ProfilePage'
import CompleteProfile from '../customer/pages/CompleteProfile'
import Farmers from '../customer/pages/Farmers'
import NotFound from "../components/NotFound";
import Product from '../customer/pages/Product'
import ProductDisplay from '../customer/pages/ProductDisplay'
import Cart from '../customer/pages/Cart'
import Order from '../customer/pages/Order'
import PlaceOrder from '../customer/pages/PlaceOrder'
import VendorShop from '../customer/pages/VendorShop'
const CustomerRoutes = () => {
  return (
    <>
    <Routes>
    <Route element={<Customerlayout/>}>
     <Route index element={<Home/>}/>
     <Route path='register' element={<Login/>}/>
     <Route path='profile' element={<ProfilePage/>}/>
     <Route path='complete-profile' element={<CompleteProfile/>}/>
     <Route path='farmers' element={<Farmers/>}/>
     <Route path='products' element= {<Product/>}/>
     <Route path='products/:id' element={<ProductDisplay/>}/>
     <Route path='cart' element={<Cart/>}/>
     <Route path='order' element={<Order/>}/>
     <Route path='placeorder' element={<PlaceOrder/>}/>
     <Route path='/farmers/:id' element={<VendorShop/>}/>
     {/* </Route> */}
    
    </Route>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  )
}

export default CustomerRoutes