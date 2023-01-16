import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

const Frame1 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_4}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_4Window, {
          [styles.FRAME_4WindowFocused]: focused === frameSides.LEFT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.LEFT_SIDE]?.link && (
          <video
            key={source[frameSides.LEFT_SIDE].link}
            autoPlay
            preload="auto"
            className={styles.MainPlayerVideo}
          >
            <source
              src={source[frameSides.LEFT_SIDE].link}
              type={source[frameSides.LEFT_SIDE].type}
            />
            Video not supported.
          </video>
        )}
      </div>
      <div
        id={frameSides.BOTTOM_SIDE}
        className={clsx(styles.FRAME_4MiniWindow, {
          [styles.FRAME_4MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.BOTTOM_SIDE]?.link && (
          <video
            key={source[frameSides.BOTTOM_SIDE].link}
            autoPlay
            preload="auto"
            className={styles.MainPlayerVideo}
          >
            <source
              src={source[frameSides.BOTTOM_SIDE].link}
              type={source[frameSides.BOTTOM_SIDE].type}
            />
            Video not supported.
          </video>
        )}
      </div>
    </div>
  )
}

export default Frame1
