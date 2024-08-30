import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/infoSection'
import Footer from './components/Footer'

const Home = () => {
  return (
    <div>
      <Header />

      <Hero />

      <Category />
      
      <MostSearchedCar />

      <InfoSection />

      <Footer/>
    </div>
  )
}

export default Home


