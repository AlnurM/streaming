import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import FlvRestranslation from 'components/player/FlvRetranslation'

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
        {source[frameSides.LEFT_SIDE] && (
          <FlvRestranslation player={source[frameSides.LEFT_SIDE]} />
        )}
      </div>
      <div className={styles.FRAME_6Column}>
        {(source.track || []).map(src => (
          <div
            className={clsx(styles.FRAME_6MiniWindow, {
              [styles.FRAME_5MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
            })}
          >
            <FlvRestranslation player={src} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Frame6
