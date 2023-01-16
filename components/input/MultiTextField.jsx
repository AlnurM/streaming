import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import LabelWrapper from 'components/wrapper/LabelWrapper'

const MultiTextField = ({
  name,
  label,
  type,
  value,
  valid,
  rows = 4,
  onChange,
  style,
  ...props
}) => {
  return (
    <LabelWrapper label={label} style={style}>
      <textarea
        name={name}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        className={clsx(styles.TextFieldContent, {
          [styles.TextFieldContentError]: valid === false,
        })}
        {...props}
      />
    </LabelWrapper>
  )
}

export default MultiTextField
