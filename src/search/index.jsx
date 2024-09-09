import Service from '@/Shared/Service';
import { CarImages,CarListing } from '../../configs/schema';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from '../../configs';
import { eq } from 'drizzle-orm';
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';

const SearchByOptions = () => {

  const [searchParam]=useSearchParams();
const [carList,setCarList]=useState([])
  const condition=searchParam.get('cars')
  const make=searchParam.get('make')
  const price=searchParam.get('price')

  // console.log(cars,make,price)

  useEffect(()=>{
    GetCarList();

  },[])

  const GetCarList= async() =>{
    const result=await db.select().from(CarListing)
    .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
    .where(condition!=undefined&&eq(CarListing.condition,condition))
    .where(make!=undefined&&eq(CarListing.make,make))
    // .where(price!=undefined&&eq(CarListing.price,cars))

    // the pricing  to be less than or equal to the amount

    const resp=Service.FormatResult(result);
    console.log(resp)
    setCarList(resp); 
  }


  return (
    <div>
        <Header/>

        <div className='p-16 bg-black flex justify-center'>
            <Search/>
        </div>

        <div className='p-10 md:px-20'>
          <h2 className='font-bold text-4xl'>Search Result</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 :md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5'>
          {carList?.length>0? carList.map((item,index)=>(
            <div key={index}>
           <CarItem car={item}/>
            </div>
          )):
          [1,2,3,4,5,6,7,8].map((item,index)=>(
            <div className='h-[350px] rounded-xl bg-slate-200 animate-pulse'>
           
            </div>
          ))
        
        }          
          </div>
        </div>
    </div>
  )
}

export default SearchByOptions