import React from 'react'

// Import statements for React Icons
import { FaClipboardList, FaDollarSign, FaMoneyBillAlt, FaCar, FaTag, FaCheckCircle, FaWrench, FaIndustry, FaCarSide, FaCalendarAlt, FaRoad, FaCogs, FaGasPump, FaTachometerAlt, FaCircle, FaPalette, FaDoorClosed, FaIdCard, FaTags } from 'react-icons/fa';

// Icon map object
const iconMap = {
    FaClipboardList: <FaClipboardList />,
    FaDollarSign: <FaDollarSign />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaCar: <FaCar />,
    FaTag: <FaTag />,
    FaCheckCircle: <FaCheckCircle />,
    FaWrench: <FaWrench />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt />,
    FaCircle: <FaCircle />,
    FaPalette: <FaPalette />,
    FaDoorClosed: <FaDoorClosed />,
    FaIdCard: <FaIdCard />,
    FaTags: <FaTags />
};


function IconField({icon}) {
  return (
    <div className='text-primary bg-blue-100 p-1.5 rounded-full'>{iconMap[icon]}</div>
  )
}

export default IconField