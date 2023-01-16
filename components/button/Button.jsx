import clsx from 'clsx'
import styles from './index.module.sass'

const Button = ({ children, type = 'primary', onClick, fullWidth, style }) => {
  return (
    <button
      className={clsx(styles.Button, {
        [styles.ButtonPrimary]: type === 'primary',
        [styles.ButtonSecondary]: type === 'secondary',
      })}
      onClick={onClick}
      style={{ ...style, width: fullWidth ? '100%' : 'fit-content' }}
    >
      {children}
    </button>
  )
}

export default Button
