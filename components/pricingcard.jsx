import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
 
export default function PricingCard() {

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  
  const goToCheckout = async () => {
    setIsCheckoutLoading(true);
    const res = await fetch(`/api/stripe/create-checkout-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { redirectUrl } = await res.json();
    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else {
      setIsCheckoutLoading(false);
      console.log("Error creating checkout session");
    }
  };
  
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  const userName = session?.user?.name;
  const isLogged = status == 'authenticated';


  return (
    <Card color="transparent" variant="gradient" className="w-full max-w-[26rem] bg-[#282828] p-8" style={{boxShadow:'none'}}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none  text-start"
      >
        <Typography
          variant="small"
          color="white"
          className="font-gilroy font-extrabold text-2xl leading-6 tracking-[0.2rem] uppercase text-white mix-blend-hard-light px-0 py-2 rounded"
        >
        BE PRO
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-start gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">$</span>9.99{" "}
          <span className="self-end text-4xl">/mo</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
      <ul className="flex flex-col space-y-6">
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Up to 20 Sub-Servers</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">10000+ Assets</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Unlimited Portals</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Ads Integration</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Shop Integration</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Workspace Integration</Typography>
          </li>
          <li className="flex items-center space-x-2">
            <span className="rounded-full p-0">
              <CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
            </span>
            <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">Developer Access</Typography>
          </li>          
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        {isLogged ? (<Button
          size="lg"
          color="purple"
          className="text-white !bg-gradient-to-br !from-purple-500 !to-purple-900 hover:shadow-lg  shadow-purple-700 hover:shadow-purple-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
          onClick={() => {
            if (isCheckoutLoading) return;
            else goToCheckout();
          }}
        >
          Be PRO
        </Button>) : (<Link href={'/auth'}><Button
          size="lg"
          
          className="text-white !bg-gradient-to-br !from-purple-500 !to-purple-900 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
          
        >
          Join Now
        </Button></Link>)}
        
      </CardFooter>
    </Card>
  );
}