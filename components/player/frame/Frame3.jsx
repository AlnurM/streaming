import dynamic from 'next/dynamic'
import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
const FlvPlayer = dynamic(() => import('/components/player/FlvPlayer'), {
  ssr: false,
  suspense: true,
})

const Frame3 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_3}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_3Window, {
          [styles.FRAME_3WindowFocused]: focused === frameSides.LEFT_SIDE,
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
      <div className={styles.FRAME_3Column}>
        <div
          id={frameSides.TOP_SIDE}
          className={clsx(styles.FRAME_3MiniWindow, {
            [styles.FRAME_3MiniWindowFocused]: focused === frameSides.TOP_SIDE,
          })}
          onClick={onSelect}
        >
          {source[frameSides.TOP_SIDE]?.link && (
            <FlvPlayer
              url={source[frameSides.TOP_SIDE].link}
              isLive={false}
            />
          )}
        </div>
        <div
          id={frameSides.BOTTOM_SIDE}
          className={clsx(styles.FRAME_3MiniWindow, {
            [styles.FRAME_3MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
          })}
          onClick={onSelect}
        >
          {source[frameSides.BOTTOM_SIDE]?.link && (
            <FlvPlayer
              url={source[frameSides.BOTTOM_SIDE].link}
              isLive={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Frame3
