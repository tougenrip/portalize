import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { Input } from '@material-tailwind/react'

const BannerCreate = async (req:NextApiRequest,res:NextApiResponse) => {


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



    const [tltle,setTitle] = useState('')
    const [website, setWebsite] = useState('')
    const [bannerImg, setBannerImg] = useState('')
    const session = await getSession({req})
    const owner = session?.user?.id

  return (
    <form method='POST' action='/api/database/createBanner'>
      <Input type='text' color='purple' onChange={(e) => setBannerImg(e.target.value)}/>
                      <Input type="file" color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} style={{backgroundColor:'#282828'}} label='Change profile picture'></Input>
    </form>
  )
}

export default BannerCreate