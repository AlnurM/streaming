import styles from './index.module.sass'

// * COMPONENTS
import { IconButton } from 'components/button'
import { Icon } from 'components/icon'

const DialogHeader = ({ children, onGoBack, onClose, style }) => {
  return (
    <div className={styles.DialogHeader} style={style}>
      <IconButton onClick={onGoBack}>
        <Icon width={18} height={18} src={'/assets/arrow-left.svg'} />
      </IconButton>
      <h3 className={styles.DialogHeaderTitle}>{children}</h3>
      <IconButton onClick={onClose}>
        <Icon width={18} height={18} src={'/assets/close.svg'} />
      </IconButton>
    </div>
  )
}

export default DialogHeader
