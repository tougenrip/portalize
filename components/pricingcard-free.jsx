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
 
export default function PricingCardFree() {

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  const userName = session?.user?.name;
  const isLogged = status == 'authenticated';

  return (
    <Card  variant="gradient" className="w-full max-w-[20rem] bg-[#282828] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-start"
      >
        <Typography
          variant="small"
          color="white"
          className="font-gilroy font-light text-2xl leading-6 tracking-wider uppercase text-white mix-blend-hard-light opacity-60 px-4 py-2 rounded"
        >
          FREE
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="font-gilroy font-light text-6xl leading-none tracking-wider text-white">$</span>0{" "}
          <span className="self-end font-gilroy font-light text-6xl leading-none tracking-wider text-white">/mo</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon  strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Up to 10 User Join</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">20 Assets</Typography>
          </li>          
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}editor`}>
          {isLogged ? (
            <Link href={`/editor`}>
            <Button
            size="lg"
            color="white"
            className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-md px-4 py-2 text-white"
            ripple={false}
            fullWidth={true}
            
          >
            Launch Editor
          </Button>
          </Link>
          ):(
          <Link href={`/auth`}>  
            <Button
          size="lg"
          color="white"
          className="bg-gradient-to-br from-indigo-600 to-purple-500 rounded-md px-4 py-2 text-white"
          ripple={false}
          fullWidth={true}
          
        >
          Register
        </Button>
        </Link>
            )}
        </Link>
      </CardFooter>
    </Card>
  );
}