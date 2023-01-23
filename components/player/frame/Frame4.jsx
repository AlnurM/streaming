import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import FlvRestranslation from 'components/player/FlvRetranslation'

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
        {source[frameSides.LEFT_SIDE] && (
          <FlvRestranslation player={source[frameSides.LEFT_SIDE]} />
        )}
      </div>
      <div
        id={frameSides.BOTTOM_SIDE}
        className={clsx(styles.FRAME_4MiniWindow, {
          [styles.FRAME_4MiniWindowFocused]: focused === frameSides.BOTTOM_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.BOTTOM_SIDE] && (
          <FlvRestranslation player={source[frameSides.BOTTOM_SIDE]} />
        )}
      </div>
    </div>
  )
}

export default Frame1
