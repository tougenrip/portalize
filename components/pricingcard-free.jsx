import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from 'next-auth/react'
 
export default function PricingCardFree({className}) {

  const { data: session, status } = useSession();
  const isLogged = status == 'authenticated';

  return (
    <Card  variant="gradient" className={className}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none pb-8 text-start space-y-5"
      >
        <Typography
          variant="small"
          color="white"
          className="font-gilroy font-extrabold text-2xl leading-6 tracking-[0.2rem] uppercase text-white mix-blend-hard-light px-0 py-2 rounded"
        >
          EXPLORE PORTALS
        </Typography>
        <Typography
          variant="small"
          color="white"
          className="font-gilroy font-light text-5xl leading-6 tracking-wider text-white mix-blend-hard-light px-0 py-2 rounded"
        >
          Free
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
          
        <ul className="flex flex-col space-y-6">
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Unlimited Access Worlds</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Character Creator Access</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Editor Access</Typography>
          </li>          
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        
          
            <Link href={isLogged ? (`/editor`):(`/auth`)}>
            <Button
            size="lg"
            color="white"
            className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-md px-4 py-2 text-white"
            ripple={false}
            fullWidth={true}
          >
           {isLogged ? ('Launch Editor'):('Create Account')} 
          </Button>
          </Link>
            
        
      </CardFooter>
    </Card>
  );
}