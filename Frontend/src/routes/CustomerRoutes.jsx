import React from 'react'
import { Route ,Routes} from 'react-router-dom'
import Customerlayout from '../layouts/Customerlayout'
import Home from '../customer/pages/Home'
import Login from '../customer/pages/Login'
import ProfilePage from '../customer/pages/ProfilePage'
const CustomerRoutes = () => {
  return (
    <>
    <Routes>
    <Route element={<Customerlayout/>}>
     <Route index element={<Home/>}/>
     <Route path='register' element={<Login/>}/>
     <Route path='profile' element={<ProfilePage/>}/>
    </Route>
    </Routes>
    </>
  )
}

export default CustomerRoutes