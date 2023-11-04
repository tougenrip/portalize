import getStripe from '@/utils/getStripe';
import { Button } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
const CustomerPortalButton = () => {
  const router = useRouter();
  const session = useSession();
  
    
  const redirectToCustomerPortal = async (res) => {
      
    try {
    const url = await fetch("/api/stripe/create-customer-portal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const portal = await url.json()
        router.push(portal.portal)
      } catch (error) {
        if (error) return alert((error as Error).message);
      }
    };
    
  return (
    <Button
    variant='outlined'
    size='sm' color='purple'
    className='border-transparent hover:border-purple-500 rounded-xl group-hover:shadow-lg hover:shadow-md tracking-wider'
    fullWidth
    disabled={session.status === "unauthenticated"}
    onClick={redirectToCustomerPortal}
      >
        Open customer portal
      </Button>
  )

  };

export default CustomerPortalButton