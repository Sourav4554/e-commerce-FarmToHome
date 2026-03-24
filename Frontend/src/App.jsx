import React from 'react'
import Navbar from './components/Navbar'
import Home from './customer/pages/Home'
import Footer from './components/Footer'
import CustomerDashboard from './Dashboards/CustomerDashboard'

const App = () => {
  return (
    <>
    <div className='w-full md:max-w-\[1300px] md:px-7 m-auto'>
      <Navbar/>
      <CustomerDashboard/>
     
    </div>
    <Footer/>
    </>
  )
}

export default App