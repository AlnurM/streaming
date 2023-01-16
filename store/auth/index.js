import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { createError } from 'lib/server'

class AuthStore {
  form = {
    name: '',
    email: '',
    password: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  handleChangeForm(event) {
    const { name, value } = event?.target || event
    this.form[name] = value
  }

  handleLogout() {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  }

  async handleLogin() {
    try {
      const response = await axios.post('/auth/login', this.form)
      const { accessToken } = response.data
      document.cookie = `accessToken=${accessToken || ''};`
      return response.data
    } catch (e) {
      return createError(e)
    }
  }

  async handleRegister() {
    try {
      const response = await axios.post('/auth/register-moderator', this.form)
      const { accessToken } = response.data
      document.cookie = `accessToken=${accessToken || ''};`
      return response.data
    } catch (e) {
      return createError(e)
    }
  }
}

export default new AuthStore()
export { default as withAuth } from './withAuth'
