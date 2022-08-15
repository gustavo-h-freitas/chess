import { createStore } from 'vuex'
import SocketioService from '../services/socketio.service.js'

const socketIo = SocketioService
socketIo.setupSocketConnection()

socketIo.socket.on('currentPlayer', payload => {
  store.dispatch('setPlayer', payload)
})

socketIo.socket.on('playerMove', ({ piecesPosition, playerTurn }) => {
  store.dispatch('setPiecesPosition', piecesPosition)
  store.dispatch('setPlayerTurn', playerTurn)
})

socketIo.socket.on('resetGame', () => {
  store.dispatch('resetGame', true)
})

export const store = createStore({
  state() {
    return {
      socketIo,
      player: null,
      piecesPosition: [],
      playerTurn: 'white',
      resetGame: false
    }
  },

  actions: {
    setPlayer ({ state }, payload) {
      state.player = payload.player
    },

    resetGame ({ state }, payload) {
      if (payload) state.playerTurn = 'white'
      state.resetGame = payload
    },

    setPiecesPosition ({ state }, payload) {
      state.piecesPosition = payload
    },

    setPlayerTurn ({ state }, payload) {
      state.playerTurn = payload
    },

    movePiece ({ state }, { position, index }) {
      state.piecesPosition[index].position = position
      state.socketIo.emit('movePiece', state.piecesPosition)
    }
  },

  getters: {
    GET_PLAYER_TURN (state) {
      return state.playerTurn
    },

    GET_PLAYER (state) {
      return state.player
    },

    GET_POSITIONS (state) {
      return state.piecesPosition
    },

    GET_RESET_GAME (state) {
      return state.resetGame
    }
  }
})