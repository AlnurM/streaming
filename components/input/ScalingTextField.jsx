import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import LabelWrapper from 'components/wrapper/LabelWrapper'

const ScalingTextField = ({ name, label, type = 'text', value, valid, onChange, ...props }) => {
  const [content, setContent] = useState(label)
  const [width, setWidth] = useState(219)
  const span = useRef()

  useEffect(() => {
    setWidth(span.current.offsetWidth || 219)
  }, [content])

  const handleChange = event => {
    onChange(event)
    setContent(event.target.value)
  }
  return (
    <LabelWrapper label={label}>
      <span ref={span} className={styles.ScalingTextFieldHidden}>
        {content}
      </span>
      <input
        name={name}
        type={type}
        autoFocus
        value={value}
        placeholder={label}
        className={styles.ScalingTextFieldContent}
        onChange={handleChange}
        {...props}
      />
      <div
        className={clsx(styles.ScalingTextFieldContentBorder, {
          [styles.ScalingTextFieldContentBorderError]: valid === false,
        })}
        style={{ width }}
      />
    </LabelWrapper>
  )
}

export default ScalingTextField
