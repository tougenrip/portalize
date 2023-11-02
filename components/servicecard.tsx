import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Image from "next/image";
import { BiUser, BiFace} from "react-icons/bi";
   
  export function ServiceCard({title, desc, image}:{title:string;desc:string;image:string}) {
    return (
      <Card className="mt-6 w-fit shadow-none " color="transparent">
        <CardBody className="text-center justify-items-center space-y-4">
            
           <Image src={image} width={80} height={80} alt="serviceimg" className="mx-auto"  unoptimized/>
          <Typography variant="h5" color="white" className="mb-2 text-2xl font-bold">
            {title}
          </Typography>
          <Typography  className=" text-gray-400 text-xl font-light">
            {desc}
          </Typography>
        </CardBody>
      </Card>
    );
  }