import Link from 'next/link'
import clsx from 'clsx'
import styles from './index.module.sass'

const Logo = ({ centered }) => {
  return (
    <Link href="/">
      <div
        className={clsx(styles.Logo, {
          [styles.LogoDefault]: !centered,
          [styles.LogoCentered]: centered,
        })}
      />
    </Link>
  )
}

export default Logo
