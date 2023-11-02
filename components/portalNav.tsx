import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";

const PortalNav = () => {
  const [windowDimension, setWindowDimension] = useState(null);
  const [stickyClass, setStickyClass] = useState("");
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500
        ? setStickyClass("fixed bg-[#151515] top-0 w-[100%] left-0 !z-50 gap-20 justify-between")
        : setStickyClass("bg-transparent !z-50");
    }
  };

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 1140;

  const handleSearch = (searchText: string) => {
    console.log("Performing search for:", searchText);
    // Perform the search logic here
  };

  const closeVariants = {
    animate: {
      x: isMobile ? "-100%" : 0,
    },
  };

  const openVariants = {
    animate: {
      x: 0,
    },
  };

  return (
    <>
      <motion.div
        variants={sideOpen ? openVariants : closeVariants}
        animate={"animate"}
        transition={{ damping: 0 }}
      >
        {isMobile && (
          <div className="fixed top-10 right-5 z-50">
            <button onClick={() => setSideOpen(!sideOpen)}>
              {sideOpen ? "Close" : "Open"}
            </button>
          </div>
        )}

        <div id="header" className={`w-screen !z-50 ${stickyClass}`}>
          <div
            className={`bg-base-100 flex justify-end md:flex-row pt-8 pb-4 px-4 gap-0 md:gap-10 w-screen md:justify-between md:px-20`}
          >
            {isMobile ? (
              <div></div>
            ) : (
              <div className="flex-row flex items-center w-screen">
                <ul className="text-2xl font-['Gilroy'] font-light text-white w-full px-1 flex flex-row justify-between space-x-10">
                  <div className="flex flex-row space-x-16">
                    <li className="self-center whitespace-nowrap hover:text-purple-600">
                      <Link href="/all-places">Most Popular</Link>
                    </li>
                    <li className="self-center hover:text-purple-600 whitespace-nowrap text-2xl font-['Gilroy'] font-light text-white w-full">
                      <Link href="/all-places">All Places</Link>
                    </li>
                  </div>
                  <li className="w-full">
                    <SearchBar onSearch={handleSearch} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PortalNav;
