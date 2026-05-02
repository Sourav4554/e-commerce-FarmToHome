import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import VendorLayout from '../layouts/VendorLayout'
import Dashboard from '../vendor/pages/Dashboard'
import VendorProfile from '../vendor/pages/VendorProfile'
import Product from '../vendor/pages/Product'
import Order from '../vendor/pages/Order'
import AddProduct from '../vendor/components/AddProduct'
import EditProduct from '../vendor/components/EditProduct'
import UpdateProfile from '../components/UpdateProfile'
const VendorRoutes = () => {
  return (
    <>
    <Routes>
     <Route element={<ProtectedRoutes role='vendor'/>}>
         <Route element={<VendorLayout/>}>
               <Route index element={<Navigate to='dashboard' replace/> } />
               <Route path='dashboard'  element={<Dashboard/>}/>
               <Route path='profile' element={<VendorProfile/>}/>
               <Route path='products' element={<Product/>}/>
               <Route path='addproduct' element={<AddProduct/>}/>
               <Route path='orders' element={<Order/>}/>
               <Route path='edit-product/:id' element={<EditProduct/>}/>
               <Route path='update-profile'element={<UpdateProfile/>}/>
         </Route>
     </Route>
    </Routes>
    </>
  )
}

export default VendorRoutes