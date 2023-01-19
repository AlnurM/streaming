import dynamic from 'next/dynamic'
import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
const FlvPlayer = dynamic(() => import('/components/player/FlvPlayer'), {
  ssr: false,
  suspense: true,
})

const Frame2 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_2}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_2Window, {
          [styles.FRAME_2WindowFocused]: focused === frameSides.LEFT_SIDE,
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
      <div
        id={frameSides.RIGHT_SIDE}
        className={clsx(styles.FRAME_2Window, {
          [styles.FRAME_2WindowFocused]: focused === frameSides.RIGHT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.RIGHT_SIDE]?.link && (
          <FlvPlayer
            url={source[frameSides.RIGHT_SIDE].link}
            showControls={false}
            isLive={true}
            enableStashBuffer={false}
            isMuted={false}
          />
        )}
      </div>
    </div>
  )
}

export default Frame2
