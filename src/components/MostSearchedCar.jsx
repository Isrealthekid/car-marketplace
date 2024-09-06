import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { CarListing } from '../../configs/schema'
import { CarImages } from '../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../configs'
import Service from '@/Shared/Service'



function MostSearchedCar() {

  const [carList,setCarList]=useState([]);
   useEffect(()=>{
    GetPopularCarList();
   }, [])


    const GetPopularCarList=async()=>{
      const result=await db.select().from(CarListing)
    .leftJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
     .orderBy(desc(CarListing.id))
     .limit(10)

    const resp=Service.FormatResult(result)
    console.log(resp)
    console.log(result)
    setCarList(resp);
      
    }
  return (
    <div className='mx-24'>
        <h2 className="font-bold text-3xl text-center my-16">Most Searched Car</h2>

        <Carousel>
            <CarouselContent>
                {carList.map((car,index) => (
                    <CarouselItem className="basis-1/4">                    
                        <CarItem car={car} key={index}/>            
                    </CarouselItem>
                ))}                   
            </CarouselContent>  
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        
    </div>
  )
}

export default MostSearchedCar