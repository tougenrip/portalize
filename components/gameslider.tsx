import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module
import ExpandCard from './expandcard';
import { GetServerSideProps } from 'next'

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
        <div className="keen-slider__slide"><ExpandCard/></div>
        <div className="keen-slider__slide"><ExpandCard/></div>
        <div className="keen-slider__slide"><ExpandCard/></div>
      </div>
    )
  };

  export default GameSlider