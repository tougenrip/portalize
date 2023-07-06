import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
import Image from 'next/image'
import axios from 'axios'

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
      .then(async () => {
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
    <>{isBanner ? (<form method='POST' onSubmit={uploadBanner} className='relative h-screen'>
    <Input type='text' name='website' color='purple' onChange={(e) => setWebsite(e.target.value)}/>
    <Image alt='bannerimg' src={`${bannerImg}`} fill className='absolute top-1/2 -z-50 h-24 '></Image>
    <Input type="file" name='img' color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} style={{backgroundColor:'#282828'}} label='Change profile picture'/>
    <Input type='text' name='title' color='purple' onChange={(e) => setTitle(e.target.value)}/>
    <Button type='submit' color='purple'>Test</Button>
  </form>) : ('You`re not eligible to upload a banner ad')}</>
  )
  
}

export default BannerCreate