import { useState, cloneElement } from 'react'
import { useOutsideClick } from 'hooks'
import clsx from 'clsx'
import styles from './index.module.sass'

const Select = ({ children, name, label, value, valid, onSelect, style }) => {
  const [focused, setFocused] = useState(false)
  const selectRef = useOutsideClick(() => setFocused(false))

  const handleSelect = value => {
    onSelect({ name, value })
    setFocused(false)
  }
  return (
    <div
      ref={selectRef}
      className={clsx(styles.SelectWrapper, { [styles.SelectWrapperError]: valid === false })}
      style={style}
    >
      <div
        className={clsx(styles.Select, { [styles.SelectFocused]: focused })}
        onClick={() => setFocused(prevState => !prevState)}
      >
        {label}
        <span className={styles.SelectValue}>
          {children.find(f => f.props.value === value)?.props?.children}
        </span>
      </div>
      {focused && (
        <div className={styles.SelectDropdown}>
          {children.map(child =>
            cloneElement(child, { key: child.props.value, onClick: handleSelect })
          )}
        </div>
      )}
    </div>
  )
}

export default Select
