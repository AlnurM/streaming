import { useMemo } from 'react'

const useValidateForm = (form, config = Object.keys(form)) => {
  const validConfig = useMemo(
    () => config.reduce((obj, key) => ({ ...obj, [key]: !!form[key] }), {}),
    [form]
  )
  return { validConfig }
}

export default useValidateForm
