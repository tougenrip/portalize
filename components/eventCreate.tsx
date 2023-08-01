import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {  useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import axios from 'axios'
import Navbar from '@components/components/Navbar'
import useSWR from 'swr'

const BannerCreate = () => {
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
        <path d="M54.25 7.75H7.75C6.72229 7.75 5.73666 8.15826 5.00996 8.88496C4.28326 9.61166 3.875 10.5973 3.875 11.625V42.625C3.875 43.6527 4.28326 44.6383 5.00996 45.365C5.73666 46.0917 6.72229 46.5 7.75 46.5H23.25V54.25H15.5V58.125H46.5V54.25H38.75V46.5H54.25C55.2777 46.5 56.2633 46.0917 56.99 45.365C57.7167 44.6383 58.125 43.6527 58.125 42.625V11.625C58.125 10.5973 57.7167 9.61166 56.99 8.88496C56.2633 8.15826 55.2777 7.75 54.25 7.75ZM34.875 54.25H27.125V46.5H34.875V54.25ZM54.25 42.625H7.75V11.625H54.25V42.625Z" fill="white"/>
      </svg>
    <div className='h-min w-full flex flex-col space-y-4 md:space-y-0 md:grid grid-cols-3 grid-rows-2 self-center'>
        <h1 className='font-extrabold text-4xl order-1 col-span-2'>Banner Advertisement</h1>
        <h2 className='font-extrabold md:ml-auto order-3 md:order-2 text-2xl'>Estimate Views : 15.000</h2>
        <h2 className=' font-light order-2 md:order-3 text-2xl col-span-2'>Engage More People With Banner Advertisement</h2>
        <h2 className='  font-light md:ml-auto order-4 text-2xl'>Total Cost : 9.99 $</h2>
    </div>
    </div>
    <Input type='text' className='!border-2 !border-white' label='Set Banner Title' name='title' color='purple' onChange={(e) => setTitle(e.target.value)}/>
    <Input type='text' className='!border-2 !border-white' label='Set Link to Redirect' name='website' color='purple' onChange={(e) => setWebsite(e.target.value)}/>
    {/* <Input type="file" name='img' id='input-div' color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} label='Add banner photo'/> */}
    <Button onClick={handleClick} className='!relative !bg-transparent border-2 border-white !shadow-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
      <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
    </svg>
       <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a file</p>
      </Button>
      <List className="flex flex-col md:flex-row flex-wrap w-full">
        <h1 className='text-white text-3xl w-full'>Tags</h1>
        <ListItem className="p-0 w-max">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
              id='horizontal-list-react'
              color='purple'
              ripple={false}
              className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0"
            />            </ListItemPrefix>
            <Typography color="white" className="font-medium">
              Art
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0 w-max">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
              id='horizontal-list-vue'
              color='purple'
              ripple={false}
              className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0"
            />            </ListItemPrefix>
            <Typography color="white" className="font-medium">
              Technology
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0 w-max">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
              id='horizontal-list-svelte'
              color='purple'
              ripple={false}
              className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0"
            />
            </ListItemPrefix>
            <Typography color="white" className="font-medium">
              Cars
            </Typography>
          </label>
        </ListItem>
      </List>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        style={{display: 'none'}} 
      />
    <Button type='submit' color='purple'>Test</Button>
    <p className='text-center '>Banner Img Preview</p>
    <Image alt='bannerimg' src={`${bannerImg}`} fill className={`!relative !left-1/2 !-translate-x-1/2 !w-64 -z-50 !h-auto `}></Image>
  </form></>
  )
  
}
 
export default BannerCreate