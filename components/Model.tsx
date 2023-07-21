import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button, IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

export default function Modal({ selected, setSelected }) {
  if (!selected) {
    return <></>;
  }

  return (
    <div
      onClick={() => setSelected(null)}
      className="fixed inset-0 bg-black/70 z-50 cursor-pointer overflow-y-scroll"
    >
      <motion.div
        initial={{
          y:1500
        }}
        animate={{
          y:0,
        }}
        transition={{
          duration:0.5,
          stiffness:2,
          damping:0.5
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[70%] h-screen mx-auto my-8 px-0 cursor-default "
      >
      <motion.div layout layoutId={`card-${selected.id}`} className={`w-full bg-cover bg-center relative h-2/4 rounded-t-3xl`} style={{backgroundImage: `url(${selected.img || '/img/map.png'})`}}>
          {/* <Image alt=''  src={selected.img || '/img/map.png'} fill sizes="100%" /> */}
        </motion.div>
        <motion.div
          className="bg-paffbg p-4 grid grid-cols-2 rounded-b-3xl" 
        >
          <div className="flex flex-col relative left-5">

          <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
          <p className="my-4">{selected.desc}</p>

          </div>


          <div className="relative">
          
          <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${selected._id}`}><Button color="purple" className="flex gap-3 w-56 text-center rounded-3xl h-20 relative bottom-12 right-5 text-5xl font-extrabold float-right"><FaPlayCircle className="h-full w-auto"/>Join</Button></Link>

          </div>
          

          
        </motion.div>
      </motion.div>
    </div>
  );
}