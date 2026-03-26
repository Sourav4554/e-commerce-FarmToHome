import React from 'react'
import CustomerDashboard from './Dashboards/CustomerDashboard'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from './customer/pages/Login'
import ToastProvide from './components/ToastProvide'

const App = () => {
  return (
    <>
    <div className='w-full md:max-w-\[1300px] md:px-7 m-auto'>
     
      <ToastProvide/>
      <Routes>
        <Route path='/' element={<Navigate to='/customer'/>}/>
        <Route path='/customer/*' element={<CustomerDashboard/>}/>
      </Routes>
     
    </div>
    
    </>
  )
}

export default App