import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Adminlayout from '../layouts/Adminlayout'
import ProtectedRoutes from './ProtectedRoutes'
import AdminPage from '../admin/pages/AdminPage'

const AdminRoutes = () => {
  return (
  <>
  <Routes>
    <Route element={
    <ProtectedRoutes role='admin'>
          <Adminlayout/>
    </ProtectedRoutes>
    }>
    <Route index element={<AdminPage/>}/>
    </Route>

  </Routes>
  </>
    )
}

export default AdminRoutes