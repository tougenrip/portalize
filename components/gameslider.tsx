import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module
import ExpandCard from './expandcard';
import { GetServerSideProps } from 'next'
import { motion } from 'framer-motion';
import { IconButton } from '@material-tailwind/react';




const GameSlider = ({map1json, map2json, map3json}) => {



  
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )
    return (
      <div ref={sliderRef} className="keen-slider overflow-x-hidden">
        
        <div className="keen-slider__slide" ><motion.div  whileHover="hover" className='h-[70vh] hover:h-[80vh] transition-all flex align-middle place-content-center items-center tracking-wider'>
        <motion.div
            className={`relative bg-cover bg-no-repeat  w-screen h-[100%] text-center `}
            transition={{layout:{duration:1, type:'spring'}}}
            style={{backgroundImage:`url(${map1json.img})`}}
           
        >
            <motion.div
          className='absolute bottom-5 left-10 font-bold md:text-4xl text-start'
          
          animate={{opacity:1,x:0}}
          transition={{duration:.5}}
          >
            <motion.h2
            initial={{opacity:1,y:50  }}
          variants={{
            hover:{
              y:0
            }
          }}
            >
                {map1json.title}
            </motion.h2>
            <motion.div 
            initial={{opacity:0}}
            variants={{
              hover:{
                opacity:1,
              }
            }}
            transition={{duration:.3}}
            className='font-normal  tracking-normal max-w-[75%] text-xl'
            >
              {map1json.desc}
            </motion.div>
          </motion.div>
            <motion.div className='absolute bottom-5 right-14 w-24 ' >
              <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${map1json.id}`}></a>
                <IconButton className='px-14 tracking-wide'>Join </IconButton>
            </motion.div>
            <div className='absolute flex gap-1 top-10 scale-125 right-0 w-24'>
                <p className='relative -top-1.5 text-2xl'>324 </p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            </div>
            

        </motion.div>
        </motion.div>
        </div>

        <div className="keen-slider__slide" ><motion.div  whileHover="hover" className='h-[70vh] hover:h-[80vh] transition-all flex align-middle place-content-center items-center tracking-wider'>
        <motion.div
            className={`relative  bg-cover bg-no-repeat  w-screen h-[100%] text-center `}
            transition={{layout:{duration:1, type:'spring'}}}
            style={{backgroundImage:`url(${map2json.img})`}}
           
        >
            <motion.div
          className='absolute bottom-5 left-10 font-bold md:text-4xl text-start'
          
          animate={{opacity:1,x:0}}
          transition={{duration:.5}}
          >
            <motion.h2
            initial={{opacity:1,y:50  }}
          variants={{
            hover:{
              y:0
            }
          }}
            >
                {map2json.title}
            </motion.h2>
            <motion.div 
            initial={{opacity:0}}
            variants={{
              hover:{
                opacity:1,
              }
            }}
            transition={{duration:.3}}
            className='font-normal  tracking-normal max-w-[75%] text-xl'
            >
              {map2json.desc}
            </motion.div>
          </motion.div>
            <motion.div className='absolute bottom-5 right-14 w-24 ' >
              <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${map2json.id}`}></a>
                <IconButton className='px-14 tracking-wide'>Join </IconButton>
            </motion.div>
            <div className='absolute flex gap-1 top-10 scale-125 right-0 w-24'>
                <p className='relative -top-1.5 text-2xl'>324 </p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            </div>
            

        </motion.div>
        </motion.div>
        </div>


        <div className="keen-slider__slide" ><motion.div  whileHover="hover" className='h-[70vh] hover:h-[80vh] transition-all flex align-middle place-content-center items-center tracking-wider'>
        <motion.div
            className={`relative bg-cover bg-no-repeat  w-screen h-[100%] text-center `}
            transition={{layout:{duration:1, type:'spring'}}}
            style={{backgroundImage:`url(${map3json.img})`}}
           
        >
            <motion.div
          className='absolute bottom-5 left-10 font-bold md:text-4xl text-start'
          
          animate={{opacity:1,x:0}}
          transition={{duration:.5}}
          >
            <motion.h2
            initial={{opacity:1,y:50  }}
          variants={{
            hover:{
              y:0
            }
          }}
            >
                {map3json.title}
            </motion.h2>
            <motion.div 
            initial={{opacity:0}}
            variants={{
              hover:{
                opacity:1,
              }
            }}
            transition={{duration:.3}}
            className='font-normal  tracking-normal max-w-[75%] text-xl'
            >
              {map3json.desc}
            </motion.div>
          </motion.div>
            <motion.div className='absolute bottom-5 right-14 w-24 ' >
              <a href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}game/${map3json.id}`}></a>
                <IconButton className='px-14 tracking-wide'>Join </IconButton>
            </motion.div>
            <div className='absolute flex gap-1 top-10 scale-125 right-0 w-24'>
                <p className='relative -top-1.5 text-2xl'>324 </p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            </div>
            

        </motion.div>
        </motion.div>
        </div>
        
      </div>
    )
  };

  export default GameSlider