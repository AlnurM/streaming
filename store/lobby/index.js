import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { createError } from 'lib/server'
import * as lobbyStatus from 'store/lobby/status'

class LobbyStore {
  status = lobbyStatus.SET_FORM
  form = {
    name: '',
    description: '',
    requirement: '',
    images: [],
    resolution: '',
    fps: '',
    restreams: [],
  }
  restreamForm = {
    url: '',
    key: '',
    name: '',
  }
  inviteForm = {
    username: '',
    text: '',
  }
  stream = {
    createdAt: '',
    description: '',
    fps: '',
    id: '',
    isActive: false,
    moderatorId: '',
    name: '',
    images: [],
    requirement: '',
    resolution: '',
    restreams: [],
    updatedAt: '',
  }

  constructor() {
    makeAutoObservable(this)
  }

  resetStatus() {
    this.status = lobbyStatus.SET_FORM
  }

  handleChangeForm(event) {
    const { name, value } = event?.target || event
    this.form[name] = value
  }

  handleChangeRestreamForm(event) {
    const { name, value } = event?.target || event
    this.restreamForm[name] = value
  }

  handleChangeInviteForm(event) {
    const { name, value } = event?.target || event
    this.inviteForm[name] = value
  }

  handleRestreamForm() {
    const cloned = [...this.form.restreams]
    let selected = cloned.find(f => f.name === this.restreamForm.name)
    selected = selected ? this.restreamForm : null
    this.form.restreams = selected ? [...cloned] : [...cloned, this.restreamForm]
    this.restreamForm = {
      url: '',
      key: '',
      name: '',
    }
  }

  handleEditRestream(event) {
    this.restreamForm = event
  }

  async handleSaveForm(accessToken) {
    try {
      const response = await axios.post('/lobby/create', this.form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      this.status = lobbyStatus.INVITE_OPERATOR
      return response.data
    } catch (e) {
      return createError(e)
    }
  }
}

export default new LobbyStore()
