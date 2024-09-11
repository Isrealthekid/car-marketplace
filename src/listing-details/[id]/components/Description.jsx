import React from 'react'

const Description = ({carDetail}) => {
  return (
    <div className='p-5 rounded-xl bg-white shadow-md mt-6 border'>
        <h2 className='my-2 font-medium text-2xl'>Description</h2>
        <p>{carDetail?.listingDescription}</p>
    </div>
  )
}

export default Description