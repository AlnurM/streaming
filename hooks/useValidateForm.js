import { useMemo } from 'react'

const useValidateForm = (form, config = Object.keys(form)) => {
  const validConfig = useMemo(
    () => config.reduce((obj, key) => ({ ...obj, [key]: !!form[key] }), {}),
    [form]
  )
  const isValid = useMemo(() => Object.values(validConfig).some(f => !f), [validConfig])
  return { validConfig, isValid }
}

export default useValidateForm
