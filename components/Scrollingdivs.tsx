
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Image from "next/image"

interface ParallaxProps {
  baseVelocity: number;
}

function ParallaxText({ baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className=" tracking-tighter flex-nowrap whitespace-nowrap ce flex">

      <motion.div className="space-x-4  font-bold uppercase flex whitespace-nowrap flex-nowrap mx-auto" style={{ x }}>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      <span className="h-auto w-96 brightness-50 bg-gamebg bg-cover rounded-3xl aspect-video"></span>
      
      </motion.div>
    </div>
  );
}

export default function ScrollingDiv() {
  return (
    <div className=" h-screen relative overflow-hidden">
        <div className="absolute space-y-2 top-1/2 -translate-y-1/2"><ParallaxText baseVelocity={-5}/>
      <ParallaxText baseVelocity={5}/>
      <ParallaxText baseVelocity={-5}/></div>
        <h2 className="text-white z-40 text-7xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center font-bold">10000+ Assets <br/> Build With</h2>
      
    </div>
  );
}
