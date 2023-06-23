import React from 'react'
import ReactPlayer from 'react-player'

interface  Props {
  src:string
}

const VideoPlayer = (src:Props) =>{
  return (
      <ReactPlayer url={src.src} height={'100%'} width={'100%'} controls={false} playing={true} muted loop={true} config={{youtube: {playerVars: { controls: 0, autoplay: 1}} }}/>
  )
}

export default VideoPlayer