import { cloneElement } from 'react'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import { PortalWrapper } from 'components/wrapper'

const Dialog = ({ children, type = 'default', isOpen, onClose }) => {
  if (!isOpen) return null
  const Children = !!children.length ? [...children] : [children]
  return (
    <PortalWrapper wrapperId="dialog-root">
      <div className={styles.DialogBackdrop} onClick={onClose} />
      <div
        className={clsx(styles.Dialog, {
          [styles.DialogDefault]: type === 'default',
          [styles.DialogPrimary]: type === 'primary',
        })}
      >
        {Children.map(child =>
          cloneElement(child, {
            onClose,
          })
        )}
      </div>
    </PortalWrapper>
  )
}

export default Dialog
