"use client";
import getStripe from "../utils/getStripe";
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

export const SubscriptionCard = ({
	planType,
	price,
	priceId,
	features,
	hasMore
}: {
	planType: string;
	price: string;
	priceId: string;
	features: Array<string>;
	hasMore: boolean;
}) => {

	const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  const userName = session?.user?.name;
  const isLogged = status == 'authenticated';

	const handleCreateCheckoutSession = async (productId: string) => {
		const res = await fetch("/api/stripe/checkout-session", {
			method: "POST",
			body: JSON.stringify(productId),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const checkoutSession = await res.json().then((value) => {
			return value.session;
		});
		const stripe = await getStripe();
		const { error } = await stripe!.redirectToCheckout({
			sessionId: checkoutSession.id,
		});
	};
	return (
		// <div
		// 	onClick={() => handleCreateCheckoutSession(priceId)}
		// 	className={`p-10 border-2 hover:cursor-pointer hover:bg-gray-700 hover:scale-105 duration-300  transition-all w-full max-w-[21rem] min-h-[22rem] bg-black`}
		// >
		// 	<div className="font-bold text-3xl mb-2 capitalize">{planType}</div>
		// 	<div className="flex items-baseline mb-2">
		// 		<div className="text-3xl mr-2">{price}</div> / Month
		// 	</div>
		// 	<ul className="list-disc pl-4 ">
		// 		<li>Appointment scheduling</li>
		// 		<li>Patient notification</li>
		// 		<li>Create up to one office</li>
		// 		<li>Description ...</li>
		// 		<li>Description ....</li>
		// 	</ul>
		// </div>
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
		  BE {planType}
		  </Typography>
		  <Typography
			variant="h1"
			color="white"
			className="mt-6 flex justify-start gap-1 text-7xl font-normal"
		  >
			<span className="mt-2 text-4xl">$</span>{price}{" "}
			<span className="self-end text-4xl">/mo</span>
		  </Typography>
		</CardHeader>
		<CardBody className="p-0">
		<ul className="flex flex-col space-y-6">
			{features?.map((feature) => <li key={feature} className="flex items-center space-x-2">
			  <span className="rounded-full p-0">
				<CheckIcon  strokeWidth={4} className="h-5 w-5 stroke-[#773fff]" />
			  </span>
			  <Typography className="font-gilroy font-light text-white text-2xl leading-6 tracking-tighter0">{feature}</Typography>
			</li>)     }
			<li  className={`flex items-center space-x-2 ${hasMore ? null : "hidden"}`}>
			  <span className="rounded-full p-0">
			  </span>
			  <Typography className="font-gilroy font-bold text-white text-2xl leading-6 tracking-tighter">And Much More...</Typography>
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
			onClick={() => handleCreateCheckoutSession(priceId)}
		  >
			Be {planType}
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
};
