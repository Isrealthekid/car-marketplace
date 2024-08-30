import React from 'react'
import { Input } from '../../components/ui/input'

const InputField = ({item}) => {
  return (
    <div>
        <Input type={item?.fieldType} name={item?.name} required={item?.required}/>
    </div>
  )
}

export default InputField