import { items } from "./data";
import React from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import { Card ,Button, CardHeader, CardFooter, CardBody, Typography } from "@material-tailwind/react";
import { BiUser } from "react-icons/bi";
import Link from "next/link";


const FeaCard = ({ setSelected, item }) => {


    

  return (

    <Card className="mt-0  w-[80vw] md:w-80 min-w-[18rem] min-h-[18rem] bg-[#131313] shadow-xl text-center"
    onClick={() => {
               setSelected(item);
             }}>
        <CardHeader style={{background:`#ffffff url(${item.img || '/img/map.png'})`}} color="blue-gray" className={`w-full mx-0 h-56 shadow-none bg-white !bg-cover !bg-bottom`} >
          
        </CardHeader>
        <CardBody >
          <Typography variant="h5" color="white" className="mb-2">
            {item.title}
          </Typography>
          <Typography>
            {item.desc}
          </Typography>
          <Typography className="inline-flex gap-1">
            <BiUser className="relative top-[3px] h-5 w-5"/>{item.owner || "unknown"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
        <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${item._id}`}><Button color="purple" className="bg-gradient-to-br from-purple-500 to-purple-800">Join</Button></Link>
        </CardFooter>
      </Card>
    // <div className="inline-block w-full mb-4">
    //   <motion.img
    //     whileHover={{
    //       scale: 1.025,
    //       transition: {
    //         duration: 0.2,
    //       },
    //     }}
    //     whileTap={{
    //       scale: 0.95,
    //     }}
    //     onClick={() => {
    //       setSelected(item);
    //     }}
    //     layoutId={`card-${item._id}`}
    //     src={item.img || '/img/map.png'}
    //     className="w-full bg-base-100 shadow-xl image-full cursor-pointer"
    //   />
    //   <div className="flex flex-wrap mt-2">
    //   </div>
    // </div>
  );
};

export default function List({ setSelected }) {

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
      const {data: games} = useFetch('api/user/getMaps')

  return (
    <div className="p-4">
      <div className="flex gap-4 !h-min place-items-center overflow-x-scroll scrollbar-none  my-3 p-[32px]">
        {games?.map((item) => (
          <FeaCard key={item._id} setSelected={setSelected} item={item} />
        ))}
      </div>
    </div>
  );
}