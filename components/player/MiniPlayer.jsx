import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useIsMount } from 'hooks'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
const FlvPlayer = dynamic(() => import('/components/player/FlvPlayer'), {
  ssr: false,
  suspense: true,
})

const RenderType = ({ type }) => {
  const config = {
    audio: '/assets/microphone.svg',
    video: '/assets/camera.svg',
    default: '/assets/camera.svg',
  }
  return (
    <div
      className={styles.MiniPlayerType}
      style={{ backgroundImage: `url(${config[type] || config['default']})` }}
    />
  )
}

const RenderVolume = ({ name, value, onChange }) => {
  const VolumeUp = '/assets/volume-up.svg'
  const VolumeOff = '/assets/volume-off.svg'
  const handleClick = () => {
    onChange && onChange({ name, value: !value })
  }
  return (
    <div
      className={styles.MiniPlayerControllerMute}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${value ? VolumeOff : VolumeUp})`,
      }}
    />
  )
}

const RenderSlider = ({ name, value, disabled, onChange }) => {
  return (
    <div className={styles.MiniPlayerControllerSliderWrapper}>
      <span className={styles.MiniPlayerControllerSliderLabel}>0</span>
      <input
        name={name}
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={onChange}
        className={clsx(styles.MiniPlayerControllerSlider, {
          [styles.MiniPlayerControllerSliderDisabled]: disabled,
        })}
      />
      <div
        className={styles.MiniPlayerControllerSliderValue}
        style={{ left: `calc(${value}% + ${14.47 * (1 - value / 27)}px)` }}
      >
        {value}
      </div>
      <div
        className={clsx(styles.MiniPlayerControllerSliderFill, {
          [styles.MiniPlayerControllerSliderFillDisabled]: disabled,
        })}
        style={{ width: `calc(${value}% - ${0.5 * value}px - 20px)` }}
      />
      <span className={styles.MiniPlayerControllerSliderLabel}>100</span>
    </div>
  )
}

const RenderButton = ({ name, value, onChange }) => {
  const Pause = '/assets/pause.svg'
  const Play = '/assets/play.svg'
  const handleClick = () => {
    onChange && onChange({ name, value: !value })
  }
  return (
    <div
      className={styles.MiniPlayerControllerBtn}
      onClick={handleClick}
      style={{
        backgroundImage: `url(${value ? Pause : Play})`,
      }}
    />
  )
}

const MiniPlayer = ({ src, type = 'video', name = 'Ricardo Cooper', onSelect, style }) => {
  const isMount = useIsMount()
  const videoRef = useRef(null)
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    speed: 1,
    volume: 50,
    isMuted: false,
  })

  const handleChange = event => {
    const { name, value } = event.target || event
    setPlayerState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (isMount) {
      return
    }
    if (videoRef.current) {
      videoRef.current[playerState.isPlaying ? 'play' : 'pause']()
    }
  }, [playerState.isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = playerState.volume / 100
    }
  }, [playerState.volume])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = playerState.isMuted
    }
  }, [playerState.isMuted])
  return (
    <div className={styles.MiniPlayer} onClick={onSelect} style={style}>
      <span className={styles.MiniPlayerUser}>
        <RenderType type={type} />
        {name}
      </span>
      {type == 'video' && (
        <FlvPlayer
          videoRef={videoRef}
          url={src}
          isLive={true}
          showControls={false}
          style={{ marginTop: 16, maxHeight: 182 }}
        />
      )}
      <div className={styles.MiniPlayerController}>
        <RenderVolume name="isMuted" value={playerState.isMuted} onChange={handleChange} />
        <RenderSlider
          name="volume"
          value={playerState.volume}
          disabled={playerState.isMuted}
          onChange={handleChange}
        />
        <RenderButton name="isPlaying" value={playerState.isPlaying} onChange={handleChange} />
      </div>
    </div>
  )
}

export default MiniPlayer
