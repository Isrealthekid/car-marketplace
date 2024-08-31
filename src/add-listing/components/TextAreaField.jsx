import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TextAreaField = ({item,handleInputChange}) => {
  return (
    <div>
        <Textarea required={item.required} onChange={(e)=>handleInputChange(item.name,e.target.value)}/>
    </div>
  )
}

export default TextAreaField