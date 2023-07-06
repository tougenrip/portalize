import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {checkout} from "../checkout"
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
    <Card color="transparent" variant="gradient" className="w-full max-w-[26rem] p-8" style={{boxShadow:'none'}}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          Premium
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">$</span>2.99{" "}
          <span className="self-end text-4xl">/mo</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">5 team members</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">200+ components</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">40+ built-in pages</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">1 year free updates</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon strokeWidth={2} className="h-3 w-3" />
            </span>
            <Typography className="font-normal">Life time technical support</Typography>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        {isLogged ? (<Button
          size="lg"
          color="purple"
          className="text-white !bg-gradient-to-br !from-purple-500 !to-purple-900 hover:shadow-lg hover:shadow-purple-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
          onClick={() => {
            if (isCheckoutLoading) return;
            else goToCheckout();
          }}
        >
          Buy Now
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