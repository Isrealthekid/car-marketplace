import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'

const Profile = () => {
  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 my-10'>
            <MyListing/>
        </div>
    </div>
  )
}

export default Profile