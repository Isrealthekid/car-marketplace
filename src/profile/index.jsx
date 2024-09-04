import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Profile = () => {
  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 my-10'>
            
      <Tabs defaultValue="my-listing" className="w-full">
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
        <TabsTrigger value="inbox">Inbox</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="my-listing" className="mb-6">
          <MyListing/>
      </TabsContent>

      <TabsContent value="inbox">
        INBOX TAB
      </TabsContent>

      <TabsContent value="profile">
        PROFILE TAB
      </TabsContent>
    </Tabs>

     
        </div>
    </div>
  )
}

export default Profile