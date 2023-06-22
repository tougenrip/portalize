import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    IconButton
  } from "@material-tailwind/react";
  import { signIn, signOut,getProviders } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import {FaApple, FaTwitter, FaGithub} from "react-icons/fa"
import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Router from "next/router";
   


  const SignInform = ({}) => {

    

    return (
      <Card color="transparent" shadow={false}>
        <form method="post" action="/api/auth/callback/credentials" className="mt-8 mb-2 w-[100%] max-w-screen-lg min-w-0 sm:w-[100%]">
          <div className="mb-1 flex flex-col gap-2">
            <Input color="purple" type='email' size="lg" className="!border-0 !bg-inputBg  !ring-0" label="Email" />
            <Input color="purple" type="password" size="lg" className="!border-0 !bg-inputBg  !ring-0" label="Password" />
            
          </div>

          <div className="flex flex-row gap-4 my-4">
          <div className="">
          <IconButton size="sm" className="px-8 py-5" onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })} color="white" >
            <FcGoogle size={'2em'}/>
          </IconButton>
          </div>
          <div className="">
          <IconButton size="sm" className="px-8 py-5" onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/' })} color="white" >
            <FaGithub size={'2em'}/>
          </IconButton>
          </div>
          <div className="">
          <IconButton size="sm" className="px-8 py-5" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })} color="blue" >
            <FaTwitter size={'2em'}/>
          </IconButton>
          </div>

          </div>

          <Button className="mt-2" type="submit" color="purple" fullWidth>
            SIGN IN
          </Button>
          <Typography color="white" className="mt-2 text-center font-normal">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-500 transition-colors hover:text-purple-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    );
    }
  

  export default SignInform