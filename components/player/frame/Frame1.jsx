import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

const Frame1 = ({ focused, source, onSelect }) => {
  return (
    <div className={styles.FRAME_1}>
      <div
        id={frameSides.LEFT_SIDE}
        className={clsx(styles.FRAME_1Window, {
          [styles.FRAME_1WindowFocused]: focused === frameSides.LEFT_SIDE,
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
        id={frameSides.RIGHT_SIDE}
        className={clsx(styles.FRAME_1Window, {
          [styles.FRAME_1WindowFocused]: focused === frameSides.RIGHT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.RIGHT_SIDE]?.link && (
          <video
            key={source[frameSides.RIGHT_SIDE].link}
            autoPlay
            preload="auto"
            className={styles.MainPlayerVideo}
          >
            <source
              src={source[frameSides.RIGHT_SIDE].link}
              type={source[frameSides.RIGHT_SIDE].type}
            />
            Video not supported.
          </video>
        )}
      </div>
    </div>
  )
}

export default Frame1
