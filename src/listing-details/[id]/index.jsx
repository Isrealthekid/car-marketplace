import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import DetailHeader from './components/DetailHeader'
import { Link, useParams } from 'react-router-dom';
import { IdCardIcon } from '@radix-ui/react-icons';
import { db } from '../../../configs';
import { CarImages, CarListing } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import ImageGallery from './components/ImageGallery';
import Description from './components/Description';
import Features from './components/Features';
import Pricing from './components/Pricing';

function ListingDetail() {

  const {id}= useParams();
  const [carDetail,setCarDetail]=useState();
  // console.log(id)

  useEffect(()=>{
    GetCarDetail();
  },[])

  const GetCarDetail=async()=>{
    const result=await db.select().from(CarListing)
    .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
    .where(eq(CarListing.id,id))

    const resp=Service.FormatResult(result);

    setCarDetail(resp[0])
  }

  return (
    <div>
        <Header/>

        <div className='p-10 md:px-20'>
          <DetailHeader carDetail={carDetail}/>

          <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
            {/* left */}
              <div className='md:col-span-2 '>
                {/* image gallery */}
                <ImageGallery carDetail={carDetail}/>


                {/* desc */}
                <Description carDetail={carDetail}/>



                {/* featureslist */}
              
              <Features features={carDetail?.features}/>
              </div>

            {/* RIGHT */}

              <div className=''>
                {/* pricing*/}
                <Pricing carDetail={carDetail}/>



                {/* car properties */}


                {/* owners details */}


              </div>
          </div>
        </div>
    </div>
  )
}

export default ListingDetail