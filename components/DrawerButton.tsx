import { Button, Drawer, Typography, IconButton } from '@material-tailwind/react'
import mongoose from 'mongoose'
import React from 'react'
import { BiCross } from 'react-icons/bi'
import User from '../pages/api/schemas/usersch'
import { ObjectId } from 'mongodb'
import useSWR from 'swr'


const DrawerButton = ({id}) => {
    const [openBottom, setOpenBottom] = React.useState(false);
    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const fetcher = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        return response.json();
      };
      
      const useFetch = (path) => {
        const { data, error } = useSWR(`http://localhost:3000/${path}`, fetcher);
      
        const isLoading = !data && !error;
      
        return { data, error, isLoading };
      };
      const {data: games, error, isLoading} = useFetch(`api/user/getMaps?id=${id}`)



  return (
    <>
    <Button onClick={openDrawerBottom} variant='filled'  className='!absolute !bottom-5 !right-16'>Edit Map</Button> 
    <Drawer
        placement="bottom"
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4"
        >
  <div className="mb-6 flex items-center justify-between">
    <Typography variant="h5" color="blue-gray">
      Drawer on {games.title}
    </Typography>
    <IconButton
      variant="text"
      color="blue-gray"
      onClick={closeDrawerBottom}
    >
      <BiCross strokeWidth={2} className="h-5 w-5" />
    </IconButton>
  </div>
</Drawer>
    </>
  )
}

export default DrawerButton