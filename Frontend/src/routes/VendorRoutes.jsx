import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import VendorLayout from '../layouts/VendorLayout'
import VendorPage from '../vendor/pages/VendorPage'
const VendorRoutes = () => {
  return (
    <>
    <Routes>
     <Route element={<ProtectedRoutes role='vendor'>
         <VendorLayout/>
     </ProtectedRoutes>}>
       <Route index element={<VendorPage/>}/>
     </Route>
    </Routes>
    </>
  )
}

export default VendorRoutes