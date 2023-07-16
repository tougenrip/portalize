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

interface IDivicerProps {
  word?: string;
}


const Auth: NextPage = () => {
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const stripeCustomerId = '';
  const isActive = false;
  const image = '';
  const skyEnabled = false;
  const bannerEnabled = false;

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/auth") {
      window.alert('You are being redirected')
      // TODO: redirect to a success register page
      Router.push("/");
    }
  };

  const registerUser = async () => {
    const res = await axios
      .post(
        "/api/register",
        { username, email, password, stripeCustomerId, isActive,image,skyEnabled,bannerEnabled },
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
    <div className='absolute  top-2 left-[4%]'>
         <Link href={'/'}><Image src='/img/logo.png' className="relative scale-75 -left-7 md:left-0 md:scale-100 my-5 !z-50" width={218} height={38} alt="Logo"/></Link>
          </div>
    <Background>
      <Box
        w="500px"
        h="100vh"
        rounded="md"
        alignItems={"flex-end"}
        bgColor="#282828"
        position={"absolute"}
        p={12}
      >
        <Flex direction="column" justifyContent="center" w={"80%"} position={"absolute"} bottom={"15%"} alignItems="center" >
          <Heading size="xl">{authType}</Heading>
          <Text fontSize="sm" mb={6}>
            {authType === "Login"
              ? "Not registered yet? "
              : "Already have an account? "}
            <button onClick={() => setAuthType(oppAuthType[authType])}>
              <Text as="u">{oppAuthType[authType]}</Text>
            </button>
          </Text>

          <Formik
            initialValues={{}} // { email: "", password: "" }
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            {(props) => (
              <Form style={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" w="100%" mb={4}>
                  {authType === "Register" && (
                    
                    <Field name="username">
                      {() => (
                        <FormControl isRequired mb={6}>
                          <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            color="purple"
                            className="text-white"
                          />
                        </FormControl>
                      )}
                    </Field>
                  )}
                  <Field name="email">
                    {() => (
                      <FormControl isRequired mb={6}>
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          label="Email Address"
                          color="purple"
                          className="text-white"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <FormControl isRequired mb={3}>
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          label="Password"
                          color="purple"
                          className="text-white"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={6}
                    className="!bg-gradient-to-br !from-purple-500 !to-purple-900 hover:!from-purple-300 hover:!to-purple-600 transition-all trasfu"
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
      </Box>
    </Background>
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