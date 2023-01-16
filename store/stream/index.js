import { makeAutoObservable } from 'mobx'
// import axios from 'axios'
// import { createError } from 'lib/server'
import * as streamFrame from 'store/stream/frame'
import * as streamSource from 'store/stream/source'

class StreamStore {
  frame = streamFrame.FRAME_1
  source = streamSource.FRAME_1
  focused = null

  constructor() {
    makeAutoObservable(this)
  }

  handleSelectFrameType(newFrame) {
    this.frame = streamFrame[newFrame]
  }

  handleSelectFrameSource(source) {
    if (!this.focused) {
      return
    }
    this.source[this.focused] = source
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
