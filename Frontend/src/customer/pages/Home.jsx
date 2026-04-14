import React, { useContext } from 'react'
import Header from '../component/Header'
import VendorCardSection from '../component/VendorCardSection'
import HowItWorks from '../component/HowItWorks'
import { AuthContextProvide } from '../../context/AuthContext'
import Loader from '../../components/Loader'

const Home = () => {
  //const {loading}=useContext(AuthContextProvide)
  // if(loading){
  //   return <Loader/>
  // }
  return (
    <div>
        <Header/>
        <HowItWorks/>
        <VendorCardSection/>
       {/* <WhyChooseUs/> */}
    </div>
  )
}

export default Home