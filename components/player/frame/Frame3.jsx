import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

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
      <div className={styles.FRAME_3Column}>
        <div
          id={frameSides.TOP_SIDE}
          className={clsx(styles.FRAME_3MiniWindow, {
            [styles.FRAME_3MiniWindowFocused]: focused === frameSides.TOP_SIDE,
          })}
          onClick={onSelect}
        >
          {source[frameSides.TOP_SIDE]?.link && (
            <video
              key={source[frameSides.TOP_SIDE].link}
              autoPlay
              preload="auto"
              className={styles.MainPlayerVideo}
            >
              <source
                src={source[frameSides.TOP_SIDE].link}
                type={source[frameSides.TOP_SIDE].type}
              />
              Video not supported.
            </video>
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
    </div>
  )
}

export default Frame3
