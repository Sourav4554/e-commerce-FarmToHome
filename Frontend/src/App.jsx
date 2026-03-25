import React from 'react'
import Navbar from './components/Navbar'
import Home from './customer/pages/Home'
import Footer from './components/Footer'
import CustomerDashboard from './Dashboards/CustomerDashboard'
import { Route,Routes } from 'react-router-dom'
import Login from './customer/pages/Login'
import ToastProvide from './components/ToastProvide'

const App = () => {
  return (
    <>
    <div className='w-full md:max-w-\[1300px] md:px-7 m-auto'>
      <Navbar/>
      <ToastProvide/>
      <Routes>
        <Route path='/' element={<CustomerDashboard/>}/>
        <Route path='/register' element={<Login/>}/>
      </Routes>
     
    </div>
    <Footer/>
    </>
  )
}

export default App