import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {  useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import useSWR from 'swr'

const EventCreate = () => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width="137" height="137" viewBox="0 0 137 137" fill="none">
        <path d="M78.6452 35.5474L43.5321 96.2933C43.042 97.14 42.7836 98.1009 42.7828 99.0792C42.782 100.057 43.0388 101.019 43.5275 101.866C44.0162 102.714 44.7195 103.418 45.5666 103.907C46.4137 104.396 47.3747 104.654 48.353 104.654L118.515 104.69C119.493 104.691 120.454 104.434 121.302 103.945C122.15 103.457 122.854 102.754 123.343 101.907C123.833 101.06 124.091 100.099 124.091 99.1204C124.091 98.1421 123.834 97.181 123.344 96.3338L88.2956 35.5523C87.8073 34.7048 87.1044 34.0007 86.2576 33.511C85.4108 33.0214 84.45 32.7633 83.4718 32.7628C82.4936 32.7623 81.5326 33.0194 80.6853 33.5082C79.838 33.9971 79.1344 34.7004 78.6452 35.5474Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M60.2976 67.2884L50.5425 50.3685C50.0542 49.5209 49.3513 48.8169 48.5045 48.3272C47.6577 47.8375 46.6969 47.5794 45.7187 47.5789C44.7406 47.5784 43.7795 47.8355 42.9322 48.3244C42.085 48.8132 41.3813 49.5165 40.8922 50.3636L14.3546 96.2785C13.8645 97.1252 13.606 98.086 13.6052 99.0643C13.6044 100.043 13.8613 101.004 14.35 101.851C14.8387 102.699 15.5419 103.403 16.389 103.892C17.2361 104.382 18.1972 104.639 19.1755 104.639L48.3532 104.654M48.804 87.1726L70.0965 87.1834M58.477 70.4353L81.3505 70.4469M105.459 65.311C107.704 65.2492 109.894 64.6055 111.815 63.443C113.736 62.2804 115.322 60.6389 116.418 58.6792C117.514 56.7194 118.082 54.5086 118.067 52.2632C118.052 50.0179 117.454 47.8149 116.332 45.8701C115.209 43.9253 113.601 42.3053 111.665 41.1688C109.728 40.0322 107.53 39.4181 105.285 39.3865C103.039 39.3549 100.824 39.907 98.8567 40.9886C96.8889 42.0703 95.2359 43.6444 94.0593 45.5569" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    <div className='h-min w-full flex flex-col space-y-4 md:space-y-0 md:grid grid-cols-3 grid-rows-2 self-center'>
        <h1 className='font-extrabold text-4xl order-1 col-span-2'>Start Event</h1>
        <h2 className='font-extrabold md:ml-auto order-3 md:order-2 text-2xl'>Estimate Views : 200.000</h2>
        <h2 className=' font-light order-2 md:order-3 text-2xl col-span-2'>Engage More People With Events</h2>
        <h2 className='  font-light md:ml-auto order-4 text-2xl'>Total Cost : 5 $</h2>
    </div>
    </div>
    <Input type='text' className='!border-2 !border-white' label='Set Banner Title' name='title' color='purple' onChange={(e) => setTitle(e.target.value)} crossOrigin={undefined}/>
    <Input type='text' className='!border-2 !border-white' label='Set Link to Redirect' name='website' color='purple' onChange={(e) => setWebsite(e.target.value)} crossOrigin={undefined}/>
    {/* <Input type="file" name='img' id='input-div' color="purple"  className='border-2 border-white' onChange={(e) => handleFileUpload(e)} label='Add banner photo'/> */}
    <Button onClick={handleClick} className='!relative !bg-transparent border-2 border-white !shadow-none'>
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="54" viewBox="0 0 44 54" fill="none">
      <path d="M19.5153 45.7128L24.8903 45.7156L24.8959 34.6518L29.1937 38.894L32.9581 35.1197L22.2135 24.5142L11.4581 35.1088L15.2859 38.8207L19.5209 34.6491L19.5153 45.7128ZM6.07373 53.656C4.5956 53.6553 3.33005 53.1352 2.27708 52.0959C1.22411 51.0566 0.698885 49.809 0.701415 48.3533L0.722904 5.95332C0.723643 4.49582 1.25102 3.24794 2.30505 2.20967C3.35908 1.17141 4.62426 0.653534 6.10059 0.656049L27.6006 0.666946L43.7175 16.5751L43.7014 48.3751C43.7007 49.8326 43.1733 51.0805 42.1193 52.1187C41.0652 53.157 39.8001 53.6749 38.3237 53.6724L6.07373 53.656ZM24.9037 19.2156L24.9104 5.96558L6.0979 5.95605L6.07641 48.356L38.3264 48.3724L38.3412 19.2224L24.9037 19.2156Z" fill="white"/>
    </svg>
       <p className='absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2'> Upload a file</p>
      </Button>
      <List className="flex flex-col md:flex-row flex-wrap w-full">
        <h1 className='text-white text-3xl w-full'>Tags</h1>
        <ListItem className="p-0 w-max hover:bg-transparent">
          <label
            htmlFor="horizontal-list-react"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
                  id='horizontal-list-react'
                  color='purple'
                  ripple={false}
                  className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0" crossOrigin={undefined}            />            </ListItemPrefix>
            <Typography color="white" className="font-medium">
              Art
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0 w-max hover:bg-transparent">
          <label
            htmlFor="horizontal-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
                  id='horizontal-list-vue'
                  color='purple'
                  ripple={false}
                  className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0" crossOrigin={undefined}            />            </ListItemPrefix>
            <Typography color="white" className="font-medium">
              Technology
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0 w-max hover:bg-transparent">
          <label
            htmlFor="horizontal-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
            <Checkbox
                  id='horizontal-list-svelte'
                  color='purple'
                  ripple={false}
                  className="h-8 w-8 rounded-full border-purple-500/50 bg-purple-500/25 transition-all hover:scale-105 hover:before:opacity-0" crossOrigin={undefined}            />
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
    <p className='text-center '>Event Thumbnail Preview</p>
    <Image alt='bannerimg' src={`${bannerImg}`} fill className={`!relative !left-1/2 !-translate-x-1/2 !w-64 -z-50 !h-auto `}></Image>
  </form></>
  )
  
}
 
export default EventCreate