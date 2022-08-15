<template>
  <h1 class="player-turn">
    {{ playerTurn }} turn
  </h1>

  <BoardRoot />
  <h1 class="player">
    Playing as:
  </h1>

  <div class="color-selector">
    <h2>{{ player }}</h2>
  </div>

  <button 
    class="reset-game"
    @click="resetGame"
  >
    Reset Game
  </button>
</template>

<script>
import BoardRoot from './components/BoardRoot.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    BoardRoot
  },

  computed: {
    ...mapGetters({
      player: 'GET_PLAYER',
      playerTurn: 'GET_PLAYER_TURN'
    })
  },

  created () {
    window.addEventListener('beforeunload', this.beforeLeave)
  },

  methods: {
    beforeLeave () {
      this.$store.state.socketIo.emit('playerDisconnect', this.player)
    },

    resetGame () {
      this.$store.state.socketIo.emit('resetGame')
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
  margin-top: 60px;
  color: #2c2c2c;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.color-selector h2 {
  text-transform: capitalize;
  font-weight: bolder;
  margin-top: 12px;
}

.player {
  margin-bottom: 0;
}

.player-turn {
  text-transform: uppercase;
}

.reset-game {
  font-size: 1.2rem;
  border: 1px solid #2c2c2c;
  border-radius: 6px;
  padding: 6px 18px;
  box-shadow: 1px 2px 10px rgba(55, 55, 55, .5);
  background: #2c2c2c;
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all .3s;
}

.reset-game:hover {
  transform: scale(1.05);
}
</style>
