import  Header  from '@/components/Header'
import React, { useEffect, useState } from 'react'
import carDetails from '../Shared/carDetails.json'
import InputField from '@/add-listing/components/InputField'
import { DropdownField } from './components/DropdownField'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import  features from './../Shared/features.json'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { db } from '../../configs' 
import { CarImages, CarListing } from '../../configs/schema'
import TextAreaField from './components/TextAreaField'
import IconField from '@/components/ui/IconField'
import UploadImages from './components/UploadImages'
import {BiLoaderAlt} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { toast } from 'sonner'
import { desc, eq } from 'drizzle-orm'
import Service from '@/Shared/Service'
import { useSearchParams } from 'react-router-dom'




function AddListing() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [triggerUploadImages, setTriggerUploadImages]=useState();
  const [searchParams]=useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo]=useState();
  const navigate=useNavigate();
  const {user}=useUser();

 
  const mode=searchParams.get('mode');
  const recordId = searchParams.get('id')


  useEffect(()=> {
    if(mode=='edit')
    {
      
      GetListingDetail(); 
      
    }
        
  },[]);


  const GetListingDetail = async()=>{
    const result=await db.select().from(CarListing)
    .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
    .where(eq(CarListing.id,recordId));

    const resp=Service.FormatResult(result);
    setCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeaturesData(resp[0].features);
   
    console.log(resp)
    // console.log(result)  
   

    
  }

  /**
   * Used to save selected Features List
   * @param {*} name
   * @param {*} value
   */

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    console.log(formData);
  };


  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    console.log(featuresData);
  };

  const errorHandler = () => {
    setErrorMessage('FILL ALL REQUIRED FIELDS');
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(formData);
    toast('Please Wait...')

    if (mode=='edit')
      {
       const result = await db.update(CarListing).set({
        ...formData, 
        features: featuresData,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        userImageUrl:user?.imageUrl,
        postedOn:moment().format('DD/MM/YYYY')
       }).where(eq(CarListing.id,recordId)).returning({id:CarListing.id});
       console.log(result);
      navigate('/profile')
       setLoader(false);

      }
      else{
        try {
          // const result = await db.insert(CarListing).values(formData);
          const result = await db.insert(CarListing).values({
             ...formData, 
             features: featuresData,
             createdBy:user?.primaryEmailAddress?.emailAddress,
             userName:user?.fullName,
             userImageUrl:user?.imageUrl,
             postedOn:moment().format('DD/MM/YYYY')
            //  postedOn:moment().format('DD/MM/yyyy')
             },
          ).returning({ id:CarListing.id });
    
          if (result) {
            console.log("data saved");
            setTriggerUploadImages(result[0]?.id);
            setLoader(false);
          } else {
            errorHandler();
          }
        } catch (e) {
          console.log("error", e);
          toast('Please fill all required fields')
          // errorHandler();
        }
       
      }



  
  };

  return (
    <div>
       <Header />
       <div className='px-10 md:px-20 my-10'>
          <h2 className='font-bold text-4xl'>Add New Listing</h2>
    <form className='p-10 border rounded-xl mt-10'>
      <div>
        <h2 className='font-medium text-xl mb-6 '>Car Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {carDetails.carDetails.map((item, index) => (
            <div key={index}>
              <label className='text-sm text-bold flex gap-2 items-center mb-2'>
                <IconField icon={item?.icon} />
                {item?.label} {item.required && <span className='text-red-500'>*</span>}
              </label>
              {item.fieldType === 'text' || item.fieldType === 'number'
                ? <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                : item.fieldType === 'dropdown' ? <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                  : item.fieldType === 'textarea' ? <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                    : null}
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <h2 className='font-medium text-xl my-6'>Features</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          {features.features.map((item, index) => (
            <div key={index} className='flex gap-2 items-center '>
              <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)} 
                checked={featuresData?.[item.name]}
              />
                 <h2>{item.label}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Upload image */}
      <Separator className="my-6" />
      {/* //WRITE A LOGIC TO SHOW THE CAR IMAGES AS DEFAULT VALUES WHEN EDITING THE LISTING */}
          {/* WRITE A LOGIC TO DELETE A LISTING // CHECK ORM.DRIZZLE.TEAM/DOCS/DELETE*/}

          {/* CHECK THE LOGIC TO FIX UPLOADING A NEW IMAGE WHILE EDITING A LISTING */}
      
      <UploadImages triggerUploadImages={triggerUploadImages}
      carInfo={carInfo}  
      mode={mode}
      setLoader={(v)=>{setLoader(v);navigate('/profile')}} />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="mt-10 flex justify-end">
        <Button type="submit" disabled={loader} onClick={(e) => onSubmit(e)}>{!loader?'Submit':<BiLoaderAlt className='animate-spin text-lg'/>}</Button>
      </div>
    </form>
    </div>
  </div>
  );
};

export default AddListing;

// function AddListing() {
//   const [formData,setFormData]=useState([]);
//   const [featuresData, setFeaturesData]=useState([]);
//   const [triggerUploadImages, setTriggerUploadImages]=useState();

//   const handleInputChange=(name,value)=>{
//     setFormData((prevData)=>({
//       ...prevData,
//       [name]:value
//     }))

//     console.log(formData)

//   }
// /**
//  * Used to save selected Features List
//   *@param {*} name
//   *@param {*} value
// */
  
//   const handleFeatureChange=(name, value)=>{
//     setFeaturesData((prevData)=>({
//       ...prevData,
//       [name]:value
//     }))

//     console.log(featuresData)
//   }

//   const onSubmit=async(e)=>{
//     e.preventDefault();
//     console.log(formData)

//     try{
//       // const result= await db.insert(CarListing).values(formData);
//       const result= await db.insert(CarListing).values({...formData,features:featuresData}).returning({id:CarListing.id});

//       if(result)
//       {
//         console.log("data saved")
//         setTriggerUploadImages(result[0].id);
//       }
//    }catch(e){
//         console.log("error",e)
//         errorHandler();
//    }
//   }

  


//   return (
//     <div>
//       <Header />
//       <div className='px-10 md:px-20 my-10'>
//           <h2 className='font-bold text-4xl'>Add New Listing</h2>

//           <form className='p-10 border rounded-xl mt-10'>
//             <div>
//               <h2 className='font-medium text-xl mb-6 '>Car Details</h2>
//               <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                 {carDetails.carDetails.map((item,index)=> (
//                   <div key={index}>
//                     <label className='text-sm text-bold flex gap-2 items-center mb-2'>
//                       <IconField icon={item?.icon}/>
//                       {item?.label} {item.required&&<span className='text-red-500'>*</span>}</label>
//                       {item.fieldType=='text' || item.fieldType=='number' 
//                       ? <InputField item={item} handleInputChange={handleInputChange}/>
//                       :item.fieldType=='dropdown'?<DropdownField item={item} handleInputChange={handleInputChange}/>
//                       :item.fieldType=='textarea'?<TextAreaField item={item} handleInputChange={handleInputChange}/>
//                       :null}
//                   </div>
//                 )) }
//               </div>
//             </div>
//             <Separator className="my-6"/>
//             <div>
//               <h2 className='font-medium text-xl my-6'>Features</h2>
//                 <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
//                   {features.features.map((item,index)=> (
//                     <div key={index} className='flex gap-2 items-center ' >
//                       <Checkbox onCheckedChange={(value)=>handleFeatureChange(item.name,value)}/> <h2>{item.label}</h2>
//                     </div>
//                   ))}
//                 </div>
//             </div>

//             {/* Upload iamge  */}
//             <Separator className="my-6"/>

//             <UploadImages triggerUploadImages={triggerUploadImages}/>
            
//             <div className="mt-10 flex justify-end">
//               <Button type="submit" onClick={(e)=>onSubmit(e)}>Submit</Button>
//             </div>
//           </form>
         
//       </div>
//     </div>
//   )
// }