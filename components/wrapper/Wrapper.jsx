import Head from 'next/head'
import styles from './index.module.sass'

// * COMPONENTS
import { Logo } from 'components/logo'

const Wrapper = ({ children, title, centered, style }) => {
  const headTitle = `TUPLE ${title && `| ${title}`}`
  return (
    <div className={styles.Wrapper} style={style}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Logo centered={centered} />
      {children}
    </div>
  )
}

export default Wrapper
