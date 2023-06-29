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
      <Card className="mt-6 w-[80vw] md:w-96  bg-black shadow-xl">
        <CardHeader color="blue-gray" className={`relative h-56 bg-white bg-cover bg-bottom`} >
          
        </CardHeader>
        <CardBody >
          <Typography variant="h5" color="blue-gray" className="mb-2">
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
        <Link href={`game/${game._id}`}><Button className="">Join</Button></Link>
        </CardFooter>
      </Card>
    );
  }