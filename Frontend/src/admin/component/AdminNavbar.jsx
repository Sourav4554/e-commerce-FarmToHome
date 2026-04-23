import React from 'react'
import Logout from "../../components/Logout";
const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-neutral-primary-soft shadow-2xs border-default bg-white">
    <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
      <div className="flex items-center justify-between">
        <h1 className="w-full px-8 lg:px-4 font-bold md:text-xl text-primary">
          Farm2Home
        </h1>
        <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default AdminNavbar