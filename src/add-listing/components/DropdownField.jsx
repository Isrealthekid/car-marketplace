import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React from 'react'

export const DropdownField = ({item}) => {
  return (
    <div>
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={item.label} />
            </SelectTrigger>
            <SelectContent>
                {item?.options.map((option,index)=>(
                     <SelectItem value={option}>{option}</SelectItem>
                ))}
                
                
            </SelectContent>
        </Select>

    </div>
  )
}
  