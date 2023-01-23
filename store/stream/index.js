import { makeAutoObservable } from 'mobx'
// import axios from 'axios'
// import { createError } from 'lib/server'
import * as streamFrame from 'store/stream/frame'

class StreamStore {
  frame = streamFrame.FRAME_1
  focused = null

  constructor() {
    makeAutoObservable(this)
  }

  handleSelectFrameType(newFrame) {
    this.frame = streamFrame[newFrame]
  }

  handleFocus(id) {
    if (this.focused === id) {
      this.focused = null
      return
    }
    this.focused = id
  }
}

export default new StreamStore()
