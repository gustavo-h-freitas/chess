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
      console.log(square);
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