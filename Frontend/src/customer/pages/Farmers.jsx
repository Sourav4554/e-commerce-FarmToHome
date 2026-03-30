import React, { useContext, useEffect, useState } from 'react'
import FarmersHero from '../component/FarmersHero'
import Pagination from '../../components/Pagination'
import useCustomerHook from '../../hooks/customerHook/useCustomerHook'

const Farmers = () => {
  const {fetchFarmers}=useCustomerHook()
  const [page,setPage]=useState(1)
  const [vendors,setVendors]=useState([])
  const [totalPages,setTotalPages]=useState(0)

  const fetchPaginatedFarmers=async(page)=>{
  const response=await fetchFarmers(page)
  console.log(`data inside farmers`,response)
  if(!response.success){
    console.log(response.message)
    return
  }
  setTotalPages(response.totalPages)
  setPage(response.page)
  setVendors(response.farmers)
  }

  useEffect(()=>{
    fetchPaginatedFarmers(page)
  },[page])


  return (
    <>
    <FarmersHero 
    vendors={vendors}
    />
    <Pagination 
    page={page}
    setPage={setPage}
    totalPages={totalPages}
    />
    </>
  )
}

export default Farmers