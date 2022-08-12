<template>
  <BoardRoot />
  <h1 @click="emitSocket">Testing message</h1>
</template>

<script>
import BoardRoot from './components/BoardRoot.vue'
import SocketioService from './services/socketio.service.js'

export default {
  name: 'App',
  components: {
    BoardRoot
  },
  data () {
    return {
      socket: null
    }
  },
  created() {
    this.socket = SocketioService
    this.socket.setupSocketConnection()
  },
  methods: {
    emitSocket () {
      this.socket.socket.emit('play', { payload: 123 })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
