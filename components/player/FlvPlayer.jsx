import { useRef, useEffect } from 'react'
import flvjs from 'flv.js'
import { mergeRefs } from 'lib/utils'

const FlvPlayer = ({
  videoRef,
  url,
  showControls = true,
  setPlayer = () => console.log(),
  onPlaying = () => console.log(),
  style,
}) => {
  const playerRef = useRef(null)

  const handleError = err => {
    console.log(err)
  }

  const handlePlay = () => {
    playerRef.current.play()
    onPlaying(true)
  }

  useEffect(() => {
    const config = {
      type: 'flv',
      url,
      hasAudio: true,
      hasVideo: true,
      isLive: true,
      lowLatency: true,
      buffered: 0.5,
      bufferTime: 0.5,
      enableWorker: false,
      enableStashBuffer: false,
      stashInitialSize: 32,
      autoCleanupMaxBackwardDuration: 1,
    }
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer(config)
      setPlayer(flvPlayer)
      flvjs.LoggingControl.enableError = false
      flvjs.LoggingControl.enableWarn = false
      flvPlayer.attachMediaElement(playerRef.current)
      flvPlayer.load()
      flvPlayer.on('error', err => {
        handleError(err)
      })
    }
  }, [])
  return (
    <video
      key={url}
      autoPlay
      onLoadedData={handlePlay}
      onPause={() => onPlaying(false)}
      ref={videoRef ? mergeRefs(videoRef, playerRef) : playerRef}
      controls={showControls}
      style={style}
    />
  )
}

export default FlvPlayer
