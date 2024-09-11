import React from 'react'
import { FaCheck } from 'react-icons/fa';

function Feature ({features}) {

    console.log(features);
  return (
    <div className='mt-6'> 
        <div className='p-5 bg-white rounded-xl border shadow-md'> 
            <h2 className='font-medium text-2xl'>Features</h2>
            {[features]?.map((item,index)=> (
                <div key={index}>
                    < FaCheck className='text-lg   bg-blue-100 text-primary'/>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Feature