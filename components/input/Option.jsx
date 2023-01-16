import styles from './index.module.sass'

const Option = ({ children, value, onClick, style }) => {
  return (
    <div className={styles.Option} style={style} onClick={() => onClick(value)}>
      {children}
    </div>
  )
}

export default Option
