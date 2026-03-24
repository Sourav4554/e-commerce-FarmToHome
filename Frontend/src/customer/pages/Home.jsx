import React from 'react'
import Header from '../component/Header'
import VendorCardSection from '../component/VendorCardSection'
import HowItWorks from '../component/HowItWorks'
import WhyChooseUs from '../component/Chooseus'

const Home = () => {
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