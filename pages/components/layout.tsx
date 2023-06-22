import React, { PropsWithChildren } from "react";
import Navbar from "../components/Navbar";
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      
      {children}
    </>
  );
};
export default Layout;
