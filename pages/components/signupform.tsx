import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import axios from "axios";
  import Router from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Formik } from "formik";



   
  const SignUpform = () => {

    
      const [authType, setAuthType] = useState("Login");
      const oppAuthType: { [key: string]: string } = {
        Login: "Register",
        Register: "Login",
      };
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    
      const redirectToHome = () => {
        const { pathname } = Router;
        if (pathname === "/auth") {
          // TODO: redirect to a success register page
          Router.push("/");
        }
      };
    
      const registerUser = async () => {
        const res = await axios
          .post(
            "/api/register",
            { username, email, password },
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
    
        res.error ? console.log(res.error) : redirectToHome();
      };
    
      const formSubmit = (actions: any) => {
        actions.setSubmitting(false);
    
        authType === "Login" ? loginUser() : registerUser();
      };



    return (
      <Card color="transparent" shadow={false}>
        <form
        className="mt-8 mb-2 w-[100%] max-w-screen-lg min-w-0 sm:w-[100%]"
        onSubmit={(_, actions) => {
          formSubmit(actions);
        }}>
          <div className="mb-1 flex flex-col gap-2">
            <Input
            color="purple"
            size="lg" 
            className="!border-0 !bg-inputBg !ring-0"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input
            color="purple"
            size="lg"
            className="!border-0 !bg-inputBg  !ring-0" 
            label="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            color="purple"
            size="lg"
            className="!border-0 !bg-inputBg !ring-0"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              (
                <Typography
                  variant="small"
                  color="white"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-purple-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              )
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-2" color="purple" fullWidth type="submit">
            Register
          </Button>
          <Typography color="white" className="mt-2 text-center font-normal">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-purple-500 transition-colors hover:text-purple-700" 
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    );
  }

export default SignUpform