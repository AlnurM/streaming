import clsx from 'clsx'
import styles from './index.module.sass'

// * COMPONENTS
import LabelWrapper from 'components/wrapper/LabelWrapper'

const TextField = ({ name, label, type, value, valid, onChange, fullWidth, style, ...props }) => {
  return (
    <LabelWrapper label={label} style={{ ...style, width: fullWidth ? '100%' : 'fit-content' }}>
      <input
        name={name}
        type={type}
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

export default TextField
