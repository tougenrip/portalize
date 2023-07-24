import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
  import items from './data';
  import Link from "next/link";
  import { BiUser } from "react-icons/bi";
  import { HeartIcon } from "@heroicons/react/24/outline";
   
  export default function GameCard( {game}, isliked ) {

    

    return (
      <Card className="mt-0  w-[80vw] md:w-80 min-w-[18rem] min-h-[18rem] bg-[#131313] shadow-xl text-center">
        <CardHeader style={{background:`#ffffff url(${game.img || '/img/map.png'})`}} color="blue-gray" className={`w-full mx-0 h-56 shadow-none bg-white !bg-cover !bg-bottom`} >
          
        </CardHeader>
        <CardBody >
          <Typography variant="h5" color="white" className="mb-2">
            {game.title}
          </Typography>
          <Typography>
            {game.desc}
          </Typography>
          <Typography className="inline-flex gap-1">
            <BiUser className="relative top-[3px] h-5 w-5"/>{game.owner || "unknown"}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          
        <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${game._id}`}><Button color="purple" className="bg-gradient-to-br from-purple-500 to-purple-800">Join</Button></Link>
        </CardFooter>
      </Card>
    );
  }