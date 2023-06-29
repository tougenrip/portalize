import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module
import ExpandCard from './expandcard';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import items from './data';

type Repo = {
  _id: object,
  title: string,
  owner: string,
  desc: string
}

export const getServerSideProps: GetServerSideProps<{
  repo: Repo
}> = async () => {
  const res = await fetch('http://localhost:3000/get')
  const repo = await res.json()
  return { props: { repo } }
}

const GameSlider = ({ repo }) => {
    const [sliderRef, instanceRef] = useKeenSlider(
      {
        slides: {origin: 'center',},
        slideChanged() {
          console.log('slide changed')
        },
      },
      [
        // add plugins here
      ]
    );
    return (
      <div ref={sliderRef} className="keen-slider overflow-x-hidden ">
        <div className="keen-slider__slide"><ExpandCard/></div>
        <div className="keen-slider__slide"><ExpandCard/></div>
        <div className="keen-slider__slide"><ExpandCard/></div>
      </div>
    )
  };

  export default GameSlider