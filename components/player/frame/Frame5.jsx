import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

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
      <div className={styles.FRAME_5Row}>
        {(source.track || []).map(src => (
          <div
            className={clsx(styles.FRAME_5MiniWindow, {
              [styles.FRAME_5MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
            })}
          >
            <video key={src.link} autoPlay preload="auto" className={styles.MainPlayerVideo}>
              <source src={src.link} type={src.type} />
              Video not supported.
            </video>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frame5
