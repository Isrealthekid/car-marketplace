import { Button } from '@/components/ui/button';
import { storage } from '../../../configs/firebaseConfig';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import React from 'react'
import {useState, useEffect} from 'react'
import {IoMdCloseCircle} from 'react-icons/io'
import { CarImages } from '../../../configs/schema';
import { db } from '../../../configs';


function UploadImages({triggerUploadImages, setLoader}) {

    const [selectedFileList,setSelectedFileList]=useState([]);

    useEffect(()=>{
        if(triggerUploadImages)
        {
            UploadImageToServer();
        }
    }, [triggerUploadImages])

    const onFileSelected=(event)=>{
        const files= event.target.files;
        console.log(files);
    
        for(let i=0; i<files?.length;i++)
        {
            const file=files[i];
            // console.log(file);
            // const objectUrl=URL.createObjectURL(file);
            setSelectedFileList((prev)=>[...prev,file])
        }
    }
    const onImageRemove=(image,index)=>{
        const result=selectedFileList.filter((item)=>item!=image);
        setSelectedFileList(result);
    }

    const UploadImageToServer=async()=>{
        setLoader(true)
        await selectedFileList.forEach((file)=>{
            const fileName=Date.now()+'.jpeg';
            const storageRef=ref(storage,'car-marketplace/'+fileName);
            const metaData={
                contentType:'image/jpeg'
            }
            uploadBytes(storageRef,file,metaData).then((snapShot)=>{
                console.log('uploaded file');
            }).then(resp=>{
                getDownloadURL(storageRef).then(async(downloadUrl)=>{
                    console.log(downloadUrl);
                    await db.insert(CarImages).values({
                        imageUrl:downloadUrl,
                        carListingId:triggerUploadImages
                    })
                })
            })
            setLoader(false); 
        })
    }

  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
            {selectedFileList.map((image,index)=>(
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg' onClick={()=>onImageRemove(image,index)}/>
                    <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl'/>
                </div>
            ))}
            <label htmlFor="upload-images"> 
                <div className='border rounded-xl border-dotted border-primary cursor-pointer bg-blue-100 p-10 hover:shadow-md'>
                    <h2 className="text-lg text-center text-primary">+ </h2>
                </div>
            </label>
            <input type="file" multiple={true} id='upload-images' className='opacity-0' onChange={onFileSelected}/>
        </div>

    </div>
  )
}

export default UploadImages