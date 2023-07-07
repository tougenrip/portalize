import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'

const BannerCreate = (req:NextApiRequest,res:NextApiResponse) => {
  


  const {data:session} = useSession();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBannerImg(base64 as unknown as string);
  };

  const uploadBanner = async () => {

    const res = await axios.post(
        "/api/database/createbanner",
        { title, website, bannerImg },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        window.alert('Uploaded Banner Ad successfully')
        
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };



    const [title,setTitle] = useState('')
    const [website, setWebsite] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    
    const owner = session?.user?.id
    const isBanner = session?.user?.bannerEnabled

  return (
    <><form method='POST' onSubmit={uploadBanner} className='absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 w-[80vw] md:w-[50vw]'>
    <h1 className='text-5xl font-bold relative bottom-10 text-center'>Please add your banner img</h1>
    <Input type='text' label='Set Banner Title' name='title' color='purple' onChange={(e) => setTitle(e.target.value)}/>
    <Input type='text' label='Set Link to Redirect' name='website' color='purple' onChange={(e) => setWebsite(e.target.value)}/>
    <Input type="file" name='img' color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} label='Add banner photo'/>
    
    <Button type='submit' color='purple'>Test</Button>
    <p className='text-center'>Banner Img Preview</p>
    <Image alt='bannerimg' src={`${bannerImg}`} fill className='!relative !left-1/2 !-translate-x-1/2 !w-64 -z-50 !h-auto '></Image>
  </form></>
  )
  
}
 
export default BannerCreate