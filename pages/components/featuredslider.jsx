import React from 'react'
import GameCard from './gamecard'
import { items } from './data'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module

const FeaturedSlider = () => {
    const [sliderRef, instanceRef] = new useKeenSlider(
        {
          slides: {origin: 'center', perView:1},
          breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 4, spacing: 30, origin:0, },},
        },
          track: {details:{slidesLength: -6,}},
          slideChanged() {
            console.log('slide changed')
          },
          
        },
        [
          // add plugins here
        ]
      )

    const games = items.map(game => <div className="keen-slider__slide" key={game.id}><GameCard bg={game.url} title={game.title} desc={game.description}/></div>)
    
  return (
    <div ref={sliderRef} className="keen-slider overflow-x-hidden p-[32px]">
        {games}
      </div>
  )
}

export default FeaturedSlider