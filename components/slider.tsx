import { KeenSliderInstance, KeenSliderPlugin, TrackDetails, useKeenSlider } from 'keen-slider/react'
import React, { useState } from 'react'
import Link from 'next/link'

interface SlideProp {
  bg: string
  link: string
  buttonText: string
  text: string 
}

interface SlideProps {
  slides: SlideProp[]
}

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
    function updateHeight() {
      slider.container.style.height =
        slider.slides[slider.track.details.rel].offsetHeight + "px"
    }
    slider.on("created", updateHeight)
    slider.on("slideChanged", updateHeight)
  }

const Slider = (slideProps:SlideProps) => {
    const [details, setDetails] = React.useState<TrackDetails | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [screenWidth, setScreenWidth] = React.useState(0)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: 'free-snap',
        slides: {
            perView:1,
            origin:'center',
            spacing:0,  
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 3, spacing: 30, origin:'center' },
              },
            "(min-width: 1200px)": {
              slides: { perView: 3, spacing: 50, origin:'center' },
            },
          },
        detailsChanged(s) {
          setDetails(s.track.details)
          setScreenWidth((window.innerWidth > 0) ? window.innerWidth : screen.width)
        },
        created(s){
          setLoaded(true)
        },
        slideChanged(s) {
            setCurrentSlide(s.track.details.rel)
          },
        initial: 2,
        },
        [AdaptiveHeight]
    )

    function scaleStyle(idx: number) {
        if (screenWidth < 768) return {}
        if (!details) return {}
        const slide = details.slides[idx]
        const scale_size = 0.7
        const scale = 1 - (scale_size - scale_size * slide.portion)
        return {
            transform: `scale(${scale}, ${((slide == details.slides[currentSlide]) ? 1.1 : scale)})`,
            WebkitTransform: `scale(${scale}, ${scale})`,
            opacity: scale,
            maxWidth: screenWidth < 1024 ? 350 : 450
        }
    }
    return (
        <div ref={sliderRef} className="keen-slider zoom-out flex flex-row">
            {slideProps.slides.map((slide, idx) => (
            <div key={idx} className="keen-slider__slide zoom-out__slide">
                <div style={scaleStyle(idx)} className='h-screen md:h-[90vh] md:mx-auto transition-all duration-150'>
                    <div className=' h-screen md:h-[90vh] md:flex-grow-0 flex-col flex'>
                        <div className={`h-full bg-${slide.bg} bg-cover bg-center md:rounded-2xl md:shadow-2xl md:shadow-black`}></div>
                          <p className='absolute font-valorant text-6xl top-16 left-[10%] w-0'>{slide.text}</p>
                          <Link href={slide.link} className='absolute bottom-[10%] left-1/2 -translate-x-2/4  h-[10%] w-2/4 mx-auto text-center flex-shrink-1'>
                            <button className='w-full h-full border-white border font-valorant transition hover:scale-110 z-30'>{slide.buttonText}</button>
                          </Link>
                    </div>
                </div>
            </div>
            ))}
            {loaded && instanceRef.current && (
              <div className="dots md:flex justify-center absolute gap-10 w-full -bottom-16 hidden md:visible">
                {[
                  ...Array(instanceRef.current.track.details.slides.length).keys(),
                ].map((idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx)
                      }}
                      className={"dot hover:border-2 border-solid border-gray-500" + (currentSlide === idx ? " active" : "")}
                    ></button>
                  )
                })}
              </div>
            )}
        </div>
    )
}

export default Slider