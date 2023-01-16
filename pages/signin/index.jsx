import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import AuthStore from 'store/auth'
import { useValidateForm } from 'hooks'
import * as routes from 'lib/routes'
import styles from './index.module.sass'

// * COMPONENTS
import { Wrapper } from 'components/wrapper'
import { TextField } from 'components/input'
import { Button } from 'components/button'

const SignIn = () => {
  const router = useRouter()
  const { form } = AuthStore
  const { validConfig, isValid } = useValidateForm({ ...form }, ['email', 'password'])
  const [valid, setValid] = useState({})

  const handleSubmit = event => {
    event.preventDefault()
    if (isValid) {
      setValid(validConfig)
      return
    }
    AuthStore.handleLogin().then(() => router.push(routes.HOME_ROUTE))
  }

  return (
    <Wrapper title="Авторизация" centered>
      <div className={styles.SignIn}>
        <h1 className={styles.SignInTitle}>Войти в аккаунт</h1>
        <span className={styles.SignInSubtitle}>
          Или <Link href="/register">зарегистрироваться</Link>
        </span>
        <form onSubmit={handleSubmit} className={styles.SignInForm} style={{ marginTop: 22 }}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={form.email}
            valid={valid.email}
            onChange={e => AuthStore.handleChangeForm(e)}
            style={{ minWidth: 594 }}
          />
          <TextField
            name="password"
            type="password"
            label="Пароль"
            value={form.password}
            valid={valid.password}
            onChange={e => AuthStore.handleChangeForm(e)}
            style={{ marginTop: 22, minWidth: 594 }}
          />
          <Button fullWidth style={{ marginTop: 22 }}>
            Войти
          </Button>
        </form>
      </div>
    </Wrapper>
  )
}

export default observer(SignIn)
