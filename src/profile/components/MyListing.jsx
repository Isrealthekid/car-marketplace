import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { db } from '../../../configs'
import { CarImages, CarListing } from '../../../configs/schema'
import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { desc, eq } from 'drizzle-orm'
import CarItem from '@/components/CarItem'
import Service from '@/Shared/Service'
import { FaTrashAlt } from 'react-icons/fa'

function  MyListing() {

  const {user}=useUser();
  const [carList,setCarList]=useState([]);

  useEffect(()=> {
    user&&GetUserCarListing();

  },[user])

  const GetUserCarListing=async()=>{
    const result=await db.select().from(CarListing)
    .leftJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
    .where(eq(CarListing.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(CarListing.id))

    const resp=Service.FormatResult(result)

    console.log(result);
    console.log(resp)

    setCarList(resp);
  }

  return (
    <div className='mt-6'>
        <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to={'/add-listing'}>
                    <Button>+ Add New Listing</Button>            
                </Link>                
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 :md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
              {carList.map((item,index)=>(
                <div key={index}>
                  <CarItem car={item}/>
                  <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3'>
                    <Link to={'/profile?mode=edit&id'+item?.id}> 
                    <Button variant="outline" className="w-full">
                        Edit
                      </Button>                    
                    </Link>
                      
                      <Button variant="destructive" >
                        <FaTrashAlt/>
                      </Button>
                  </div>

                </div>
              ))}
            </div>
    </div>
  )
}

export default MyListing