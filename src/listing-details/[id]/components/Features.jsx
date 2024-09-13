import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';


function Features({features}) {
  console.log(features)


  return (
    <div className='p-10 border shadow-md rounded-xl my-7'>

      <h2 className="font-medium text-2xl">Features</h2>
    

    <div className='grid grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-4'>
      {features && Object.entries(features).map(([feature, value]) => (
        <div key={feature} className='flex gap-2 items-center px-1'>
          <FaCheck className='text-lg p-1 mt-5 rounded-full bg-blue-100 text-primary' />
          <h2 className='mt-5'>{feature}</h2>  
        </div>
      ))}
    </div>


    </div>
  )
}

export default Features