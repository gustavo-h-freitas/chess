<template>
  <img :src="getPieceUrl()" alt="" class="piece" ref="piece">
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

  methods: {
    getPieceUrl () {
      const piece = require(`../assets/pieces/${this.color}/${this.piece}.svg`)
      return piece
    },

    positionPiece () {
      if (!this.position) return

      const square = document.getElementById(`${this.position}`)
      const positionInTheMiddle = 5
      const rect = square.getBoundingClientRect()
      this.$refs.piece.style.right = `${rect.x + positionInTheMiddle}px`
      this.$refs.piece.style.top = `${rect.y + positionInTheMiddle}px`
    }
  },

  mounted () {
    this.positionPiece()
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