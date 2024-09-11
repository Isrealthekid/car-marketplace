import React from 'react'

const ImageGallery = ({carDetail}) => {
  return (
    <div>
        <img src={carDetail?.images[0].imageUrl} className='w-full h-[500px] object-cover rounded-xl'>
        
        </img>
    </div>
  )
}

export default ImageGallery