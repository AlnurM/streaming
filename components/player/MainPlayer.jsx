import * as streamFrame from 'store/stream/frame'
import styles from './index.module.sass'

// * COMPONENTS
import * as Component from 'components/player/frame'

const MainPlayer = ({ defaultPhoto, currentFrame, ...props }) => {
  return (
    <div
      className={styles.MainPlayer}
      style={defaultPhoto ? { backgroundImage: `url(${defaultPhoto})` } : {}}
    >
      {(Component[currentFrame] || Component[streamFrame.FRAME_1])({ ...props })}
    </div>
  )
}

export default MainPlayer
