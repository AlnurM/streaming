import styles from './index.module.sass'

const IconButton = ({ children, onClick, fullWidth, style }) => {
  return (
    <button
      className={styles.IconButton}
      onClick={onClick}
      style={{ ...style, width: fullWidth ? '100%' : 'fit-content' }}
    >
      {children}
    </button>
  )
}

export default IconButton
