import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {  useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import useSWR from 'swr'

const SkyCreate = () => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return response.json();
  };
  
  const useFetch = (path) => {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`, fetcher);
  
    const isLoading = !data && !error;
  
    return { data, error, isLoading };
  };
  const {data: games, error, isLoading} = useFetch('api/user/maps')


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

  const hiddenFileInput = React.useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBannerImg(base64 as unknown as string);
  };

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
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
    <>
    <form method='POST' onSubmit={uploadBanner} className=' flex flex-col gap-4 mx-auto w-[85%] !z-40 my-28'>
      <div className='flex-col md:flex-row flex space-x-6'>
      <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
        <path d="M16.8448 6.9984C21.1007 4.53908 25.9313 3.24903 30.8467 3.2591C46.3111 3.26694 58.8403 15.8089 58.8325 31.2733C58.8246 46.7377 46.2827 59.2669 30.8183 59.2591C15.3539 59.2513 2.82465 46.7093 2.83249 31.2449C2.83507 26.1461 4.2011 21.3616 6.58598 17.2468" stroke="white" stroke-width="5" stroke-linecap="round"/>
        <path d="M38.7408 51.0619C37.7007 53.6625 36.4649 55.7227 35.1062 57.1304C33.7447 58.5353 32.2883 59.2598 30.8183 59.2591C29.3483 59.2583 27.8927 58.5324 26.5354 57.1261C25.1753 55.717 23.9415 53.6528 22.9041 51.0538C21.8638 48.4521 21.0393 45.3689 20.4783 41.9694C19.906 38.4263 19.6231 34.8424 19.6325 31.2534C19.6343 27.577 19.9246 23.9343 20.4891 20.5382C21.0536 17.1421 21.8812 14.0569 22.9241 11.4562C23.9642 8.85558 25.2001 6.7954 26.5588 5.38769C27.9203 3.98558 29.3767 3.25832 30.8467 3.25906C32.3167 3.25981 33.7723 3.98575 35.1296 5.39204C36.4897 6.80112 37.7234 8.86535 38.7609 11.4643C39.8012 14.066 40.6256 17.1492 41.1839 20.5487C41.745 23.9454 42.0343 27.5883 42.0325 31.2647C42.0306 34.9411 41.7376 38.5838 41.1731 41.9799M2.83249 31.2449L25.2325 31.2562M58.8325 31.2733L36.4325 31.2619" stroke="white" stroke-width="5" stroke-linecap="round"/>
      </svg>
    <div className='h-min w-full flex flex-col space-y-4 md:space-y-0 md:grid grid-cols-3 grid-rows-2 self-center'>
        <h1 className='font-extrabold text-4xl order-1 col-span-2'>Sky Advertisement</h1>
        <h2 className='font-extrabold md:ml-auto order-3 md:order-2 text-2xl'>Estimate Views : 40.000</h2>
        <h2 className=' font-light order-2 md:order-3 text-2xl col-span-2'>Engage More People With Sky Advertisement</h2>
        <h2 className='  font-light md:ml-auto order-4 text-2xl'>Total Cost : 1.000 $</h2>
    </div>
    </div>
    <label
    htmlFor="customRange2"
    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
    >Example range</label>
  <input
    type="range"
    className="appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[30px] [&::-webkit-slider-thumb]:w-[30px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
    min="5"
    defaultValue={5}
    max="30"
    step={5}
    id="customRange2" >
    </input>
    <Input type='text' className='!border-2 !border-white' label='Set Banner Title' name='title' color='purple' onChange={(e) => setTitle(e.target.value)} crossOrigin={undefined}/>
    <Input type='text' className='!border-2 !border-white' label='Set Link to Redirect' name='website' color='purple' onChange={(e) => setWebsite(e.target.value)} crossOrigin={undefined}/>
    {/* <Input type="file" name='img' id='input-div' color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} label='Add banner photo'/> */}
    <Button onClick={handleClick} className='!relative !bg-transparent border-2 border-white !shadow-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
      <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
    </svg>
       <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a file</p>
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        style={{display: 'none'}} 
      />
    <Button type='submit' color='purple'>Test</Button>
    <p className='text-center '>Ad Preview</p>
    <Image alt='bannerimg' src={`${bannerImg}`} fill className={`!relative !left-1/2 !-translate-x-1/2 !w-64 -z-50 !h-auto `}></Image>
  </form></>
  )
  
}
 
export default SkyCreate