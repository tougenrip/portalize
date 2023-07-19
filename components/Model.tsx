import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function Modal({ selected, setSelected }) {
  if (!selected) {
    return <></>;
  }

  return (
    <div
      onClick={() => setSelected(null)}
      className="fixed inset-0 bg-black/70 z-50 cursor-pointer overflow-y-scroll"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[60%] h-screen mx-auto my-8 px-8 cursor-default"
      >
        <motion.div layoutId={`card-${selected.id}`} className="w-full h-2/4">
          <Image alt=''  src={selected.img || '/img/map.png'} fill className="!relative" />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-paffbg p-4"
        >
          <h3 className="text-2xl font-bold mb-2 ">{selected.title}</h3>
          
          <p className="my-4 ">{selected.description}</p>
          <Link href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${selected._id}`}><Button className="btn btn-primary btn-block text-black">Join</Button></Link>
        </motion.div>
      </div>
    </div>
  );
}