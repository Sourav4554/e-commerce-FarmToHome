import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Customerlayout from '../layouts/Customerlayout'
import Home from '../customer/pages/Home'
import Login from '../customer/pages/Login'
import ProfilePage from '../customer/pages/ProfilePage'
import CompleteProfile from '../customer/pages/CompleteProfile'
import Farmers from '../customer/pages/Farmers'
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
    </Route>
    </Routes>
    </>
  )
}

export default CustomerRoutes