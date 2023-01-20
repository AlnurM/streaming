import dynamic from 'next/dynamic'
import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
const FlvPlayer = dynamic(() => import('/components/player/FlvPlayer'), {
  ssr: false,
  suspense: true,
})

const Frame5 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_5}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_5Window, {
          [styles.FRAME_5WindowFocused]: focused === frameSides.LEFT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.LEFT_SIDE]?.link && (
          <FlvPlayer
            url={source[frameSides.LEFT_SIDE].link}
            isLive={false}
          />
        )}
      </div>
      <div className={styles.FRAME_5Row}>
        {(source.track || []).map(src => (
          <div
            className={clsx(styles.FRAME_5MiniWindow, {
              [styles.FRAME_5MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
            })}
          >
            <FlvPlayer
              url={src.link}
              isLive={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frame5
