/* eslint-disable */
import { io } from 'socket.io-client'

class SocketioService {
  constructor() {
    this.socket = null
  }

  setupSocketConnection () {
    this.socket = io('http://localhost:3000')
  }

  disconnect () {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketioService()