import { Button } from '@/components/ui/button'
import React from 'react'

function OwnersDetail ({carDetail}) {
  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='text-2xl font-medium my-3'>Owner Details</h2> 
      <img src={carDetail?.userImageUrl} className='w-[80px] h-[70px] rounded-full' alt="image" />
      <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
      <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>

      <Button className='w-full mt-4' >Contact Owner</Button>
       
    </div>
  )
}

export default OwnersDetail