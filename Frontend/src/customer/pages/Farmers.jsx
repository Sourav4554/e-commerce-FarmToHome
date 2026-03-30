import React, { useContext } from 'react'
import { AuthContextProvide } from '../../context/AuthContext'
import Loader from '../../components/Loader'
import FarmersHero from '../component/FarmersHero'
import Pagination from '../../components/Pagination'

const Farmers = () => {
   
  return (
    <>
    <FarmersHero />
    <Pagination/>
    </>
  )
}

export default Farmers