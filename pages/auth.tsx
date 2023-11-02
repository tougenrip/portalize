import { useState } from "react";
import type { NextApiRequest, NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";
import {
  
  Flex,
  FormControl,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Button, Input } from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Background = ({ children }: any) => (
  
    <div className="flex flex-auto items-center bg-[url('/img/landing-page/herobg_comp.webp')] bg-cover bg-no-repeat bg-center bg-fixed w-full h-screen">
      {children}
    </div>
    
);



const Auth: NextPage = (req : NextApiRequest) => {
 
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const stripeCustomerId = '';
  const isActive = false;
  const image = '';
  const rpmId = '';
  const likedMaps = [""];
  const ownedMaps = [""];
  const avatarUrl = '';
  const skyEnabled = false;
  const bannerEnabled = false;


  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      window.alert('You are being redirected')
      Router.push("/");
    }
  };
  const redirectToUrl = (url:string) => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      toast.success('You are being redirected')
      Router.push(url);
    }
  };
  // , verfcode
  const registerUser = async () => {
    const res = await axios
      .post(
        `/api/register`,
        { username, email, password, confirm, stripeCustomerId, isActive,image,skyEnabled,bannerEnabled, avatarUrl, rpmId, likedMaps, ownedMaps },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser('afterAuth');
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async (url:string) => {
    new Error(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`)
    console.error(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`)
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${url}`,
    });
    res.error ? toast.warning('Please check your details') : redirectToUrl('/afterAuth');
  };

  const formSubmit = (actions: any) => {
    actions.setSubmitting(false);


    authType === "Login" ? loginUser('user/dashboard') : registerUser();
  };

  return (
    <>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
        />
    <Head>
      <title>Portalize | {authType}</title>
    </Head>
    <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=HXHGJ64EP8" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'HXHGJ64EP8');
          `}
        </Script>
      </div>
    
    <Background>
      <div className="absolute w-full md:w-[600px] h-screen rounded-md items-center bg-[#151515]">
      <div className='absolute top-2 left-[9%] w-max'>
         <Link href={'/'}><Image src='/img/logocomp.webp' className="relative scale-75 -left-7 md:left-0 md:scale-100 my-5 !z-50" width={218} height={38} alt="Logo"/></Link>
          </div>
        <div className="absolute top-24 left-[9%]">
        <Heading size="xl" >{authType}</Heading>
          <Text fontSize="sm" mb={6}>
            {authType === "Login"
              ? "Not registered yet? "
              : "Already have an account? "}
            <button onClick={() => setAuthType(oppAuthType[authType])}>
              <Text as="u">{oppAuthType[authType]}</Text>
            </button>
          </Text>
        </div>
        
        
          <div className="flex flex-col justify-center w-[80%] absolute left-1/2 -translate-x-1/2  bottom-48 items-start">
          

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%", zIndex:"90" }}>
                <div className="flex flex-col w-full mb-4 space-y-2">
                
                  {authType === "Register" && (
                    <>
                    <Field name="username">
                      {() => (
                        <FormControl isRequired mb={6}>
                          <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                label="Username"
                                color="purple"
                                className="!border-0 !bg-inputBg !ring-0" crossOrigin={undefined}                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="confirm">
                    {() => (
                      <FormControl isRequired mb={6} style={{order:3}}>
                        <Input
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                label="Confirm"
                                type="password"
                                color="purple"
                                className="!border-0 !bg-inputBg !ring-0" crossOrigin={undefined}                        />
                      </FormControl>
                    )}
                    </Field>

                    {/* <Field name="verfcode">
                    {() => (
                      <FormControl isRequired mb={6} style={{order:4}}>
                        <Input
                          value={verfcode}
                          onChange={(e) => setVerfCode(e.target.value)}
                          label="Verfcode"
                          type="password"
                          color="purple"
                          className="!border-0 !bg-inputBg !ring-0"
                        />
                      </FormControl>
                    )}
                    </Field> */}
                    </>
                  )}
                  <Field name="email">
                    {() => (
                      <FormControl isRequired mb={6}>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            color="purple"
                            className="!border-0 !bg-inputBg !ring-0" crossOrigin={undefined}                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <FormControl isRequired mb={6}>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label="Password"
                            color="purple"
                            className="!border-0 !bg-inputBg !ring-0" crossOrigin={undefined}                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    className="!bg-gradient-to-br w-max !z-[9999] !rounded-full tracking-wide !from-purple-500 !to-purple-900 hover:!from-purple-300 hover:!to-purple-600 transition-all "
                    type="submit"
                  >
                    {authType}
                  </Button>
                  </div>
              </Form>
            )}
          </Formik>
          </div>
      </div>
    </Background>
    <div className='bg-purple-500 opacity-60 absolute bottom-6 left-4 w-[320px] h-[168px] blur-3xl !-z-10'></div>
    </>
  );
};

export default Auth;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}