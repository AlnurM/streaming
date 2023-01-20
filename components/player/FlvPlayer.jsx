import { useRef, useEffect } from 'react'
import flvjs from 'flv.js'
import { mergeRefs } from 'lib/utils'

const FlvPlayer = ({
  videoRef,
  url,
  isLive,
  showControls = true,
  style,
}) => {
  const playerRef = useRef(null)

  const handleError = err => {
    console.log(err)
  }

  const handlePlay = () => {
    playerRef.current.play()
  }

  useEffect(() => {
    const config = {
      type: 'flv',
      url,
      hasAudio: true,
      hasVideo: true,
      isLive: true,
      lowLatency: true,
      bufferTime: 0.5,
      enableStashBuffer: false,
      stashInitialSize: 32,
      autoCleanupMaxBackwardDuration: 5,
    }
    const liveConfig = {
      ...config,
      lowLatency: true,
      bufferTime: 0.5,
      enableStashBuffer: false,
      stashInitialSize: 128,
      // autoCleanupSourceBuffer: true,
      autoCleanupMaxBackwardDuration: 15,
      isLive: true,
    }
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer(isLive ? liveConfig : config)

      flvjs.LoggingControl.enableError = false
      flvjs.LoggingControl.enableWarn = false

      flvPlayer.attachMediaElement(playerRef.current)
      flvPlayer.load()
      // flvPlayer.play()
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
      ref={videoRef ? mergeRefs(videoRef, playerRef) : playerRef}
      controls={showControls}
      muted
      style={style}
    />
  )
}

export default FlvPlayer
