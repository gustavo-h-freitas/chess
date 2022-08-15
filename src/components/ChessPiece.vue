<template>
  <img 
    ref="piece"
    :src="getPieceUrl()"
    alt=""
    class="piece"
    @click="selectPiece"
  >
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    piece: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: ''
    }
  },
  emits: ['select-piece'],

  computed: {
    ...mapGetters({
      playerTurn: 'GET_PLAYER_TURN',
      player: 'GET_PLAYER'
    }),

    isPlayerPiece () {
      return this.piece.includes(this.player)
    },

    isCurrentPlayerTurn () {
      return this.player === this.playerTurn
    }
  },

  watch: {
    position: {
      handler (newPosition) {
        this.positionPiece(newPosition)
      }
    }
  },

  mounted () {
    this.positionPiece(this.position)
  },

  methods: {
    selectPiece () {
      if (!this.isCurrentPlayerTurn && !this.isPlayerPiece) return

      this.$emit('select-piece', this.$refs.piece)
    },

    getPieceUrl () {
      const pieceName = this.piece.split('-')[0]
      const piece = require(`../assets/pieces/${this.color}/${pieceName}.svg`)
      return piece
    },

    positionPiece (position) {
      if (!position) return

      const square = document.getElementById(`${position}`)

      const positionInTheMiddle = 5
      const rect = square.getBoundingClientRect()
      this.$refs.piece.style.left = `${rect.x + positionInTheMiddle}px`
      this.$refs.piece.style.top = `${rect.y + positionInTheMiddle}px`
    }
  }
}
</script>

<style>
.piece {
  width: 40px;
  height: 40px;
  position: absolute;
}
</style>