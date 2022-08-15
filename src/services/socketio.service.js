/* eslint-disable */
import { io } from 'socket.io-client'
import { store } from '../store/index'

class SocketioService {
  constructor() {
    this.socket = null
  }

  setupSocketConnection () {
    this.socket = io('http://localhost:3000')
  }

  emit (event, payload) {
    this.socket.emit(event, payload)
  }
}

export default new SocketioService()