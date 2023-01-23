import * as frameSides from 'lib/frameSides'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import FlvRestranslation from 'components/player/FlvRetranslation'

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
        {source[frameSides.LEFT_SIDE] && (
          <FlvRestranslation player={source[frameSides.LEFT_SIDE]} />
        )}
      </div>
      <div
        id={frameSides.RIGHT_SIDE}
        className={clsx(styles.FRAME_1Window, {
          [styles.FRAME_1WindowFocused]: focused === frameSides.RIGHT_SIDE,
        })}
        onClick={onSelect}
      >
        {source[frameSides.RIGHT_SIDE] && (
          <FlvRestranslation player={source[frameSides.RIGHT_SIDE]} />
        )}
      </div>
    </div>
  )
}

export default Frame1
