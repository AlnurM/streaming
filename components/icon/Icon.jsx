import styles from './index.module.sass'

const Icon = ({ width = 20, height = 20, src, style }) => {
  return (
    <div
      className={styles.Icon}
      style={{
        ...style,
        width,
        height,
        backgroundImage: `url(${src})`,
      }}
    />
  )
}

export default Icon
