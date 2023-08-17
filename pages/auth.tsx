import { useState } from "react";
import type { NextPage } from "next";
import { signIn, getProviders } from "next-auth/react";
import {
  Button,
  Flex,
  FormControl,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Input } from "@material-tailwind/react/components/Input/index";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const Background = ({ children }: any) => (
  <Box
    display="flex"
    flex="1 1 auto"
    justifyContent=""
    alignItems="center"
    backgroundImage="url('/img/landing-page/herobg_comp.webp')" // coming from public folder
    backgroundSize="cover"
    backgroundRepeat="no-repeat"
    backgroundPosition="center"
    backgroundAttachment="fixed"
    width="100%"
    height="100vh"
    color="white"
  >
    {children}
  </Box>
);



const Auth: NextPage = () => {
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

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password, confirm, stripeCustomerId, isActive,image,skyEnabled,bannerEnabled, avatarUrl, rpmId },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await loginUser();
        redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(res);
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? window.alert('Please check your details.') : redirectToHome();
  };

  const formSubmit = (actions: any) => {
    actions.setSubmitting(false);

    authType === "Login" ? loginUser() : registerUser();
  };

  return (
    <>
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
         <Link href={'/'}><Image src='/img/logo.png' className="relative scale-75 -left-7 md:left-0 md:scale-100 my-5 !z-50" width={218} height={38} alt="Logo"/></Link>
          </div>
        <div className="absolute top-[9%] left-[9%]">
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
        
        <Flex direction="column" justifyContent="center" w={"80%"} position={"absolute"} bottom={"20%"} left={'9%'} alignItems="start" >
          

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%", zIndex:"40" }}>
                <Box display="flex" flexDirection="column" w="100%" mb={4}>
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
                            className="!border-0 !bg-inputBg !ring-0"
                          />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="confirm">
                    {() => (
                      <FormControl isRequired mb={6} style={{order:4}}>
                        <Input
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          label="Confirm"
                          type="password"
                          color="purple"
                          className="!border-0 !bg-inputBg !ring-0"
                        />
                      </FormControl>
                    )}
                    </Field>
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
                          className="!border-0 !bg-inputBg !ring-0"
                        />
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
                          className="!border-0 !bg-inputBg !ring-0"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={6}
                    order={99}
                    className="!bg-gradient-to-br w-max !rounded-full tracking-wide !from-purple-500 !to-purple-900 hover:!from-purple-300 hover:!to-purple-600 transition-all trasfu"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    {authType}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Flex>
      </div>
    </Background>
    <div className='bg-purple-500 opacity-60 absolute bottom-6 left-4 w-[320px] h-[168px] blur-3xl !z-10'></div>
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