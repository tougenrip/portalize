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
   
  export default function GameCard( {game} ) {
    return (
      <Card className="mt-0  w-[80vw] md:w-80 min-w-[18rem] min-h-[18rem] bg-[#131313] shadow-xl text-center">
        <CardHeader style={{background:`#ffffff url(${game.img})`}} color="blue-gray" className={`w-full mx-0 h-56 shadow-none bg-white !bg-cover !bg-bottom`} >
          
        </CardHeader>
        <CardBody >
          <Typography variant="h5" color="white" className="mb-2">
            {game.title}
          </Typography>
          <Typography>
            {game.desc}
          </Typography>
          <Typography>
            {game.owner}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
        <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${game._id}`}><Button color="purple" className="bg-gradient-to-br from-purple-500 to-purple-800">Join</Button></Link>
        </CardFooter>
      </Card>
    );
  }