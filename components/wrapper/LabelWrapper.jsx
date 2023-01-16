import styles from './index.module.sass'

const LabelWrapper = ({ children, label, style }) => {
  return (
    <div className={styles.LabelWrapper} style={style}>
      {label && <label className={styles.LabelWrapperContent}>{label}</label>}
      {children}
    </div>
  )
}

export default LabelWrapper
