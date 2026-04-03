import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import VendorLayout from '../layouts/VendorLayout'
import Dashboard from '../vendor/pages/Dashboard'
import VendorProfile from '../vendor/pages/VendorProfile'
const VendorRoutes = () => {
  return (
    <>
    <Routes>
     <Route element={<ProtectedRoutes role='vendor'/>}>
         <Route element={<VendorLayout/>}>
               <Route index element={<Dashboard/>}/>
               <Route path='profile' element={<VendorProfile/>}/>
         </Route>
     </Route>
    </Routes>
    </>
  )
}

export default VendorRoutes