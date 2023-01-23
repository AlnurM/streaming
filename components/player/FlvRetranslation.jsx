import { useRef, useEffect } from 'react'

const FlvRestranslation = ({ player }) => {
  const videoRef = useRef(null)
  const handlePlay = () => {
    videoRef.current.play()
  }
  useEffect(() => {
    if (player) {
      console.log(player)
      player.unload()
      player.attachMediaElement(videoRef.current)
      player.load()
    }
    return () => {
      if (player) {
        player.unload()
      }
    }
  }, [player])
  return (
    <video
      autoPlay
      onLoadedData={handlePlay}
      ref={videoRef}
      muted
    />
  )
}

export default FlvRestranslation