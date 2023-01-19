import { useRef, useEffect } from 'react'
import flvjs from './flv.min'
import { mergeRefs } from 'lib/utils'

const FlvPlayer = ({
  videoRef,
  url,
  showControls = true,
  isLive = true,
  enableStashBuffer = true,
  style,
}) => {
  const playerRef = useRef(null)

  const handleError = err => {
    console.log(err)
  }

  useEffect(() => {
    if (flvjs.isSupported()) {
      const flvPlayer = flvjs.createPlayer(
        {
          type: 'flv',
          isLive,
          url,
          hasAudio: true,
          hasVideo: true,
        },
        {
          enableStashBuffer,
          stashInitialSize: 128,
        }
      )

      flvjs.LoggingControl.enableError = false
      flvjs.LoggingControl.enableWarn = false

      flvPlayer.attachMediaElement(playerRef.current)
      flvPlayer.load()
      flvPlayer.play()
      flvPlayer.on('error', err => {
        handleError(err)
      })
    }
  }, [])
  return (
    <video
      key={url}
      autoPlay
      ref={videoRef ? mergeRefs(videoRef, playerRef) : playerRef}
      controls={showControls}
      muted="muted"
      style={style}
    />
  )
}

export default FlvPlayer
