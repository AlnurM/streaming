import dynamic from 'next/dynamic'
import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
const FlvPlayer = dynamic(() => import('/components/player/FlvPlayer'), {
  ssr: false,
  suspense: true,
})

const Frame6 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_6}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_6Window, {
          [styles.FRAME_5WindowFocused]: focused === frameSides.LEFT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.LEFT_SIDE]?.link && (
          <FlvPlayer
            url={source[frameSides.LEFT_SIDE].link}
            showControls={false}
            isLive={true}
            enableStashBuffer={false}
            isMuted={false}
          />
        )}
      </div>
      <div className={styles.FRAME_6Column}>
        {(source.track || []).map(src => (
          <div
            className={clsx(styles.FRAME_6MiniWindow, {
              [styles.FRAME_5MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
            })}
          >
            <FlvPlayer
              url={src.link}
              showControls={false}
              isLive={true}
              enableStashBuffer={false}
              isMuted={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frame6
